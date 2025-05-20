import { useLocation, useParams } from "react-router-dom"
import '../App.css'
import { useEffect, useState } from "react";
import { IChallenges, IUser } from "../@types";
import { getUserById, getChallengesCreatedByUser } from "../api";
import CreatedChall from "../components/CreatedChall";
import CompletedChall from "../components/CompletedChall";
import useAuthStore from "../store";

export default function Profil() {

    const scroll = (id: string, direction: "left" | "right") => {
        const container = document.getElementById(id);
        if(container) {
            const amount = direction === "left" ? -250 : 250;
            container.scrollBy({ left: amount, behavior: "smooth"});
        }
    };

    const { id } = useParams();
    const user = useAuthStore(state => state.user);
    const [player, setPlayer] = useState<IUser | null>(null);
    const [createdChallenges, setCreatedChallenges] = useState<IChallenges>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const location = useLocation();
    const [successMessage, setSuccessMessage] = useState(location.state?.successMessage || null);


    
    useEffect(()=> {
      const loadProfilData = async () => {
        try {
          if (!id) return;
          setLoading(true);

          // Charger les données du profil avec le token d'authentification.
          const profilData = await getUserById(Number.parseInt(id));
          setPlayer(profilData);

          // Charger les défis créés par l'utilisateur.
          const newCreated = await getChallengesCreatedByUser(Number.parseInt(id));
          setCreatedChallenges(newCreated);

          setLoading(false);

        } catch (err) {
          setError("Erreur lors du chargement des données du profil.");
          setLoading(false);
          console.error(err);
        }
      };
      loadProfilData();

      if (successMessage) {
        const timer = setTimeout(() => {
          setSuccessMessage(null);
        }, 5000); // 5000ms = 5 secondes
  
        // Nettoyer le timer si le composant est démonté
        return () => clearTimeout(timer);
      }
    }, [id, successMessage]);
  
    if (loading) return <p>Chargement du profil...</p>;
    if (error) return <p className="error-message">{error}</p>;
      

    return (
        <>
            <main className="profile">

            {successMessage && (
              <div className="toast-message success-toast">
                <span>{successMessage}</span>
              </div>
            )}

                <div className="perso-info">
                  {user?.id === player?.id ? (
                  <h2 className="main-title">
                  Retrouves ici ton profil, avec tes informations personnelles, et tes défis !
                  </h2>
                   ) : (
                    <h2 className="main-title">
                  Retrouve ici le profil de {player?.pseudo} !
                  </h2>
                   )}
                    <section className="button-container">
                      {user?.id === player?.id && (
                        <a
                        className="default-button"
                        onClick={() => window.location.href = `/profile/${player?.id}/modifier`}
                        >Modifier le profil</a>
                      )}
                    </section>
                    <div className="avatar-container">
                    <img
                        className="avatar"
                        src={`${import.meta.env.VITE_API_URL}/${player?.avatar_url}`}
                        alt={`Avatar de ${player?.pseudo || "l'utilisateur"}`}
                        style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                    />
                    {user?.id === player?.id && (
                      <h3 className="pseudo default-text low-title">{player?.pseudo}</h3>
                    )}
                </div>
                </div>

                <div className="perso-chall">
                    

                <article className="chall">
                  {player?.id === user?.id ? (
                    <h3 className="chall-title low-title">Mes participations</h3>
                  ) : (
                    <h3 className="chall-title low-title">Participations</h3>
                  )}


                    <div className="chall-flex">
                        <span className="arrow" onClick={() => scroll("completed", "left")}>❮</span>

                        <div id="completed" className="chall-flex">
                        
                            {player?.challenges.map((challenge) => {
                                return <CompletedChall key={challenge.id} challenge={challenge} userId={player.id} />
                            })}

                        </div>

                        <span className="arrow" onClick={() => scroll("completed", "right")}>❯</span>

                    </div>

                </article>


                <article className="chall">
                  
                  {player?.id === user?.id ? (
                    <h3 className="chall-title low-title">Mes challenges créés</h3>
                  ) : (
                    <h3 className="chall-title low-title">Challenges créés</h3>
                  )}
                  

                  <div className="chall-flex">
                    <span className="arrow" onClick={() => scroll("created", "left")}>❮</span>

                    <div id="created" className="chall-flex">
                      {createdChallenges.map((challenge) => {
                        return <CreatedChall key={challenge.id} challenge={challenge}/>
                      })}
                    </div>

                    <span className="arrow" onClick={() => scroll("created", "right")}>❯</span>
                  </div>
                </article>

              </div>

            </main>
        </>
    )
}