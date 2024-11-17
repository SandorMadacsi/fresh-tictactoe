
const winConditions = [
    [
       [0,1,2],
       [3,4,5],
       [6,7,8]
   ],
   [
       [0,3,6],
       [1,4,7],
       [2.5,8]
   ],
   [
       [0,4,8],
       [2,4,6]
   ]

]
function Board(){

    let board = [];
    

    this.init = function(){
        board = [];
        for(let i = 0; i < 9; i++){
        board.push(new Cell());
        }
    };

    const getBoard = () => {
        return board.map((cell) => cell.getValue());
    }

    const dropToken = (cellPos,playerToken) => {
        board[cellPos].setValue(playerToken);
    }

    const checkMove = move => {
        if(board[move] !== undefined &&
           board[move].getValue() === null
        )return true;
        else
        return false;
    }
    this.init();

    return{init:this.init, getBoard, dropToken, checkMove}
}


function Cell(){

    let value  = null;

    const setValue = (player) => {
        value = player;
    }

    const getValue = () => value;

    return {setValue, getValue};
}

function Controller()
{
    let player1 = new Player("Player 1", "x");
    const player2 = new Player("Player 2", "o");
 
    let isPlaying = true;
    let board = Board();

    let activePlayer = player1;
    
    const switchPlayer = () => {
        console.log("switching")
        activePlayer === player1 ? activePlayer = player2 : activePlayer = player1;

    }

    const setPlayerName = (name,player) => player.setName(name);
    const getActivePlayer = () => activePlayer;
    const printRound = () => {
        console.log(board.getBoard());
    }

    //reset game conditions
    const play = () =>{
        board.init();
        isPlaying = true;
    }

    const playRound = (move) => {
    
        console.log(`${activePlayer.getName()}'s turn`);
        console.log(`${activePlayer.getToken()}`)
        console.log("===========================");
        if(board.checkMove(move)){
            console.log(`Dropping ${getActivePlayer().getName()}'s token into cell: ${move}`);
            board.dropToken(move, getActivePlayer().getToken());
            printRound();

            for(let winCon in winConditions){
               result = checkWinCon(winConditions[winCon])
               if(result.length>0){
                break;
               }

            }
 
        if(!board.getBoard().includes(null)){
            return {message:"draw", result};
        }
       else if(!isPlaying){
        console.log(result);
            return{message:`${activePlayer.getName()} won`, result};
        }
        else {
            switchPlayer();
            return {message:"in-game", result};
        }
    
        }

    }

    // Checks a single win condition eg. horizontal cells , vertical cells, diagonal cells
    const checkWinCon = (rows) => {
        let currentBoard = board.getBoard();
        let currentRow = [];
        let result = []
        for(let row in rows){
            let counter = 0;
            currentRow = rows[row];
            if(isPlaying){
                currentRow.forEach(element => {
                    if(currentBoard[element] === activePlayer.getToken()){
                        counter++;
                      }
                });
                if(counter == 3){
                    isPlaying = false;
                    result = currentRow;
                }
            }

        }
        return result;
    }

    // Play is run each time a game is played. A play can end in win of either side or draw.

    return{playRound,getActivePlayer,setPlayerName, getBoard: board.getBoard, play}

}
    
function Player(n, token){
    this.name = n;
    this.token = token;
    let score = 0;

    const getName = () => this.name;
    const setName = (name1) => this.name = name1;
    const getToken = () => this.token;
    const getScore = () => score;
    const setScore = () => {
        this.score = score + 1;
    }
    return{getName, setName, getToken, getScore, setScore}
}

    
function BoardInterface()
{
    const game = Controller();
    let canvas = document.querySelector('.canvas-container');
    canvas.classList.add('gameover');
    let playButton = document.querySelector('.play');

    let state_message = document.querySelector('#state-message');
    state_message.innerHTML = "to be started";

    playButton.addEventListener('click', function(){
        canvas.classList.remove('gameover');
        game.play();

        state_message.innerHTML = "in-game";
        displayBoard();
    });



    const displayBoard = () => {

        const board = game.getBoard();
        canvas.innerHTML = "";
        canvas.setAttribute('style', `display:grid;
                                      grid-template-columns:repeat(3, 1fr)`);
                                    

        board.forEach((cell , i) => {

        let unit = document.createElement('div');
        unit.id = i;
        let valContainer = document.createElement('div');
        unit.classList.add('unit');
        let value = document.createElement('h1');

        valContainer.appendChild(value);
        valContainer.classList.add('valConainer');
        unit.setAttribute('style', `width: 100%;
                                    height: 100%;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;`);

        valContainer.setAttribute('style',`
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    width: 150px;
                                    height: 150px;
                                    `);

        value.setAttribute('style',`
        font-size:180px;
        `);
        unit.appendChild(valContainer);
    


        canvas.appendChild(unit);
        unit.addEventListener('click',clickMove);
        value.innerText= cell;
        if(cell != null){
            unit.classList.add("gameover");
        }
    });

    if(state_message.innerHTML == "in-game"){
        playButton.classList.add('gameover');
    }

   else{
        canvas.classList.add('gameover');
        playButton.classList.remove('gameover');
    }

    }
    function clickMove(e){
        const board = game.getBoard();
        const selectedDiv = Number(e.currentTarget.id);
        
        //taken cells
  
            //playing rounds
            let obj = game.playRound(selectedDiv);
            let message = obj.message;
            state_message.innerHTML = message;
            displayBoard();

            //highlight winning row
            if(obj.result.length > 0){
                console.log("reached");
                let [v1,v2,v3] = obj.result
                let win1 = document.getElementById(v1);
                let win2 = document.getElementById(v2);
                let win3 = document.getElementById(v3);
                win1.classList.add('winner');
                win2.classList.add('winner');
                win3.classList.add('winner');
                console.log(win1);
            }
        
    }

    displayBoard();
    return{displayBoard}

}

const b = BoardInterface();


