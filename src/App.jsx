import { useState } from "react";
import Player from "./components/player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import GameOver from "./components/GameOver.jsx";
import { WINNING_COMBINATIONS } from "./WINNING_COMBINATIONS.js";

const PLAYERS = {
  X: "player 1",
  O: "player 2",
}

const INITIAL_GAME_BOARD = [
  [ null, null, null ],
  [ null, null, null ],
  [ null, null, null ],
];

function driveActivePlayer ( gameTurns )
{
  let currntPlayer = "X";

  if ( gameTurns.length > 0 && gameTurns[ 0 ].player === "X" )
  {
    currntPlayer = "O";
  }
  return currntPlayer;
}

function driveWinner (board, players)
{
  let winner = "";

  for ( const compination of WINNING_COMBINATIONS )
  {
    const firstSquare = board[ compination[ 0 ].row ][ compination[ 0 ].column ];
    const secondSquare = board[ compination[ 1 ].row ][ compination[ 1 ].column ];
    const thirdSquare = board[ compination[ 2 ].row ][ compination[ 2 ].column ];
    if ( firstSquare && firstSquare === secondSquare && firstSquare === thirdSquare )
    {
      winner = players[ firstSquare ];
    }
  }

  return winner;
}

function driveGameBoard ( gameTurns )
{
  let board = [ ...INITIAL_GAME_BOARD.map( a => [ ...a ] ) ];
  for ( const turn of gameTurns )
  {
    const { square, player } = turn;
    const { row, col } = square;
    board[ row ][ col ] = player;
  }

  return board;
}


function App ()
{
  const [ players, setPlayers ] = useState( PLAYERS );
  const [ gameTurns, setGmaeTurns ] = useState( [] );
  const activePlayer = driveActivePlayer( gameTurns );
  const board = driveGameBoard( gameTurns );
  const winner = driveWinner( board, players );
  const hasDraw = gameTurns.length === 9 & !winner;

  function handelSelectSquare ( rowIndex, colIndex )
  {
    setGmaeTurns( ( prevTurns ) =>
    {
      const currntPlayer = driveActivePlayer( prevTurns );
      const updateTurns = [ {
        square:
          { row: rowIndex, col: colIndex },
        player: currntPlayer
      }, ...prevTurns ];
      return updateTurns;
    } );
  }

  function handelRestart () {setGmaeTurns( [] )}

  function handelPlayerChange ( symbol, newName )
  {
    setPlayers( ( prevPlayers ) =>
    {
      return {
        ...prevPlayers,
        [ symbol ]: newName,
      };
    } );
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name={PLAYERS.X} symbol="X" isActive={ activePlayer === "X" } onChangeName={ handelPlayerChange } />
          <Player name={PLAYERS.O} symbol="O" isActive={ activePlayer === "O" } onChangeName={ handelPlayerChange } />
        </ol>
        { ( winner || hasDraw ) ? <GameOver onRestart={ handelRestart } winner={ winner } /> : "" }
        <GameBoard onSelectSquare={ handelSelectSquare } board={ board } />
      </div>
      <Log turns={ gameTurns } />
    </main>
  );
}

export default App;
