import { EdiblesInterface } from "./IEdible";
import { NutritionistsInterface } from "./INutritionist";
import { Should_EatsInterface } from "./IShould_Eat";
import { PatientsInterface } from "./IPatient";

export interface LimitInterface {
    Nutritionist: any;
    ID: number,
    Limit_details: string
    NutritionistID: number,
    Nutritionaist: NutritionistsInterface,
    PatientID: number,
    Patient: PatientsInterface,
    Should_EatID: number,
    Should_Eat: Should_EatsInterface
    EdibleID: number,
    Edible: EdiblesInterface,
}