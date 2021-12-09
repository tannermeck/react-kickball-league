import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import TeamForm from '../../components/TeamForm';
import { getTeamById, updateTeamById } from '../../services/teams';

function EditTeam({ match }){
    const { id } = match.params;
    const history = useHistory();
    const [name, setName] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')

    useEffect(() => {
        async function findTeamInfo(){
            const team = await getTeamById(id)
            setName(team.name)
            setCity(team.city)
            setState(team.state)
        }
        findTeamInfo()
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateTeamById(id, { name, city, state })
        history.push('/teams')
    }
    return (
        <div className='formContainer'>
            <fieldset>
                <legend>{`Edit Team ${name}`}</legend>
                <TeamForm 
                    name={name} 
                    city={city} 
                    state={state}
                    setName={setName}
                    setCity={setCity}
                    setState={setState}
                    handleSubmit={handleSubmit}
                />
                <button type='submit' onClick={handleSubmit}>{`Edit ${name}`}</button>
            </fieldset>
        </div>
    )
}
export default EditTeam;