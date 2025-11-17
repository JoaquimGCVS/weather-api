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
        sunsetLabel: "Pôr do Sol",
        weather: {
            "clear sky": "céu limpo",
            "few clouds": "poucas nuvens",
            "scattered clouds": "nuvens dispersas",
            "broken clouds": "nuvens fragmentadas",
            "overcast clouds": "nublado",
            "shower rain": "aguaceiro",
            "light rain": "chuva leve",
            "moderate rain": "chuva moderada",
            "heavy intensity rain": "chuva forte",
            "rain": "chuva",
            "thunderstorm": "trovoada",
            "snow": "neve",
            "mist": "névoa",
            "light intensity drizzle": "garoa fraca",
            "few clouds: scattered": "poucas nuvens"
        }
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
        sunsetLabel: "Sunset",
        weather: {
            "clear sky": "Clear sky",
            "few clouds": "Few clouds",
            "scattered clouds": "Scattered clouds",
            "broken clouds": "Broken clouds",
            "overcast clouds": "Overcast clouds",
            "shower rain": "Shower rain",
            "light rain": "Light rain",
            "moderate rain": "Moderate rain",
            "heavy intensity rain": "Heavy rain",
            "rain": "Rain",
            "thunderstorm": "Thunderstorm",
            "snow": "Snow",
            "mist": "Mist",
            "light intensity drizzle": "Light drizzle",
            "few clouds: scattered": "Few clouds"
        }
    }
};

const getTranslation = (lang) => {
    // Retorna o dicionário para o idioma selecionado ou 'pt-BR' como padrão.
    return translations[lang] || translations['pt-BR']; 
};

export default getTranslation;