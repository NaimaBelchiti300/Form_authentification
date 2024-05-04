import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Stagiaire } from './db.js';
import {} from 'dotenv/config';

const router = express.Router();

router.post('/signup', async (req, res) => {
    const { nom, prenom, email, telephone, username, password } = req.body;

    try {
        const existingUser = await Stagiaire.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).send({ message: "Un utilisateur avec le même email ou nom  existe deja" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const stagiaire = new Stagiaire({
            nom,
            prenom,
            email,
            telephone,
            username,
            password: hashedPassword,
        });

        const savedStagiaire = await stagiaire.save();
        res.status(201).send({ message: 'Inscription réussie' });

    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "L'inscription a échoué" });
    }
});


router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const stagiaire = await Stagiaire.findOne({ username });
        if (!stagiaire) {
            return res.status(401).send({ message: 'Authentification failed' });
        }
        const passwordMatch = await bcrypt.compare(password, stagiaire.password);
        if (!passwordMatch) {
            return res.status(401).send({ message: 'Authentification failed' });
        }
        const token = jwt.sign({ id: stagiaire._id }, process.env.JWT_SECRET);
        res.send({ token });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Authentification échouée' });
    }
});

router.get('/protected', async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.sendStatus(401);
        }
        try {
            const  decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await Stagiaire.findById(decoded.id);
            if (!user) {
                return res.sendStatus(401);
            }
            res.json({ message: 'Accès autorisé' });
        } catch (error) {
            res.sendStatus(401);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export {router};

