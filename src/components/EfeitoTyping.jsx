import { useState, useEffect } from 'react';

const EfeitoTyping = ({ texto, velocidadeDigitacao = 55, delay = 500 }) => {
    const [textoDigitado, setTextoDigitado] = useState("");
    const [mostrar, setMostrar] = useState(false);
    
    useEffect(() => {
        setTextoDigitado(""); 
        setMostrar(false);
        
        if (!texto) return;

        // Delay antes de começar o typing
        const delayTimeout = setTimeout(() => {
            setMostrar(true);
            
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
        }, delay);

        return () => clearTimeout(delayTimeout);

    }, [texto, velocidadeDigitacao, delay]);

    return (
        <div style={{ position: 'relative', minHeight: '1.2em', marginBottom: '1em' }}>
            {/* Texto invisível para reservar espaço */}
            <p style={{ visibility: 'hidden', position: 'absolute', margin: 0 }}>
                {texto}
            </p>
            {/* Texto visível com typing */}
            {mostrar && <p style={{ margin: 0 }}>{textoDigitado}</p>}
        </div>
    );
};

export default EfeitoTyping;