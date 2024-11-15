
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

    const setBoard = () => {
        board = [];
        for(let i = 0; i < 9; i++){
        board.push(new Cell());
        }
    }

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

    return{setBoard, getBoard, dropToken, checkMove}
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

    const player1 = new Player("player1", "x");
    const player2 = new Player("player2", "o");
 

    let isPlaying = true;
    let board = Board();


    let activePlayer = player1;
    

    const switchPlayer = () => {
        console.log("switching")
        activePlayer === player1 ? activePlayer = player2 : activePlayer = player1;

    }

    const getActivePlayer = () => activePlayer;

    const printRound = () => {
        console.log(board.getBoard());
    }

    const playRound = () => {

        let move = Math.floor(Math.random() * 9);
        console.log(`${activePlayer.getName()}'s turn`);
        console.log(`${activePlayer.getToken()}`)
        console.log("===========================");
        if(isPlaying && board.checkMove(move)){
            console.log(`Dropping ${getActivePlayer().getName()}'s token into cell: ${move}`)
            board.dropToken(move, getActivePlayer().getToken());
            printRound();
            for(let winCon in winConditions){
                checkWinCon(winConditions[winCon])
            }
            switchPlayer();
    
        }
        

    }

    // Checks a single win condition eg. horizontal cells , vertical cells, diagonal cells
    const checkWinCon = (rows) => {
        let currentBoard = board.getBoard();
        let currentRow = [];
      
        
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
                    console.log(`${activePlayer.getName()} won`)
                    isPlaying = false;
                }
            }

        }
    }

    // Play is run each time a game is played. A play can end in win of either side or draw.
    const play = () => {

        board.setBoard();
        isPlaying = true;

        while(isPlaying && board.getBoard().includes(null)){
            playRound();
        }
        if(!isPlaying){
            console.log("Game Over");

        }
        else if(!board.getBoard().includes(null)){
            console.log("its a draw");
        }
    }

    return{playRound,play,getActivePlayer, getBoard: board.getBoard}

}
    
function Player(name, token){
    this.name = name;
    this.token = token;
    let score = 0;

    const getName = () => name;
    const getToken = () => this.token;
    const getScore = () => score;
    const setScore = () => {
        this.score = score + 1;
    }

    return{getName, getToken, getScore, setScore}
}

    
function BoardInterface()
{
    let canvas = document.querySelector('.canvas-container');
    let playButton = document.querySelector('.play');
    
    const game = Controller();
    playButton.addEventListener('click', function(){
        game.play();
        displayBoard();
    });

    const displayBoard = () => {

        const board = game.getBoard();

        

        canvas.innerHTML = "";
        canvas.setAttribute('style', `display:grid;
                                      grid-template-columns:repeat(3, 1fr)`);
                                    
        

    
     //board.forEach(cell,i) => {
        console.log(board);
    // }
        board.forEach((cell , i) => {

        let unit = document.createElement('div');
        unit.id = i;
        let valContainer = document.createElement('div');
        unit.classList.add('unit');
        let value = document.createElement('h1');
        value.innerHTML = "Test";

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
        //unit.addEventListener('click',clickMove);
        value.innerText= cell;
    });

    }
    // function clickMove(e){

    //     const selectedDiv = Number(e.currentTarget.id);
    //     console.log(selectedDiv);

    //     if(selectedDiv !==0 && !selectedDiv){
    //         console.log("the field is taken");
    //         return;
    //     } 

    //     game.playRound(selectedDiv);
    //     displayBoard();
    // }



    return{displayBoard}

}

const b = BoardInterface();


