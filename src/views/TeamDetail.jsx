import { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { getTeamById } from '../services/teams';

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
    console.log(team)
    if (loading) return <h1>Loading Team Details...</h1>

    return (
        <>
            <h1>{team.name}</h1>
            <h3>Location: {team.city}, {team.state}</h3>
            <h1>Players:</h1>
                {team.players.map(player => (
                    <NavLink key={player.id} to={`/players/${player.id}`}>
                        <h3 key={player.id}>{player.name}- {player.position}</h3>
                    </NavLink>
                ))}
        </>
    )
}
export default TeamDetail;