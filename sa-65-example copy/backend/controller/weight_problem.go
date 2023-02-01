package controller

import (
	"github.com/chanapornuppamana/sa-65-example/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /Nutritionist สร้างข้อมูลนักโภชนาการ

func CreateWeightProblem(c *gin.Context) {

	var weightproblem entity.WeightProblem

	if err := c.ShouldBindJSON(&weightproblem); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	if err := entity.DB().Create(&weightproblem).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": weightproblem})

}

// GET /user/:id

func GetWeightProblem(c *gin.Context) {

	var weightproblem entity.WeightProblem

	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM weight_problems WHERE id = ?", id).Find(&weightproblem).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": weightproblem})

}

// GET /Problem แสดงข้อมูล Problem ทั้งหมดที่มีในดาต้าเบส

func ListWeightProblem(c *gin.Context) {

	var weightproblem []entity.WeightProblem

	if err := entity.DB().Raw("SELECT * FROM weight_problems").Find(&weightproblem).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": weightproblem})

}
