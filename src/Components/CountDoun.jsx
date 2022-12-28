import React, { useState, useEffect } from "react";


const CountDown = ({minutes, seconds, isPaused, timeIsOut}) => {
    const [over, setOver] = useState(false);
    const [[m, s], setTime] = useState([minutes, seconds]);

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