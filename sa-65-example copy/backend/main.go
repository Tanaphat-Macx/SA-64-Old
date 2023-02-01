package main

import (
	"github.com/chanapornuppamana/sa-65-example/controller"
	"github.com/chanapornuppamana/sa-65-example/entity"
	"github.com/chanapornuppamana/sa-65-example/middlewares"
	"github.com/gin-gonic/gin"
)

func main() {
	entity.SetupDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware())

	api := r.Group("")
	{

		// ต้องมีการอนุญาติผ่าน protect ถึงใช้ได้
		protected := api.Use(middlewares.Authorizes())
		{
			// Nutritionist Routes
			protected.GET("/nutritionists", controller.ListNutritionists)
			protected.GET("/nutritionist/:id", controller.GetNutritionist)
			protected.PATCH("/nutritionists", controller.UpdateNutritionist)
			protected.DELETE("/nutritionists/:id", controller.DeleteNutritionist)

			// Category Routes
			protected.GET("/categorys", controller.ListCategorys)
			protected.GET("/category/:id", controller.GetCategory)
			protected.POST("/categorys", controller.CreateCategory)
			protected.PATCH("/categorys", controller.UpdateCategory)
			protected.DELETE("/categorys/:id", controller.DeleteCategory)

			// Food Routes
			protected.GET("/foods", controller.ListFoods)
			protected.GET("/food/:id", controller.GetFood)
			protected.POST("/foods", controller.CreateFood)
			protected.PATCH("/foods", controller.UpdateFood)
			protected.DELETE("/foods/:id", controller.DeleteFood)

			// FoodType Routes
			protected.GET("/foodtypes", controller.ListFoodTypes)
			protected.GET("/foodtype/:id", controller.GetFoodType)
			protected.POST("/foodtypes", controller.CreateFoodType)
			protected.PATCH("/foodtypes", controller.UpdateFoodType)
			protected.DELETE("/foodtypes/:id", controller.DeleteFoodType)

			// Eat Routes
			protected.GET("/eats", controller.ListEats)
			protected.GET("/eat/:id", controller.GetEat)
			protected.POST("/eats", controller.CreateEat)
			protected.PATCH("/eats", controller.UpdateEat)
			protected.DELETE("/eats/:id", controller.DeleteEat)

			// TherapeuticDiets Routes
			protected.GET("/therapeuticdiets", controller.ListTherapeuticDiets)
			protected.GET("/therapeuticdiet/:id", controller.GetTherapeuticDiet)
			protected.POST("/therapeuticdiets", controller.CreateTherapeuticDiet)
			protected.PATCH("/therapeuticdiets", controller.UpdateTherapeuticDiet)
			protected.DELETE("/therapeuticdiets/:id", controller.DeleteTherapeuticDiet)

			// Sicknesses Routes
			protected.GET("/sicknesses", controller.ListSicknesses)
			protected.GET("/sickness/:id", controller.GetSickness)
			protected.POST("/sicknesses", controller.CreateSickness)
			protected.PATCH("/sicknesses", controller.UpdateSickness)
			protected.DELETE("/sicknesses/:id", controller.DeleteSickness)

			// FoodInformation Routes
			protected.GET("/food_informations", controller.ListFoodInformations)
			protected.GET("/foodinformation/:id", controller.GetFoodInformation)
			protected.POST("/food_informations", controller.CreateFoodInformation)
			protected.PATCH("/food_informations", controller.UpdateFoodInformation)
			protected.DELETE("/foodinformations/:id", controller.DeleteFoodInformation)

			// FoodSickness Routes
			protected.GET("/food_sicknesses", controller.ListFoodSicknesses)
			protected.GET("/foodsicknesses/:id", controller.GetFoodSickness)
			protected.POST("/food_sicknesses", controller.CreateFoodSickness)
			protected.PATCH("/food_sicknesses", controller.UpdateFoodSickness)
			protected.DELETE("/foodsicknesses/:id", controller.DeleteFoodSickness)

			// User Routes
			protected.GET("/users", controller.ListUsers)
			protected.GET("/user/:id", controller.GetUser)
			protected.POST("/users", controller.CreateUser)
			protected.PATCH("/users", controller.UpdateUser)
			protected.DELETE("/users/:id", controller.DeleteUser)

			// Gender Routes
			protected.GET("/genders", controller.ListGenders)
			protected.GET("/gender/:id", controller.GetGender)
			protected.POST("/genders", controller.CreateGender)
			protected.PATCH("/genders", controller.UpdateGender)
			protected.DELETE("/genders/:id", controller.DeleteGender)

			// JobDuties Routes
			protected.GET("/jobdutieses", controller.ListJobDutieses)
			protected.GET("/jobduties/:id", controller.GetJobDuties)
			protected.POST("/jobdutieses", controller.CreateJobDuties)
			protected.PATCH("/jobdutieses", controller.UpdateJobDuties)
			protected.DELETE("/jobdutieses/:id", controller.DeleteJobDuties)

			// Nametitle Routes
			protected.GET("/Nametitle", controller.ListNametitles)
			protected.GET("/Nametitle/:id", controller.GetNametitle)
			protected.POST("/Nametitle", controller.CreateNametitle)
			protected.PATCH("/Nametitle", controller.UpdateNametitle)
			protected.DELETE("/Nametitle/:id", controller.DeleteNametitle)

			// Patient Routes
			protected.GET("/patients", controller.ListPatients)
			protected.GET("/patient/:id", controller.GetPatient)
			protected.POST("/patients", controller.CreatePatient)
			protected.PATCH("/patients", controller.UpdatePatient)
			protected.DELETE("/patients/:id", controller.DeletePatient)

			// Meal Routes
			protected.GET("/meals", controller.ListMeals)
			protected.GET("/meal/:id", controller.GetMeal)
			protected.POST("/meals", controller.CreateMeal)
			protected.PATCH("/meals", controller.UpdateMeal)
			protected.DELETE("/meals/:id", controller.DeleteMeal)

			// Edible Routes
			protected.GET("/edibles", controller.ListEdibles)
			protected.GET("/edible/:id", controller.GetEdible)
			protected.POST("/edibles", controller.CreateEdible)
			protected.PATCH("/edibles", controller.UpdateEdible)
			protected.DELETE("/edibles/:id", controller.DeleteEdible)

			// Should_Eat Routes
			protected.GET("/should_Eats", controller.ListShould_Eats)
			protected.GET("/should_Eat/:id", controller.GetShould_Eat)
			protected.POST("/should_Eats", controller.CreateShould_Eat)
			protected.PATCH("/should_Eats", controller.UpdateShould_Eat)
			protected.DELETE("/should_Eats/:id", controller.DeleteShould_Eat)

			// Limit Routes
			protected.GET("/limits", controller.ListLimits)
			protected.GET("/limit/:id", controller.GetLimit)
			protected.POST("/limits", controller.CreateLimit)
			protected.PATCH("/limits", controller.UpdateLimit)
			protected.DELETE("/limits/:id", controller.DeleteLimit)

			// planning Routes
			protected.GET("/plannings", controller.ListPlannings)
			protected.GET("/planningsNoTrackingCheck", controller.ListPlanningsNoTrackingCheck)
			protected.GET("/limit/patient/:id", controller.GetLimitByPatientID)
			protected.GET("/planning/patient/:id", controller.GetPlanningByPatientID)
			protected.GET("/planning/:id", controller.GetPlanning)
			protected.POST("/plannings", controller.CreatePlanning)
			protected.PATCH("/plannings", controller.UpdatePlanning)
			protected.DELETE("/plannings/:id", controller.DeletePlanning)

			// tracking Routes
			protected.POST("/tracking", controller.CreateTrackingEV)      //
			protected.GET("/tracking", controller.ListTrackingEvaluation) //ส่งรีเควสต์เข้าไปขอข้อมูล

			// nutritionSTATUS Routes
			protected.GET("/nutritionStatus", controller.ListNutritionistStatus)
			protected.POST("/nutritionists", controller.CreateNutritionist)

			// problemeating Routes
			protected.GET("/problemeating", controller.ListProblem)
			protected.POST("/problemeating", controller.CreateProblem)

			// weightproblem Routes
			protected.GET("/weightproblem", controller.ListWeightProblem)
			protected.POST("/weightproblem", controller.CreateWeightProblem)

		}
	}

	// Authentication Routes
	r.POST("/loginUsesr", controller.LoginUser)
	r.POST("/loginNutrirton", controller.LoginNutritionist)
	r.GET("T", controller.ListUsers)

	// Run the server
	r.Run()
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
