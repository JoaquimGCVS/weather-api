import { useState } from 'react';
import styles from './Previsao5Dias.module.css';
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const Previsao5Dias = ({ previsao, t }) => {
    const [ isVisible, setIsVisible ] = useState(false);

    const obterPrevisaoDiaria = () => {
        const previsoesPorDia = {};

        previsao.list.forEach( item => {
            const data = new Date(item.dt * 1000);
            const dia = data.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: '2-digit' });

            // Pega a previsão das 12h (ou a mais próxima)
            if (!previsoesPorDia[dia] || item.dt_txt.includes('12:00:00')) {
                previsoesPorDia[dia] = item;
            }
        });

        return Object.values(previsoesPorDia).slice(0, 5);
    }

    const previsoesDiarias = obterPrevisaoDiaria();

    const traduzirDescricao = (descricao) => {
        return (t?.weather && t.weather[descricao.toLowerCase()]) || descricao;
    };

    return (
        <div className={styles.container}>
            <button 
                className={styles.toggleButton}
                onClick={() => setIsVisible(!isVisible)}
                aria-label={isVisible ? "Ocultar previsão" : "Mostrar previsão"}
            >
                {isVisible ? <IoIosArrowDown /> : <IoIosArrowUp />}
            </button>

            {isVisible && (
                <div className={`${styles.previsaoContainer} ${styles.aparecer}`}>
                    {previsoesDiarias.map((dia, index) => {
                        const data = new Date(dia.dt * 1000);
                        const diaSemana = data.toLocaleDateString('pt-BR', { weekday: 'short' });
                        const diaNumero = data.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
                        const iconeUrl = `http://openweathermap.org/img/wn/${dia.weather[0].icon}@2x.png`;
                        const descricao = traduzirDescricao(dia.weather[0].description);

                        return (
                            <div key={index} className={styles.card}>
                                <p className={styles.dia}>{diaSemana}</p>
                                <p className={styles.data}>{diaNumero}</p>
                                <img src={iconeUrl} alt={descricao} className={styles.icone} />
                                <p className={styles.temperatura}>{Math.round(dia.main.temp)}°</p>
                                <p className={styles.descricao}>{descricao}</p>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
} 

export default Previsao5Dias;