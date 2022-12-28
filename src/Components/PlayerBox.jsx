import React, {useContext} from "react";
import CountDown from "./CountDoun";
import { pauseContext } from "../App";
import '../App.css';

const PlayerBox = ({user, passTurn, roomID, currentPlayer}) => {
    
    const timeIsOut = () => {
        user.inGame = false;
        passTurn();
    }
    const pausing = useContext(pauseContext);
    


    return (
    <div>
        {
            
            <div>
                
                {
                    pausing
                    ?<div>game on pause</div>
                    :<div>
                        <div>{user.name}</div>
                        {
                            (user.id===currentPlayer) && (user.id === roomID)
                                ?<button id={user.id} onClick={passTurn}>Press button to end your turn</button>
                                :(user.id !== currentPlayer) && (roomID === user.id)
                                    ?<button disabled id={user.id}>user's {currentPlayer} turn</button>
                                    :(roomID === currentPlayer) && (user.id !== currentPlayer)
                                        ?roomID === currentPlayer
                                            ?<div>wait you end turn</div>
                                            :<></>
                                        :user.id !== currentPlayer
                                            ?<div>wait for end of user {currentPlayer} turn</div>
                                            :<></>
                        }
                    </div>
                    
                }
                <CountDown timeIsOut={timeIsOut} isPaused={(user.id !== currentPlayer) || pausing} minutes={2} seconds={3}/>
            </div>
        }
    </div>
    )
    
}

export default PlayerBox;