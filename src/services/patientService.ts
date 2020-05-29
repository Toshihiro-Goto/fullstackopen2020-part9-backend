import patients from "../../data/patients";
import { Patient, patientKeys } from "../types";

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

export default { getPatients };
