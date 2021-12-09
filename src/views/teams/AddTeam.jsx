import { useState } from 'react';
import { useHistory } from 'react-router-dom';
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
                <form onSubmit={handleSubmit}>
                    <label hmtlfor='name'>Name:</label>
                    <input id='name' name='name' type='text' value={name} onChange={({target}) => setName(target.value)} />

                    <label hmtlfor='city'>City:</label>
                    <input id='city' name='city' type='text' value={city} onChange={({target}) => setCity(target.value)}/>

                    <label hmtlfor='state'>State:</label>
                    <input id='state' name='state' type='text' value={state} onChange={({target}) => setState(target.value)}/>

                    <button>Add New Team</button>
                </form>
            </fieldset>
        </div>
    )
}
export default AddTeam;