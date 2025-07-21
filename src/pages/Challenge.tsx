import { useCallback, useEffect, useState } from "react";
import { IChallenge } from "../@types";
import { Link, useParams, useNavigate } from "react-router-dom";
import { deleteChallenge, getChallengeById } from "../api";
import SubmissionForm from "../components/SubmissionForm";
import useAuthStore from "../store";
import { getYoutubeEmbedUrl } from "../utils/youtube";
import { useToast } from "../context/ToastContext";

export default function Challenge() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [challenge, setChallenge] = useState<IChallenge | null>(null);
  const { user, token } = useAuthStore();
  const [showForm, setShowForm] = useState(false);
  const showToast = useToast();

  const loadData = useCallback(async () => {
    if (id) {
      const newChallenge = await getChallengeById(Number.parseInt(id));
      setChallenge(newChallenge);
    }
  }, [id]);

  useEffect(() => {
    loadData();
  }, [loadData]);


  const handleDelete = async () => {
    if (!challenge) return;
    if (!token) {
      alert("Tu dois être connecté pour supprimer un challenge.");
      return;
    }

    if (confirm("Es-tu sûr de vouloir supprimer ce challenge ?")) {
      try {
        await deleteChallenge(challenge.id, token);

        navigate('/');
        showToast("Challenge supprimé avec succès.", "success");
      } catch (error) {
        console.error("Erreur suppression :", error);
        alert("Erreur lors de la suppression.");
      }
    }
  };

  const handleSubmissionSuccess = () => {
    showToast("Votre participation a été enregistrée avec succès !", "success");
    loadData(); // Recharge les données pour afficher la nouvelle participation
  };

  if (!challenge) {
    return <p>Chargement...</p>;
  }

  const embedUrl = getYoutubeEmbedUrl(challenge.video_url);

  return (
    <>
      <section className="challenge-content default-box-design">
        <div className="challenge-container">
          <section className="video-container">
            <iframe
            className="card-video"
              width="100%"
              height="315"
              src={embedUrl}
              title={`challenge-${challenge.id}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </section>

          <section className="challenge-info">
            <h2 className="challenge-title low-title">{challenge.name}</h2>
            <div className="challenge-cat-and-diff">
              {user?.id === challenge.user_id && (
                <div className="challenge-actions-inline">
                  <button
                    className="icon-button"
                    title="Modifier"
                    onClick={() => navigate(`/challenges/${challenge.id}/edit`)}
                  >
                    ✏️
                  </button>
                  <button
                    className="icon-button"
                    title="Supprimer"
                    onClick={handleDelete}
                  >
                    🗑️
                  </button>
                </div>
              )}
              <div className="span-cat-and-diff">
                <span className="category-color default-tag-design" style={{ backgroundColor: challenge.category.color }}>
                  {challenge.category.name}
                </span>
                <span className="difficulty-color default-tag-design" style={{ backgroundColor: challenge.difficulty.color }}>
                  {challenge.difficulty.name}
                </span>
              </div>
            </div>

            <article className="challenge-description">
              <p className="default-text">{challenge.description}</p>
            </article>
          </section>
        </div>
        <div className="align-button">
          {user ? (
            <button className="default-button" onClick={() => setShowForm(true)}>
              Participer
            </button>
          ) : (
            <Link className="default-button button-long-text" to="/connexion">
              Connecte-toi pour participer
            </Link>
          )}
        </div>
      </section>
      {showForm && challenge?.id !== undefined && (
        <section className="submission-form-section">
          <SubmissionForm close={() => setShowForm(false)} challengeId={challenge.id} onSuccess={handleSubmissionSuccess} />
        </section>
      )}

      <h3 className="participation-title low-title">Les participations</h3>
      <section className="challenge-participations">
        {challenge.users.map((user) => {
          const submission = user.Submission;
          const key = `${user.id}-${submission.challenge_id}`;
          const subEmbedUrl = getYoutubeEmbedUrl(submission.video_url);

          return (
            <article className="challenge-participation-container default-box-design" key={key}>
              <div className="participation-info">
                <span className="default-tag-design">{user.pseudo}</span>
                <span className="default-tag-design">
                  {new Date(submission.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div>
                <iframe
                className="card-video"
                  width="100%"
                  height="315"
                  src={subEmbedUrl}
                  title={`submission-${user.id}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </article>
          );
        })}
      </section>
    </>
  );
}
