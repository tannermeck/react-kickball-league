import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { deleteTeamById, getTeams } from '../../services/teams';
import './teamdetail.css';

function TeamList(){
    const [teams, setTeams] = useState([])
    const [loading, setLoading] = useState(true)

    const loadTeams = async() => {
        setLoading(true)
        const teamList = await getTeams();
        setTeams(teamList)
        setLoading(false)
    }

    useEffect(() => {
            loadTeams()
    }, [])

    const handleDelete = async({ id, name }) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete the ${name}`)
        if (confirmDelete){
            await deleteTeamById(id)
            await loadTeams()
        }
    }

    if (loading) return <h1>Loading Teams...</h1>

    return (
        <>
            <h1 className='detailHeader'>Teams:</h1>
            <NavLink className='newTeamLink' to='/teams/new'>Add New Team</NavLink>
            <ul>
                {teams.map((team) => {
                    return (
                        <div key={team.id}>
                            <NavLink to={`/teams/${team.id}`}>
                                <li key={team.id}>{team.name}</li>
                            </NavLink>
                            <button 
                                type='button' 
                                onClick={() => handleDelete({id: team.id, name: team.name})}
                                >{`Delete ${team.name}`}
                            </button>
                        </div>
                    )
                })}
            </ul>
        </>
    )
}
export default TeamList;