// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigat=useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/auth/login', { username, password });
            setSuccess(response.data.message);
           navigat('/')
        } catch (err) {
            setError(err.response.data.message);
        }
        setUsername('')
        setPassword('')
    };

    return (
        <div>
            <h2 style={{fontWeight:'bold' ,color:'purple'}}>Login</h2>
            {error && alert(error)}
            {success && alert(success)}
            <form onSubmit={handleSubmit} className='from-group container-fluid ' >
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control w-50" />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}   className="form-control w-50"/>
                <br/>
                <button type="submit" className='btn btn-success'>  Login</button>
            </form>
        </div>
    );
}

export default Login;
