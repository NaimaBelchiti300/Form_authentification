import mongoose from "mongoose";

const url = 'mongodb+srv://naimabelchiti07:1234@cluster0.6wbgpvz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(url, { useNewUrlParser: true})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));

const stagiaireSchema = new mongoose.Schema({
    nom: String,
    prenom: String,
    email: String,
    telephone: String,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true},
});

export const Stagiaire = mongoose.model('Stg', stagiaireSchema);