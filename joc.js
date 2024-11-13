const lletresContainer = document.getElementById("lletres");
const btnmostrarInstrucions = document.getElementById("MostraLesInstruccions");
const parellsTotal = 10; //Total pairs
let numParellTrobats = 0; // To count matched pairs
let finestra;
let playerName = 'Jugador 1'; // Default player name
let points = 0; // Initialize points
//EVENTS
btnmostrarInstrucions.addEventListener("click", MostraLesInstruccions);
//FUNCTIONS
//A broadcast channel to communicate between two windows
const broadcastChannel = new BroadcastChannel("my_channel");


//A funtion to open the instructions window
function MostraLesInstruccions() {
    finestra = window.open("instructions.html", " ", "width=400,height=400");
  }
  
function updatePointsDisplay() {
    document.getElementById("punts").textContent = `Punts: ${points}`;
}

// store letters in an array
const letters = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H','I','I','J','J'];
const shuffledLetters = shuffle(letters);
// Shuffle letters function
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
//Display the buttons
shuffledLetters.forEach((letter) => {
    const button = document.createElement('button');
    button.classList.add('tile');
    button.dataset.letter = letter;
    button.textContent = ''; // Hide letter initially
    button.onclick = () => handleTileClick(button);
    lletresContainer.appendChild(button);
});
//set the initial tile values to null
let tile1='';
let tile2='';
function handleTileClick(tile){
    if(tile.textContent!=='')  //check if letter is already revealed
        return;
    tile.textContent=tile.dataset.letter;   //Show the letter
    if(!tile1){    
        tile1=tile;  
    }else if(!tile2){
        tile2=tile;
        checkForMatch();

    }     
}
//A function to check for the matching tiles
function checkForMatch() {
    if (tile1.dataset.letter === tile2.dataset.letter) {
        points += 10;
        updatePointsDisplay(); // Update points display if needed
        numParellTrobats++; // Increment matched pairs counter
        tile1 = '';
        tile2 = '';

        // Check if game is finished
        esPartidaFinalitzada();
    } else {
        points = Math.max(0, points - 3); // Si no encerta resten 3 punts but avoids negative values.
        updatePointsDisplay();
        setTimeout(() => {
            
            tile1.textContent = '';
            tile2.textContent = '';
            tile1 = '';
            tile2 = '';
            
        }, 500); 
        
    }
    
}



function esPartidaFinalitzada() {
    if (numParellTrobats === parellsTotal) {
        localStorage.removeItem('esPartidaComenzada');
        sessionStorage.setItem('maxPunts', points); // Store final points
        window.location.href = "finalizada.html"; // Redirect to game finished page
        //window.location.assign = "finalizada.html"; No funciona
    }
}


