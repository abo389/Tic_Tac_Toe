
export default function GameBoard ( { onSelectSquare, board } )
{
    return (
        <ol id="game-board">
            { board.map( ( row, ri ) => (
                <li key={ ri }>
                    <ol>
                        { row.map( ( col, ci ) => (
                            <li key={ ci }>
                                <button disabled={col !== null} onClick={ () => onSelectSquare( ri, ci ) }>{ col }</button>
                            </li> ) ) }
                    </ol>
                </li> ) ) }
        </ol>
    );
}