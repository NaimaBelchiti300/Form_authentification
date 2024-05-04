import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Link, Route, Router, Routes} from 'react-router-dom'
import Signup from './composant/signup';
import Login from './composant/login';
function App() {
  return (
    <div >
    
      <BrowserRouter>

<ul style={{backgroundColor:'purple',color:'white',display:'flex'}}>
<h4 style={{margin:'20px',fontSize:'40px', color:'pink',fontWeight:'bold'}}>Formulaire d'inscription</h4>
<Link style={{textDecoration:'none' ,color:'white'  ,margin:'35px',  fontWeight:'bold'}} to="/">SingUp</Link>
<Link style={{textDecoration:'none' ,color:'white',margin:'35px' ,fontWeight:'bold' }}  to="/login">Login</Link>
</ul>
<Routes>
    
        <Route path='/' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>


        </Routes>
     

      </BrowserRouter>
      
    </div>
  );
}

export default App;
