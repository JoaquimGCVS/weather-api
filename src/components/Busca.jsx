import { useState } from "react"
import { IoSearch } from "react-icons/io5";

const Busca = ({ setQuery }) => {
    
    const [cidade, setCidade] = useState("");

    const lidarComBusca = (e) => {
        e.preventDefault(); //impede o recarregamento padrao de pagina
        if (cidade.trim() !== "") {
            setQuery(cidade);
            setCidade(""); //limpa o input apos o envio
        }
    };
    
    return (
        <>
            <form onSubmit={lidarComBusca} className="formulario">
                <input className="input-buscar" type="text" placeholder="Procure por uma cidade..." value={cidade} 
                onChange={ (e) => setCidade(e.target.value) }/>
                <button className="botao-buscar" type="submit"><IoSearch /></button>
            </form>
        </>
    )
} 

export default Busca;