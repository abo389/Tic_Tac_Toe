import { useState } from "react"
import "../index.css"
export default function Player ( { name, symbol, isActive, onChangeName } )
{
    const [pn, setPn] = useState(name)
    const [ isEdting, setIsEdting ] = useState( false )
    function handelClick ()
    {
        setIsEdting( Edting => !Edting );
        if(isEdting) onChangeName(symbol, pn)
    }
    function handelChange ( e )
    {
        setPn(e.target.value)
    }
    let playerName = <span className="player-name">{ pn }</span>
    if ( isEdting ) playerName = <input type="text" required  value={pn} onChange={handelChange}/>
    return (
        <li className={isActive ? "active":""}>
            <span className="player">
                {playerName}
                <span className="player-symbol">{ symbol}</span>
            </span>
            
            <button onClick={ handelClick }>{ isEdting ? "Save":"Edit" }</button>
        </li>
    )
}