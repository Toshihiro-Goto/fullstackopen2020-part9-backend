import { NewPatient, Gender, UnknownObject, Entry, EntryType } from './types';

export const toNewPatient = (obj: UnknownObject): NewPatient => {
    return {
        name: parseName(obj.name),
        dateOfBirth: parseDateOfBirth(obj.dateOfBirth),
        ssn: parseSsn(obj.ssn),
        gender: parseGender(obj.gender),
        occupation: parseOccupation(obj.occupation),
        entries: parseEntries(obj.entries)
    };
};

export const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error("Incorrect or missing name:" + (name as string));
    }
    return name;
};

export const isDate = (date: string): boolean => {
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

export const isGender = (param: unknown): param is Gender => {
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

export const isUnknownObject = (obj: unknown): obj is UnknownObject => {
    return typeof obj === 'object' && obj !== null;
};

export const isEntry = (obj: unknown): obj is Entry => {
    if (!obj || !isUnknownObject(obj)) return false;
    return Object.values(EntryType).some(type => type === obj.type);
};

export const isEntries = (array: unknown[]): array is Entry[] => {
    return array.every(entry => isEntry(entry));
};

const parseEntries = (entries: unknown): Entry[] => {
    if (!entries || !Array.isArray(entries) || !isEntries(entries)) {
        throw new Error("Incorrect or missing entries:" + (entries as string));
    }
    return entries;
};
