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

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[]
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatient = Omit<Patient, "id">;

export type UnknownObject = Record<string, unknown>;

export type PatientOption = Record<keyof Patient, boolean>;
