import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getTeamById } from '../../services/teams';
import './teamdetail.css';

function TeamDetail({ match }){
    const { id } = match.params
    const [team, setTeam] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadTeams(){
            const teamDetail = await getTeamById(id)
            setTeam(teamDetail)
            setLoading(false)
        }
        loadTeams()
    }, [id])
    if (loading) return <h1>Loading Team Details...</h1>

    return (
        <>
            <h1 className='detailHeader'>{team.name}</h1>
            <h3 className='detailHeader'>Location: {team.city}, {team.state}</h3>
            <NavLink to={`/teams/edit/${team.id}`} >{`Edit ${team.name}`}</NavLink>
            <h1 className='detailHeader'>Players:</h1>
            <div className='playerDetail'>
                {team.players.map(player => (                   
                    <h3 key={player.id}>{player.position}: 
                    <NavLink key={player.id} to={`/players/${player.id}`}>
                        {player.name}
                    </NavLink></h3> 
                ))}
                </div>
        </>
    )
}
export default TeamDetail;