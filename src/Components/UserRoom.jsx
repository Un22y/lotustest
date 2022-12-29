import React, { useState, useContext} from "react";
import PlayerBox from "./PlayerBox";
import { restartContext, timeValue } from "../App";
const UserRoom = ({players, roomID, refreshRooms ,current}) => {

    const [members, setMembers] = useState(players)
    const passTurn = () => {
        refreshRooms()
    }
    
    return (
      
      <div className="userRoom">
        <h2> 
          Room {roomID} window;<br/>
          {
            current === roomID
              ? ` active turn`
              : ``
          }  
        </h2>
        <div className='container'>
            {members.map((item) => 

              <PlayerBox
              user={item}
              
              roomID={roomID}
              key={item.id}
              currentPlayer={current}
              passTurn={passTurn}
              />
              )}
        </div>
      </div>
    )
}

export default UserRoom