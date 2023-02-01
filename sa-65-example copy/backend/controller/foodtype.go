package controller

import (
	"net/http"

	"github.com/chanapornuppamana/sa-65-example/entity"
	"github.com/gin-gonic/gin"
)

// POST /foodtypes
func CreateFoodType(c *gin.Context) {
	var foodtype entity.FoodType
	if err := c.ShouldBindJSON(&foodtype); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&foodtype).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": foodtype})
}

// GET /foodtype/:id
func GetFoodType(c *gin.Context) {
	var foodtype entity.FoodType
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM food_types WHERE id = ?", id).Scan(&foodtype).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": foodtype})
}

// GET /foodtypes
func ListFoodTypes(c *gin.Context) {
	var foodtypes []entity.FoodType
	if err := entity.DB().Raw("SELECT * FROM food_types").Scan(&foodtypes).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": foodtypes})
}

// DELETE /foodtypes/:id
func DeleteFoodType(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM food_types WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "foodtypes not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /foodtypes
func UpdateFoodType(c *gin.Context) {
	var foodtype entity.FoodType
	if err := c.ShouldBindJSON(&foodtype); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", foodtype.ID).First(&foodtype); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "foodtype not found"})
		return
	}

	if err := entity.DB().Save(&foodtype).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": foodtype})
}

// ของตัวเอง
