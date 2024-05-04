// Signup.js
import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [telephone, setTelephone] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/auth/signup', { nom, prenom, email, telephone, username, password });
            setSuccess(response.data.message);
        } catch (err) {
            setError(err.response.data.message);
        }
        setEmail('')
        setNom('')
        setPrenom('')
        setTelephone('')
        setPassword('')
        setUsername('')
    };

    return (
        <div>
            <h2 style={{fontWeight:'bold',color:'purple'}}>Cree un Compte</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <form onSubmit={handleSubmit}  className='form-group container-fluid'>
                <input type="text" placeholder="Nom" value={nom} onChange={(e) => setNom(e.target.value)} className="form-control w-50"/>
                <input type="text" placeholder="Prenom" value={prenom} onChange={(e) => setPrenom(e.target.value)} className="form-control w-50"/>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control w-50"/>
                <input type="text" placeholder="Telephone" value={telephone} onChange={(e) => setTelephone(e.target.value)}className="form-control w-50" />
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}className="form-control w-50" />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control w-50"/>
                <br/>
                <button type="submit" className='btn btn-success'>Signup</button>
            </form>
        </div>
    );
}

export default Signup;
