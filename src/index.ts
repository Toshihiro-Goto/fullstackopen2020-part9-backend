import express from 'express';
import diagnoseRouter from './router/diagnoses';
import patientsRouter from './router/patients';
import cors from 'cors';

const app = express();

app.use(cors());

app.get("/api/ping", (_req, res) => {
    console.log('someone pinged here');
    res.send("pong");
});

app.use("/api/diagnoses", diagnoseRouter);
app.use("/api/patients", patientsRouter);

const PORT = 3001;

app.listen(PORT, () => { console.log(`Server running on port ${PORT}`); });
