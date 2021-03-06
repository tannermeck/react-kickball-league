import '../views/teams/addteam.css';

function TeamForm({ name, city, state, setName, setCity, setState, handleSubmit}){
    return (
    <form onSubmit={handleSubmit}>
        <label hmtlfor='name'>Name:</label>
        <input aria-label='name input' id='name' name='name' type='text' value={name} onChange={({target}) => setName(target.value)} required/>

        <label hmtlfor='city'>City:</label>
        <input aria-label='city input' id='city' name='city' type='text' value={city} onChange={({target}) => setCity(target.value)} required/>

        <label hmtlfor='state'>State:</label>
        <input aria-label= 'state input' id='state' name='state' type='text' value={state} onChange={({target}) => setState(target.value)} required/>
    </form>
    )
}
export default TeamForm;