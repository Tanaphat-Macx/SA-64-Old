package controller

import (
	"net/http"

	"github.com/chanapornuppamana/sa-65-example/entity"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

// POST /select_genders
func CreateNutritionist(c *gin.Context) {

	var nutritionist entity.Nutritionist
	var jobduties entity.JobDuties
	var user entity.User
	var gender entity.Gender

	if err := c.ShouldBindJSON(&nutritionist); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//ค้นหา gender ด้วย id
	if tx := entity.DB().Where("id = ?", nutritionist.GenderID).First(&gender); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "gender not found"})
		return
	}

	//ค้นหา jobduties ด้วย id
	if tx := entity.DB().Where("id = ?", nutritionist.JobDutiesID).First(&jobduties); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "jobduties not found"})
		return
	}

	//ค้นหา user ด้วย id
	if tx := entity.DB().Where("id = ?", nutritionist.UserID).First(&user); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}
	password, _ := bcrypt.GenerateFromPassword([]byte(nutritionist.Password), 14)
	
	// สร้าง Nutritionist
	nutririonist := entity.Nutritionist{
		Name:      nutritionist.Name,
		Email:     nutritionist.Email,
		Password:  string(password),
		Tel:       nutritionist.Tel,
		JobDuties: jobduties,        // โยงความสัมพันธ์กับ Entity JobDuties
		Gender:    gender,           // โยงความสัมพันธ์กับ Entity Gender
		User:      user,             // โยงความสัมพันธ์กับ Entity User
		DOB:       nutritionist.DOB, // ตั้งค่าฟิลด์ DOB
	}

	// บันทึก
	if err := entity.DB().Create(&nutririonist).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": nutririonist})
}

// GET /nutritionist/:id
func GetNutritionist(c *gin.Context) {
	var nutritionist entity.Nutritionist
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&nutritionist); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "nutritionist not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": nutritionist})
}

// GET /nutritionists
func ListNutritionists(c *gin.Context) {
	var nutritionists []entity.Nutritionist
	if err := entity.DB().Preload("JobDuties").Preload("User").Preload("Gender").Raw("SELECT * FROM nutritionists").Find(&nutritionists).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": nutritionists})
}

// DELETE /nutritionists/:id
func DeleteNutritionist(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM nutritionists WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "nutritionist not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /nutritionists
func UpdateNutritionist(c *gin.Context) {
	var nutritionist entity.Nutritionist
	if err := c.ShouldBindJSON(&nutritionist); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", nutritionist.ID).First(&nutritionist); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "nutritionist not found"})
		return
	}

	if err := entity.DB().Save(&nutritionist).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": nutritionist})
}
