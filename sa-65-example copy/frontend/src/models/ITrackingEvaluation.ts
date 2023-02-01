import {NutritionistsInterface} from "./INutritionist"
import {NutritionStatusInterface} from "./INutritionalStatus"
import {PlanningInterface} from "./IPlanning"
import {ProblemEatingInterface} from "./IProblemEating"
import {WeightProblemInterface} from "./Iweightproblem"

export interface TrackingEvaluationInterface {

    Id: number
	Date:    Date
    Note: String

    NutritionistID: number
	Nutritionist:   NutritionistsInterface

    NutritionalStatusID: number
	NutritionalStatus:   NutritionStatusInterface

    ProblemEatingID: number
	ProblemEating:   ProblemEatingInterface

    WeightProblemID: number
	WeightProblem:   WeightProblemInterface


    PlanningID: number
	Planning:   PlanningInterface
   
   }