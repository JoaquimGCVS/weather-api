import { useState } from "react"
import { IoSearch } from "react-icons/io5";
import styles from './Busca.module.css';

const Busca = ({ setQuery }) => {
    
    const [cidade, setCidade] = useState("");

    const lidarComBusca = (e) => {
        e.preventDefault();
        if (cidade.trim() !== "") {
            setQuery(cidade);
            setCidade("");
        }
    };
    
    return (
        <div className={styles.header}>
            <h1>Weather API</h1>
            <form onSubmit={lidarComBusca} className={styles.formulario}>
                <input className={styles.inputBuscar} type="text" placeholder="Procure por uma cidade..." value={cidade} 
                onChange={ (e) => setCidade(e.target.value) }/>
                <button className={styles.botaoBuscar} type="submit"><IoSearch /></button>
            </form>
        </div>
    )
} 

export default Busca;