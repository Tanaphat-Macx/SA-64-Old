package controller

import (
	"github.com/chanapornuppamana/sa-65-example/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /Nutritionist สร้างข้อมูลนักโภชนาการ

func CreateProblem(c *gin.Context) {

	var problem entity.ProblemEating

	if err := c.ShouldBindJSON(&problem); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	if err := entity.DB().Create(&problem).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": problem})

}

// GET /user/:id

func GetProblem(c *gin.Context) {

	var problem entity.ProblemEating

	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM problem_eatings WHERE id = ?", id).Find(&problem).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": problem})

}

// GET /Problem แสดงข้อมูล Problem ทั้งหมดที่มีในดาต้าเบส

func ListProblem(c *gin.Context) {

	var problem []entity.ProblemEating

	if err := entity.DB().Raw("SELECT * FROM problem_eatings").Find(&problem).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": problem})

}
