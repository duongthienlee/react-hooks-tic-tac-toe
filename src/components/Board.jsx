import React from 'react';
import Square from "./Square"

export default ({ squares, onClick, winLine, latestMove }) => {
    function renderSquare(i) {
        let latestMoveClass = latestMove === i ? "current--move" : ""
        let winLineHighLight = winLine && winLine.includes(i) ? "square--highlight" : ""
        return (
            <Square
                className={`square ${winLineHighLight} ${latestMoveClass}`}
                key={i}
                value={squares[i]}
                onClick={() => onClick(i)}
            />
        );
    }
    let boardSize = 3;
    let boardSquares = [];
    for (let i = 0; i < boardSize; i++) {
        let squaresInRow = [];
        for (let n = 0; n < boardSize; n++) {
            squaresInRow.push(renderSquare(i * boardSize + n))
        }
        boardSquares.push(<div key={i} className="board-row" >{squaresInRow}</div>)
    }
    return (
        <React.Fragment>
            {boardSquares}
        </React.Fragment>
    );
}


