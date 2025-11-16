import { useEffect, useState } from 'react';
import getDadosDoClima from './services/weatherService'; 
import Busca from './components/Busca'; 
import ClimaAtual from './components/ClimaAtual';

function App() {

  const [cidadeBuscada, setCidadeBuscada] = useState(""); 
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
      
      {/* Passa a função para o componente de busca */}
      <Busca setQuery={setCidadeBuscada} /> 
      
      {/* Área onde os componentes de ClimaAtual e Previsao7Dias serão exibidos */}
      {dadosDoClima && (
        <div className='dados'>
          <ClimaAtual dadosClima={dadosDoClima}/>
        </div>
      )}
    </div>
  );
}

export default App;