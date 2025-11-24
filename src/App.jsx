import { useEffect, useState } from 'react';
import getDadosDoClima from './services/weatherService'; 
import Busca from './components/Busca'; 
import ClimaAtual from './components/ClimaAtual';
import Previsao5Dias from './components/Previsao5Dias';
import SeletorIdioma from './components/SeletorIdioma'; 
import getTranslation from './utils/i18n'; 
import buscarImagemCidade from './services/unsplashService'; 

function App() {

  const [cidadeBuscada, setCidadeBuscada] = useState(""); 
  const [dadosDoClima, setDadosDoClima] = useState(null);
  
  const [language, setLanguage] = useState('pt-BR'); 
  const [t, setT] = useState(getTranslation('pt-BR')); 
  
  const [imagemCidade, setImagemCidade] = useState(null); 

  useEffect(() => {
    setT(getTranslation(language));
  }, [language]); 

  useEffect(() => {
    const buscarEAtualizarClimaEImagem = async () => {
      if (!cidadeBuscada) {
          setImagemCidade(null); 
          setDadosDoClima(null);
          return;
      }

      try {
        const [dadosClima, urlImagem] = await Promise.all([
            getDadosDoClima(cidadeBuscada),
            buscarImagemCidade(cidadeBuscada) 
        ]);
        
        setImagemCidade(urlImagem || null); 
        setDadosDoClima(dadosClima); 
        console.log("Dados da API no App.jsx:", dadosClima); 
      } catch (e) {
        setDadosDoClima(null);
        setImagemCidade(null); 
      } 
    };

    buscarEAtualizarClimaEImagem();
  }, [cidadeBuscada]); 

  return (
    <div 
        className='container' 
        style={{ backgroundImage: imagemCidade }}
    >
      <SeletorIdioma setLanguage={setLanguage} currentLanguage={language} />
      <Busca setQuery={setCidadeBuscada} t={t} /> 
      
      {dadosDoClima && (
        <>
          <div className='dados'>
            <ClimaAtual dadosClima={dadosDoClima} t={t} />
          </div>
          <Previsao5Dias previsao={dadosDoClima.previsao_5_dias} t={t} />
        </>
      )}
    </div>
  );
}

export default App;