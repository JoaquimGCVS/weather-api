import React from 'react';
import { formatarDataHora } from '../utils/formatador';
import styles from './ClimaAtual.module.css';

const ClimaAtual = ({ dadosClima }) => {
    
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
    
    const dataHoraFormatada = formatarDataHora(dt, timezone);
    const nascerDoSolFormatado = formatarDataHora(sunrise, timezone).substring(17, 22);
    const porDoSolFormatado = formatarDataHora(sunset, timezone).substring(17, 22);
    const velocidadeVentoKmh = (speed * 3.6).toFixed(1);

    return (
        <div className={styles.climaAtual}>
            
            <div className={styles.cabecalho}>
                <h2>{name}, {country}</h2>
                <p>Última Medição: {dataHoraFormatada}</p>
            </div>

            <div className={styles.condicaoPrincipal}>
                <img src={iconeUrl} alt={descricaoClima} />
                <div className={styles.textoEsquerda}>
                    <h1 className={styles.temperatura}>{Math.round(temp)}°C</h1>
                    <p className={styles.descricao}>{descricaoClima}</p>
                </div>
            </div>

            <div className={styles.detalhes}>
                
                <div className={styles.detalheItem}>
                    <p>Mínima</p>
                    <p className={styles.valorDetalhe}>{Math.round(temp_min)}°C</p>
                </div>
                
                <div className={styles.detalheItem}>
                    <p>Máxima</p>
                    <p className={styles.valorDetalhe}>{Math.round(temp_max)}°C</p>
                </div>
                
                <div className={styles.detalheItem}>
                    <p>Umidade</p>
                    <p className={styles.valorDetalhe}>{humidity}%</p>
                </div>
                
                <div className={styles.detalheItem}>
                    <p>Vento</p>
                    <p className={styles.valorDetalhe}>{velocidadeVentoKmh} km/h</p>
                </div>
                
                <div className={styles.detalheItem}>
                    <p>Nascer do Sol</p>
                    <p className={styles.valorDetalhe}>{nascerDoSolFormatado}</p>
                </div>
                
                <div className={styles.detalheItem}>
                    <p>Pôr do Sol</p>
                    <p className={styles.valorDetalhe}>{porDoSolFormatado}</p>
                </div>
                
            </div>

        </div>
    );
}

export default ClimaAtual;