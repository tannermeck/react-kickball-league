import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createPlayer } from '../../services/players';
import { getTeams } from '../../services/teams';

function AddPlayer(){
    const history = useHistory();
    const [teams, setTeams] = useState([]);
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [teamId, setTeamId] = useState('');

    useEffect(() => {
        async function getAllTeams(){
            const teamList = await getTeams();
            setTeams(teamList);
            setTeamId(teamList[0].id)
        }
        getAllTeams();
    }, [])

    const handleSubmit = async(e) => {
        e.preventDefault();
        await createPlayer({ name, position, teamId })
        history.push('/players')
    }
    return (
        <fieldset>
            <legend>Add Player</legend>
            <form onSubmit={handleSubmit}>
                <label htmlFor='name'>Name:</label>
                <input id='name' name='name' value={name} onChange={({target}) => setName(target.value)}/>

                <label htmlFor='position'>Position:</label>
                <input id='position' name='position' value={position} onChange={({target}) => setPosition(target.value)}/>

                <select value={teamId} onChange={(e) => setTeamId(e.target.value)}>
                    {teams.map((team) => (
                        <option key={team.id} value={team.id}>{team.name}</option>
                        ))
                    }
                </select>
                <button type='submit'>Add Player</button>

            </form>
        </fieldset>
    )
}
export default AddPlayer;