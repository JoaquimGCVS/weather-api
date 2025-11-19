import { useState, useRef, useEffect } from 'react';
import styles from './SeletorIdioma.module.css';

const SeletorIdioma = ({ setLanguage, currentLanguage }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const languages = {
        'pt-BR': 'Português (BR)',
        'en-US': 'English (US)'
    };

    const handleSelect = (lang) => {
        setLanguage(lang);
        setIsOpen(false);
    };

    // Fecha o dropdown ao clicar fora
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={styles.languageSwitcher} ref={dropdownRef}>
            <button 
                className={styles.select}
                onClick={() => setIsOpen(!isOpen)}
            >
                {languages[currentLanguage]}
                <span className={`${styles.arrow} ${isOpen ? styles.arrowUp : ''}`}>▼</span>
            </button>
            
            {isOpen && (
                <div className={styles.dropdown}>
                    {Object.entries(languages).map(([code, label]) => (
                        <div
                            key={code}
                            className={`${styles.option} ${currentLanguage === code ? styles.optionActive : ''}`}
                            onClick={() => handleSelect(code)}
                        >
                            {label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SeletorIdioma;