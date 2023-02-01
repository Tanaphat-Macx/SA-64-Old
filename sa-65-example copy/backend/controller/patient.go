package controller

import (
	"net/http"

	"github.com/chanapornuppamana/sa-65-example/entity"
	"github.com/gin-gonic/gin"
)

// POST /Patient
func CreatePatient(c *gin.Context) {

	var patient entity.Patient
	var gender entity.Gender

	var nametitle entity.Nametitle
	var user entity.User

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 9 จะถูก bind เข้าตัวแปร Patient
	if err := c.ShouldBindJSON(&patient); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// : ค้นหา nametitle ด้วย id
	if tx := entity.DB().Where("id = ?", patient.NametitleID).First(&nametitle); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "nametitle not found"})
		return
	}

	// : ค้นหา gender ด้วย id
	if tx := entity.DB().Where("id = ?", patient.GenderID).First(&gender); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "gender not found"})
		return
	}

	// : ค้นหา User ด้วย id
	if tx := entity.DB().Where("id = ?", patient.UserID).First(&user); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	// : สร้าง Patient
	ps := entity.Patient{
		Nametitle: nametitle,        // โยงความสัมพันธ์กับ Entity nametitle
		Gender:    gender,           // โยงความสัมพันธ์กับ Entity gender
		User:      user,             //โยงความสัมพันธ์กับ Entity user
		Idcard:    patient.Idcard,   // ตั้งค่าฟิลด์ Idcard
		Name:      patient.Name,     // ตั้งค่าฟิลด์ Name
		Age:       patient.Age,      // ตั้งค่าฟิลด์ Age
		Bday:      patient.Bday,     // ตั้งค่าฟิลด์ Bday
		Allergy:   patient.Allergy,  // ตั้งค่าฟิลด์ Allergy
		Sickness:  patient.Sickness, // ตั้งค่าฟิลด์ Sickness
		Datetime:  patient.Datetime, // ตั้งค่าฟิลด์ Datetime

	}

	// : บันทึก
	if err := entity.DB().Create(&ps).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": patient})
}

// GET /Patient/:id
func GetPatient(c *gin.Context) {
	var patient entity.Patient
	id := c.Param("id")
	if err := entity.DB().Preload("Nametitle").Preload("Gender").Preload("User").Raw("SELECT * FROM patients WHERE id = ?", id).Find(&patient).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": patient})
}

// GET /Patient
func ListPatients(c *gin.Context) {
	var patient []entity.Patient
	if err := entity.DB().Preload("Nametitle").Preload("Gender").Preload("User").Raw("SELECT * FROM patients").Find(&patient).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": patient})
}

// DELETE /Patient/:id
func DeletePatient(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM patients WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Patient not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /Patient
func UpdatePatient(c *gin.Context) {
	var patient entity.Patient
	if err := c.ShouldBindJSON(&patient); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", patient.ID).First(&patient); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Patient not found"})
		return
	}
	if err := entity.DB().Save(&patient).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": patient})
}
