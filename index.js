//DECLARAR OBJECTES
const partidaActualObj = document.getElementById("puntuacioPartidaActual");
const infonavegadorObj = document.getElementById("info-navegador");
const infoURLObj = document.getElementById("info-url");
const btnPartida = document.getElementById("comencarPartida");
const nomJugadorObj = document.getElementById("nomJugador");
// DECLARAR EVENTS
btnPartida.addEventListener("click", comencarPartida);
//DECLARAR VARIABLES I CONSTANTS
let finestra;
//FUNCIONALITAT

//a Broadcast to communicate between the windows
const broadcastChannel = new BroadcastChannel("my_channel");
  

function comencarPartida(){
    if(nomJugadorObj.value){
       finestra= window.open("joc.html");
       broadcastChannel.postMessage({ type: 'test', content: 'Game started' });
        //sendToGameWindow();
        puntsPartidaActuals();
       //store name of jugador in a cookie
       document.cookie = "playerName=" + nomJugadorObj.value;       
    }else{
        alert("Has d'informe el nom d'un jugador");
    }
}
function borrarPartida(){
    if (finestra) {
        finestra.close();
        finestra = null;
    }
}
//get player name from stored cookie
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function puntsPartidaActuals(isFinal = false, points = 0) {
    const playerName = getCookie("playerName") || "Jugador 1"; // Retrieve name from cookie
    const estat = isFinal ? "Partida Finalizada" : "En joc";
    document.getElementById("puntuacioPartidaActual").textContent = 
        `NOM: ${playerName}, PUNTS: ${points}, ESTAT PARTIDA: ${estat}`;
}

function infonavegador(){
    const color="orange";
    infonavegadorObj.textContent = navigator.userAgent; // Shows browser information
    infonavegadorObj.style.color = color;
}

function infoURL(){
    const color="orange";
    infoURLObj.textContent = window.location.href;
    infoURLObj.style.color = color;  
}
//call the functions
 infonavegador();  
 infoURL();
 
