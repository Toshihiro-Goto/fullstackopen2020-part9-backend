import { NewPatient, Patient, Gender } from './types';

const toNewPatient = (patient: Patient): NewPatient => {
    return {
        name: parseName(patient.name),
        dateOfBirth: parseDateOfBirth(patient.dateOfBirth),
        ssn: parseSsn(patient.ssn),
        gender: parseGender(patient.gender),
        occupation: parseOccupation(patient.occupation),
        entries: []
    };
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error("Incorrect or missing name:" + (name as string));
    }
    return name;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDateOfBirth = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error("Incorrect or missing date:" + (date as string));
    }
    return date;
};

const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error("Incorrect or missing ssn:" + (ssn as string));
    }
    return ssn;
};

const isGender = (param: unknown): param is Gender => {
    return Object.values(Gender).includes(param as Gender);
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error("Incorrect or missing ssn:" + (gender as string));
    }
    return gender;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error("Incorrect or missing occupation:" + (occupation as string));
    }
    return occupation;
};

export { toNewPatient };
