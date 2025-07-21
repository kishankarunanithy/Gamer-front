import "../App.css"
import { useEffect, useState } from "react"
import useAuthStore from "../store";
import { IChallenges, IUser } from "../@types"
import { getChallenges, getUsers } from "../api";
import LeaderboardTopChallenges from "../components/LeaderbordChallenges";
import LeaderboardTopPlayers from "../components/LeaderboardPlayers";


export default function Leaderboard() {

    const [challenges, setLeaderboardChall] = useState<IChallenges>([]);

    useEffect (() => {
        const loadData = async () => {
            const data = await getChallenges();
            const newLeaderChall = data.sort((a, b) => {
                const aLen = a.users?.length ?? 0;
                const bLen = b.users?.length ?? 0;
                return bLen - aLen;
              });
              
            setLeaderboardChall(newLeaderChall.slice(0, 10)); // top 10
        };
        loadData();
    }, [])


    const [players, setLeaderboardPlayers] = useState<IUser[]>([]);

    useEffect (() => {
        const loadData = async () => {
            const data = await getUsers();

            const newLeaderPlayers = data.sort((a, b) => {
                const aLen = a.challenges?.length ?? 0;
                const bLen = b.challenges?.length ?? 0;
                return bLen - aLen;
              });
              
            setLeaderboardPlayers(newLeaderPlayers.slice(0, 10));
        };
        loadData();
    }, []) 

    const { user } = useAuthStore();

    // Position de l'utilisateur connecté dans le classement
    const userRank = players.findIndex((p) => p.id === user?.id);
    const currentPlayer = players.find((p) => p.id === user?.id);

    return (
        <>
            <main>
                <h1 className="main-title leaderbord-title">Les classements</h1>
                <h2 className="leaderbord-subtitle subtitle">Vous pourrez retrouver ici le classement des meilleurs joueurs et des challenges les plus joués. </h2>

                <div className="lead-boxes">
                    <section className="best-challenges leader-card-style">
                        <h3 className="low-title">Challenges populaires</h3>
                    <table className="leaderbord-lists default-box-design effectL">
                            <thead>
                                <tr className="array-header">
                                    <th className="default-text" scope="col">Rang</th>
                                    <th className="default-text" scope="col">Challenge</th>
                                    <th className="default-text" scope="col">Participations</th>
                                </tr>
                            </thead>
                            <tbody className="leader-card-style">
                                <tr className="effect">
                                    {challenges.map((challenge, index) => {
                                        return <LeaderboardTopChallenges key={challenge.id} challenge={challenge} index={index} />
                                    })}
                                </tr>
                            </tbody>     
                        </table>
                    </section>

                    <section className="best-players leader-card-style">
                        <h3 className="low-title">Meilleurs Joueurs</h3>
                        <table className="leaderbord-lists default-box-design effectR">
                            <thead>
                                <tr className="array-header">
                                    <th className="default-text" scope="col">Rang</th>
                                    <th className="default-text" scope="col">Pseudo</th>
                                    <th className="default-text" scope="col">Participations</th>
                                </tr>
                            </thead>
                            <tbody className="leader-card-style">
                                <tr className="effect">
                                    {players.map((user, index) => {
                                        return <LeaderboardTopPlayers key={user.id} players={user} index={index} />
                                    })}
                                </tr>
                            </tbody>
                            <tfoot>
                                    <tr>
                                    {user ? (
                                            userRank !== -1 ? (
                                                <td className="default-text perso-leader-sentence">Vous êtes classé {userRank + 1}e avec {currentPlayer?.challenges.length} challenges réalisés</td>
                                            ) : (
                                                <td className="default-text perso-leader-sentence" >Vous n'apparaissez pas encore dans le classement</td>
                                            )
                                    ) : (

                                        <section className="perso-leader">
                                            <td className="default-text perso-leader-sentence">Connectez-vous pour voir votre classement personnel</td>
                                        </section>
                                    )}
                                    </tr>
                            </tfoot>     
                        </table>
                        
                    </section>
                </div>
            </main>

        </>
    )
}