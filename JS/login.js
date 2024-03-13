const input = document.querySelector('.login_input');
const button = document.querySelector('.login_button');

const form = document.querySelector('.login_form');

const validaInput = ({target}) =>{
    if(target.value.length >= 1){
        button.removeAttribute('disabled');
    }else{
        button.setAttribute('disabled','');
    }
}

const salvaJogador = (event) => {
    event.preventDefault();
    localStorage.setItem('jogador',input.value);
    window.location = 'jogoDaMemoria.html'
}

input.addEventListener('input', validaInput);
form.addEventListener('submit', salvaJogador)