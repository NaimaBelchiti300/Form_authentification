import express from 'express';
import { Stagiaire } from './db.js';

export const router = express. Router();

router.get('/', async (req, res) => {
    try {
        const stagiaires = await Stagiaire.find();
        res.send(stagiaires);
    } catch (err) {
        res.status(500).send(err);
    }
});
    
router.get('/:id', async (req, res) => {
    try {
        const stagiaire = await Stagiaire.findById(req.params.id);
        res.send(stagiaire);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post('/', async (req, res) => {
    const stagiaire = new Stagiaire({
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        telephone: req.body.telephone
    });
    
    try {
        const savedStagiaire = await stagiaire.save();
        res.send(savedStagiaire);
    } catch (err) { 
        res.status(500).send(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const stagiaire = await Stagiaire.findById(req.params.id);
    
        stagiaire.nom = req.body.nom;
        stagiaire.prenom = req.body.prenom;
        stagiaire.email = req.body.email;
        stagiaire.telephone = req.body.telephone;
    
        const updatedStagiaire = await stagiaire.save();
        res.send(updatedStagiaire);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const removedStagiaire = await Stagiaire.deleteOne({_id: req.params.id }); res.send(removedStagiaire);
    } catch (err) {
        res.status(500).send(err);
    }
});