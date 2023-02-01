package controller

import (
	"net/http"

	"github.com/chanapornuppamana/sa-65-example/entity"
	"github.com/gin-gonic/gin"
)

// POST /edibles
func CreateEdible(c *gin.Context) {
	var edible entity.Edible
	if err := c.ShouldBindJSON(&edible); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&edible).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": edible})
}

// GET /edible/:id
func GetEdible(c *gin.Context) {
	var edible entity.Edible
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM edibles WHERE id = ?", id).Find(&edible).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": edible})
}

// GET /edibles
func ListEdibles(c *gin.Context) {
	var edibles []entity.Edible
	if err := entity.DB().Raw("SELECT * FROM edibles").Find(&edibles).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": edibles})
}

// DELETE /edibles/:id
func DeleteEdible(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM edibles WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "edible not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /edibles
func UpdateEdible(c *gin.Context) {
	var edible entity.Edible
	if err := c.ShouldBindJSON(&edible); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", edible.ID).First(&edible); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "edible not found"})
		return
	}
	if err := entity.DB().Save(&edible).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": edible})
}
