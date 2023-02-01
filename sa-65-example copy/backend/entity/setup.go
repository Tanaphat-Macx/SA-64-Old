package entity

import (
	"time"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func SetupDatabase() {
	database, err := gorm.Open(sqlite.Open("sa-65.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the schema
	database.AutoMigrate(
		&User{},
		&Gender{},
		&Nametitle{},
		&Sickness{},
		&Patient{},
		&Category{},
		&NutritionalStatus{},
		&FoodType{},
		&TherapeuticDiet{},
		&Eat{},
		&Food{},
		&Edible{},
		&Should_Eat{},
		&Meal{},
		&JobDuties{},
		&FoodSickness{},
		&TrackingEvaluation{},
		&Limit{},
		&FoodInformation{},
		&PatientSickness{},
		&Planning{},
		&Nutritionist{},
	)

	db = database

	//------ Gender Data
	female := Gender{
		Type: "หญิง",
	}
	db.Model(&Gender{}).Create(&female)

	male := Gender{
		Type: "ชาย",
	}
	db.Model(&Gender{}).Create(&male)

	//------ JobDuties Data
	jobduties1 := JobDuties{
		Name: "บันทึกข้อมูลอาหาร",
	}
	db.Model(&JobDuties{}).Create(&jobduties1)

	jobduties2 := JobDuties{
		Name: "บันทึกสารอาหาร",
	}
	db.Model(&JobDuties{}).Create(&jobduties2)

	jobduties3 := JobDuties{
		Name: "บันทึกข้อจำกัดการบริโภคอาหาร",
	}
	db.Model(&JobDuties{}).Create(&jobduties3)

	jobduties4 := JobDuties{
		Name: "บันทึกข้อจำกัดการบริโภคอาหาร",
	}
	db.Model(&JobDuties{}).Create(&jobduties4)

	jobduties5 := JobDuties{
		Name: "ติดตามและประเมินการบริโภคอาหาร",
	}
	db.Model(&JobDuties{}).Create(&jobduties5)

	password, err := bcrypt.GenerateFromPassword([]byte("123456"), 14)

	db.Model(&User{}).Create(&User{
		Name:     "มะปราง แสงอรุณ",
		Tel:      "091-2345678",
		Email:    "maprang@gmail.com",
		Password: string(password),
		Gender:   female,
	})

	db.Model(&User{}).Create(&User{
		Name:     "นันท์นภัส มนุษย์ชาติ",
		Tel:      "091-2345678",
		Email:    "nannaphat@gmail.com",
		Password: string(password),
		Gender:   female,
	})
	password1, err := bcrypt.GenerateFromPassword([]byte("User"), 14)
	password2, err := bcrypt.GenerateFromPassword([]byte("Nutritionist"), 14)
	db.Model(&User{}).Create(&User{
		Name:     "User",
		Tel:      "091-2345678",
		Email:    "User",
		Password: string(password1),
		Gender:   female,
	})
	var maprang User
	var nannaphat User
	db.Raw("SELECT * FROM users WHERE email = ?", "maprang@gmail.com").Scan(&maprang)
	db.Raw("SELECT * FROM users WHERE email = ?", "nannaphat@gmail.com").Scan(&nannaphat)

	// Nutritionist Data
	db.Model(&Nutritionist{}).Create(&Nutritionist{
		Name:      "ธนพัฒน์ ฉิมกูล",
		Email:     "thanaphat@gmail.com",
		Password:  string(password),
		DOB:       time.Date(2022, 2, 15, 1, 30, 0, 0, time.UTC),
		Tel:       "091-5256587",
		Gender:    male,
		JobDuties: jobduties1,
		User:      maprang,
	})
	db.Model(&Nutritionist{}).Create(&Nutritionist{
		Name:      "Nutritionist",
		Email:     "Nutritionist",
		Password:  string(password2),
		DOB:       time.Date(2022, 2, 15, 1, 30, 0, 0, time.UTC),
		Tel:       "091-5256587",
		Gender:    male,
		JobDuties: jobduties1,
		User:      maprang,
	})

	db.Model(&Nutritionist{}).Create(&Nutritionist{
		Name:      "ชนาพร อัปมานะ",
		Email:     "chanaporn@gmail.com",
		Password:  string(password),
		DOB:       time.Date(2022, 2, 15, 1, 30, 0, 0, time.UTC),
		Tel:       "091-5256587",
		Gender:    female,
		JobDuties: jobduties2,
		User:      maprang,
	})

	db.Model(&Nutritionist{}).Create(&Nutritionist{
		Name:      "ธารภิรมย์ โลนุช",
		Email:     "thanphirom@gmail.com",
		Password:  string(password),
		DOB:       time.Date(2022, 2, 15, 1, 30, 0, 0, time.UTC),
		Tel:       "091-5256587",
		Gender:    female,
		JobDuties: jobduties3,
		User:      maprang,
	})

	db.Model(&Nutritionist{}).Create(&Nutritionist{
		Name:      "ศิริวิภา สุระมณี",
		Email:     "sirivipa@gmail.com",
		Password:  string(password),
		DOB:       time.Date(2022, 2, 15, 1, 30, 0, 0, time.UTC),
		Tel:       "091-5256587",
		Gender:    female,
		JobDuties: jobduties5,
		User:      maprang,
	})

	db.Model(&Nutritionist{}).Create(&Nutritionist{
		Name:      "ณัฏฐณิชา ตั้งวุฒิธร",
		Email:     "nuttanicha@gmail.com",
		Password:  string(password),
		DOB:       time.Date(2022, 2, 15, 1, 30, 0, 0, time.UTC),
		Tel:       "091-5256587",
		Gender:    female,
		JobDuties: jobduties5,
		User:      maprang,
	})

	var thanaphat Nutritionist
	var chanaporn Nutritionist
	var thanphirom Nutritionist
	var sirivipa Nutritionist
	var nuttanicha Nutritionist

	db.Raw("SELECT * FROM nutritionists WHERE email = ?", "thanaphat@gmail.com").Scan(&thanaphat)
	db.Raw("SELECT * FROM nutritionists WHERE email = ?", "chanaporn@gmail.com").Scan(&chanaporn)
	db.Raw("SELECT * FROM nutritionists WHERE email = ?", "thanphirom@gmail.com").Scan(&thanphirom)
	db.Raw("SELECT * FROM nutritionists WHERE email = ?", "sirivipa@gmail.com").Scan(&sirivipa)
	db.Raw("SELECT * FROM nutritionists WHERE email = ?", "nuttanicha@gmail.com").Scan(&nuttanicha)

	//------ Nametitle Data
	miss := Nametitle{
		Type: "นางสาว",
	}
	db.Model(&Nametitle{}).Create(&miss)

	mr := Nametitle{
		Type: "นาย",
	}
	db.Model(&Nametitle{}).Create(&mr)

	mrs := Nametitle{
		Type: "นาง",
	}
	db.Model(&Nametitle{}).Create(&mrs)

	master := Nametitle{
		Type: "เด็กชาย",
	}
	db.Model(&Nametitle{}).Create(&master)

	misses := Nametitle{
		Type: "เด็กหญิง",
	}
	db.Model(&Nametitle{}).Create(&misses)

	//------ Sickness Data
	sickness1 := Sickness{
		Name: "โรคเก๊า"}
	db.Model(&Sickness{}).Create(&sickness1)

	sickness2 := Sickness{
		Name: "โรคตับแข็ง"}
	db.Model(&Sickness{}).Create(&sickness2)

	sickness3 := Sickness{
		Name: "โรคขาดสารอาหาร"}
	db.Model(&Sickness{}).Create(&sickness3)

	sickness4 := Sickness{
		Name: "โรคไต"}
	db.Model(&Sickness{}).Create(&sickness4)

	sickness5 := Sickness{
		Name: "โรคเบาหวาน"}
	db.Model(&Sickness{}).Create(&sickness5)

	sickness6 := Sickness{
		Name: "โรคความดันโลหิตสูง"}
	db.Model(&Sickness{}).Create(&sickness6)

	//------ Patient Data
	patient1 := Patient{
		Idcard:    "9876543210123",
		Nametitle: mr,
		Name:      "มนตรี ใจสุข",
		Sickness:  "-",
		Age:       25,
		Bday:      time.Now().AddDate(-22, -9, -3),
		Gender:    male,
		Allergy:   "ถั่ว, กุ้ง",
		Datetime:  time.Now(),
		User:      maprang,
	}
	db.Model(&Patient{}).Create(&patient1)

	patient2 := Patient{
		Idcard:    "1234567890129",
		Nametitle: miss,
		Name:      "มุมานะ สุขใจ",
		Sickness:  "-",
		Age:       22,
		Bday:      time.Now().AddDate(-22, -9, -3),
		Gender:    female,
		Allergy:   "นม,ไข่",
		Datetime:  time.Now(),
		User:      maprang,
	}
	db.Model(&Patient{}).Create(&patient2)

	patient3 := Patient{
		Idcard:    "7692548165821",
		Nametitle: mr,
		Name:      "อดออม รวยแน่",
		Age:       32,
		Bday:      time.Now().AddDate(-22, -9, -3),
		Gender:    male,
		Sickness:  "-",
		Allergy:   "ถั่วเหลือง,เนย",
		Datetime:  time.Now(),
		User:      maprang,
	}
	db.Model(&Patient{}).Create(&patient3)

	//----------Category Data----------
	meat := Category{
		Name: "อาหารคาว"}
	db.Model(&Category{}).Create(&meat)

	sweet := Category{
		Name: "อาหารหวาน"}
	db.Model(&Category{}).Create(&sweet)

	//----------NutritionalStatus Data----------
	db.Create(&NutritionalStatus{
		Name: "มีภาวะโภชนาการปกติ"},
	)

	db.Create(&NutritionalStatus{
		Name: "มีความเสี่ยงต่อภาวะทุโภชนาการ"},
	)

	db.Create(&NutritionalStatus{
		Name: "มีภาวะทุโภชนาการต่ำ"},
	)

	db.Create(&NutritionalStatus{
		Name: "มีภาวะทุโภชนาการเกิน"},
	)

	//----------ProblemEating Data----------
	db.Create(&ProblemEating{
		Name: "ความอยากอาหารน้อยลงอย่างมาก"},
	)

	db.Create(&ProblemEating{
		Name: "ความอยากอาหารน้อยลงปานกลาง"},
	)

	db.Create(&ProblemEating{
		Name: "ความอยากอาหารปกติ"},
	)

	//----------WeightProblem Data----------
	db.Create(&WeightProblem{
		Name: "น้ำหนักลดมากกว่า 4 กิโลกรัม"},
	)

	db.Create(&WeightProblem{
		Name: "น้ำหนักลดมากกว่า 1-3 กิโลกรัม"},
	)

	db.Create(&WeightProblem{
		Name: "น้ำหนักปกติ(เท่าเดิม)"},
	)

	// ---------Foodtype Data----------
	foodtype1 := FoodType{
		Name: "อาหารธรรมดา"}
	db.Model(&FoodType{}).Create(&foodtype1)

	foodtype2 := FoodType{
		Name: "อาหารอ่อน"}
	db.Model(&FoodType{}).Create(&foodtype2)

	foodtype3 := FoodType{
		Name: "อาหารเหลว"}
	db.Model(&FoodType{}).Create(&foodtype3)

	foodtype4 := FoodType{
		Name: "อาหารทางสายยาง"}
	db.Model(&FoodType{}).Create(&foodtype4)

	foodtype5 := FoodType{
		Name: "อาหารอื่นๆตามแพทย์สั่ง"}
	db.Model(&FoodType{}).Create(&foodtype5)

	//-----Therapeutic Diet  Data
	therapeuticdiet1 := TherapeuticDiet{
		Name: "โซเดียมต่ำ"}
	db.Model(&TherapeuticDiet{}).Create(&therapeuticdiet1)

	therapeuticdiet2 := TherapeuticDiet{
		Name: "อาหารโรคเก๊า"}
	db.Model(&TherapeuticDiet{}).Create(&therapeuticdiet2)

	therapeuticdiet3 := TherapeuticDiet{
		Name: "อาหารลดไขมัน"}
	db.Model(&TherapeuticDiet{}).Create(&therapeuticdiet3)

	//-----Eat Data
	eat1 := Eat{
		Name: "ปกติ"}
	db.Model(&Eat{}).Create(&eat1)

	eat2 := Eat{
		Name: "ปัญหาภาวะการกลืนลำบาก"}
	db.Model(&Eat{}).Create(&eat2)

	eat3 := Eat{
		Name: "ทางสายให้อาหาร"}
	db.Model(&Eat{}).Create(&eat3)

	// ---------Food data----------
	food1 := Food{
		Name:     "น้ำใบเตย",
		Category: sweet}
	db.Model(&Food{}).Create(&food1)

	food2 := Food{
		Name:     "น้ำวุ้นเก๊กฮวย",
		Category: sweet}
	db.Model(&Food{}).Create(&food2)

	food3 := Food{
		Name:     "ข้าวไก่ผัดพริกไทยดำ",
		Category: meat}
	db.Model(&Food{}).Create(&food3)

	food4 := Food{
		Name:     "ข้าวไก่เทอริยากิ",
		Category: meat}
	db.Model(&Food{}).Create(&food4)

	food5 := Food{
		Name:     "แซนวิชโฮลวีททูน่า",
		Category: meat}
	db.Model(&Food{}).Create(&food5)

	food6 := Food{
		Name:     "ข้าวผัดห่อไข่",
		Category: meat}
	db.Model(&Food{}).Create(&food6)

	food7 := Food{
		Name:     "ขนมชั้น",
		Category: sweet}
	db.Model(&Food{}).Create(&food7)

	food8 := Food{
		Name:     "ข้าวราดผัดผักรวมมิตร",
		Category: meat}
	db.Model(&Food{}).Create(&food8)

	food9 := Food{
		Name:     "ส้มเขียวหวาน",
		Category: sweet}
	db.Model(&Food{}).Create(&food9)

	food10 := Food{
		Name:     "ข้าวราดยำอกไก่",
		Category: meat}
	db.Model(&Food{}).Create(&food10)

	food11 := Food{
		Name:     "น้ำกระเจี๊ยบพุทราจีน",
		Category: sweet}
	db.Model(&Food{}).Create(&food11)

	food12 := Food{
		Name:     "ขนมเปียกปูน",
		Category: sweet}
	db.Model(&Food{}).Create(&food12)

	food13 := Food{
		Name:     "โจ๊กปั่น",
		Category: meat}
	db.Model(&Food{}).Create(&food13)

	food14 := Food{
		Name:     "ข้าวผัด",
		Category: meat}
	db.Model(&Food{}).Create(&food14)

	food15 := Food{
		Name:     "ผัดบล็อคโคลี่",
		Category: meat}
	db.Model(&Food{}).Create(&food15)

	food16 := Food{
		Name:     "ข้าวต้มหมูสับ",
		Category: meat}
	db.Model(&Food{}).Create(&food16)

	// ---------Edible Data----------
	edible1 := Edible{
		Name: "อาหารมังสวิรัติ"}
	db.Model(&Edible{}).Create(&edible1)

	edible2 := Edible{
		Name: "อาหารเจ"}
	db.Model(&Edible{}).Create(&edible2)

	edible3 := Edible{
		Name: "อาหารปกติทั่วไป"}
	db.Model(&Edible{}).Create(&edible3)

	edible4 := Edible{
		Name: "อาหารอิสลาม"}
	db.Model(&Edible{}).Create(&edible4)

	// -------Should_eat Data--------
	should_eat1 := Should_Eat{
		Name: "อาหารธรรมดาย่อยง่าย"}
	db.Model(&Should_Eat{}).Create(&should_eat1)

	should_eat2 := Should_Eat{
		Name: "อาหารธรรมดา"}
	db.Model(&Should_Eat{}).Create(&should_eat2)

	should_eat3 := Should_Eat{
		Name: "อาหารอ่อน"}
	db.Model(&Should_Eat{}).Create(&should_eat3)

	should_eat4 := Should_Eat{
		Name: "อาหารเหลวใส"}
	db.Model(&Should_Eat{}).Create(&should_eat4)

	should_eat5 := Should_Eat{
		Name: "อาหารเหลวข้น"}
	db.Model(&Should_Eat{}).Create(&should_eat5)

	should_eat6 := Should_Eat{
		Name: "อาหารธรรมดาลดโซเดียม"}
	db.Model(&Should_Eat{}).Create(&should_eat6)

	should_eat7 := Should_Eat{
		Name: "อาหารอ่อนลดโซเดียม"}
	db.Model(&Should_Eat{}).Create(&should_eat7)

	should_eat8 := Should_Eat{
		Name: "อาหารธรรมดาเบาหวาน"}
	db.Model(&Should_Eat{}).Create(&should_eat8)

	should_eat9 := Should_Eat{
		Name: "อาหารอ่อนเบาหวาน"}
	db.Model(&Should_Eat{}).Create(&should_eat9)

	should_eat10 := Should_Eat{
		Name: "อาหารธรรมดาจำกัดโซเดียมเบาหวาน"}
	db.Model(&Should_Eat{}).Create(&should_eat10)

	should_eat11 := Should_Eat{
		Name: "อาหารอ่อนจำกัดโซเดียมเบาหวาน"}
	db.Model(&Should_Eat{}).Create(&should_eat11)

	should_eat12 := Should_Eat{
		Name: "งดอาหาร"}
	db.Model(&Should_Eat{}).Create(&should_eat12)

	//------ Meal Data
	meal1 := Meal{
		Name: "เช้า"}
	db.Model(&Meal{}).Create(&meal1)

	meal2 := Meal{
		Name: "กลางวัน"}
	db.Model(&Meal{}).Create(&meal2)

	meal3 := Meal{
		Name: "เย็น"}
	db.Model(&Meal{}).Create(&meal3)

	// ---------FoodSickness 1 ระบบย่อย ระบบบันทึกข้อมูลอาหาร ----------
	db.Model(&FoodSickness{}).Create(&FoodSickness{
		Nutritionist:    thanaphat,
		Food:            food13,
		FoodType:        foodtype3,
		TherapeuticDiet: therapeuticdiet1,
		Eat:             eat3,
		Sickness:        sickness1,
	})

	// ------ Limit ระบบย่อย ระบบบันทึกข้อจำกัดการบริโภคอาหารของผู้ป่วย
	// LIMIT--1
	limit1 := Limit{
		Nutritionist:  thanphirom,
		Patient:       patient1,
		Edible:        edible1,
		Should_Eat:    should_eat1,
		Limit_details: "เน้นอาหารรสจัด",
	}
	db.Model(&Limit{}).Create(&limit1)

	// LIMIT--2
	limit2 := Limit{
		Nutritionist:  thanphirom,
		Patient:       patient2,
		Edible:        edible2,
		Should_Eat:    should_eat2,
		Limit_details: "เน้นไฟเบอร์สูง",
	}
	db.Model(&Limit{}).Create(&limit2)

	// FoodInformation ระบบบันทึกสารอาหาร
	// ---------foodinformation 1 ----------
	db.Model(&FoodInformation{}).Create(&FoodInformation{
		Nutritionist: thanaphat,
		Food:         food1,
		FoodType:     foodtype1,
		Calorie:      88.83,
		Carbohydrate: 16.49,
		Protein:      14,
		Fat:          4,
		Fiber:        0,
		Sodium:       0,
		Phosphorus:   33.83,
		Calcium:      10.8,
	})

	// ---------foodinformation 2 ----------
	db.Model(&FoodInformation{}).Create(&FoodInformation{
		Nutritionist: chanaporn,
		Food:         food2,
		FoodType:     foodtype3,
		Calorie:      159.3,
		Carbohydrate: 2.95,
		Protein:      0.11,
		Fat:          0.06,
		Fiber:        1.4,
		Sodium:       0,
		Phosphorus:   1.93,
		Calcium:      1.74,
	})

	//------ระบบย่อย ระบบวางแผนรายการอาหาร
	db.Model(&Planning{}).Create(&Planning{
		PnDate: time.Now(),

		Nutritionist: nuttanicha,
		Limit:        limit1,
		Food:         food15,
		Meal:         meal1,
	})
	db.Model(&Planning{}).Create(&Planning{
		PnDate:       time.Now(),
		Nutritionist: nuttanicha,

		Limit: limit1,
		Food:  food7,
		Meal:  meal2,
	})
	db.Model(&Planning{}).Create(&Planning{
		PnDate:       time.Now(),
		Nutritionist: nuttanicha,

		Limit: limit1,
		Food:  food14,
		Meal:  meal3,
	})
	db.Model(&Planning{}).Create(&Planning{
		PnDate:       time.Now(),
		Nutritionist: nuttanicha,

		Limit: limit2,
		Food:  food5,
		Meal:  meal1,
	})
	db.Model(&Planning{}).Create(&Planning{
		PnDate:       time.Now(),
		Nutritionist: nuttanicha,

		Limit: limit2,
		Food:  food9,
		Meal:  meal2,
	})
	db.Model(&Planning{}).Create(&Planning{
		PnDate:       time.Now(),
		Nutritionist: nuttanicha,
		Limit:        limit2,

		Food: food10,
		Meal: meal3,
	})

}
