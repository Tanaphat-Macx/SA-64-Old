package controller

import (
	"net/http"

	"github.com/chanapornuppamana/sa-65-example/entity"
	"github.com/gin-gonic/gin"
)

// POST /sicknesses
func CreateSickness(c *gin.Context) {
	var sickness entity.Sickness
	if err := c.ShouldBindJSON(&sickness); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&sickness).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": sickness})
}

// GET /sickness/:id
func GetSickness(c *gin.Context) {
	var sickness entity.Sickness
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM sicknesses WHERE id = ?", id).Scan(&sickness).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": sickness})
}

// GET /sickesses
func ListSicknesses(c *gin.Context) {
	var sicknesses []entity.Sickness
	if err := entity.DB().Raw("SELECT * FROM sicknesses").Scan(&sicknesses).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": sicknesses})
}

// DELETE /sicknesses/:id
func DeleteSickness(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM sicknesses WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "sickness not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /sicknesses
func UpdateSickness(c *gin.Context) {
	var sickness entity.Sickness
	if err := c.ShouldBindJSON(&sickness); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", sickness.ID).First(&sickness); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "sickness not found"})
		return
	}

	if err := entity.DB().Save(&sickness).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": sickness})
}
