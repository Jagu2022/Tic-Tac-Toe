
const displayControler = (() => {
  
const renderMessage = (message) => {
  document.querySelector('.message').innerHTML = message
  }
  return{
    renderMessage,
  }
})()


const Gameboard = (() => {
  const gameBoard = ["", "", "", "", "", "", "", "", ""];
  const render = () => {
    let boardHtml = '';
    gameBoard.forEach((square, index) => {
      boardHtml += `<div class='square' id="square-${index}">${square}</div>`
      document.querySelector('#gameBoard').innerHTML=boardHtml
      })
      const squares = document.querySelectorAll('.square')
      squares.forEach((square) => {
        square.addEventListener('click', Game.handleClick)
    })
  }
  const update = (index, value) => {
    gameBoard[index] = value;
    console.log(value)
    render()
  }
  
  const getGameBoard = () => gameBoard
  
  return{
      render,
      update,
      getGameBoard,
    }
})()

const createPlayer = (name, mark) => {
  return {
    name,
    mark,
  }
}

const Game = (() => {
  let players = [];
  let currentPlayerIndex;
  let gameOver;
  const start = () => {
    players = [
      createPlayer(document.querySelector("#player_1").value, "X"),
      createPlayer(document.querySelector("#player_2").value, "O")
    ]
    currentPlayerIndex = 0;
    gameOver = false
    Gameboard.render()
    const squares = document.querySelectorAll('.square')
      squares.forEach((square) => {
        square.addEventListener('click', handleClick)
      })
  }
  
  const handleClick = (event) => {
    if(gameOver){
      return
    }
    let index = parseInt(event.target.id.split('-')[1])
    if(Gameboard.getGameBoard()[index] != "")
      return
      
      Gameboard.update(index, players[currentPlayerIndex].mark)
      
    if(checkForWin(Gameboard.getGameBoard(), players[currentPlayerIndex].mark)){
      gameOver = true
      displayControler.renderMessage(`${players[currentPlayerIndex].name} win!`)
    }else if(checkForTie(Gameboard.getGameBoard())){
      gameOver = true
      displayControler.renderMessage("It's a tie")
    }
    
      currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0
    console.log(index)
  }
  
  const reStart = () => {
    for (let i = 0; i < 9; i++) {
      Gameboard.update(i,'')
    }
    Gameboard.render()
    gameOver = false
    document.querySelector('.message').innerHTML=''
  }
  
    return{
      start,
      handleClick,
      reStart
    }
})()

const checkForWin = (board) => {
  let winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
    ];
    for(let i=0; i<winningCombinations.length; i++){
      const [a,b,c] = winningCombinations[i]
      if(board[a] && board[a] === board[b] && board[a] === board[c]){
        return true
      }
    }
    return false
}

const checkForTie = (board) => {
  return board.every( cell => cell != '')
}

const startBtn = document.querySelector('.start')
startBtn.addEventListener("click", function(){
  Game.start()
})

const restartBtn = document.querySelector('.restart')
restartBtn.addEventListener("click", function() {
  Game.reStart()
})