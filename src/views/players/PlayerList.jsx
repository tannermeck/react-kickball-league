import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { deletePlayerById, getPlayers } from '../../services/players';
import '../teams/teamdetail.css';

function PlayerList(){
    const [players, setPlayers] = useState([])
    const [loading, setLoading] = useState(true)

    const loadPlayers = async() => {
        setLoading(true);
        const playerList = await getPlayers();
            setPlayers(playerList)
            setLoading(false)
    }

    useEffect(() => {
        loadPlayers();
    }, [])

    const handlePlayerDelete = async({id, name}) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete ${name}`)
        if (confirmDelete){
            await deletePlayerById(id)
            await loadPlayers();
        }
    }

    if (loading) return <h1>Loading Players...</h1>
    return (
        <>
            <h1 className='detailHeader'>Players:</h1>
            <NavLink className='newTeamLink' to='/players/new'>Add New Player</NavLink>
            <ul>
                {players.map(player => {
                    return (
                    <div className='teamListContainer' key={player.id}>
                        <NavLink to={`/players/${player.id}`}>
                            <li key={player.id}>{player.name}</li>
                        </NavLink>
                        <button className='deleteButton'
                            onClick={() => handlePlayerDelete({id: player.id, name: player.name})}
                        >{`Delete ${player.name}`}
                        </button>
                        <NavLink className='editTeam' to={`/players/edit/${player.id}`}>{`Edit ${player.name}`}</NavLink>
                    </div>
                    )
                })}
            </ul>
        </>
    )
}
export default PlayerList;