import { UsersInterface } from "./IUser";
import { GendersInterface } from "./IGender";
import {JobDutiesesInterface } from "./IJobDutieses";

export interface NutritionistsInterface {

    ID: number,
    Name: string,
    DOB: Date, //
    Tel:      string,
    Email: string,
    Password: string,

    GenderID: number,
    Gender: GendersInterface, //interface

    JobDutiesID: number,
    JobDuties: JobDutiesesInterface, ////interface

    UserID: number,//interface
    User: UsersInterface,//interface

  }