import {PatientsInterface} from "./IPatient"
import {MealInterface} from "./IMeal"
import {FoodsInterface} from "./IFood"
import { LimitInterface } from "./ILimit"
export interface PlanningInterface {

	ID: number,

	

	MealID: number,
	Meal: MealInterface,

	FoodID: number,
	Food: FoodsInterface,

	LimitID: number,
	Limit: LimitInterface,



	
   
	
   }