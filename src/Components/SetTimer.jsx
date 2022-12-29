import React, { useContext, useState } from "react";
import { timeValue } from "../App";


const SetTimer = ({save}) => {
    const time = useContext(timeValue)
    const [[m,s],setTime] = useState(time);
    
    const saveTime = () => {
        save([m,s])
    }

    const changeMin = (e) => {
        if (e.target.value)
        setTime([Number(e.target.value),s])
        else setTime([m,s])
    }


    function changeSec (e) {
        if (e.target.value)
        setTime([m, Number(e.target.value)])
        else setTime([m,s])
    }

    return (
        <>
            <input onChange={changeMin} type="number" min='0' max='59' />
            <input onChange={changeSec} type="number" min='1' max='59' />
            <button onClick={saveTime}>Сохранить время на ход</button>
        </>
    )
}

export default SetTimer