
//All global scope variables
let scores, roundScore, activePlayer, gamePlaying, lastDice, lastDice2, playTo;

//Initiate fresh start
init();

//Roll button function
document.querySelector('.btn-roll').addEventListener('click', function() {
    
    //State variable check
    if (gamePlaying) {

        //Dices roll
        var dice = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) +1 ;

        //Dices dom JS var
        let diceDOM = document.querySelector('.dice');
        let diceDOM2 = document.querySelector('.dice2')

        //Display dices and set appropriate image
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
        diceDOM2.style.display = 'block';
        diceDOM2.src = 'dice-' + dice2 + '.png';
        
        //Check both dices for current and previous rolls if equal to 6 and reset GLOBAL score,
        if (dice === 6 && lastDice === 6 || dice2 === 6 && lastDice2 ===6 ) {
            scores[activePlayer] = 0;
            roundScore = 0;
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
            nextPlayer();

        //If none of the dices are 1, add score to round score    
        } else if (dice  !== 1 && dice2 !== 1){
            roundScore = roundScore + dice + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;

        //If one of the current dices is 1
        }else {
            nextPlayer();
        }
    //Previous dice rolls, saved after running the function
    lastDice = dice;
    lastDice2 = dice2;
    }

});

//Hold button function
document.querySelector('.btn-hold').addEventListener('click', function() {
    
    //Check state variable
    if (gamePlaying) {
        
        //Adding the CURRENT score to the GLOBAL score
        scores[activePlayer] += roundScore;

        //Update the global score panel of the active player
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //Check if winning conditions are met, add winner class and name to winner player panel, and change state variable to false, else nextPlayer
        if (scores[activePlayer] >= playTo) {
            document.getElementById('name-' + activePlayer).textContent = 'Winner!';

            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.dice2').style.display = 'none';

            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});

//Changes current active player, toggles the active player panel on/off, resets the dice 
function nextPlayer() {

    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = 0;

        //Active player panel toggle
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');

        //Remove previous dices at player change
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.dice2').style.display = 'none';

};

//New game button event listener
document.querySelector('.btn-new').addEventListener('click', init);

//Reset and load game variables and reset display values
function init() {

    //Set game variables
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    playTo = document.getElementById('playTo').value

    //Hide dices at load
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';


    //Reset values
    document.getElementById('score-0').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //Remove WINNER and ACTIVE class if any and set Player 1 as active player
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

    //Remove WINNER as player name if any
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    //Initiating state variable to true
    gamePlaying = true;

};
