import React from "react";

const StartButton = ({paused,switchStart}) => {
    return (
        <>
            <button onClick={switchStart}>
                {paused ? 'Start spectating' : 'Pause'}
            </button>
        </>
    )
}

export default StartButton