import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getPlayerById, updatePlayerById } from "../../services/players";

function EditPlayer({match}){
    const { id } = match.params;
    const history = useHistory()
    const [name, setName] = useState('')
    const [position, setPosition] = useState('')

    useEffect(() => {
        async function loadPlayer(){
            const player = await getPlayerById(id)
            setName(player.name)
            setPosition(player.position)
        }
        loadPlayer()
    }, [id])

    const handlePlayerSubmit = async(e) => {
        e.preventDefault()
        await updatePlayerById(id, {name, position})
        history.push('/players')
    }

    return (
        <fieldset>
            <legend>{`Edit ${name}`}</legend>
            <form onSubmit={handlePlayerSubmit}>
                <label htmlFor='name'>Name:</label>
                <input id='name' name='name' type='text' value={name} onChange={({target})=> setName(target.value)} required/>
                <label htmlFor='position'>Position:</label>
                <input id='position' name='position' type='text' value={position} onChange={({target})=> setPosition(target.value)} required/>
            </form>
            <button onClick={handlePlayerSubmit}>{`Edit ${name}`}</button>
        </fieldset>
    )
}
export default EditPlayer;