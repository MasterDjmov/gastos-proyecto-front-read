import axios from 'axios';
import { useState } from 'react';
import {useForm,useFormState} from 'react-hook-form'
import {Link} from 'react-router-dom'

const Registrar =()=>{
    const {register,formState:{errors},handleSubmit,watch} = useForm();
    const [errorMessage, setErrorMessage] = useState("");
    const onSubmit = async (data)=>{
        try {
            console.log("datos enviados desde el formulario: ", data)
            //filtrando valores antes de enviarlos
            const {password2, ...dataSimple} = data;
            console.log("datos filtrados a enviar: ", dataSimple)
            
            const response = await axios.post("http://localhost:3000/usuarios/register",dataSimple);
            console.log("respuesta del server:", response.data.user);
            setErrorMessage("");
            alert(response.data.message);
        } catch (error) {
            setErrorMessage("No se pudo registrar correctamente");
        }
    }
    return( 
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="Nombre">Nombre:</label>
                    <input
                    type='text'
                    id='nombre'
                    {...register('nombre',{required:'Se necesita el nombre completo'})} />
                    {errors.nombre && <span>{errors.nombre.message}</span>}
                </div>
                <div>
                    <label htmlFor="Apellido">Apellido:</label>
                    <input
                    type='text'
                    id='apellido'
                    {...register('apellido',{required:'Se necesita el apellido'})} />
                    {errors.name && <span>{errors.name.message}</span>}
                </div>
                <div>
                    <label htmlFor="Email">Email:</label>
                    <input
                    type='text'
                    id='email'
                    {...register('email',{required:'Se necesita el email'})} />
                    {errors.email && <span>{errors.email.message}</span>}
                </div>
                <div>
                    <label htmlFor="password">Clave:</label>
                    <input
                    type='password'
                    id='password'
                    {...register('password',{required:'Se necesita una clave',minLength:5})} />
                    {errors.password && <span>{errors.password.message}</span>}
                </div>
                <div>
                    <label htmlFor="password">Repita la Clave:</label>
                    <input
                    type='password'
                    id='password2'
                    {...register('password2',{
                        required:'Se necesita una clave',minLength:{
                            value:5,
                            message:"Minimo 5 letras"
                        },
                        validate:(value)=>{
                            if(value ===watch('password')){
                                return true;
                            }else{
                                return "Las Claves no son iguales";
                            }
                        }})} />
                    {errors.password2 && <span>{errors.password2.message}</span>}
                </div>
                <div>
                    <button type='submit'>Registrar</button>
                </div>
            </form>
            {errorMessage && <span>{errorMessage}</span>}
            <Link to="/">Regresar al Inicio</Link>
            <pre>
                {JSON.stringify(watch(),null,2)}
            </pre>
        </div>
    );
}

export default Registrar;