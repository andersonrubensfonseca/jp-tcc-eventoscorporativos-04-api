function login(event) {
    event.preventDefault();
    const form = document.getElementById('formulariologin');
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    window.location = "index.html"

    return false;
}

function carregaEventos(eventos, frase = "") {
    if (eventos.length === 0) {
        eventos = [
            { day: 4, month: 'JAN', title: 'Reunião de Alinhamento', text: 'Definiremos de forma clara os objetivos de curto, médio e longo prazo. É essencial que todos entendam a missão principal do projeto e como seu trabalho contribui para a empresa.' },
            { day: 8, month: 'JAN', title: 'Conf. de Boas-Vindas', text: 'Aqui estão as informações adicionais sobre a Confraternização de Boas-Vindas' },
            { day: 18, month: 'FEV', title: 'Análise de Desempenho', text: 'Aqui estão as informações adicionais sobre Reunião de Análise de Desempenho!' },
            { day: 26, month: 'FEV', title: 'Planejamento de Marketing', text: 'Aqui estão as informações adicionais sobre Planejamento de Marketing!' },
            { day: 12, month: 'MAR', title: 'Dia das Mães', text: 'Aqui estão as informações adicionais sobre O Dia das Mães!' },
            { day: 28, month: 'MAR', title: 'Finalização do Projeto', text: 'Aqui estão as informações adicionais sobre a Finalização de Projeto!' },
            { day: 12, month: 'ABR', title: 'Acompanhamento de KPI', text: 'Aqui estão as informações adicionais sobre Acompanhamento de KPI!' },
            { day: 20, month: 'ABR', title: 'Revisão de Orçamento', text: 'Aqui estão as informações adicionais sobre Revisão de Orçamento!' },
            { day: 15, month: 'MAI', title: 'Dia da Família', text: 'Aqui estão as informações adicionais sobre Dia da Família!' },
            { day: 4, month: 'JUN', title: 'Palestra', text: 'Aqui estão as informações adicionais sobre Palestra!' },
            { day: 15, month: 'JUL', title: 'Análise de Quadro', text: 'Aqui estão as informações adicionais sobre Análise de Quadro!' }, 
            { day: 22, month: 'AGO', title: 'Alinhamento Trimestral', text: 'Aqui estão as informações adicionais sobre Alinhamento Trimestral!' },
            { day: 9, month: 'SET', title: 'Revisão de Orçamento', text: 'Aqui estão as informações adicionais sobre Revisão de Orçamento!' },
            { day: 17, month: 'OUT', title: 'Atualização de Software', text: 'Aqui estão as informações adicionais sobre Atualização de Software!' },
            { day: 22, month: 'OUT', title: 'Finalização de Projeto', text: 'Aqui estão as informações adicionais sobre Finalização de Projeto!' },
            { day: 13, month: 'NOV', title: 'Novo Planejamento de equipe', text: 'Aqui estão as informações adicionais sobre Novo Planejamneto de Equipe!' },
            { day: 6, month: 'DEZ', title: 'Reunião de Alinhamento', text: 'Aqui estão as informações adicionais sobre Reunião de Alinhamento!' },
        ]

    }
    let base = document.getElementById('base');
    base.innerHTML = "";
    const row = document.createElement('div');
    row.classList.add('row')
    if (frase !== "") {
        row.innerHTML = `<div style="text-align:center">${frase}</div>`
    } else {
        for (let i = 0; i < eventos.length; i++) {
            const evento = eventos[i];
            let event = `<div class="col-md-4 mb-4">
                <!--Cards -->
                <div class="card mb-3 botao" data-toggle="modal" data-target="#infoModal${i}">
                    <div class="row">
                        <div class="col-md-5">
                            <div class="card-text">
                                <p><span class="day">${evento.day}</span> <span class="month">${evento.month}</span></p>
                            </div>
                        </div>
                        <div class="col-md-7">
                            <div class="d-flex">
                                <div class="vr"></div>
                            </div>
                            <div class="card-body">
                                <h4 class="card-title text-center">${evento.title}</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Modal -->
                <div class="modal fade" id="infoModal${i}" tabindex="-1" aria-labelledby="infoModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="infoModalLabel">${evento.title}</h5>
                            </div>
                            <div class="modal-body">
                                ${evento.text}
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
            row.innerHTML += event;
        }
    }
    base.appendChild(row);
}

carregaEventos(eventos = [])

function getNextWeekDays() {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let today = new Date();
    let days = [];
    
    // Calcula o número de dias até o próximo domingo
    let daysUntilSunday = 7 - today.getDay();
    
    // Itera sobre os próximos 7 dias
    for (let i = 1; i <= 7; i++) {
        let nextDay = new Date();
        nextDay.setDate(today.getDate() + daysUntilSunday + i);
        let day = {
            day: nextDay.getDate(),
            month: nextDay.toLocaleString('default', { month: 'short' }).toUpperCase().replace(/\./g, ''), // mês abreviado (ex: Jan, Feb)
            weekDay: daysOfWeek[nextDay.getDay()] // Nome do dia da semana
        };
        days.push(day);
    }

    return days;
}

function getDatesBetween(startDate, endDate) {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let datesArray = [];

    // Converte as datas de entrada para objetos Date
    let currentDate = new Date(startDate);
    endDate = new Date(endDate);
    let finalDate = new Date(endDate);
    finalDate.setDate(finalDate.getDate() + 1);

    // Loop até que a data atual seja maior que a data final
    while (currentDate <= finalDate) {
        // Cria um objeto de data no formato desejado
        let dateObj = {
            day: currentDate.getDate(),
            month: currentDate.toLocaleString('default', { month: 'short' }).toUpperCase().replace(/\./g, ''), // mês abreviado (ex: Jan, Feb)
            weekDay: daysOfWeek[currentDate.getDay()] // Nome do dia da semana
        };

        // Adiciona o objeto ao array de datas
        datesArray.push(dateObj);

        // Avança para o próximo dia
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return datesArray;
}

function filtro(event) {
    let eventos = [
        { day: 4, month: 'JAN', title: 'Reunião de Alinhamento', text: 'Definiremos de forma clara os objetivos de curto, médio e longo prazo. É essencial que todos entendam a missão principal do projeto e como seu trabalho contribui para a empresa.' },
        { day: 8, month: 'JAN', title: 'Conf. de Boas-Vindas', text: 'Aqui estão as informações adicionais sobre a Confraternização de Boas-Vindas' },
        { day: 18, month: 'FEV', title: 'Análise de Desempenho', text: 'Aqui estão as informações adicionais sobre Reunião de Análise de Desempenho!' },
        { day: 26, month: 'FEV', title: 'Planejamento de Marketing', text: 'Aqui estão as informações adicionais sobre Planejamento de Marketing!' },
        { day: 3, month: 'MAR', title: 'Planejamento de Marketing', text: 'Aqui estão as informações adicionais sobre Planejamento de Marketing!' },
        { day: 12, month: 'MAR', title: 'Dia das Mães', text: 'Aqui estão as informações adicionais sobre O Dia das Mães!' },
        { day: 28, month: 'MAR', title: 'Finalização do Projeto', text: 'Aqui estão as informações adicionais sobre a Finalização de Projeto!' },
        { day: 12, month: 'ABR', title: 'Acompanhamento de KPI', text: 'Aqui estão as informações adicionais sobre Acompanhamento de KPI!' },
        { day: 20, month: 'ABR', title: 'Revisão de Orçamento', text: 'Aqui estão as informações adicionais sobre Revisão de Orçamento!' },
        { day: 15, month: 'MAI', title: 'Dia da Família', text: 'Aqui estão as informações adicionais sobre Dia da Família!' },
        { day: 4, month: 'JUN', title: 'Palestra', text: 'Aqui estão as informações adicionais sobre Palestra!' },
        { day: 15, month: 'JUL', title: 'Análise de Quadro', text: 'Aqui estão as informações adicionais sobre Análise de Quadro!' }, 
        { day: 22, month: 'AGO', title: 'Alinhamento Trimestral', text: 'Aqui estão as informações adicionais sobre Alinhamento Trimestral!' },
        { day: 9, month: 'SET', title: 'Revisão de Orçamento', text: 'Aqui estão as informações adicionais sobre Revisão de Orçamento!' },
        { day: 17, month: 'OUT', title: 'Atualização de Software', text: 'Aqui estão as informações adicionais sobre Atualização de Software!' },
        { day: 22, month: 'OUT', title: 'Finalização de Projeto', text: 'Aqui estão as informações adicionais sobre Finalização de Projeto!' },
        { day: 13, month: 'NOV', title: 'Novo Planejamento de equipe', text: 'Aqui estão as informações adicionais sobre Novo Planejamneto de Equipe!' },
        { day: 6, month: 'DEZ', title: 'Reunião de Alinhamento', text: 'Aqui estão as informações adicionais sobre Reunião de Alinhamento!' },
    
    ]
    let mesString = ['JAN', 'FEV', 'MAR', 'ABR', "MAI", 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ']
    event.preventDefault();
    const form = document.getElementById('filtrar');
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    let dataFilter = {}
    if (data.endDate !== "" && data.startDate !== "") {
        dataFilter.endDate = data.endDate;
        dataFilter.startDate = data.startDate
    }
    if (data.selectOption !== "SELECIONE") {
        dataFilter.selectOption = data.selectOption
    }
    if (Object.keys(dataFilter).length === 0) {
        carregaEventos(eventos = [])
    } else {
        if (data.selectOption!=='') {
            let dataPesquisa = { dia: 1, mes: 0 }
            switch (data.selectOption) {
                case 'Hoje': {
                    let hoje = new Date()
                    const dia = hoje.getDate()
                    const mes = mesString[hoje.getMonth()]
                    dataPesquisa.dia = dia;
                    dataPesquisa.mes = mes;
                }
                    break;
                case 'Amanhã': {
                    let hoje = new Date()
                    const dia = hoje.getDate() + 1
                    const mes = mesString[hoje.getMonth()]
                    dataPesquisa.dia = dia;
                    dataPesquisa.mes = mes;
                }
                    break;
                default:
                    break;
            }
            let eventosFilter = [];
            if (data.selectOption !== "Semana subsequente") {
                eventosFilter = eventos.filter(ev => ev.day === dataPesquisa.dia).filter(ev => ev.month === dataPesquisa.mes);
            } else {
                const dias  = getNextWeekDays()
                let eventosSUM = []
                for (let index = 0; index < 5; index++) {
                    const dia = dias[index];
                    eventosSUM = eventos.filter(ev => ev.day === dia.day).filter(ev => ev.month === dia.month);
                    eventosSUM.map(es=>{
                        eventosFilter.push(es)
                    })
                }                
            }
            if(eventosFilter.length===0){
                carregaEventos(eventosFilter, "Eventos não encontrados.");
            }else{
                carregaEventos(eventosFilter)
            }

        }else{
            const dias = getDatesBetween(dataFilter.startDate, dataFilter.endDate);
            let eventosFilter = [];
            let eventosSUM = []
            for (let index = 0; index < dias.length; index++) {
                const dia = dias[index];
                eventosSUM = eventos.filter(ev => ev.day === dia.day).filter(ev => ev.month === dia.month);
                eventosSUM.map(es=>{
                    eventosFilter.push(es)
                })
            }  
            if(eventosFilter.length===0){
                carregaEventos(eventosFilter, "Eventos não encontrados.");
            }else{
                carregaEventos(eventosFilter)
            }    
        }
        return false;
    }
}