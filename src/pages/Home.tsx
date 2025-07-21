import "../App.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { IChallenge } from "../@types/index";
import useAuthStore from "../store"; // 🔒 pour vérifier si user connecté
import { getChallenges } from "../api";
import { getYoutubeThumbnailUrl } from "../utils/youtube";
import heroLeftImage from "../assets/dino-home.png";
import heroseparatorImage from "../assets/Capture_d_écran_2025-05-18_à_11.30.20-removebg-preview.png"

export default function Home() {
  const [challenges, setChallenges] = useState<IChallenge[]>([]);
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user); // ✅ check Zustand
  const [popularChallenges, setPopularChallenges] = useState<IChallenge[]>([]);
  const nouveauteCarouselRef = useRef<HTMLDivElement>(null);
  const populairesCarouselRef = useRef<HTMLDivElement>(null);
  const [isNouveauteDragging, setIsNouveauteDragging] = useState(false);
  const [nouveauteStartX, setNouveauteStartX] = useState(0);
  const [nouveauteScrollLeft, setNouveauteScrollLeft] = useState(0);
  const [isPopulairesDragging, setIsPopulairesDragging] = useState(false);
  const [populairesStartX, setPopulairesStartX] = useState(0);
  const [populairesScrollLeft, setPopulairesScrollLeft] = useState(0);

  const location = useLocation();
  const [successMessage, setSuccessMessage] = useState(location.state?.successMessage || null);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        // Récupérer tous les challenges.
        const data = await getChallenges();
        if (Array.isArray(data)) {
          setChallenges(data);

          // Trier les challenges par popularité.
          const sortedByPopularity = [...data].sort((a, b) => b.users.length - a.users.length);
          setPopularChallenges(sortedByPopularity.slice(0, 10));
        }


        else console.error("Les données reçues ne sont pas un tableau :", data);
      } catch (error) {
        console.error("Erreur lors du fetch des challenges :", error);
      }
    };

    fetchChallenges();

    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 5000); // 5000ms = 5 secondes

      // Nettoyer le timer si le composant est démonté
      return () => clearTimeout(timer);
    }

  }, [successMessage]);

  const handleNouveauteMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsNouveauteDragging(true);
    setNouveauteStartX(e.pageX - (nouveauteCarouselRef.current?.offsetLeft || 0));
    setNouveauteScrollLeft(nouveauteCarouselRef.current?.scrollLeft || 0);
    if (nouveauteCarouselRef.current) {
      nouveauteCarouselRef.current.style.scrollBehavior = 'auto'; // Désactiver le scroll smooth pendant le drag
    }
  };

  const handleNouveauteMouseLeave = () => {
    setIsNouveauteDragging(false);
    if (nouveauteCarouselRef.current) {
      nouveauteCarouselRef.current.style.scrollBehavior = 'smooth'; // Réactiver le scroll smooth
    }
  };

  const handleNouveauteMouseUp = () => {
    setIsNouveauteDragging(false);
    if (nouveauteCarouselRef.current) {
      nouveauteCarouselRef.current.style.scrollBehavior = 'smooth'; // Réactiver le scroll smooth
    }
  };

  const handleNouveauteMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isNouveauteDragging) return;
    if (nouveauteCarouselRef.current) {
      const x = e.pageX - (nouveauteCarouselRef.current.offsetLeft || 0);
      const walk = (x - nouveauteStartX) * 1; // Ajuster la sensibilité du drag
      nouveauteCarouselRef.current.scrollLeft = nouveauteScrollLeft - walk;
    }
  };

  const handlePopulairesMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsPopulairesDragging(true);
    setPopulairesStartX(e.pageX - (populairesCarouselRef.current?.offsetLeft || 0));
    setPopulairesScrollLeft(populairesCarouselRef.current?.scrollLeft || 0);
    if (populairesCarouselRef.current) {
      populairesCarouselRef.current.style.scrollBehavior = 'auto'; // Désactiver le scroll smooth pendant le drag
    }
  };

  const handlePopulairesMouseLeave = () => {
    setIsPopulairesDragging(false);
    if (populairesCarouselRef.current) {
      populairesCarouselRef.current.style.scrollBehavior = 'smooth'; // Réactiver le scroll smooth
    }
  };

  const handlePopulairesMouseUp = () => {
    setIsPopulairesDragging(false);
    if (populairesCarouselRef.current) {
      populairesCarouselRef.current.style.scrollBehavior = 'smooth'; // Réactiver le scroll smooth
    }
  };

  const handlePopulairesMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isPopulairesDragging) return;
    if (populairesCarouselRef.current) {
      const x = e.pageX - (populairesCarouselRef.current.offsetLeft || 0);
      const walk = (x - populairesStartX) * 1; // Ajuster la sensibilité du drag
      populairesCarouselRef.current.scrollLeft = populairesScrollLeft - walk;
    }
  };

  return (
    <main className="home-page">

      {successMessage && (
        <div className="toast-message success-toast">
          <span>{successMessage}</span>
        </div>
      )}

      <section className="hero-layout">
        <div className="hero-left-image">
          <img src={heroLeftImage} alt="Image de gauche" />
        </div>
        <div className="hero-right-content">
        <div className="hero-center-content">
          <div className="default-box-design">
          <h1 className="main-title">Prêt à relever le challenge ?</h1>
          <h2 className="subtitle">
            Montrez-nous ce que vous avez dans le ventre !<br />
            Postez vos vidéos, défiez les autres, et grimpez au sommet.
          </h2>
          

          <div className="hero-buttons buttons-flex">
            <button
              className="default-button "
              onClick={() => {
                if (user) {
                  navigate("/creation");
                } else {
                  navigate("/connexion?redirect=/creation");
                }
              }}
            >
              <span>🎮 Créer</span>
            </button>
            <button
              className="default-button "
              onClick={() => navigate("/challenges")}
            >
              <span>🚀 Participer</span>
            </button>

          </div>
          <div className="hero-separator"> {/* Barre de séparation */}
          <img src={heroseparatorImage} alt="Image de gauche" />
                    </div>
        <div className="hero-right-how">
          <h2 className="subtitle">Comment ça marche ?</h2>
          <div className="how-steps">
            <div className="step-card">🔹 <strong>1.</strong> Crée un challenge</div>
            <div className="step-card">🎥 <strong>2.</strong> Poste ta vidéo</div>
            <div className="step-card">🏆 <strong>3.</strong> Affronte les autres</div>
          </div>
          </div>
        </div>
        </div>
        </div>
      </section>

      <section className="home-carousel-section">
  <div className="home-carousel-block">
    <h3 className="low-title">🎬 Nouveautés</h3>
    <div
      className="home-carousel-container"
      ref={nouveauteCarouselRef}
      onMouseDown={handleNouveauteMouseDown}
      onMouseLeave={handleNouveauteMouseLeave}
      onMouseUp={handleNouveauteMouseUp}
      onMouseMove={handleNouveauteMouseMove}
    >

      <div id="home-nouveaute" className="home-carousel-items nouveaute">

        {challenges.slice(0, 10).map((challenge) => {
          const thumbnailUrl = getYoutubeThumbnailUrl(challenge.video_url);
          return (
            <Link
              key={`original-${challenge.id}`}
              to={`/challenges/${challenge.id}`}
              className="home-video-card"
            >
              <img
                src={thumbnailUrl}
                alt={`Thumbnail du challenge ${challenge.name}`}
              />
              <div className="video-card-footer">
                <h3 className="video-card-title">{challenge.name}</h3>
              </div>
            </Link>
          );
        })}

        {challenges.slice(0, 10).map((challenge) => {
          const thumbnailUrl = getYoutubeThumbnailUrl(challenge.video_url);
          return (
            <Link
              key={`duplicate-${challenge.id}`}
              to={`/challenges/${challenge.id}`}
              className="home-video-card"
            >
              <img
                src={thumbnailUrl}
                alt={`Thumbnail du challenge ${challenge.name}`}
              />
              <div className="video-card-footer">
                <h3 className="video-card-title">{challenge.name}</h3>
              </div>
            </Link>
          );
        })}
      </div>

    </div>
  </div>
</section>
<section className="home-carousel-section">
  <div className="home-carousel-block">
    <h3 className="low-title">🏆 Challenges populaires</h3>
    <div
      className="home-carousel-container"
      ref={populairesCarouselRef}
      onMouseDown={handlePopulairesMouseDown}
      onMouseLeave={handlePopulairesMouseLeave}
      onMouseUp={handlePopulairesMouseUp}
      onMouseMove={handlePopulairesMouseMove}
    >

      <div
        id="home-populaires"
        className="home-carousel-items populaires reversed"
      >

        {popularChallenges.slice(0, 10).map((challenge) => {
          const thumbnailUrl = getYoutubeThumbnailUrl(challenge.video_url);
          return (
            <Link
              key={`original-${challenge.id}`}
              to={`/challenges/${challenge.id}`}
              className="home-video-card"
            >
              <img
                src={thumbnailUrl}
                alt={`Thumbnail du challenge ${challenge.name}`}
              />
              <div className="video-card-footer">
                <h3 className="video-card-title">{challenge.name}</h3>
              </div>
            </Link>
          );
        })}

        {popularChallenges.slice(0, 10).map((challenge) => {
          const thumbnailUrl = getYoutubeThumbnailUrl(challenge.video_url);
          return (
            <Link
              key={`duplicate-${challenge.id}`}
              to={`/challenges/${challenge.id}`}
              className="home-video-card"
            >
              <img
                src={thumbnailUrl}
                alt={`Thumbnail du challenge ${challenge.name}`}
              />
              <div className="video-card-footer">
                <h3 className="video-card-title">{challenge.name}</h3>
              </div>
            </Link>
          );
        })}
      </div>

    </div>
  </div>
</section>
    </main>
  );
}
