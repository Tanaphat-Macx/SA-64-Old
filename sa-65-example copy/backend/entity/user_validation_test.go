package entity

import (
	"testing"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

// ตรวจสอบค่าว่างของชื่อแล้วต้องเจอ Error
func TestUserNameNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	nutritionists := Nutritionist{
		Name:      "",
		Email:     "Nutritionist",
		//Password:  string(password2),
		//DOB:       time.Date(2022, 2, 15, 1, 30, 0, 0, time.UTC),
		//Tel:       "091-5256587",
		//Gender:    male,
		//JobDuties: jobduties1,
		//User:      maprang,
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(nutritionists)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Name cannot be blank"))
}

func TestEmailMustBeValid(t *testing.T) {
	g := NewGomegaWithT(t)

	user := User{
		Name:     "Abc",
		Email:    "qwe#123", // ผิด
		Password: "111",
		
	}

	ok, err := govalidator.ValidateStruct(user)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Email: qwe#123 does not validate as email"))
}