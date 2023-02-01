package controller

import (
	"net/http"

	"github.com/chanapornuppamana/sa-65-example/entity"
	"github.com/gin-gonic/gin"
)

// POST /categorys
func CreateCategory(c *gin.Context) {
	var category entity.Category
	if err := c.ShouldBindJSON(&category); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&category).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": category})
}

// GET /category/:id
func GetCategory(c *gin.Context) {
	var category entity.Category
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM categorys WHERE id = ?", id).Scan(&category).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": category})
}

// GET /categorys
func ListCategorys(c *gin.Context) {
	var categorys []entity.Category
	if err := entity.DB().Raw("SELECT * FROM categorys").Scan(&categorys).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": categorys})
}

// DELETE /categorys/:id
func DeleteCategory(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM categorys WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "category not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /categorys
func UpdateCategory(c *gin.Context) {
	var category entity.Category
	if err := c.ShouldBindJSON(&category); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", category.ID).First(&category); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "category not found"})
		return
	}

	if err := entity.DB().Save(&category).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": category})
}

// ของตัวเอง
