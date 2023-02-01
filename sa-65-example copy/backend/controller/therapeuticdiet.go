package controller

import (
	"net/http"

	"github.com/chanapornuppamana/sa-65-example/entity"
	"github.com/gin-gonic/gin"
)

// POST /therapeuticdiets
func CreateTherapeuticDiet(c *gin.Context) {
	var therapeuticdiet entity.TherapeuticDiet
	if err := c.ShouldBindJSON(&therapeuticdiet); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&therapeuticdiet).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": therapeuticdiet})
}

// GET /therapeuticdiet/:id
func GetTherapeuticDiet(c *gin.Context) {
	var therapeuticdiet entity.TherapeuticDiet
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM therapeutic_diets WHERE id = ?", id).Scan(&therapeuticdiet).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": therapeuticdiet})
}

// GET /therapeuticdiets
func ListTherapeuticDiets(c *gin.Context) {
	var therapeuticdiets []entity.TherapeuticDiet
	if err := entity.DB().Raw("SELECT * FROM therapeutic_diets").Scan(&therapeuticdiets).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": therapeuticdiets})
}

// DELETE /therapeuticdiets/:id
func DeleteTherapeuticDiet(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM therapeutic_diets WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "therapeuticdiet not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /therapeuticdiet
func UpdateTherapeuticDiet(c *gin.Context) {
	var therapeuticdiet entity.TherapeuticDiet
	if err := c.ShouldBindJSON(&therapeuticdiet); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", therapeuticdiet.ID).First(&therapeuticdiet); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "therapeuticdiet not found"})
		return
	}

	if err := entity.DB().Save(&therapeuticdiet).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": therapeuticdiet})
}
