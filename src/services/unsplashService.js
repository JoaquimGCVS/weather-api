import axios from 'axios';

const CHAVE_ACESSO_UNSPLASH = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
const URL_UNSPLASH = "https://api.unsplash.com/search/photos";

const buscarImagemCidade = async (nomeCidade) => {
    // Adiciona termos genéricos para aumentar a chance de encontrar um fundo panorâmico
    const consulta = `${nomeCidade} city skyline urban`; 
    
    try {
        const resposta = await axios.get(URL_UNSPLASH, {
            params: {
                query: consulta,
                client_id: CHAVE_ACESSO_UNSPLASH,
                per_page: 1, 
                orientation: 'landscape' 
            }
        });

        if (resposta.data.results.length > 0) {
            // Usa a URL 'regular'
            const urlImagem = resposta.data.results[0].urls.regular;
            // Retorna a URL envolvida em 'url()' para uso no style={{ backgroundImage }}
            return `url("${urlImagem}")`; 
        }

        return null; 

    } catch (erro) {
        console.error("Erro ao buscar imagem da cidade no Unsplash:", erro);
        return null;
    }
};

export default buscarImagemCidade;