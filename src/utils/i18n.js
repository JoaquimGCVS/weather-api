const translations = {
    'pt-BR': {
        appTitle: "API do Clima",
        searchSubtitle: "Procure pelo clima de qualquer cidade do mundo!",
        searchPlaceholder: "Procure por uma cidade...",
        minTempLabel: "Temperatura Mínima",
        maxTempLabel: "Temperatura Máxima",
        humidityLabel: "Umidade",
        windSpeedLabel: "Velocidade do Vento",
        sunriseLabel: "Nascer do Sol",
        sunsetLabel: "Pôr do Sol"
    },
    'en-US': {
        appTitle: "Weather API",
        searchSubtitle: "Search for the weather in any city in the world!",
        searchPlaceholder: "Search for a city...",
        minTempLabel: "Min Temperature",
        maxTempLabel: "Max Temperature",
        humidityLabel: "Humidity",
        windSpeedLabel: "Wind Speed",
        sunriseLabel: "Sunrise",
        sunsetLabel: "Sunset"
    }
};

const getTranslation = (lang) => {
    // Retorna o dicionário para o idioma selecionado ou 'pt-BR' como padrão.
    return translations[lang] || translations['pt-BR']; 
};

export default getTranslation;