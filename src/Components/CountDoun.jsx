import React, { useState, useEffect, useContext } from "react";
import { timeValue } from "../App";
import { restartContext } from "../App";

const CountDown = ({isPaused, timeIsOut,}) => {
    const [over, setOver] = useState(false);
    const timer = useContext(timeValue);
    const [[m, s], setTime] = useState(timer);
    const isRestart = useContext(restartContext);
    
    useEffect(() => {
      setTime(timer)
    },timer)

    useEffect(() => {
      setOver(true)
    },[isRestart])

    const tick = () => {
      if (isPaused) return
      if (over) {
        timeIsOut();
      };
      if (m === 0 && s === 0) {
        setOver(true);
      } else if (s === 0) {
        setTime([m - 1, 59]);
      } else {
        setTime([m, s - 1]);
      }
    };

    useEffect(() => {
      const timerID = setInterval(() => tick(), 1000);
      return () => clearInterval(timerID);
    });
  
    return (

        <div>
          <p>{`${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`}</p>
        </div>
    );
  };
  

  export default CountDown;