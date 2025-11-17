import { useState } from "react"
import { IoSearch } from "react-icons/io5";
import styles from './Busca.module.css';
import EfeitoTyping from './EfeitoTyping';

const Busca = ({ setQuery, t }) => { 
    
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
            <h1>{t.appTitle}</h1> 
            <EfeitoTyping key={t.searchSubtitle} texto={t.searchSubtitle} />
            
            <form onSubmit={lidarComBusca} className={styles.formulario}>
                <div className={styles.inputWrapper}>
                    <input 
                        className={styles.inputBuscar} 
                        type="text" 
                        placeholder={t.searchPlaceholder} 
                        value={cidade} 
                        onChange={ (e) => setCidade(e.target.value) }
                    />
                    <button className={styles.botaoBuscar} type="submit"><IoSearch /></button>
                </div>
            </form>
        </div>
    )
} 

export default Busca;