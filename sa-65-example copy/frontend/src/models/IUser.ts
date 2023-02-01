import { GendersInterface } from "./IGender";
import { NutritionistsInterface } from "./INutritionist";


export interface UsersInterface {

    ID: number,
    Name: string,
    Tel:      string,
    Email: string,
    Password: string,

    GenderID: number,
    Gender: GendersInterface, //interface

    NutritionistID: number,
    Nutritionist: NutritionistsInterface,

  }