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
        main: { temp, temp_max, temp_min, humidity },
        weather,
        wind: { speed },
        dt, 
        timezone 
    } = dadosClima;

    const iconeUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
    const descricaoClima = weather[0].description;
    
    const horaAtualFormatada = formatarDataHora(dt, timezone).substring(17, 22);
    const nascerDoSolFormatado = formatarDataHora(sunrise, timezone).substring(17, 22);
    const porDoSolFormatado = formatarDataHora(sunset, timezone).substring(17, 22);
    const velocidadeVentoKmh = (speed * 3.6).toFixed(1);

    return (
        <div className={styles.climaAtual}>

            <div className={styles.condicaoPrincipal}>
                <p className={styles.descricao}>{descricaoClima}</p>
            </div>

            <div className={styles.condicaoDetalhada}>
                <h1 className={styles.temperatura}>{Math.round(temp)}°</h1>
                <div>
                    <div className={styles.cabecalho}>
                        <h2>{name}, {country}</h2>
                        <img src={iconeUrl} alt={descricaoClima} />
                        <p className={styles.horaAtual}>{horaAtualFormatada}</p> 
                    </div>

                    <div className={styles.detalhes}>
                        <div className={styles.detalheItem}>
                            <FaTemperatureArrowDown title={t.minTempLabel} />
                            <p className={styles.valorDetalhe}>{Math.round(temp_min)}°C</p>
                        </div>
                        {/* ... (restante dos detalhes) ... */}
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