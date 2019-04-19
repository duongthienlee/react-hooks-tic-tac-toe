import React, { useState, useRef, useEffect } from 'react';
import Board from "./components/Board"
import './App.css';
import zToA from "./icons/zToA.svg"
import aToZ from "./icons/aToZ.svg"
function Game() {
  //----------------------------------------- useState ---------------------------------------------------
  const [historyState, setHistoryState] = useState([{ squares: Array(9).fill(null) }]);
  const [isXNextState, setXNextState] = useState(true);
  const [stepNumberState, setStepNumberState] = useState(0);
  const [isAsc, setAsc] = useState(true);
  //---------------------------------------- style useRef -------------------------------------------------
  const gameScreenEl = useRef(null);
  const [gameScreenHeightState, setGameScreenHeightState] = useState(0)
  const gameContainerEl = useRef(null);
  const [gameContainerHeightState, setGameContainerHeightState] = useState(0)

  //---------------------------------------- handleClick --------------------------------------------------
  function handleClick(i) {
    //Data Change without Mutation
    const history = historyState.slice(0, stepNumberState + 1);;
    console.log("history", history)
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares).winner || squares[i]) {
      return console.log("tada ");
    }
    // determine player's turn
    squares[i] = isXNextState ? 'X' : 'O';

    setHistoryState(history.concat([{
      squares: squares,
      latestMove: i
    }]))

    setStepNumberState(history.length)
    setXNextState(!isXNextState)
  }
  //------------------------------------------ jumpTo --------------------------------------------------------
  function jumpTo(step) {
    setStepNumberState(step);
    setXNextState((step % 2) === 0)
  }
  //------------------------------------------ handleSortToggle ----------------------------------------------
  // sorting the historyMovesList to desc
  function handleSortToggle() {
    setAsc(!isAsc);

  }

  //------------------------------------------ historyMovesList ----------------------------------------------
  const historyMovesList = historyState.map((step, move) => {
    const latestMove = step.latestMove;
    const col = 1 + latestMove % 3;
    const row = 1 + Math.floor(latestMove / 3);
    const asc = move ? `#${move} (${col}, ${row})` : '#0 (0,0)';
    return (
      <button key={move} className={`history-btn ${move === stepNumberState ? 'history-btn--selected' : ''}`}
        onClick={() => jumpTo(move)}>{asc}</button>
    );
  });

  if (!isAsc) {
    historyMovesList.reverse();
  }
  // render game info status
  const current = historyState[stepNumberState];
  const calculateWinnerInfo = calculateWinner(current.squares)
  const winner = calculateWinnerInfo.winner;
  let status;

  winner ?
    status = 'Winner: ' + winner :
    (calculateWinnerInfo.isDraw ?
      status = "Draw" :
      status = `Next player: ${isXNextState ? 'X' : 'O'}`
    )

  // similar to componentDidMount(), run the effect function only when the component mounts
  useEffect(() => {
    setGameScreenHeightState(gameScreenEl.current.getBoundingClientRect().height)
    setGameContainerHeightState(gameContainerEl.current.getBoundingClientRect().height)
  }, [])

  const centerGameScreen = (gameContainerHeightState - gameScreenHeightState) / 4
  return (
    <div
      ref={gameContainerEl}
      className="container game-container">
      <div className="row">
        <div className="col-12">
          <div ref={gameScreenEl} className="game-screen" style={{ margin: `${centerGameScreen}px 0px ${centerGameScreen}px 0px` }}>
            <div className="row">
              <h3>TIC TAC TOE</h3>
            </div>
            <div className="row">
              <div className="col-12 offset-0 col-lg-5 offset-lg-2 game__board">
                <div>
                  <p className="game__status" >{status}</p>
                  <Board
                    latestMove={current.latestMove}
                    winLine={calculateWinnerInfo.winLine}
                    squares={current.squares}
                    onClick={(i) => {
                      handleClick(i)
                    }}
                  />
                </div>
              </div>
              <div className="col-lg-3"
                style={{
                  display: "flex",
                  justifyContent: "center"
                }}>
                <div className="game__history-section">
                  <div onClick={() => handleSortToggle()} className="sorting-btn-wrapper cursor--pointer">
                    <span className="sorting-btn__text" >{isAsc ? "Ascending" : "Descending"}</span>
                    <img className="sorting-btn__icon cursor--pointer" src={isAsc ? aToZ : zToA} alt={isAsc ? "aToZ" : "zToA"} />
                  </div>
                  {historyMovesList}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
/*
     
*/

export default Game;

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        winLine: lines[i],
        isDraw: false,
      };
    }
  }
  let isDraw = true;
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] === null) {
      isDraw = false;
      break;
    }
  }
  return {
    winner: null,
    winLine: null,
    isDraw: isDraw,
  };
}