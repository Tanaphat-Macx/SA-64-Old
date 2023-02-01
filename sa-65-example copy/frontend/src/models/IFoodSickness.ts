import { FoodsInterface } from "./IFood";
import { EatsInterface } from "./IEat";
import { SicknessesInterface } from "./ISickness";
import { FoodTypesInterface } from "./IFoodType";
import { NutritionistsInterface } from "./INutritionist";
import { TherapeuticDietsInterface } from "./ITherapeuticDiet";

export interface FoodSicknessInterface {
    ID: number,
    RecordTime: Date,

    FoodID: number,
    Food:   FoodsInterface,

    FoodTypeID: number,
    FoodType:   FoodTypesInterface,

    TherapeuticDietID: number,
    TherapeuticDiet:   TherapeuticDietsInterface,

    EatID: number,
    Eat:   EatsInterface,

    SicknessID: number,
    Sickness:   SicknessesInterface,

    NutritionistID: number,
    Nutritionist:   NutritionistsInterface,

}

//Interface คือการประกาศโครงสร้าง(structure)ให้ obj