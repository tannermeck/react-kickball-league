import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import TeamForm from '../../components/TeamForm';
import { createTeam } from '../../services/teams';
import './addteam.css';

function AddTeam(){
    const history = useHistory();
    const [name, setName] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createTeam({ name, city, state })
        history.push('/teams')
    }
    return (
        <div className='formContainer'>
            <fieldset>
                <legend>Add a Team</legend>
                <TeamForm 
                    name={name} 
                    city={city} 
                    state={state}
                    setName={setName}
                    setCity={setCity}
                    setState={setState}
                    handleSubmit={handleSubmit}
                />
                <button aria-label='add team submit' type='submit' onClick={handleSubmit}>Add New Team</button>
            </fieldset>
        </div>
    )
}
export default AddTeam;