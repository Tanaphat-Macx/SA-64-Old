package controller

import (
	"net/http"

	"github.com/chanapornuppamana/sa-65-example/entity"
	"github.com/gin-gonic/gin"
)

//โครงสร้างตัวควบคุม database

// POST /food_sickenesses  foodinformation
func CreateFoodSickness(c *gin.Context) { // c รับข้อมูลมาจาก api
	var foodsickeness entity.FoodSickness //การประกาศตัวแปรให้เป็นไทป์ที่เราสร้างขึ้นเอง
	var food entity.Food
	var foodtype entity.FoodType
	var eat entity.Eat
	var therapeuticdiet entity.TherapeuticDiet
	var sickness entity.Sickness
	var nutritionist entity.Nutritionist

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 9 จะถูก bind เข้าตัวแปร foodsickeness
	// c.ShouldBindJSON  คือการผูกข้อมูลที่ได้จากหน้า frontend ให้เข้ากับ structure(โครงสร้าง) ของ backend
	if err := c.ShouldBindJSON(&foodsickeness); err != nil {
		// c.JSON เปลี่ยนข้อมูลที่มีให้เป็นนข้อมูลแบบ json
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//tx.RowsAffected == 0 คือมัน err
	// : ค้นหา food ด้วย id
	if tx := entity.DB().Where("id = ?", foodsickeness.FoodID).First(&food); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "food not found"})
		return
	}

	// : ค้นหา foodtype ด้วย id
	if tx := entity.DB().Where("id = ?", foodsickeness.FoodTypeID).First(&foodtype); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "foodtype not found"})
		return
	}
	// : ค้นหา eat ด้วย id
	if tx := entity.DB().Where("id = ?", foodsickeness.EatID).First(&eat); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "eat not found"})
		return
	}

	// : ค้นหา therapeuticdiet ด้วย id
	if tx := entity.DB().Where("id = ?", foodsickeness.TherapeuticDietID).First(&therapeuticdiet); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "therapeuticdiet not found"})
		return
	}

	// : ค้นหา sickness ด้วย id
	if tx := entity.DB().Where("id = ?", foodsickeness.SicknessID).First(&sickness); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "sickness not found"})
		return
	}

	// : ค้นหา nutritionist ด้วย id
	if tx := entity.DB().Where("id = ?", foodsickeness.NutritionistID).First(&nutritionist); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "nutritionist not found"})
		return
	}

	// : สร้าง foodsickeness
	ps := entity.FoodSickness{
		Food:            food,            // โยงความสัมพันธ์กับ Entity food
		FoodType:        foodtype,        // โยงความสัมพันธ์กับ Entity foodtype
		TherapeuticDiet: therapeuticdiet, // โยงความสัมพันธ์กับ Entity therapeuticdiet
		Eat:             eat,             // โยงความสัมพันธ์กับ Entity eat
		Sickness:        sickness,        // โยงความสัมพันธ์กับ Entity sickness
		Nutritionist:    nutritionist,    //โยงความสัมพันธ์กับ Entity nutritionist
		RecordTime:      foodsickeness.RecordTime,
	}

	// : บันทึก
	if err := entity.DB().Create(&ps).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": ps}) //ส่ง ps กลับไปตรงที่ fetch ที่เราเรียกใช้
}

// GET /FoodSickness/:id
func GetFoodSickness(c *gin.Context) {
	var foodsickeness entity.FoodSickness
	id := c.Param("id") //มาจาก api จากใน main.go
	if err := entity.DB().Preload("Food").Preload("FoodType").Preload("TherapeuticDiet").Preload("Eat").Preload("Sickness").Preload("Nutritionist").Raw("SELECT * FROM food_sicknesses WHERE id = ?", id).Find(&foodsickeness).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": foodsickeness})
}

// GET /FoodSicknesses
func ListFoodSicknesses(c *gin.Context) {
	var foodsicknesses []entity.FoodSickness
	if err := entity.DB().Preload("Food").Preload("FoodType").Preload("TherapeuticDiet").Preload("Eat").Preload("Sickness").Preload("Nutritionist").Raw("SELECT * FROM food_sicknesses").Find(&foodsicknesses).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": foodsicknesses})
}

// DELETE /FoodSickness/:id
func DeleteFoodSickness(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM food_sicknesses WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "foodsickeness not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /FoodSickness
func UpdateFoodSickness(c *gin.Context) {
	var foodsickeness entity.FoodSickness
	if err := c.ShouldBindJSON(&foodsickeness); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", foodsickeness.ID).First(&foodsickeness); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "foodsickness not found"})
		return
	}
	if err := entity.DB().Save(&foodsickeness).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": foodsickeness})
}
