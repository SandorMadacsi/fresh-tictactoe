
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

    const board = [];

    for(let i = 0; i < 9; i++){
        board.push(Cell());
    }

    const getBoard = () => {
        return board.map((cell) => cell.getValue());
    }

    const dropToken = (cellPos,playerToken) => {
        board[cellPos].setValue(playerToken);
    }

    return{getBoard, dropToken}
}


function Cell(){

    let value  = null;

    const setValue = (player) => {
        value = player;
    }

    const getValue = () => value;

    return {setValue, getValue};
}

function Controller(
    player1 = Player("player1", "x"),
    player2 = Player("player2", "o")){

    const board = Board();


    }
    
function Player(name, token){
    const name = name;
    const token = token;
    let score = 0;

    const getName = () => name;
    const getToken = () => token;
    const getScore = () => score;
    const setScore = () => {
        this.score = score + 1;
    }

    return{getName, getToken, getScore, setScore}
}

    
function boardInterface()
{
    // UI / DOM LOGIC GOES HERE

}