package controller

import (
	"github.com/chanapornuppamana/sa-65-example/entity"

	"github.com/gin-gonic/gin"

	"net/http"
)

// POST /Nutritionist สร้างข้อมูลนักโภชนาการ

// POST /watch_videos
func CreateTrackingEV(c *gin.Context) { // c รับข้อมูลมาจาก api

	var tracking entity.TrackingEvaluation //การประกาศตัวแปรให้เป็นไทป์ที่เราสร้างขึ้นเอง
	var planning entity.Planning
	var nutritionist entity.Nutritionist
	var nutritioniststatus entity.NutritionalStatus
	var problemeating entity.ProblemEating
	var weightproblem entity.WeightProblem

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 9 จะถูก bind เข้าตัวแปร tracking
	if err := c.ShouldBindJSON(&tracking); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	} //การบาย

	// 10: ค้นหา planning ด้วย id
	if tx := entity.DB().Where("id = ?", tracking.PlanningID).First(&planning); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "planning not found"})
		return
	}

	// 11: อัพเดทคอลัมน์ TrackingCheck ว่าเพลนนิ่งถูกประเมินแล้ว
	if tx := entity.DB().Model(&planning).Update("TrackingCheck", true); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "planning not found"})
		return
	}

	// 12: ค้นหา nutritionist ด้วย id
	if tx := entity.DB().Where("id = ?", tracking.NutritionistID).First(&nutritionist); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "nutritionist not found"})
		return
	}

	// 13: ค้นหา nutritioniststatus ด้วย id
	if tx := entity.DB().Where("id = ?", tracking.NutritionalStatusID).First(&nutritioniststatus); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "nutritioniststatus not found"})
		return
	}
	// 14: ค้นหา problemeating ด้วย id
	if tx := entity.DB().Where("id = ?", tracking.ProblemEatingID).First(&problemeating); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "problemeating not found"})
		return
	}
	// 15: ค้นหา weightproblem ด้วย id
	if tx := entity.DB().Where("id = ?", tracking.WeightProblemID).First(&weightproblem); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "weightproblem not found"})
		return
	}
	// 16: สร้าง TrackingEvaluation
	tev := entity.TrackingEvaluation{

		// Video:       video,                  // โยงความสัมพันธ์กับ Entity Video
		// Playlist:    playlist,               // โยงความสัมพันธ์กับ Entity Playlist
		// WatchedTime: watchvideo.WatchedTime, // ตั้งค่าฟิลด์ watchedTime

		Note:              tracking.Note,      //ตั้งค่าฟิลด์ใส่ symtom, ใส่ข้อมูลให้เข้าไปในคอลัมน์ symtom
		Date:              tracking.Date,      //ตั้งค่าฟิลด์ Date
		Nutritionist:      nutritionist,       // โยงความสัมพันธ์กับ Entity Nutritionist
		NutritionalStatus: nutritioniststatus, // โยงความสัมพันธ์กับ Entity NutritionalStatus
		Planning:          planning,           // โยงความสัมพันธ์กับ Entity Planning
		ProblemEating:     problemeating,
		WeightProblem:     weightproblem,
	}

	// 17: บันทึก
	if err := entity.DB().Create(&tev).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": tev}) //ส่ง tev กลับไปตรงที่ fetch ที่เราเรียกใช้
}

// GET /user/:id

func GetTrackingEvaluation(c *gin.Context) {

	var trackingevaluation entity.NutritionalStatus

	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM trackingevaluations WHERE id = ?", id).Scan(&trackingevaluation).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": trackingevaluation})

}

// GET /Nutritionists แสดงข้อมูล Nutritionists ทั้งหมดที่มีในดาต้าเบส

func ListTrackingEvaluation(c *gin.Context) {

	var trackingevaluation []entity.TrackingEvaluation

	if err := entity.DB().Preload("WeightProblem").Preload("ProblemEating").Preload("Nutritionist").Preload("NutritionalStatus").Preload("Planning.Meal").Preload("Planning.Food").Preload("Planning.Limit.Patient").Raw("SELECT * FROM tracking_evaluations").Find(&trackingevaluation).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": trackingevaluation})

}
