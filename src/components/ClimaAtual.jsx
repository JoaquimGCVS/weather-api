import React from 'react';
import { formatarDataHora } from '../utils/formatador';
import styles from './ClimaAtual.module.css';
import { FaTemperatureArrowDown, FaTemperatureArrowUp } from "react-icons/fa6";
import { FaWind } from "react-icons/fa";
import { FiSunrise, FiSunset } from "react-icons/fi";
import { RiWaterPercentFill } from "react-icons/ri";

const ClimaAtual = ({ dadosClima, t }) => { 

    const {
        name,
        sys: { country, sunrise, sunset },
        main: { temp, humidity },
        weather,
        wind: { speed },
        dt, 
        timezone,
        previsao_5_dias
    } = dadosClima;

    const calcularMinMaxDoDia = () => {
        if (!previsao_5_dias?.list) {
            return { min: dadosClima.main.temp_min, max: dadosClima.main.temp_max };
        }

        const agora = new Date();
        const inicioDoDia = new Date(agora.setHours(0, 0, 0, 0)).getTime() / 1000;
        const fimDoDia = new Date(agora.setHours(23, 59, 59, 999)).getTime() / 1000;

        const previsoesDoDia = previsao_5_dias.list.filter(
            item => item.dt >= inicioDoDia && item.dt <= fimDoDia
        );

        if (previsoesDoDia.length === 0) {
            return { min: dadosClima.main.temp_min, max: dadosClima.main.temp_max };
        }

        const temperaturas = previsoesDoDia.map(item => item.main.temp);
        return {
            min: Math.min(...temperaturas, temp),
            max: Math.max(...temperaturas, temp)
        };
    };

    const { min: temp_min, max: temp_max } = calcularMinMaxDoDia();

    const iconeUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
    const descricaoClima = weather[0].description;
    const descricaoTraduzida = (t?.weather && t.weather[descricaoClima.toLowerCase()]) || descricaoClima;
    
    const horaAtualFormatada = formatarDataHora(dt, timezone).substring(17, 22);
    const nascerDoSolFormatado = formatarDataHora(sunrise, timezone).substring(17, 22);
    const porDoSolFormatado = formatarDataHora(sunset, timezone).substring(17, 22);
    const velocidadeVentoKmh = (speed * 3.6).toFixed(1);

    return (
        <div className={`${styles.climaAtual} ${styles.aparecer}`}>

            <div className={styles.condicaoPrincipal}>
                <p className={styles.descricao}>{descricaoTraduzida}</p>
            </div>

            <div className={styles.condicaoDetalhada}>
                <h1 className={styles.temperatura}>{Math.round(temp)}°</h1>
                <div>
                    <div className={styles.cabecalho}>
                        <h2>{name}, {country}</h2>
                        <img src={iconeUrl} alt={descricaoTraduzida} />
                        <p className={styles.horaAtual}>{horaAtualFormatada}</p> 
                    </div>

                    <div className={styles.detalhes}>
                        <div className={styles.detalheItem}>
                            <FaTemperatureArrowDown title={t.minTempLabel} />
                            <p className={styles.valorDetalhe}>{Math.round(temp_min)}°C</p>
                        </div>
                        
                        <div className={styles.detalheItem}>
                            <FaTemperatureArrowUp title={t.maxTempLabel} />
                            <p className={styles.valorDetalhe}>{Math.round(temp_max)}°C</p>
                        </div>

                        <div className={styles.detalheItem}>
                            <RiWaterPercentFill title={t.humidityLabel} />
                            <p className={styles.valorDetalhe}>{humidity}%</p>
                        </div>

                        <div className={styles.detalheItem}>
                            <FaWind title={t.windSpeedLabel} />
                            <p className={styles.valorDetalhe}>{velocidadeVentoKmh} km/h</p>
                        </div>

                        <div className={styles.detalheItem}>
                            <FiSunrise title={t.sunriseLabel} />
                            <p className={styles.valorDetalhe}>{nascerDoSolFormatado}</p>
                        </div>

                        <div className={styles.detalheItem}>
                            <FiSunset title={t.sunsetLabel} />
                            <p className={styles.valorDetalhe}>{porDoSolFormatado}</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default ClimaAtual;