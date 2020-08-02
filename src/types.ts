export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
}

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
}

export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

interface BaseEntry {
    id: string;
    type: EntryType
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
}

export const entryTypes = ["HealthCheck", "Hospital", "OccupationalHealthcare"] as const;
export type EntryType = typeof entryTypes[number];

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck"
    healthCheckRating: HealthCheckRating;
}

interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: {
        date: Date;
        criteria: string;
    };
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
}

export type Entry =
    | HospitalEntry
    | OccupationalHealthcareEntry
    | HealthCheckEntry;

type NewObject<T> = T extends infer U ? Omit<U, "id"> : never;

export type NewEntry = NewObject<Entry>;

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatient = Omit<Patient, "id">;

export type UnknownObject = Record<string, unknown>;

export type PatientOption = Record<keyof Patient, boolean>;
