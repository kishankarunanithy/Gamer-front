
import { Link } from "react-router-dom"
import { IUser } from "../@types"

interface LeaderboardPlayers {
    players : IUser
    index: number
}

// Rempli chaque ligne de la liste par les informations du joueur concerné
export default function LeaderboardTopPlayers ({players, index}: LeaderboardPlayers) {

    let medal = null;
    let className = "";

    if (index === 0) {
        medal = "👑";
        className = "gold";
    }
    else if (index === 1) {
        medal ="🥈";
        className = "silver";
    }
    else if (index === 2) {
        medal ="🥉";
        className = "bronze";
    }

    else if (index > 2) {
        medal =`${index + 1}`;
    }

    return (
        <>
        <tr className="array-content">
            <td>
                <Link to={`/profile/${players.id}`} className={className}>{medal}</Link>
            </td>
            <td>
                <Link to={`/profile/${players.id}`} className={className}>{players.pseudo}</Link>
            </td>
            <td>
                <Link to={`/profile/${players.id}`} className={className}>{players.challenges.length}</Link>
            </td>
        </tr>
        </>
    )
}
