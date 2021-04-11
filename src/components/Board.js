import React, { useState, useEffect } from "react";
import BoardSpace from "./BoardSpace";

function Board(props) {
    const [board, setBoard] = useState([
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ]);
    const [currentPlayer, setCurrentPlayer] = useState("x");
    const [gameResult, setGameResult] = useState("");
    const handleSpaceClick = (e) => {
        const cpu = props.cpu;
        const human = props.human;
        if (currentPlayer === human) {
            const y = e.target.getAttribute("y");
            const x = e.target.getAttribute("x");
            const newBoard = [...board];
            newBoard[y][x] = human;
            setBoard(newBoard);
            setCurrentPlayer(cpu);
        }
    };
    const handleReloadClick = () => {
        window.location.reload();
    };
    useEffect(() => {
        const cpu = props.cpu;
        const human = props.human;
        const availableSpace = () => {
            let availableSpaces = [];
            for (let y = 0; y < board.length; y++) {
                for (let x = 0; x < board.length; x++) {
                    if (board[y][x] === "") {
                        availableSpaces.push({ x: x, y: y });
                    }
                }
            }
            return availableSpaces;
        };
        const availableSpaces = availableSpace();
        const checkWinner = () => {
            let winner = "";
            for (let y = 0; y < board.length; y++) {
                if (
                    board[y][0] === board[y][1] &&
                    board[y][1] === board[y][2] &&
                    board[y][0] !== ""
                ) {
                    winner = board[y][0];
                }
            }
            for (let x = 0; x < board.length; x++) {
                if (
                    board[0][x] === board[1][x] &&
                    board[1][x] === board[2][x] &&
                    board[0][x] !== ""
                ) {
                    winner = board[0][x];
                }
            }
            if (
                board[0][0] === board[1][1] &&
                board[1][1] === board[2][2] &&
                board[0][0] !== ""
            ) {
                winner = board[0][0];
            }
            if (
                board[2][0] === board[1][1] &&
                board[1][1] === board[0][2] &&
                board[2][0] !== ""
            ) {
                winner = board[2][0];
            }
            if (availableSpaces.length === 0 && winner === "") {
                winner = "Draw";
            }
            return winner;
        };
        const winner = checkWinner();
        if (currentPlayer === cpu && winner === "") {
            let bestMove = {};
            if (board[1][1] === "") {
                bestMove = { x: 1, y: 1 };
            } else {
                bestMove =
                    availableSpaces[
                        Math.floor(Math.random() * availableSpaces.length)
                    ];
            }
            const newBoard = [...board];
            newBoard[bestMove.y][bestMove.x] = cpu;
            setBoard(newBoard);
            setCurrentPlayer(human);
        } else if (winner !== "") {
            setGameResult(winner);
        }
    }, [currentPlayer, board, props.cpu, props.human]);
    return (
        <>
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
                                    disabled={
                                        board[y][x] === "" && gameResult === ""
                                            ? false
                                            : true
                                    }
                                />
                            ))}
                        </div>
                    );
                })}
            </div>
            {gameResult === "Draw" && (
                <div className="game-result">{gameResult}</div>
            )}
            {gameResult === "x" && (
                <div className="game-result">{gameResult} wins!</div>
            )}
            {gameResult === "o" && (
                <div className="game-result">{gameResult} wins!</div>
            )}
            {gameResult !== "" && (
                <button className="reload-button" onClick={handleReloadClick}>
                    Refresh
                </button>
            )}
        </>
    );
}

export default Board;
