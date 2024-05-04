import express from 'express';
import { router } from './api/routes.js';
import { router as authRouter } from './api/auth.js';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cors());

app.use('/api/stagiaires', router);

app.use('/auth', authRouter);

app.listen(port, () => {
    console.log(`Le serveur a commence sur le port ${port}`);
});