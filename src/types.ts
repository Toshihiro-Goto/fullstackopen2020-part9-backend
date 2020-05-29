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

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
}