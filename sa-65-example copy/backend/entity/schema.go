package entity

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Name     string
	Tel      string
	Email    string `gorm:"uniqueIndex"`
	Password string

	GenderID *uint
	Gender   Gender

	Nutritionist []Nutritionist `gorm:"foreignKey:UserID"`
}

type Gender struct {
	gorm.Model
	Type string

	Patient []Patient `gorm:"foreignKey:GenderID"`
	Users   []User    `gorm:"foreignKey:GenderID"`
}

type Nametitle struct {
	gorm.Model
	Type    string
	Patient []Patient `gorm:"foreignKey:NametitleID"`
}

type Sickness struct {
	gorm.Model
	Name string

	FoodSickness []FoodSickness `gorm:"foreignKey:SicknessID"`
}

// ตารางย่อยนิด
type Category struct {
	gorm.Model
	Name  string
	Foods []Food `gorm:"foreignKey:CategoryID"`
}

// ตารางย่อยฟ้า
type NutritionalStatus struct {
	gorm.Model
	Name               string
	TrackingEvaluation []TrackingEvaluation `gorm:"foreignKey:NutritionalStatusID"`
}

// ตารางย่อยฟ้า
type ProblemEating struct {
	gorm.Model
	Name               string
	TrackingEvaluation []TrackingEvaluation `gorm:"foreignKey:ProblemEatingID"`
}
type WeightProblem struct {
	gorm.Model
	Name               string
	TrackingEvaluation []TrackingEvaluation `gorm:"foreignKey:WeightProblemID"`
}

// ตารางย่อยพี่แม้ก+นิด
type FoodType struct {
	gorm.Model
	Name             string
	FoodSicknesses   []FoodSickness    `gorm:"foreignKey:FoodTypeID"` // เป็น FK ของตารางหลัก foodsicknesses
	FoodInformations []FoodInformation `gorm:"foreignKey:FoodTypeID"`
}

// ตารางย่อยพี่แม้ก
type TherapeuticDiet struct {
	gorm.Model
	Name         string
	FoodSickness []FoodSickness `gorm:"foreignKey:TherapeuticDietID"`
}

// ตารางย่อยพี่แม้ก
type Eat struct {
	gorm.Model
	Name         string
	FoodSickness []FoodSickness `gorm:"foreignKey:EatID"`
}

// ตารางย่อยพี่แม้ก+นิด
type Food struct {
	gorm.Model
	Name string

	CategoryID *uint
	Category   Category

	FoodSicknesses   []FoodSickness    `gorm:"foreignKey:FoodID"`
	FoodInformations []FoodInformation `gorm:"foreignKey:FoodID"`
	Planning         []Planning        `gorm:"foreignKey:FoodID"`
}

// ตารางย่อยเปรี้ยว
type Edible struct {
	gorm.Model
	Name  string
	Limit []Limit `gorm:"foreignKey:EdibleID"`
}

// ตารางย่อยเปรี้ยว
type Should_Eat struct {
	gorm.Model
	Name  string
	Limit []Limit `gorm:"foreignKey:Should_EatID"`
}

// ตารางย่อยมะปราง+น้อง

type Meal struct {
	gorm.Model
	Name     string
	Planning []Planning `gorm:"foreignKey:MealID"`
}

type JobDuties struct {
	gorm.Model
	Name         string
	Nutritionist []Nutritionist `gorm:"foreignKey:JobDutiesID"`
}

type PatientSickness struct {
	gorm.Model

	PatientID uint
	Patient   Patient `gorm:"references: id"`

	SicknessID uint
	Sickness   Sickness `gorm:"references: id"`
}

// ------ระบบย่อย ระบบบันทึกข้อมูลอาหาร
type FoodSickness struct {
	gorm.Model
	RecordTime time.Time

	FoodID *uint
	Food   Food

	FoodTypeID *uint
	FoodType   FoodType

	TherapeuticDietID *uint
	TherapeuticDiet   TherapeuticDiet

	EatID *uint
	Eat   Eat

	SicknessID *uint
	Sickness   Sickness

	NutritionistID *uint
	Nutritionist   Nutritionist
}

// ------ระบบย่อย ระบบติดตามและประเมินการบริโภคอาหารของผู้ป่วย
type TrackingEvaluation struct {
	gorm.Model
	Date time.Time
	Note string

	ProblemEatingID *uint
	ProblemEating   ProblemEating `gorm:"references:ID"`

	WeightProblemID *uint
	WeightProblem   WeightProblem `gorm:"references:ID"`

	NutritionistID *uint
	Nutritionist   Nutritionist `gorm:"references:ID"`

	NutritionalStatusID *uint
	NutritionalStatus   NutritionalStatus `gorm:"references:ID"`

	PlanningID *uint
	Planning   Planning `gorm:"references:ID"`
}

// ------ระบบย่อย ระบบบันทึกข้อจำกัดการบริโภคอาหารของผู้ป่วย
type Limit struct {
	gorm.Model
	Limit_details string

	Date time.Time

	NutritionistID *uint
	Nutritionist   Nutritionist

	PatientID *uint
	Patient   Patient

	EdibleID *uint
	Edible   Edible

	Should_EatID *uint
	Should_Eat   Should_Eat

	Planning []Planning `gorm:"foreignKey:LimitID"`
}

// ------ระบบย่อย ระบบบันทึกสารอาหาร
type FoodInformation struct {
	gorm.Model
	NutritionistID *uint
	Nutritionist   Nutritionist

	FoodID *uint
	Food   Food

	FoodTypeID *uint
	FoodType   FoodType

	Calorie      float32
	Carbohydrate float32
	Protein      float32
	Fat          float32
	Fiber        float32
	Sodium       float32
	Phosphorus   float32
	Calcium      float32
}

// ------ระบบย่อย ระบบบันทึกข้อมูลผู้ป่วย
type Patient struct {
	gorm.Model
	Idcard string `gorm:"uniqueIndex"`

	NametitleID *uint
	Nametitle   Nametitle `gorm:"references:id;"`

	Name string
	Age  int
	Bday time.Time

	GenderID *uint
	Gender   Gender `gorm:"references:id;"`

	Allergy  string
	Sickness string //ตรงที่เพิ่ม
	Datetime time.Time

	UserID *uint
	User   User `gorm:"references:id;"`

	Limit []Limit `gorm:"foreignKey:PatientID"`
}

// ------ระบบย่อย ระบบวางแผนรายการอาหาร
type Planning struct {
	gorm.Model
	PnDate        time.Time
	TrackingCheck bool

	NutritionistID *uint
	Nutritionist   Nutritionist

	LimitID *uint
	Limit   Limit

	FoodID *uint
	Food   Food

	MealID *uint
	Meal   Meal

	TrackingEvaluation []TrackingEvaluation `gorm:"foreignKey:PlanningID"`
}

// ------ระบบย่อย ระบบบันทึกข้อมูลนักโภชนาการ
type Nutritionist struct {
	gorm.Model
	Name     string
	DOB      time.Time
	Tel      string
	Email    string `gorm:"uniqueIndex"`
	Password string

	GenderID *uint
	Gender   Gender

	JobDutiesID *uint
	JobDuties   JobDuties

	UserID *uint
	User   User

	FoodSickness       []FoodSickness       `gorm:"foreignKey:NutritionistID"`
	TrackingEvaluation []TrackingEvaluation `gorm:"foreignKey:NutritionistID"`
	Limit              []Limit              `gorm:"foreignKey:NutritionistID"`
	FoodInformation    []FoodInformation    `gorm:"foreignKey:NutritionistID"`
	//Patient            []Patient            `gorm:"foreignKey:NutritionistID"`
	Planning []Planning `gorm:"foreignKey:NutritionistID"`
}
