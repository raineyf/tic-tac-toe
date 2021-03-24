import React, { useState, useEffect } from "react";
import BoardSpace from "./BoardSpace";

function Board(props) {
    const [board, setBoard] = useState([
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ]);
    const [currentPlayer, setCurrentPlayer] = useState("x");
    const human = props.human;
    const cpu = props.cpu;
    const togglePlayer = () => {
        if (currentPlayer === "x") {
            setCurrentPlayer("o");
        } else {
            setCurrentPlayer("x");
        }
    };
    const spaceAvailable = (y, x) => {
        return board[y][x] === "";
    };
    const availableSpace = () => {
        const currentBoard = [...board];
        let availableSpaces = [];
        for (let y = 0; y < currentBoard.length; y++) {
            for (let x = 0; x < currentBoard.length; x++) {
                if (spaceAvailable(y, x)) {
                    availableSpaces.push({ x: x, y: y });
                }
            }
        }
        return availableSpaces;
    };
    const populateSpace = (y, x, player) => {
        const newBoard = [...board];
        newBoard[y][x] = player;
        setBoard(newBoard);
    };
    const cpuMove = () => {
        const availableSpaces = availableSpace();
        const randomSpace =
            availableSpaces[Math.floor(Math.random() * availableSpaces.length)];
        if (randomSpace) {
            populateSpace(randomSpace.y, randomSpace.x, cpu);
            togglePlayer();
        }
    };
    const handleSpaceClick = (e) => {
        const y = e.target.getAttribute("y");
        const x = e.target.getAttribute("x");
        populateSpace(y, x, currentPlayer);
        togglePlayer();
    };
    useEffect(() => {
        if (currentPlayer === cpu) {
            cpuMove();
        }
    }, [currentPlayer]);
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
                                disabled={board[y][x] === "" ? false : true}
                            />
                        ))}
                    </div>
                );
            })}
        </div>
    );
}

export default Board;
