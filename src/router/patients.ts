import express from 'express';
import patientService from '../services/patientService';
const router = express.Router();

router.get("/", (_req, res) => {
    const patients = patientService.getPatients({ ssn: false });
    res.send(patients);
});

export default router;
