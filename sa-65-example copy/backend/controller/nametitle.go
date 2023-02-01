package controller

import (
	"net/http"

	"github.com/chanapornuppamana/sa-65-example/entity"
	"github.com/gin-gonic/gin"
)

// POST /Nametitles
func CreateNametitle(c *gin.Context) {
	var Nametitle entity.Nametitle
	if err := c.ShouldBindJSON(&Nametitle); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&Nametitle).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Nametitle})
}

// GET /Nametitle/:id
func GetNametitle(c *gin.Context) {
	var Nametitle entity.Nametitle
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM nametitles WHERE id = ?", id).Scan(&Nametitle).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Nametitle})
}

// GET /Nametitles
func ListNametitles(c *gin.Context) {
	var Nametitle []entity.Nametitle
	if err := entity.DB().Raw("SELECT * FROM nametitles").Scan(&Nametitle).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Nametitle})
}

// DELETE /Nametitles/:id
func DeleteNametitle(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM nametitles WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Nametitle not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /Nametitles
func UpdateNametitle(c *gin.Context) {
	var Nametitle entity.Nametitle
	if err := c.ShouldBindJSON(&Nametitle); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", Nametitle.ID).First(&Nametitle); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Nametitle not found"})
		return
	}

	if err := entity.DB().Save(&Nametitle).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Nametitle})
}
