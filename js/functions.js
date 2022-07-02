//Referencia aos botoes
const btnIniciar = document.getElementById('btnIniciar');
const btnParar = document.getElementById('btnParar');
const btnResetar = document.getElementById('btnResetar');
const btnRegressivo = document.getElementById('btnRegressivo');

//botoes de contagem regressiva
const btnSetado = document.getElementById('btnSetado');
const btnCancelar = document.getElementById('btnCancelar');

//Variável de controle
let interval;

{//Desabilitando btnParar:
   btnParar.disabled = true;
   btnParar.style.opacity = '0.5';
   btnParar.style.cursor = 'auto';
}

//contagem regrssiva
function setRegressTimer(){
   let setTimer = document.querySelector('.setTimer');

   setTimer.style.display = 'block';
   setTimeout(()=>{
      setTimer.style.transition = '.5s';
      setTimer.style.opacity = '1';
   })

}
btnRegressivo.addEventListener('click', setRegressTimer);

function stopRegressTimer(){
   let setTimer = document.querySelector('.setTimer');

   setTimeout(()=>{
      setTimer.style.transition = '.5s';
      setTimer.style.opacity = '0';
   })
   setTimeout(()=>{
      setTimer.style.display = 'none';
   },300);
}
btnCancelar.addEventListener('click', stopRegressTimer);

function disableButtons(){
   btnIniciar.disabled = false;
   btnIniciar.style.opacity = '1';
   btnIniciar.style.cursor = 'pointer';

   btnResetar.disabled = false;
   btnResetar.style.opacity = '1';
   btnResetar.style.cursor = 'pointer';

   btnRegressivo.disabled = false;
   btnRegressivo.style.opacity = '1';
   btnRegressivo.style.cursor = 'pointer';
}

function alarmSong(){
   const audio = document.querySelector('audio');
   const imgSong = document.querySelector('.audio-container');
   audio.play();

   imgSong.style.transition = '.3s'
   imgSong.style.opacity = '1';
   setInterval(()=>{
      imgSong.style.transition = '.3s'
      imgSong.style.opacity = '0';
   },4000)
}

function decrementTimer(min, sec){
   sec--;
   if(sec < 0){
      min--;
      sec = 59;
      return `${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`
   }else if(sec == 0 && min == 0){
      let outAviso = document.getElementById('outAviso');
      outAviso.innerHTML = 'Cronômetro';
      clearInterval(interval);
      alarmSong();
      disableButtons();
   }

   return `${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`

}

function initRegress(){
   let outTemporizador = document.getElementById('outTemporizador'),
      timer = outTemporizador.innerHTML;

   let divTimer = timer.split(':'),
      minutes = Number(divTimer[0]),
      seconds = Number(divTimer[1]);

   outTemporizador.innerHTML = decrementTimer(minutes, seconds);
}

function animationRegress(){
   let border = document.querySelector('.cronometro');
   let outTemporizador = document.getElementById('outTemporizador');
   let outAviso = document.getElementById('outAviso');

   border.style.border = '5px solid #FD4848'
   outTemporizador.style.color = '#FD4848';
   outAviso.style.color = '#FD4848'
   setTimeout(()=>{
      border.style.transition = '.4s';
      outTemporizador.style.transition = '.4s';
      outAviso.style.transition = '.4s'
      border.style.border = '5px solid white';
      outTemporizador.style.color = 'white';
      outAviso.style.color = 'white'
   },400)
}

function enableFullButton(){
   btnIniciar.disabled = true;
   btnIniciar.style.opacity = '0.5';
   btnIniciar.style.cursor = 'auto';

   btnParar.disabled = true;
   btnParar.style.opacity = '0.5';
   btnParar.style.cursor = 'auto';

   btnResetar.disabled = true;
   btnResetar.style.opacity = '0.5';
   btnResetar.style.cursor = 'auto';

   btnRegressivo.disabled = true;
   btnRegressivo.style.opacity = '0.5';
   btnRegressivo.style.cursor = 'auto';
}

function repeatRegress(){
   let outAviso = document.getElementById('outAviso');
   outAviso.innerHTML = 'Contagem Rolando'
   enableFullButton();
   interval = setInterval(()=>{
      initRegress()
      animationRegress();
   },1000)
}

function startRegressTimer(){
   let inMinute = document.getElementById('inMinute'),
      outTemporizador = document.getElementById('outTemporizador'),
      inSecond = document.getElementById('inSecond');

   let minute = Number(inMinute.value),
      second = Number(inSecond.value);

   if((minute == 0 || isNaN(minute)) && (second == 0 || second > 59 || isNaN(second))){
      alert('Por favor, defina o tempo para a contagem regressiva');
      inMinute.focus();
      return;
   }else if(minute == 0 || isNaN(minute) && second != 0){
      outTemporizador.innerHTML = `00:${second < 10 ? `0${second}` : second}`
      inSecond.value = '';
   }else if(second == 0 || isNaN(second) && minute != 0){
      outTemporizador.innerHTML = `${minute < 10 ? `0${minute}`: minute}:00`;
      inMinute.value = '';
   }else{
      outTemporizador.innerHTML = `${minute < 10 ? `0${minute}`: minute}:${second < 10 ? `0${second}` : second}`;
      inMinute.value = '';
      inSecond.value = '';
   }
   repeatRegress();
   stopRegressTimer();
}
btnSetado.addEventListener('click', startRegressTimer);

//resetando cronometro
function resetTimer(){
   let outTemporizador = document.getElementById('outTemporizador');
   let outAviso = document.getElementById('outAviso');
   let border = document.querySelector('.cronometro');
   let timer = outTemporizador.innerHTML;

   if(timer === '00:00'){
      alert('A contagem já está em zero')
      return;
   }

   if(timer != '00:00'){
      btnIniciar.value = 'Iniciar';
      outTemporizador.innerHTML = '00:00';
      outAviso.innerHTML = 'Resetando';
      outAviso.style.color = '#FD4848';
      outTemporizador.style.color = '#FD4848';
      border.style.border = '5px solid #FD4848';

      btnRegressivo.disabled = false;
      btnRegressivo.style.opacity = '1';
      btnRegressivo.style.cursor = 'pointer';

      setTimeout(()=>{
         outAviso.style.transition = '.4s';
         outTemporizador.style.transition = '.4s';
         border.style.transition = '.4s';
         outAviso.style.color = 'white';
         outTemporizador.style.color = 'white';
         border.style.border = '5px solid white';
         outAviso.innerHTML = 'Cronômetro'
      }, 400)
   }
   
}
btnResetar.addEventListener('click', resetTimer);

//Pausar cronometro e habilitando botões
function enableStart(){
   btnIniciar.value = 'Continuar';
   btnIniciar.disabled = false;
   btnIniciar.style.opacity = '1';
   btnIniciar.style.cursor = 'pointer';

   btnParar.disabled = true;
   btnParar.style.opacity = '0.5';
   btnParar.style.cursor = 'auto';

   btnResetar.disabled = false;
   btnResetar.style.opacity = '1';
   btnResetar.style.cursor = 'pointer';
}

function stopTimer(){
   let outAviso = document.getElementById('outAviso');

   outAviso.innerHTML = 'Pausado';
   clearInterval(interval)

   enableStart();
}
btnParar.addEventListener('click', stopTimer)

//Iniciar cronômetro e animação
function enableStop(){
   btnIniciar.disabled = true;
   btnIniciar.style.opacity = '0.5';
   btnIniciar.style.cursor = 'auto';

   btnParar.disabled = false;
   btnParar.style.opacity = '1';
   btnParar.style.cursor = 'pointer';

   btnResetar.disabled = true;
   btnResetar.style.opacity = '0.5';
   btnResetar.style.cursor = 'auto';

   btnRegressivo.disabled = true;
   btnRegressivo.style.opacity = '0.5';
   btnRegressivo.style.cursor = 'auto';
}

function animationStart(){
   let border = document.querySelector('.cronometro');
   let outTemporizador = document.getElementById('outTemporizador');
   let outAviso = document.getElementById('outAviso');

   border.style.border = '5px solid #31EF17'
   outTemporizador.style.color = '#31EF17';
   outAviso.style.color = '#31EF17'
   setTimeout(()=>{
      border.style.transition = '.4s';
      outTemporizador.style.transition = '.4s';
      outAviso.style.transition = '.4s'
      border.style.border = '5px solid white';
      outTemporizador.style.color = 'white';
      outAviso.style.color = 'white'
   },400)
}

function startTimer(min,sec){
   sec++;//Encremento de valor em segundos
   if(sec === 60){//condição para setar minuto
      min++;//encremento de valor em minutos
      sec = 0;//zerando valor em segundos
      return `${(min < 10 ? `0${min}` : min)}:${(sec < 10 ? `0${sec}` : sec)}`; 
   }

   return `${(min < 10 ? `0${min}` : min)}:${(sec < 10 ? `0${sec}` : sec)}`; 
}

function startCrono(){
   let outTemporizador = document.getElementById('outTemporizador'),
      timer = outTemporizador.innerHTML;//pegando elemento

   //dividindo elemento e transformando em número
   let divTimer = timer.split(':'),
      minute = Number(divTimer[0]),
      second = Number(divTimer[1]);

   outTemporizador.innerHTML = startTimer(minute, second);//retornando resultado da função
   

}
btnIniciar.addEventListener('click', ()=>{
   btnIniciar.value = 'Iniciar';
   let outAviso = document.getElementById('outAviso');

   outAviso.innerHTML = 'Cronometrando'

   interval = setInterval(()=>{
      startCrono();
      animationStart();
   },1000);

   enableStop();
})




















