import { NewPatient, Gender, UnknownObject, Entry, entryTypes, EntryType, NewEntry, HealthCheckRating } from './types';

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
    return entryTypes.some(type => type === obj.type);
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

export const assertNever = (arg: never): never => arg;

export const toNewEntry = (obj: UnknownObject): NewEntry => {
    const newEntry = {
        type: parseType(obj.type),
        description: parseDescription(obj.description),
        date: parseDate(obj.date),
        specialist: parseSpecialist(obj.specialist),
        diagnosisCodes: parseDiagnosisCodes(obj.diagnosisCodes)
    };

    const type = newEntry.type;

    switch (type) {
        case "HealthCheck":
            return { ...newEntry, type, healthCheckRating: parseHealthCheckRating(obj.healthCheckRating) };
        case "Hospital":
            return { ...newEntry, type, discharge: parseDischarge(obj.discharge) };
        case "OccupationalHealthcare":
            return { ...newEntry, type, employerName: parseEmployerName(obj.employerName) };
        default:
            assertNever(type);
            throw new Error("The new entry's type field is wrong." + JSON.stringify(newEntry));
    }
};
const isEntryType = (arg: unknown): arg is EntryType => {
    return entryTypes.some(type => arg === type);
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

const isHealthCheckRating = (arg: unknown): arg is HealthCheckRating => {
    const healthCheckRatings = Object.values(HealthCheckRating).filter(rating => typeof rating === "number");
    return healthCheckRatings.some(rating => arg === rating);
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
    if ((!healthCheckRating && healthCheckRating !== 0) || !isHealthCheckRating(healthCheckRating)) {
        throw new Error("Incorrect or missing healthCheckRating:" + (healthCheckRating as string));
    }
    return healthCheckRating;
};

const isDischarge = (arg: unknown): arg is { date: Date; criteria: string; } => {
    if (!isUnknownObject(arg) || !arg.date || !isString(arg.date) || !isDate(arg.date) || !arg.criteria || !isString(arg.criteria)) return false;
    return true;
};
const parseDischarge = (discharge: unknown): { date: Date; criteria: string; } => {
    if (!discharge || !isDischarge(discharge)) {
        throw new Error("Incorrect or missing discharge:" + JSON.stringify(discharge));
    }
    return discharge;
};

const parseEmployerName = (employerName: unknown): string => {
    if (!employerName || !isString(employerName)) {
        throw new Error("Incorrect or missing employerName:" + (employerName as string));
    }
    return employerName;
};
