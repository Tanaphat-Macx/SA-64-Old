import { NametitleInterface } from "./INametitle";
import { GendersInterface } from "./IGender";
import { UsersInterface } from "./IUser";

export interface PatientsInterface{
    ID: number,
    Idcard: string,
    NametitleID: number,
    Nametitle: NametitleInterface,
    Name: string,
    Age: number,
    Bday: Date,
    GenderID: number,
    Gender: GendersInterface,
    Allergy: string,
    Sickness: string,
    Datetime: Date,
    UserID: number,
    User: UsersInterface,
}