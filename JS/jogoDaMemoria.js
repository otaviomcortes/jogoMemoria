const container = document.querySelector('.container');
const spanJogador = document.querySelector('.jogador');
const spanTempo = document.querySelector('.tempo');

const herois = [
    'thor',
    'rocket',
    'homem_de_ferro',
    'capitao_america',
    'homem_aranha',
    'groot',
    'feiticeira_escarlate',

];

let primeiraCarta = '';
let segundaCarta = '';

const fimDeJogo = () =>{
    const cartasDesabilitadas = document.querySelectorAll('.cartasAcertadas');

    if(cartasDesabilitadas.length === 14){
        clearInterval(this.tempoDeJogo);
        alert(`Parabéns, ${spanJogador.innerHTML} você ganhou! Tempo: ${spanTempo.innerHTML}`);
    }
}

const checaCartas = () => {
    const primeiroHeroi = primeiraCarta.getAttribute('data-heroi');
    const segundoHeroi = segundaCarta.getAttribute('data-heroi');

    if(primeiroHeroi === segundoHeroi){
        primeiraCarta.firstChild.classList.add('cartasAcertadas');
        segundaCarta.firstChild.classList.add('cartasAcertadas');

        primeiraCarta = '';
        segundaCarta = '';

        fimDeJogo();
    }else{
        setTimeout(() => {
            primeiraCarta.classList.remove('revelaCarta');
            segundaCarta.classList.remove('revelaCarta');

            primeiraCarta = '';
            segundaCarta = '';
        },500);
    }
}

const revelaCarta = ({target}) =>{

    if(target.parentNode.className.includes('revelaCarta')){
        return;
    }
    if(primeiraCarta === ''){
        target.parentNode.classList.add('revelaCarta');
        primeiraCarta = target.parentNode;
    }else if(segundaCarta === ''){
        target.parentNode.classList.add('revelaCarta');
        segundaCarta = target.parentNode;

        checaCartas();
    }
}

const criaElemento = (tag, classe) =>{
    const elemento = document.createElement(tag);
    elemento.className = classe;
    return elemento;
}

const criarCarta = (heroi) => {
    const carta = criaElemento('div', 'card');
    const frente = criaElemento('div', 'face frente');
    const costas = criaElemento('div', 'face costas');

    frente.style.backgroundImage = `url('Imagens/${heroi}.jpeg')`;

    carta.appendChild(frente);
    carta.appendChild(costas);

    carta.addEventListener('click', revelaCarta);

    carta.setAttribute('data-heroi',heroi);

    return carta;
}

const carregaJogo = () => {
    const duplicaHerois = [...herois,...herois];

    const embaralhaHerois = duplicaHerois.sort(()=> Math.random()-0.5);

    embaralhaHerois.forEach((heroi)=>{
        const carta = criarCarta(heroi);
        container.appendChild(carta);
    });
}

const comecaTempo = () => {
    let contador = 0;
    this.tempoDeJogo = setInterval(() => {
        contador++; 
        spanTempo.innerHTML = contador;
    }, 1000);
}

window.onload = () => {

    const nomeJogador = localStorage.getItem('jogador');

    spanJogador.innerHTML = nomeJogador;

    comecaTempo();
    carregaJogo();
}
