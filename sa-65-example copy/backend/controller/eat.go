package controller

import (
	"net/http"

	"github.com/chanapornuppamana/sa-65-example/entity"
	"github.com/gin-gonic/gin"
)

// POST /eats
func CreateEat(c *gin.Context) {
	var eat entity.Eat
	if err := c.ShouldBindJSON(&eat); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&eat).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": eat})
}

// GET /eat/:id
func GetEat(c *gin.Context) {
	var eat entity.Eat
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM eats WHERE id = ?", id).Scan(&eat).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": eat})
}

// GET /eats
func ListEats(c *gin.Context) {
	var eats []entity.Eat
	if err := entity.DB().Raw("SELECT * FROM eats").Scan(&eats).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": eats})
}

// DELETE /eats/:id
func DeleteEat(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM eats WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "eat not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /eats
func UpdateEat(c *gin.Context) {
	var eat entity.Eat
	if err := c.ShouldBindJSON(&eat); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", eat.ID).First(&eat); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "eat not found"})
		return
	}

	if err := entity.DB().Save(&eat).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": eat})
}
