import React, {useContext, useState} from "react";
import { pauseContext } from "../App";
import PlayerBox from "./PlayerBox";

const UserRoom = ({players, roomID, refreshRooms ,current}) => {

    const [members, setMembers] = useState(players)
    const pausing = useContext(pauseContext);
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