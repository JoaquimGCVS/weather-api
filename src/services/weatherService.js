import axios from 'axios';

const CHAVE_API = "118a9df96d717f688380ecd8844d2e32"; 
const URL_BASE = "https://api.openweathermap.org/data/2.5";

const getDadosDoClima = async (cidade, unidades = "metric") => {
    // Endpoint principal para CLIMA ATUAL
    const urlAtual = `${URL_BASE}/weather?q=${cidade}&units=${unidades}&appid=${CHAVE_API}`;

    // Endpoint para previsao de 5 dias
    const urlPrevisao5Dias = `${URL_BASE}/forecast?q=${cidade}&units=${unidades}&appid=${CHAVE_API}`;
    
    try {
        // Busca do Clima Atual
        const respostaAtual = await axios.get(urlAtual);
        const dadosAtuais = respostaAtual.data;

        // Busca da Previsão de 5 Dias/3 Horas
        const respostaPrevisao = await axios.get(urlPrevisao5Dias);
        const dadosPrevisao = respostaPrevisao.data;

        // Dados atuais e a lista completa de 3h em 3h
        return { 
            ...dadosAtuais, 
            previsao_5_dias: dadosPrevisao 
        };

    } catch (erro) {
        let mensagemErro = 'Erro desconhecido ao buscar dados do clima.';
        
        if (erro.response && erro.response.status === 404) {
            mensagemErro = 'Cidade não encontrada. Verifique o nome.';
        } else if (erro.message) {
            mensagemErro = `Erro na requisição: ${erro.message}`;
        }

        console.error("Erro ao buscar dados do clima:", mensagemErro);
        throw new Error(mensagemErro); 
    }
}

export default getDadosDoClima;