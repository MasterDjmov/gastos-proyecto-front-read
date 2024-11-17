import { useSelector } from "react-redux";

const MiPerfil = ()=>{
    const user = useSelector((state)=>state.user.user);

    return <div>
        <h2>MI Perfil</h2>
        <div>
            <label>Nombre:</label>
            <input
            type="text"
            value={name}
            onChange={(e)=>setName(e.target.value)}  />
        </div>
    </div>
}

export default MiPerfil;