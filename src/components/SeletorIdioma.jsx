import styles from './SeletorIdioma.module.css';

const SeletorIdioma = ({ setLanguage, currentLanguage }) => {
    
    // Função para alterar o estado do idioma no App.jsx
    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
    };

    return (
        <div className={styles.languageSwitcher}>
            <select 
                onChange={handleLanguageChange} 
                value={currentLanguage}
                className={styles.select}
            >
                <option value="pt-BR">Português (BR)</option>
                <option value="en-US">English (US)</option>
            </select>
        </div>
    );
}

export default SeletorIdioma;