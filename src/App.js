import './App.css';
import React, {createContext, useContext, useState} from 'react';
import UserRoom from './Components/UserRoom';
import StartButton from './Components/StartButton';

export const pauseContext = createContext(true);

function App() {
  const [members, setMembers] = useState([
    {id:1, name:'user1', inGame:true,},
    {id:2, name:'user2', inGame:true,},
    {id:3, name:'user3', inGame:true,},
    {id:4, name:'user4', inGame:true,},
  ])
  const [current, setCurrent] = useState(members[0].id);
  const [onPause,setOnPause] = useState(true);

  const findNextPlayer = (current) => {
    const newOrderArray = members.slice(current-1).concat(members.slice(0,current-1))
    for (let i = 1;  i<=newOrderArray.length-1; i++) {
      if (newOrderArray[i].inGame === true) return newOrderArray[i].id
    }
  }

  const switchApp = () => {
    setOnPause(!onPause)
  }

  const changePlayer = () => {
    setCurrent(findNextPlayer(current));
  }

  return (
    <pauseContext.Provider value={onPause}>
    <div className='main'>
      <StartButton paused={onPause} switchStart={switchApp}/>
      {
        members.map(item => 
          <UserRoom 
            players={members}
            current={current}
            roomID={item.id}
            key={item.id}
            refreshRooms={changePlayer}
          />)
      }
    </div>
    </pauseContext.Provider>
  )
}

export default App;
