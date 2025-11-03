import React from 'react';
import { formatarDataHora } from '../utils/formatador';

// O componente recebe 'dadosClima' (o objeto completo da API) como prop
const ClimaAtual = ({ dadosClima }) => {
    
    // Desestruturação dos dados do clima atual
    const { 
        name, 
        sys: { country, sunrise, sunset },
        main: { temp, temp_max, temp_min, humidity },
        weather, 
        wind: { speed },
        dt, 
        timezone 
    } = dadosClima;

    // Constrói a URL do ícone
    const iconeUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
    const descricaoClima = weather[0].description;
    
    // Formatações e Conversões
    const dataHoraFormatada = formatarDataHora(dt, timezone);
    const nascerDoSolFormatado = formatarDataHora(sunrise, timezone).substring(17, 22);
    const porDoSolFormatado = formatarDataHora(sunset, timezone).substring(17, 22);
    const velocidadeVentoKmh = (speed * 3.6).toFixed(1); // Converte m/s para km/h

    // Renderiza a visualização
    return (
        <div className="clima-atual">
            
            {/* Localização e Data */}
            <div className="cabecalho">
                <h2>{name}, {country}</h2>
                <p>Última Medição: {dataHoraFormatada}</p>
            </div>

            {/* Condição Principal */}
            <div className="condicao-principal">
                <img src={iconeUrl} alt={descricaoClima} />
                <div className="texto-esquerda">
                    <h1 className="temperatura">{Math.round(temp)}°C</h1>
                    <p className="descricao">{descricaoClima}</p>
                </div>
            </div>

            {/* Detalhes */}
            <div className="detalhes">
                
                <div className="detalhe-item">
                    <p>Mínima</p>
                    <p className="valor-detalhe">{Math.round(temp_min)}°C</p>
                </div>
                
                <div className="detalhe-item">
                    <p>Máxima</p>
                    <p className="valor-detalhe">{Math.round(temp_max)}°C</p>
                </div>
                
                <div className="detalhe-item">
                    <p>Umidade</p>
                    <p className="valor-detalhe">{humidity}%</p>
                </div>
                
                <div className="detalhe-item">
                    <p>Vento</p>
                    <p className="valor-detalhe">{velocidadeVentoKmh} km/h</p>
                </div>
                
                <div className="detalhe-item">
                    <p>Nascer do Sol</p>
                    <p className="valor-detalhe">{nascerDoSolFormatado}</p>
                </div>
                
                <div className="detalhe-item">
                    <p>Pôr do Sol</p>
                    <p className="valor-detalhe">{porDoSolFormatado}</p>
                </div>
                
            </div>

        </div>
    );
}

export default ClimaAtual;