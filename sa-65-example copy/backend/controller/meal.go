package controller

import (
	"net/http"

	"github.com/chanapornuppamana/sa-65-example/entity"
	"github.com/gin-gonic/gin"
)

// POST /meal
func CreateMeal(c *gin.Context) {
	var meal entity.Meal
	if err := c.ShouldBindJSON(&meal); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&meal).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": meal})
}

// GET /meal/:id
func GetMeal(c *gin.Context) {
	var meal entity.Meal

	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM meals WHERE id = ?", id).Find(&meal).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": meal})
}

// GET /meals
func ListMeals(c *gin.Context) {
	var meals []entity.Meal
	if err := entity.DB().Raw("SELECT * FROM meals").Find(&meals).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": meals})
}

// DELETE /meal/:id
func DeleteMeal(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM meals WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "meal not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /meals
func UpdateMeal(c *gin.Context) {
	var meal entity.Meal
	if err := c.ShouldBindJSON(&meal); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", meal.ID).First(&meal); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "meal not found"})
		return
	}

	if err := entity.DB().Save(&meal).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": meal})
}
