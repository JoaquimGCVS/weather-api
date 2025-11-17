import { useState, useEffect } from 'react';

const EfeitoTyping = ({ texto, velocidadeDigitacao = 40 }) => {
    const [textoDigitado, setTextoDigitado] = useState("");
    
    useEffect(() => {
        setTextoDigitado(""); 
        
        if (!texto) return;

        const intervalId = setInterval(() => {
            setTextoDigitado((prev) => {
                const proximoIndex = prev.length; 
                
                if (proximoIndex < texto.length) {
                    return prev + texto.charAt(proximoIndex);
                } else {
                    clearInterval(intervalId);
                    return prev; 
                }
            });
            
        }, velocidadeDigitacao);

        return () => clearInterval(intervalId);

    }, [texto, velocidadeDigitacao]);

    return <p>{textoDigitado}</p>;
};

export default EfeitoTyping;