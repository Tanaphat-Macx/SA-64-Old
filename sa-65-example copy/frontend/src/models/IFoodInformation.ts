import { FoodsInterface } from "./IFood";
import { NutritionistsInterface } from "./INutritionist";
import { FoodTypesInterface } from "./IFoodType";

export interface FoodInformationInterface {
  ID: number,
  NutritionistID: number,
  Nutritionist: NutritionistsInterface,
  
  FoodID: number,
  Food: FoodsInterface,

  FoodTypeID: number,
  FoodType: FoodTypesInterface,

  Calorie:      number,
  Carbohydrate: number,
  Protein:      number,
  Fat:          number,
  Fiber:        number,
  Sodium:       number,
  Phosphorus:   number,
  Calcium:      number,

}