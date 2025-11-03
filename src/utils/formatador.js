const formatarDataHora = (tempoSegundos, timezoneOffsetSegundos) => {
    // Adiciona o offset de fuso horário e converte para milissegundos
    const data = new Date((tempoSegundos + timezoneOffsetSegundos) * 1000); 
    // O UTC String evita problemas de fuso horário local do navegador
    return data.toUTCString(); 
};

export { formatarDataHora };