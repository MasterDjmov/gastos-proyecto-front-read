
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './pages/Login'
import Bandeja from './pages/Bandeja';
import MiPerfil from './pages/MiPerfil';
import Registrar from './pages/Registrar';

const AppRouter = ()=>{
    return(
        <Router>
            <Routes>
                <Route path='/' element={<Login />} />   
                <Route path='/bandeja' element={<Bandeja />} />   
                <Route path='/mi-perfil' element={<MiPerfil />} />   
                <Route path='/register' element={<Registrar />} />   
            </Routes>
        </Router>
    );
};

export default AppRouter;