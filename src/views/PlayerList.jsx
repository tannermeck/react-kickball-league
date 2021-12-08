import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getPlayers } from '../services/players';

function PlayerList(){
    const [players, setPlayers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function getAllPlayers(){
            const playerList = await getPlayers();
            setPlayers(playerList)
            setLoading(false)
        }
        getAllPlayers()
    }, [])

    if (loading) return <h1>Loading Players...</h1>
    return (
        <>
            <ul>
                {players.map(player => {
                    return (
                    <NavLink key={player.id} to={`/players/${player.id}`}>
                        <li key={player.id}>{player.name}</li>
                    </NavLink>
                    )
                })}
            </ul>
        </>
    )
}
export default PlayerList;