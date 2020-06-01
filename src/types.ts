export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
}

export const patientKeys = [
    "id",
    "name",
    "dateOfBirth",
    "ssn",
    "gender",
    "occupation",] as const;

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
}

export type NewPatient = Omit<Patient, "id">;

export type UnknownObject = Record<string, unknown>;
