import React, { useState, useEffect } from "react";
import BoardSpace from "./BoardSpace";

function Board() {
    const [board, setBoard] = useState([
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ]);
    const handleSpaceClick = (e) => {
        const y = e.target.getAttribute("y");
        const x = e.target.getAttribute("x");
        const newBoard = [...board];
        newBoard[y][x] = "x";
        setBoard(newBoard);
    };
    return (
        <div className="board">
            {board.map((row, y) => {
                return (
                    <div className="row" key={y}>
                        {row.map((space, x) => (
                            <BoardSpace
                                key={`${y},${x}`}
                                x={x}
                                y={y}
                                onClick={handleSpaceClick}
                                value={board[y][x]}
                            />
                        ))}
                    </div>
                );
            })}
        </div>
    );
}

export default Board;
