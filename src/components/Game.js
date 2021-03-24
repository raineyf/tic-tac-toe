import React, { useState } from "react";
import Board from "./Board";

function Game() {
    const [players, setPlayers] = useState({});
    const handleXClick = () => {
        setPlayers({
            human: "x",
            cpu: "o",
        });
    };
    const handleOClick = () => {
        setPlayers({
            human: "o",
            cpu: "x",
        });
    };
    return (
        <>
            <h1>Tic Tac Toe</h1>
            <p className="player-select-copy" id="player-select-copy">
                Select your player (X goes first)
            </p>
            <div className="btn-container">
                <button
                    onClick={handleXClick}
                    aria-describedby="player-select-copy"
                    disabled={players.human}
                    className={players.human === "x" ? "selected" : ""}
                >
                    Play as X
                </button>
                <button
                    onClick={handleOClick}
                    aria-describedby="player-select-copy"
                    disabled={players.human}
                    className={players.human === "o" ? "selected" : ""}
                >
                    Play as O
                </button>
            </div>
            {players.human && <Board human={players.human} cpu={players.cpu} />}
        </>
    );
}

export default Game;
