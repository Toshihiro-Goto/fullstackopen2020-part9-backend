import patients from "../../data/patients";
import { Patient, patientKeys, NewPatient } from "../types";

const isKeyOfPatient = (key: string): key is keyof Patient => {
    return patientKeys.some(patientKey => key === patientKey);
};

const getPatients = (options: Partial<Record<keyof Patient, boolean>> = {}): Partial<Patient>[] => {
    if (options === {}) return patients;

    options = {
        id: true,
        name: true,
        dateOfBirth: true,
        ssn: true,
        gender: true,
        occupation: true,
        ...options
    };

    const optionPairs = Object.entries(options);

    return patients.map(patient =>
        optionPairs.reduce((required, [key, isRequired]) =>
            (!isRequired || !isKeyOfPatient(key)) ?
                required :
                { ...required, [key]: patient[key] }
            , {})
    );
};

const getRandomInt = (max: number) =>
    Math.floor(Math.random() * Math.floor(max));

const addPatient = (patient: NewPatient): Patient => {
    const newPatient = {
        id: getRandomInt((10 ** 36)).toString(),
        ...patient
    };

    patients.push(newPatient);
    return newPatient;
};

export default { getPatients, addPatient };
