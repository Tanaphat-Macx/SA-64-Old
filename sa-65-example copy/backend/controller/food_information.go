package controller

import (
	"net/http"

	"github.com/chanapornuppamana/sa-65-example/entity"
	"github.com/gin-gonic/gin"
)

// POST /food_informations  foodinformation
func CreateFoodInformation(c *gin.Context) {

	var foodinformation entity.FoodInformation
	var food entity.Food
	var foodtype entity.FoodType
	var nutritionist entity.Nutritionist

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 9 จะถูก bind เข้าตัวแปร foodinformation
	if err := c.ShouldBindJSON(&foodinformation); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// : ค้นหา food ด้วย id
	if tx := entity.DB().Where("id = ?", foodinformation.FoodID).First(&food); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "food not found"})
		return
	}

	// : ค้นหา foodtype ด้วย id
	if tx := entity.DB().Where("id = ?", foodinformation.FoodTypeID).First(&foodtype); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "foodtype not found"})
		return
	}

	// : ค้นหา nutritionist ด้วย id
	if tx := entity.DB().Where("id = ?", foodinformation.NutritionistID).First(&nutritionist); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "nutritionist not found"})
		return
	}

	// : สร้าง foodinformation
	ps := entity.FoodInformation{
		Food:         food,         // โยงความสัมพันธ์กับ Entity food
		FoodType:     foodtype,     // โยงความสัมพันธ์กับ Entity foodtype
		Nutritionist: nutritionist, //โยงความสัมพันธ์กับ Entity nutritionist

		Calorie:      foodinformation.Calorie,      // ตั้งค่าฟิลด์ Calorie
		Carbohydrate: foodinformation.Carbohydrate, // ตั้งค่าฟิลด์ Carbohydrate
		Protein:      foodinformation.Protein,      // ตั้งค่าฟิลด์ Protein
		Fat:          foodinformation.Fat,          // ตั้งค่าฟิลด์ Fat
		Fiber:        foodinformation.Fiber,        // ตั้งค่าฟิลด์ Fiber
		Sodium:       foodinformation.Sodium,       // ตั้งค่าฟิลด์ Sodium
		Phosphorus:   foodinformation.Phosphorus,   // ตั้งค่าฟิลด์ Phosphorus
		Calcium:      foodinformation.Calcium,      // ตั้งค่าฟิลด์ Calcium
	}

	// : บันทึก
	if err := entity.DB().Create(&ps).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": ps})
}

// GET /foodinformation/:id
func GetFoodInformation(c *gin.Context) {
	var foodinformation entity.FoodInformation
	id := c.Param("id")
	if err := entity.DB().Preload("Food").Preload("FoodType").Preload("Nutritionist").Raw("SELECT * FROM food_informations WHERE id = ?", id).Find(&foodinformation).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": foodinformation})
}

// GET /food_informations
func ListFoodInformations(c *gin.Context) {
	var foodinformations []entity.FoodInformation
	if err := entity.DB().Preload("Food").Preload("FoodType").Preload("Nutritionist").Raw("SELECT * FROM food_informations").Find(&foodinformations).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": foodinformations})
}

// DELETE /food_informations/:id
func DeleteFoodInformation(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM food_informations WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "foodinformation not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /food_informations
func UpdateFoodInformation(c *gin.Context) {
	var foodinformation entity.FoodInformation
	if err := c.ShouldBindJSON(&foodinformation); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", foodinformation.ID).First(&foodinformation); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "foodinformation not found"})
		return
	}
	if err := entity.DB().Save(&foodinformation).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": foodinformation})
}

// ของตัวเอง
