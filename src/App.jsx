import { useEffect, useState } from 'react';
import getDadosDoClima from './services/weatherService'; 
import Busca from './components/Busca'; 
import ClimaAtual from './components/ClimaAtual';
import SeletorIdioma from './components/SeletorIdioma'; 
import getTranslation from './utils/i18n'; 
// Importa o serviço que usa a chave da Unsplash
import buscarImagemCidade from './services/unsplashService'; 

function App() {

  const [cidadeBuscada, setCidadeBuscada] = useState(""); 
  const [dadosDoClima, setDadosDoClima] = useState(null);
  
  const [language, setLanguage] = useState('pt-BR'); 
  const [t, setT] = useState(getTranslation('pt-BR')); 
  
  // Estado inicial é o fundo padrão
  const [imagemCidade, setImagemCidade] = useState(null); 

  useEffect(() => {
    setT(getTranslation(language));
  }, [language]); 


  useEffect(() => {
    const buscarEAtualizarClimaEImagem = async () => {
      // Se não há cidade buscada (estado inicial ou reset), volta para o fundo padrão
      if (!cidadeBuscada) {
          setImagemCidade(null); 
          setDadosDoClima(null);
          return;
      }

      try {
        // Busca o clima e a imagem da cidade via sua API Unsplash
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
    // Aplica o background style dinamicamente.
    <div 
        className='container' 
        style={{ backgroundImage: imagemCidade }}
    >
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