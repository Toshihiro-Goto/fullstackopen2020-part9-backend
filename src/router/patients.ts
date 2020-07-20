import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient } from '../utils';
const router = express.Router();

router.get("/", (_req, res) => {
    try {
        const patients = patientService.getPatients();
        res.send(patients);
    } catch (e) {
        if (e instanceof Error) res.status(400).send(e.message);
    }
});

router.get("/:id", (req, res) => {
    try {
        const id = req.params.id;
        const patient = patientService.getPatient(id);
        res.send(patient);
    } catch (e) {
        if (e instanceof Error) res.status(400).send(e.message);
    }
});

router.post("/", (req, res) => {
    try {
        const newPatient = toNewPatient(req.body);
        const addedPatient = patientService.addPatient(newPatient);
        res.send(addedPatient);
    } catch (e) {
        if (e instanceof Error) {
            res.status(400).send(e.message);
        }
    }
});

export default router;
