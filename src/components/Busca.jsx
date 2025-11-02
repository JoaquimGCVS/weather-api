import { useState } from "react"

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
            <form onSubmit={lidarComBusca}>
                <input type="text" placeholder="Digite uma cidade..." value={cidade} 
                onChange={ (e) => setCidade(e.target.value) }/>
                <button type="submit">Buscar</button>
            </form>
        </>
    )
} 

export default Busca;