import { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { getTeamById } from '../../services/teams';
import './teamdetail.css';

function TeamDetail(){
    const { id } = useParams();
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
            <h1 className='detailHeader'>Players:</h1>
            <div className='playerDetail'>
                {team.players.map(player => (
                        <NavLink key={player.id} to={`/players/${player.id}`}>
                            <h3 key={player.id}>{player.name}- {player.position}</h3>
                        </NavLink>
                ))}
                </div>
        </>
    )
}
export default TeamDetail;