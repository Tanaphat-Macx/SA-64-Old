package controller

import (
	"github.com/chanapornuppamana/sa-65-example/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /Nutritionist สร้างข้อมูลนักโภชนาการ

func CreateNutritionistStatus(c *gin.Context) {

	var nutritioniststatus entity.NutritionalStatus

	if err := c.ShouldBindJSON(&nutritioniststatus); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	if err := entity.DB().Create(&nutritioniststatus).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": nutritioniststatus})

}

// GET /user/:id

func GetNutritionistStatus(c *gin.Context) {

	var nutritioniststatus entity.NutritionalStatus

	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM nutritioniststatus WHERE id = ?", id).Scan(&nutritioniststatus).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": nutritioniststatus})

}

// GET /Nutritionists แสดงข้อมูล Nutritionists ทั้งหมดที่มีในดาต้าเบส

func ListNutritionistStatus(c *gin.Context) {

	var nutritioniststatus []entity.NutritionalStatus

	if err := entity.DB().Raw("SELECT * FROM nutritional_statuses").Find(&nutritioniststatus).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": nutritioniststatus})

}
