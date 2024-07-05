const html = document.querySelector('html');
const btnFoco = document.querySelector('.app__card-button--foco');
const btnCurto = document.querySelector('.app__card-button--curto');
const btnLongo = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const iniciarOuPausarBtn = document.querySelector('#start-pause span');
const tempoNaTela = document.querySelector('#timer')

const botoes = document.querySelectorAll('.app__card-button');
const startPauseBtn = document.querySelector('#start-pause');
const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3');

musica.loop = true;


let tempoDecorridoEmSegundos = 5;
let intervaloId = null;


musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
})

btnFoco.addEventListener('click', () => {
    alterarContexto('foco');
    btnFoco.classList.add('active');


})

btnCurto.addEventListener('click', () => {
    alterarContexto('descanso-curto');
    btnCurto.classList.add('active');


})

btnLongo.addEventListener('click', () => {
    alterarContexto('descanso-longo');
    btnLongo.classList.add('active');

})

function alterarContexto (contexto) {
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
                Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
                `
            break;
        case "descanso-curto" : 
            titulo.innerHTML = `
                Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta.</strong>
                `
            break;
            case "descanso-longo" : 
            titulo.innerHTML = `
                Hora de voltar a superfíce.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>
                `
            default:
                break;

    }
}


const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        zerar();
        return
    } else {
    tempoDecorridoEmSegundos -= 1
    }
    mostrarTempo();
}

startPauseBtn.addEventListener('click', iniciarEpausar);

function iniciarEpausar() {
    if(intervaloId){
        zerar()
        return
    }
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausarBtn.textContent = "Pausar"
}

function zerar() {
    clearInterval(intervaloId) 
    iniciarOuPausarBtn.textContent = "Começar"
    intervaloId = null;
    temporizador = 5;
}

function mostrarTempo() {
    const tempo = tempoDecorridoEmSegundos 
    tempoNaTela.innerHTML = `${tempo}`
}