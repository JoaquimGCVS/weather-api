import { useEffect, useState } from 'react';
import getDadosDoClima from './services/weatherService'; 
import Busca from './components/Busca'; 
import ClimaAtual from './components/ClimaAtual';
import SeletorIdioma from './components/SeletorIdioma'; 
import getTranslation from './utils/i18n'; 

function App() {

  const [cidadeBuscada, setCidadeBuscada] = useState(""); 
  const [dadosDoClima, setDadosDoClima] = useState(null);
  
  const [language, setLanguage] = useState('pt-BR'); 
  const [t, setT] = useState(getTranslation('pt-BR')); 

  useEffect(() => {
    setT(getTranslation(language));
  }, [language]); 


  useEffect(() => {
    const buscarEAtualizarClima = async () => {
      if (!cidadeBuscada) return;

      try {
        
        // Chamada ao serviço, que usa o Axios internamente
        const dados = await getDadosDoClima(cidadeBuscada); 
        
        setDadosDoClima(dados); 
        console.log("Dados da API no App.jsx:", dados); 
        
      } catch (e) {
        setDadosDoClima(null);
      } 
    };

    buscarEAtualizarClima();
  }, [cidadeBuscada]); // Re-executa sempre que a cidadeBuscada muda

  return (
    <div className='container'>
      <SeletorIdioma setLanguage={setLanguage} currentLanguage={language} />
      <Busca setQuery={setCidadeBuscada} t={t} /> 
      
      {/* Área onde os componentes de ClimaAtual e Previsao7Dias serão exibidos */}
      {dadosDoClima && (
        <div className='dados'>
          <ClimaAtual dadosClima={dadosDoClima} t={t} />
        </div>
      )}
    </div>
  );
}

export default App;