import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getTeams } from '../../services/teams';
import './teamdetail.css';

function TeamList(){
    const [teams, setTeams] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function getTeamsList(){
            const teamList = await getTeams();
            setTeams(teamList)
            setLoading(false)
        }
        getTeamsList()
    }, [])
    if (loading) return <h1>Loading Teams!..</h1>

    return (
        <>
            <h1 className='detailHeader'>Teams:</h1>
            <ul>
                {teams.map((team) => {
                    return (
                        <NavLink key={team.id} to={`/teams/${team.id}`}>
                            <li key={team.id}>{team.name}</li>
                        </NavLink>
                    )
                })}
            </ul>
        </>
    )
}
export default TeamList;