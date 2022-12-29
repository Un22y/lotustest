import React from "react";

const StartButton = ({ended,paused,switchStart,restartApp}) => {
    return (
        <>
            {
                ended
                ?<button onClick={restartApp}>Restart</button>
                : <button onClick={switchStart}>{paused ? 'Start spectating' : 'Pause'}</button>
            }
        </>
    )
}

export default StartButton