import React, { useState, useEffect } from "react";
import BoardSpace from "./BoardSpace";

function Board() {
    const [board, setBoard] = useState([
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ]);
    const [player, setPlayer] = useState("x");
    const togglePlayer = () => {
        if (player == "x") {
            setPlayer("o");
        } else {
            setPlayer("x");
        }
    };
    const populateSpace = (y, x, player) => {
        const newBoard = [...board];
        newBoard[y][x] = player;
        setBoard(newBoard);
    };
    const handleSpaceClick = (e) => {
        const y = e.target.getAttribute("y");
        const x = e.target.getAttribute("x");
        populateSpace(y, x, player);
        togglePlayer();
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
                                disabled={board[y][x] == "" ? false : true}
                            />
                        ))}
                    </div>
                );
            })}
        </div>
    );
}

export default Board;
