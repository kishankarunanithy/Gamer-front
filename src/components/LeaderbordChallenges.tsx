import { IChallenge } from "../@types"
import { Link } from "react-router-dom";

interface LeaderboardChallenges {
    challenge : IChallenge
    index: number
}

// Rempli chaque ligne de la liste par les informations du challenge concerné
export default function LeaderboardTopChallenges({ challenge, index}: LeaderboardChallenges) {

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
                    <Link to={`/challenges/${challenge.id}`} className={className}>{medal}</Link>
                </td>
                <td>
                    <Link to={`/challenges/${challenge.id}`} className={className}>{challenge.name}</Link>
                </td>
                <td>
                <Link to={`/challenges/${challenge.id}`} className={className}>{challenge.users.length}</Link>
                </td>
            </tr>
        </>
    )
}

