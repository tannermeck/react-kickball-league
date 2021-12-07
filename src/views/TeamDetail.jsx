import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
    }, [])
    console.log(team)
    if (loading) return <h1>Loading Team Details...</h1>

    return (
        <>
            <h1>{team.name}</h1>
            <h3>{team.city}, {team.state}</h3>
            <h2>Players:</h2>
            {team.players.map(player => (
                <h3 key={player.id}>{player.name}</h3>
            ))}
        </>
    )
}
export default TeamDetail;