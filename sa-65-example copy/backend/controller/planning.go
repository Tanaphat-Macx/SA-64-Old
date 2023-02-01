package controller

import (
	"net/http"

	"github.com/chanapornuppamana/sa-65-example/entity"
	"github.com/gin-gonic/gin"
)

// POST /planning
func CreatePlanning(c *gin.Context) {

	var planning entity.Planning

	var limit entity.Limit
	var meal entity.Meal
	var food entity.Food
	var nutritionist entity.Nutritionist

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 10 จะถูก bind เข้าตัวแปร planning
	if err := c.ShouldBindJSON(&planning); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 12: ค้นหาlimit ด้วย id
	if tx := entity.DB().Where("id = ?", planning.LimitID).First(&limit); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "limit not found"})
		return
	}

	// 13: ค้นหาmeal ด้วย id
	if tx := entity.DB().Where("id = ?", planning.MealID).First(&meal); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "meal not found"})
		return
	}

	// 14: ค้นหาfood ด้วย id
	if tx := entity.DB().Where("id = ?", planning.FoodID).First(&food); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "food not found"})
		return
	}

	// 15: ค้นหา user ด้วย id
	if tx := entity.DB().Where("id = ?", planning.NutritionistID).First(&nutritionist); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": " user not found"})
		return
	}

	// 16: สร้าง Planning
	pn := entity.Planning{

		Limit:         limit,           // โยงความสัมพันธ์กับ Entity Limit
		Meal:          meal,            // โยงความสัมพันธ์กับ Entity Meal
		Food:          food,            // โยงความสัมพันธ์กับ Entity Food
		Nutritionist:  nutritionist,    // โยงความสัมพันธ์กับ Entity User
		PnDate:        planning.PnDate, // ตั้งค่าฟิลด์ PnDate
		TrackingCheck: false,           // สำหรับ tracking system
	}

	// 17: บันทึก
	if err := entity.DB().Create(&pn).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": pn})
}

// GET /planning/:id
func GetPlanning(c *gin.Context) {
	var planning entity.Planning
	id := c.Param("id")
	if err := entity.DB().Preload("Limit.Patient").Preload("Limit").Preload("Meal").Preload("Food").Preload("Nutritionist").Raw("SELECT * FROM plannings WHERE id = ?", id).Find(&planning).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": planning})
}

// DELETE /plannings/:id
func DeletePlanning(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM plannings WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "planning not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /plannings
func UpdatePlanning(c *gin.Context) {
	var planning entity.Planning
	if err := c.ShouldBindJSON(&planning); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", planning.ID).First(&planning); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "planning not found"})
		return
	}

	if err := entity.DB().Save(&planning).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": planning})
}

func GetPlanningByPatientID(c *gin.Context) {

	var planning []entity.Planning

	id := c.Param("id") //มาจาก api จากใน main.go /planning/patient/1 (เปลี่นน id เป็นตัวอื่นก็ได้)

	if err := entity.DB().Preload("Patient").Preload("Meal").Preload("Food").Raw("SELECT * FROM plannings WHERE patient_id = ?", id).Find(&planning).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": planning})

}

// GET /plannings

func ListPlannings(c *gin.Context) {

	var planning []entity.Planning

	if err := entity.DB().Preload("Limit").Preload("Limit.Patient").Preload("Limit.Should_Eat").Preload("Meal").Preload("Food").Preload("Nutritionist").Raw("SELECT * FROM plannings").Find(&planning).Error; err != nil {

		//Preload เหทือนจอยตาราง จอยตารางpatient
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": planning})

}

func ListPlanningsNoTrackingCheck(c *gin.Context) {

	var planning []entity.Planning

	if err := entity.DB().Preload("Limit").Preload("Limit.Patient").Preload("Meal").Preload("Food").Raw("SELECT * FROM plannings where tracking_check = false").Find(&planning).Error; err != nil {

		//Preload เหมือนจอยตาราง จอยตารางpatient
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": planning})

}
