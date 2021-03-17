import React from "react";

function BoardSpace(props) {
    return (
        <button
            className="space-button"
            coordinates={props.coordinates}
            onClick={props.onClick}
            x={props.x}
            y={props.y}
        >
            {props.value}
        </button>
    );
}

export default BoardSpace;
