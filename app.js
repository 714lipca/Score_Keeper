const resetButton = document.querySelector('#reset');
const addPlayersOneName = document.querySelector('#p1Name');
const addPlayersTwoName = document.querySelector('#p2Name');
const winningScoreSelect = document.querySelector('#playTo');
const tableUl = document.querySelector('#tableScore');
const tableButton = document.querySelector('#shTable');
const placeholderTable = document.querySelector('#placeholder');

let isGameOver = false;
let winningScore = 3;
const table = [];
tableUl.hidden = true;

const p1 = {
    name: 'Player One',
    score: 0,
    button: document.querySelector('#p1Add'),
    display: document.querySelector('#p1Display')
}

const p2 = {
    name: "Player Two",
    score: 0,
    button: document.querySelector('#p2Add'),
    display: document.querySelector('#p2Display')
}

addPlayersOneName.addEventListener('change', function (e) {
   p1.name = e.target.value;
})

addPlayersTwoName.addEventListener('change', function (e) {
 p2.name = e.target.value;
})

p1.button.addEventListener('click', function () {

    updateScores(p1, p2, p1.name);

})

p2.button.addEventListener('click', function () {
   
    updateScores(p2,p1, p2.name);

})

winningScoreSelect.addEventListener('change', function() {
    winningScore = parseInt(this.value);
    reset();
})

resetButton.addEventListener('click', reset);

tableButton.addEventListener('click', function() {
    if (tableUl.hidden===true)
    {
        tableUl.hidden = false;
    }   
    else
    {
        tableUl.hidden = true
    } 
})

function updateScores(player, opponent, winnerName) {
    if (!isGameOver)
    {
        player.score++;
        if (player.score >= winningScore && player.score - 1 > opponent.score)
        {
            isGameOver = true;
            player.display.classList.add('has-text-success');
            opponent.display.classList.add('has-text-danger');
            player.button.disabled = true;
            opponent.button.disabled = true;
            table.push(new Match(player.name, opponent.name, player.score, opponent.score, 12))
            placeholderTable.hidden = true;
            let i = table.length - 1;
                console.log(i);
                let li = document.createElement("li");
                li.appendChild(document.createTextNode(`Match number ${i+1}, Winner: "${table[i].playerOne}", Loser: "${table[i].playerTwo}", Score: ${table[i].p1Score}:${table[i].p2Score}, Time: ${obtainDate()}`));
                tableUl.appendChild(li);

        }
        player.display.textContent = player.score;
    }  
}

function reset () {
    isGameOver = false;
    for (let p of [p1,p2])
    {
        p.score=0;
        p.display.textContent = 0;
        p.display.classList.remove('has-text-success','has-text-danger');
        p.button.disabled = false;
    }
}

function obtainDate () {

    const date = new Date();
    const hour = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    if (parseInt(seconds)<10)
    {
        seconds = `0${date.getSeconds()}`;
    }
    
    if (parseInt(minutes)<10)
    {
        minutes = `0${date.getMinutes()}`; 
    }
     
return `${hour}:${minutes}:${seconds}`;
}

function Match (playerOne = "Felix", playerTwo = "Laura", p1Score = 3, p2Score = 2, hour = 12) {
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;
    this.p1Score = p1Score;
    this.p2Score = p2Score;
    this.hour = hour;
}