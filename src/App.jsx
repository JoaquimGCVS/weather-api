import { useEffect, useState } from 'react';
import getDadosDoClima from './services/weatherService'; 
import Busca from './components/Busca'; 

function App() {

  const [cidadeBuscada, setCidadeBuscada] = useState("Londres"); 
  const [dadosDoClima, setDadosDoClima] = useState(null);
  const [carregando, setCarregando] = useState(false); 
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const buscarEAtualizarClima = async () => {
      if (!cidadeBuscada) return;

      try {
        setCarregando(true);
        setErro(null);
        
        // Chamada ao serviço, que usa o Axios internamente
        const dados = await getDadosDoClima(cidadeBuscada); 
        
        setDadosDoClima(dados); 
        console.log("Dados da API no App.jsx:", dados); 
        
      } catch (e) {
        setErro(e.message);
        setDadosDoClima(null);
      } finally {
        setCarregando(false);
      }
    };

    buscarEAtualizarClima();
  }, [cidadeBuscada]); // Re-executa sempre que a cidadeBuscada muda

  return (
    <div className='container'>
      <h1>Previsão do Tempo Global</h1>
      
      {/* Passa a função para o componente de busca */}
      <Busca setQuery={setCidadeBuscada} /> 
      
      {/* Status da equisicao */}
      {carregando && <h2 className='carregando'>Carregando dados de **{cidadeBuscada}**...</h2>}
      {erro && <h2 className='erro'>Erro: {erro}</h2>}
      
      {/* Área onde os componentes de ClimaAtual e Previsao7Dias serão exibidos */}
      {dadosDoClima && (
        <div className='dados'>
          {/* Aqui chamaremos <ClimaAtual /> e <Previsao7Dias /> */}
          <p>Dados carregados com sucesso! (Próxima etapa: exibição)</p>
        </div>
      )}
    </div>
  );
}

export default App;