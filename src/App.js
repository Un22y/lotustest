import './App.css';
import React, {createContext, useEffect, useState} from 'react';
import UserRoom from './Components/UserRoom';
import StartButton from './Components/StartButton';
import SetTimer from './Components/SetTimer';

export const pauseContext = createContext();
export const timeValue = createContext();
export const restartContext = createContext();
function App() {

  // объявление констант : массив участников - объект: айди, имя, участвует в торгах(есть ли еще время)
  // номер игрока текущего хода, на паузе ли игра - возможно, данная опция в финале не будет нужна, добавлена для теста функционала
  // кол-во времени на ход - массив из двух элементов (минуты, секунды)
  // endGame - завершены ли торги, для проверки на перезапуск торгов 
  const [members, setMembers] = useState([
    {id:1, name:'user1', inGame:true,},
    {id:2, name:'user2', inGame:true,},
    {id:3, name:'user3', inGame:true,},
    {id:4, name:'user4', inGame:true,},
  ])

  const [current, setCurrent] = useState(members[0].id);
  const [onPause,setOnPause] = useState(true);
  const [timer, setTimer] = useState([0,0]);
  const [endGame, setEndGame] = useState(false)
  
  const changePlayer = () => {
    setCurrent(findNextPlayer(current));
  }
  
  const findNextPlayer = (current) => {
    const newOrderArray = members.slice(current-1).concat(members.slice(0,current-1))
    for (let i = 1;  i<=newOrderArray.length-1; i++) {
      if (newOrderArray[i].inGame === true) {
        console.log(newOrderArray[i].id);
        return newOrderArray[i].id
      }
    }
    setEndGame(true);
  }

  const restartApp = () => {
    // здесь надо проверять список участников заново запросом на сервер и перезаписью массива
    setEndGame(false);
    setOnPause(true);
    setCurrent(members[0].id);
    members.forEach(member => member.inGame=true)
    setTimer([0,0]);
  }

  const switchApp = () => {
    setOnPause(!onPause)
  }


  const updateTime = ([m,s]) => {
    setTimer([m,s]);
  }
  useEffect(() => {
    console.log(endGame)
  },[endGame])

  

  return (
    <pauseContext.Provider value={onPause}>
      <div className='main'>
        <timeValue.Provider value={timer}>
        <StartButton restartApp={restartApp} ended={endGame} paused={onPause} switchStart={switchApp}/>
          <SetTimer save={updateTime}/>
          {
            
            <div>
              <restartContext.Provider value={endGame}>
              <p>{
                endGame
                ? 'У всех игроков истекло время'
                :`Время на ход : ${timer[0]} минут ${timer[1]} секунд`
              }
                </p>
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
                </restartContext.Provider>
            </div>
          }
          
        </timeValue.Provider>
      </div>
    </pauseContext.Provider>
  )
}

export default App;
