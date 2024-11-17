import {useForm} from 'react-hook-form'
import './Login.css'
import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { setToken, setUser } from '../redux/slices/userSlices';
import { useNavigate, Link } from 'react-router-dom';

const Login = ()=>{
    const user = useSelector((state)=> state.user.user);
    const token = useSelector((state)=> state.user.token);
    
    console.log("info user:", user)
    console.log("info token:", token)
    const {register,handleSubmit,formState:{errors}} = useForm();
    const [errorMessage, setErrorMessage] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit =  async (data)=>{
        try {
            const response = await axios.post("http://localhost:3000/auth/login",data);
            console.log("respuesta del server:", response.data.user);
            console.log("Token recibido:", response.data.token); 
            setErrorMessage("");
            const {user, token} = response.data;
            //procedo a guardar la info del usuario
            localStorage.setItem('token',token)
            localStorage.setItem('user',JSON.stringify(user))

            //ver en consola 
            console.log('Token en localStorage:', localStorage.getItem('token'));
            console.log('User en localStorage:', JSON.parse(localStorage.getItem('user')));

            //para redux
            dispatch(setUser(user));
            dispatch(setToken(token));

            //redirigir
            navigate('/bandeja');

        } catch (error) {
            console.log("aqui error:"+error);
            setErrorMessage("Login incorrecto, controle los datos");
        }
    }

    return(
       <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2>Login</h2>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                    type='text'
                    id='email'
                    {...register('email',{required:'El email es obligatorio'})}
                     />
                    {errors.email && <span>{errors.email.message}</span>}
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                    type='password'
                    id='password'
                    {...register('password',{required:'El password es Obligatorio'})}
                     />
                    {errors.password && <span>{errors.password.message}</span>}
                </div>
                <div>
                    <button type="submit">Inicia Sesión</button>
                </div>
            </form>
            {errorMessage && <span>{errorMessage}</span>}
            <Link to="/register">¿No tienes una cuenta? Regístrate aquí</Link>       
        </div>
    );
};

export default Login;