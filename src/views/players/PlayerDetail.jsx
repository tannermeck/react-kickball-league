import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPlayerById } from '../../services/players';

function PlayerDetail(){
    const { id } = useParams();
    const [player, setPlayer] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function getPlayer(){
            const playerDetail = await getPlayerById(id);
            setPlayer(playerDetail)
            setLoading(false)
        }
        getPlayer()
    }, [id])
    if (loading) return <h1>Loading Player...</h1>

    return (
        <>
            <h1>{player.name}</h1>
            <h3>Position: {player.position}</h3>
            <h3>Team: {player.teams.name}</h3>
            <h3>{player.teams.city}, {player.teams.state}</h3>
        </>
    )
}
export default PlayerDetail;