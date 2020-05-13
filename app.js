
var scores, roundScore, activePlayer, gamePlaying, lastDice, lastDice2, playTo;

init();

document.querySelector('.btn-roll').addEventListener('click', function(){
    
    if(gamePlaying){
        var dice = Math.floor(Math.random() * 6) +1 ;
        var dice2 = Math.floor(Math.random() * 6) +1 ;
        
    var diceDOM = document.querySelector('.dice')
    var diceDOM2 = document.querySelector('.dice2')
    
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    diceDOM2.style.display = 'block';
    diceDOM2.src = 'dice-' + dice2 + '.png';

        
    if (dice === 6 && lastDice === 6 || dice2 === 6 && lastDice2 ===6 ){
        scores[activePlayer] = 0;
        roundScore = 0;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        nextPlayer();
        
    }else if (dice  !== 1 && dice2 !== 1){

        roundScore = roundScore + dice + dice2;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
                
    }else {
        nextPlayer();
        
    }
}
    lastDice = dice;
    lastDice2 = dice2;
  }
);



document.querySelector('.btn-hold').addEventListener('click', function(){
    
    if(gamePlaying){
            
    scores[activePlayer] += roundScore;
    
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    
   if (scores[activePlayer] >= playTo){

       document.querySelector('#name-' + activePlayer).textContent = 'Winner!';

       document.querySelector('.dice').style.display = 'none';
       document.querySelector('.dice2').style.display = 'none';

       document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
       document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
       gamePlaying = false;

   } else{

       nextPlayer();
   }
    }
        
});



function nextPlayer(){

        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');

        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.dice2').style.display = 'none';

}

document.querySelector('.btn-new').addEventListener('click', init);

function init(){
    playTo = document.getElementById('playTo').value
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
   
    gamePlaying = true;
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');
}












