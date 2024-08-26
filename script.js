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

function filtro(event) {
    let eventos = [
        { day: 4, month: 'JAN', title: 'Reunião de Alinhamento', text: 'Definiremos de forma clara os objetivos de curto, médio e longo prazo. É essencial que todos entendam a missão principal do projeto e como seu trabalho contribui para a empresa.' },
        { day: 8, month: 'JAN', title: 'Conf. de Boas-Vindas', text: 'Aqui estão as informações adicionais sobre a Confraternização de Boas-Vindas' },
        { day: 18, month: 'FEV', title: 'Análise de Desempenho', text: 'Aqui estão as informações adicionais sobre Reunião de Análise de Desempenho!' },
        { day: 26, month: 'FEV', title: 'Planejamento de Marketing', text: 'Aqui estão as informações adicionais sobre Planejamento de Marketing!' },
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
        if (data.selectOption) {
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
                case 'Semana subsequente':

                    break;

                default:
                    break;
            }
            let eventosFilter = [];
            if (data.selectOption !== "Semana subsequente") {
                eventosFilter = eventos.filter(ev => ev.day === dataPesquisa.dia).filter(ev => ev.month === dataPesquisa.mes);
            } else {
                let hoje = new Date();
                let diaSemana = hoje.getDay();
                const proxSemana = (8 - diaSemana) % 7;
                const proxSegunda = new Date;
                proxSegunda.setDate(hoje.getDate() + proxSemana);
                console.log(proxSemana);

                eventosFilter = Array.from({ length: 5 }, (_, i) => {
                    const hoje = new Date;
                    hoje.setDate(proxSegunda.getDate() + i);
                    return hoje;
                });


                carregaEventos(eventosFilter, "Eventos não encontrados.")
            }

        }
        return false;
    }
}