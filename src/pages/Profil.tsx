import { useParams } from "react-router-dom"
import '../App.css'
import { useEffect, useState } from "react";
import { IChallenges, IUser } from "../@types";
import { getUserById, getChallengesCreatedByUser } from "../api";
import CreatedChall from "../components/CreatedChall";
import CompletedChall from "../components/CompletedChall";
import useAuthStore from "../store";
import { useToast } from "../context/ToastContext";

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
    const [loading, setLoading] = useState<boolean>(true);
    const showToast = useToast();
    const baseUrl = import.meta.env.VITE_API_URL;


    
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

        } catch (error) {
          console.error(error);
          showToast("Erreur lors du chargement des données du profil.", "error");
          setLoading(false);
        }
      };
      loadProfilData();

      
    }, [id, showToast]);
  
    if (loading) return <p>Chargement du profil...</p>;
    if (!player) return <p>Profil introuvable.</p>;
    return (
        <>
            <main className="profile">

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
                        src={`${baseUrl}/uploads/${player?.avatar_url}`}
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
                    <h3 className="chall-title">Mes participations</h3>
                  ) : (
                    <h3 className="chall-title">Participations</h3>
                  )}


                    <div className="chall-flex">
                        <span className="arrow" onClick={() => scroll("completed", "left")}>❮</span>

                        <div id="completed" className="chall-flex-inside">
                        
                            {player?.challenges.map((challenge) => {
                                return <CompletedChall key={challenge.id} challenge={challenge} userId={player.id} />
                            })}

                        </div>

                        <span className="arrow" onClick={() => scroll("completed", "right")}>❯</span>

                    </div>

                </article>


                <article className="chall">
                  
                  {player?.id === user?.id ? (
                    <h3 className="chall-title">Mes challenges créés</h3>
                  ) : (
                    <h3 className="chall-title">Challenges créés</h3>
                  )}
                  

                  <div className="chall-flex">
                    <span className="arrow" onClick={() => scroll("created", "left")}>❮</span>

                    <div id="created" className="chall-flex-inside">
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