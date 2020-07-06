import patients from "../../data/patients";
import { Patient, NewPatient, PatientOption } from "../types";

const isKeyOfPatient = (key: unknown): key is keyof Patient => {
    const patientKeys: Array<keyof Patient> = ["id", "name", "dateOfBirth", "ssn", "gender", "occupation", "entries"];
    return patientKeys.some(patientKey => key === patientKey);
};

const buildFullOption = (options: Partial<PatientOption>): PatientOption => {
    return {
        id: true,
        name: true,
        dateOfBirth: true,
        ssn: true,
        gender: true,
        occupation: true,
        entries: true,
        ...options
    };
};

const filterRequiredProps = (patient: Patient, optionPairs: [string, boolean][]): Partial<Patient> => {
    return optionPairs.reduce((required, [key, isRequired]) =>
        (isRequired && isKeyOfPatient(key)) ?
            { ...required, [key]: patient[key] } :
            required
        , {});
};

function getPatient(id: string): Patient;
function getPatient(id: string, options: Partial<PatientOption>): Partial<Patient>;
function getPatient(id: string, options?: Partial<PatientOption>): unknown {
    const patient = patients.find((patient) => patient.id === id);
    if (patient == null) throw new Error("The patient not found.");

    if (options == null) return patient;
    const fullOptions = buildFullOption(options);
    const optionPairs = Object.entries(fullOptions);

    return filterRequiredProps(patient, optionPairs);
}

const getPatients = (options: Partial<PatientOption> = {}): Partial<Patient>[] => {
    if (options === {}) return patients;
    const fullOptions = buildFullOption(options);
    const optionPairs = Object.entries(fullOptions);

    return patients.map(patient =>
        filterRequiredProps(patient, optionPairs)
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

export default { getPatients, addPatient, getPatient };
