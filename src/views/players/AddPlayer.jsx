function AddPlayer(){
    return (
        <fieldset>
            <legend>Add Player</legend>
            <form>
                <label>Name:</label>
                <input />

                <label>Position:</label>
                <input />

                <select>
                    <option>Teams</option>
                </select>
                <button>Add Player</button>

            </form>
        </fieldset>
    )
}
export default AddPlayer;