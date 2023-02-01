package controller

import (
	"net/http"

	"github.com/chanapornuppamana/sa-65-example/entity"
	"github.com/gin-gonic/gin"
)

// POST /foods
func CreateFood(c *gin.Context) {
	var food entity.Food
	if err := c.ShouldBindJSON(&food); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&food).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": food})
}

// GET /food/:id
func GetFood(c *gin.Context) {
	var food entity.Food
	id := c.Param("id")
	if err := entity.DB().Preload("Category").Raw("SELECT * FROM foods WHERE id = ?", id).Find(&food).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": food})
}

// GET /foods
func ListFoods(c *gin.Context) {
	var foods []entity.Food
	if err := entity.DB().Preload("Category").Raw("SELECT * FROM foods").Find(&foods).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": foods})
}

// DELETE /foods/:id
func DeleteFood(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM foods WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "food not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /foods
func UpdateFood(c *gin.Context) {
	var food entity.Food
	if err := c.ShouldBindJSON(&food); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", food.ID).First(&food); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "food not found"})
		return
	}

	if err := entity.DB().Save(&food).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": food})
}

// ของตัวเอง
