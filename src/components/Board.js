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
            setCurrentPlayer(cpu);
            setBoard(newBoard);
        }
    };
    const handleReloadClick = () => {
        window.location.reload();
    };
    useEffect(() => {
        const cpu = props.cpu;
        const human = props.human;
        const availableSpace = (board) => {
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
        const availableSpaces = availableSpace(board);
        const checkWinner = (board) => {
            let winner = null;
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
            if (availableSpaces.length === 0 && winner === null) {
                winner = "Draw";
            }
            return winner;
        };
        const winner = checkWinner(board);
        if (currentPlayer === cpu && winner === null) {
            let bestMove = {};
            if (board[1][1] === "") {
                bestMove = { x: 1, y: 1 };
            } else {
                const minimax = (board, depth, isMaximizing) => {
                    let scores =
                        cpu === "x"
                            ? {
                                  x: 10,
                                  o: -10,
                                  tie: 0,
                              }
                            : {
                                  o: 10,
                                  x: -10,
                                  tie: 0,
                              };
                    let result = checkWinner(board);
                    const availableSpaces = availableSpace(board);
                    if (result !== null) {
                        return scores[result];
                    }
                    if (isMaximizing) {
                        let bestScore = -Infinity;
                        availableSpaces.forEach((space) => {
                            board[space.y][space.x] = cpu;
                            let score = minimax(board, depth + 1, false);
                            board[space.y][space.x] = "";
                            bestScore = Math.max(score, bestScore);
                        });
                        return bestScore;
                    } else {
                        let bestScore = Infinity;
                        availableSpaces.forEach((space) => {
                            board[space.y][space.x] = human;
                            let score = minimax(board, depth + 1, true);
                            board[space.y][space.x] = "";
                            bestScore = Math.min(score, bestScore);
                        });
                        return bestScore;
                    }
                };
                const determineMove = () => {
                    let bestScore = -Infinity;
                    let move = {};
                    availableSpaces.forEach((space) => {
                        let virtualBoard = [...board];
                        virtualBoard[space.y][space.x] = cpu;
                        let score = minimax(virtualBoard, 0, false);
                        virtualBoard[space.y][space.x] = "";
                        if (score > bestScore) {
                            bestScore = score;
                            move.x = space.x;
                            move.y = space.y;
                        }
                    });
                    return move;
                };
                bestMove = determineMove();
            }
            const newBoard = [...board];
            newBoard[bestMove.y][bestMove.x] = cpu;
            setBoard(newBoard);
            setCurrentPlayer(human);
        } else if (winner !== null) {
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
