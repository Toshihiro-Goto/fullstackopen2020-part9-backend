import express from 'express';
import diagnoseRouter from './router/diagnoses';

const app = express();

app.get("/api/ping", (_req, res) => {
    console.log('someone pinged here');
    res.send("pong");
});

app.use("/api/diagnoses", diagnoseRouter);

const PORT = 3001;

app.listen(PORT, () => { console.log(`Server running on port ${PORT}`); });
