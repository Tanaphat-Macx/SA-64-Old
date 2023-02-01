package controller

import (
	"net/http"

	"github.com/chanapornuppamana/sa-65-example/entity"
	"github.com/gin-gonic/gin"
)

// POST /should_Eats
func CreateShould_Eat(c *gin.Context) {
	var should_Eat entity.Should_Eat
	if err := c.ShouldBindJSON(&should_Eat); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&should_Eat).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": should_Eat})
}

// GET /should_Eat/:id
func GetShould_Eat(c *gin.Context) {
	var should_Eat entity.Should_Eat
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM should_Eats WHERE id = ?", id).Find(&should_Eat).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": should_Eat})
}

// GET /should_Eats
func ListShould_Eats(c *gin.Context) {
	var should_Eats []entity.Should_Eat
	if err := entity.DB().Raw("SELECT * FROM should_Eats").Find(&should_Eats).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": should_Eats})
}

// DELETE /should_Eats/:id
func DeleteShould_Eat(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM should_Eats WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "should_Eat not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /should_Eats
func UpdateShould_Eat(c *gin.Context) {
	var should_Eat entity.Should_Eat
	if err := c.ShouldBindJSON(&should_Eat); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", should_Eat.ID).First(&should_Eat); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "should_Eat not found"})
		return
	}
	if err := entity.DB().Save(&should_Eat).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": should_Eat})
}
