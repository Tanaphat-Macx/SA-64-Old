package controller

import (
	"net/http"

	"github.com/chanapornuppamana/sa-65-example/entity"
	"github.com/gin-gonic/gin"
)

// POST /limit
func CreateLimit(c *gin.Context) {
	var limit entity.Limit
	var patient entity.Patient
	var edible entity.Edible
	var should_Eat entity.Should_Eat
	var nutritionist entity.Nutritionist

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 9 จะถูก bind เข้าตัวแปร Limit
	if err := c.ShouldBindJSON(&limit); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// : ค้นหา Patient ด้วย id
	if tx := entity.DB().Where("id = ?",
		limit.PatientID).First(&patient); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Patient not found"})
		return
	}

	// : ค้นหา Edible ด้วย id
	if tx := entity.DB().Where("id = ?",
		limit.EdibleID).First(&edible); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Edible not found"})
		return
	}

	// : ค้นหา Should_Eat ด้วย id
	if tx := entity.DB().Where("id = ?",
		limit.Should_EatID).First(&should_Eat); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Should_Eat not found"})
		return
	}

	// : ค้นหา nutritionist ด้วย id
	if tx := entity.DB().Where("id = ?",
		limit.NutritionistID).First(&nutritionist); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Nutritionist not found"})
		return
	}

	// : สร้าง Limit
	ps := entity.Limit{
		Patient:       patient,             // โยงความสัมพันธ์กับ Entity Patient
		Edible:        edible,              // โยงความสัมพันธ์กับ Entity Edible
		Should_Eat:    should_Eat,          // โยงความสัมพันธ์กับ Entity Should_Eat
		Nutritionist:  nutritionist,        // โยงความสัมพันธ์กับ Entity Nutritionist
		Limit_details: limit.Limit_details, // ตั้งค่าฟิลด์ Limit_details
	}

	// : บันทึก
	if err := entity.DB().Create(&ps).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": ps})
}

// GET /limit/:id
func GetLimit(c *gin.Context) {
	var limit entity.Limit
	id := c.Param("id")
	if err := entity.DB().Preload("Patient").Preload("Edible").Preload("Should_Eat").Preload("Nutritionist").Raw("SELECT * FROM limits WHERE id = ?", id).Find(&limit).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": limit})
}

// GET /limits
func ListLimits(c *gin.Context) {
	var Limits []entity.Limit
	if err := entity.DB().Preload("Patient").Preload("Edible").Preload("Should_Eat").Preload("Nutritionist").Raw("SELECT * FROM limits").Find(&Limits).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Limits})
}

// DELETE /limits/:id
func DeleteLimit(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM limits WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "limit not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /Limit
func UpdateLimit(c *gin.Context) {
	var limit entity.Limit
	if err := c.ShouldBindJSON(&limit); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", limit.ID).First(&limit); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Limit not found"})
		return
	}
	if err := entity.DB().Save(&limit).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": limit})
}

func GetLimitByPatientID(c *gin.Context) {

	var limit []entity.Limit

	id := c.Param("id") //มาจาก api จากใน main.go /limit/patient/1 (เปลี่นน id เป็นตัวอื่นก็ได้)

	if err := entity.DB().Preload("Patient").Preload("Should_Eat").Raw("SELECT * FROM limits WHERE patient_id = ?", id).Find(&limit).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": limit})

}
