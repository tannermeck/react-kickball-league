import { useState, useEffect } from 'react';
import { getTeams } from '../services/teams';

function TeamList(){
    const [teams, setTeams] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function getTeamsList(){
            const teamList = await getTeams();
            setTeams(teamList)
            console.log('TEAMS', teamList)
            setLoading(false)
        }
        getTeamsList()
    }, [])

    if (loading) return <h1>Loading Teams!..</h1>

    return (
        <>
            <h1>Hello from teams</h1>
        </>
    )
}
export default TeamList;