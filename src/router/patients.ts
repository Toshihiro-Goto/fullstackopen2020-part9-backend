import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';
const router = express.Router();

router.get("/", (_req, res) => {
    const patients = patientService.getPatients({ ssn: false });
    res.send(patients);
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
