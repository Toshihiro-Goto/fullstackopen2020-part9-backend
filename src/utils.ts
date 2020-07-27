import { NewPatient, Gender, UnknownObject, Entry, EntryType, NewEntry } from './types';

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

export const isEntryArray = (arg: unknown): arg is Entry[] => {
    if (!Array.isArray(arg)) return false;
    return arg.every(value => isEntry(value));
};

const parseEntries = (entries: unknown): Entry[] => {
    if (!entries || !isEntryArray(entries)) {
        throw new Error("Incorrect or missing entries:" + (entries as string));
    }
    return entries;
};

export const toNewEntry = (obj: UnknownObject): NewEntry => {
    return {
        type: parseType(obj.type),
        description: parseDescription(obj.description),
        date: parseDate(obj.date),
        specialist: parseSpecialist(obj.specialist),
        diagnosisCodes: parseDiagnosisCodes(obj.diagnosisCodes)
    };
};

const isEntryType = (arg: unknown): arg is EntryType => {
    return Object.values(EntryType)
        .filter(x => typeof x === "string")
        .some(type => arg === type);
};

const parseType = (type: unknown): EntryType => {
    if (!type || !isEntryType(type)) {
        throw new Error("Incorrect or missing type:" + (type as string));
    }
    return type;
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error("Incorrect or missing date:" + (date as string));
    }
    return date;
};

const parseDescription = (description: unknown): string => {
    if (!description || !isString(description)) {
        throw new Error("Incorrect or missing description:" + (description as string));
    }
    return description;
};

const parseSpecialist = (specialist: unknown): string => {
    if (!specialist || !isString(specialist)) {
        throw new Error("Incorrect or missing specialist:" + (specialist as string));
    }
    return specialist;
};

const isStringArray = (arg: unknown): arg is string[] => {
    if (!Array.isArray(arg)) return false;
    return arg.every(value => isString(value));
};

const parseDiagnosisCodes = (diagnosisCodes: unknown): string[] | undefined => {
    if (!diagnosisCodes || !isStringArray(diagnosisCodes)) {
        throw new Error("Incorrect or missing diagnosisCodes:" + (diagnosisCodes as string));
    }
    return diagnosisCodes;
};
