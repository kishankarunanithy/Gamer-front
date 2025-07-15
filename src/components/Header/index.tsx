import { useEffect, useRef, useState } from "react";
import "./style.css";
import logo from "../../assets/logo-transparent.svg";
import BurgerIcon from "./BurgerIcon";
import CloseIcon from "./CloseIcon"; // Importez le composant CloseIcon
import { NavLink, Link } from "react-router-dom";
import useAuthStore from "../../store";

export default function Header() {
    // État pour gérer l'ouverture/fermeture du menu burger (mobile).
    const [menuOpen, setMenuOpen] = useState(false); // Fermé par défaut.

    // Références vers les éléments du DOM pour le menu (ul desktop) et le bouton burger (button).
    const menuRef = useRef<HTMLUListElement | null>(null);
    const burgerRef = useRef<HTMLButtonElement | null>(null);
    // Référence pour le conteneur du menu fullscreen pour arrêter la propagation des clics.
    const fullscreenMenuRef = useRef<HTMLElement | null>(null);

     // Récupère l'utilisateur connecté depuis dans le store d'authentification.
    const { user } = useAuthStore();
    const baseUrl = import.meta.env.VITE_API_URL;
    const [localAvatarUrl, setLocalAvatarUrl] = useState(user?.avatar_url ? `${baseUrl}/uploads/${user.avatar_url}` : null);

    //* Use effect to handle avatar changes
    useEffect(() => {
        if (user?.avatar_url) {
            setLocalAvatarUrl(`${baseUrl}/uploads/${user.avatar_url}`);
        }
    }, [user?.avatar_url, baseUrl]);

    /**
     * Ferme le menu burger automatiquement si la fenêtre
     * est redimensionnée au delà de 768px de largeur
     */
    useEffect(() => {
        const checkScreenSize = () => {
            if (window.innerWidth > 768 && menuOpen) {
                setMenuOpen(false);
            }
        };
        window.addEventListener('resize', checkScreenSize);
        checkScreenSize();
        return () => {
            window.removeEventListener('resize', checkScreenSize)
        };
    }, [menuOpen])

    return (
        <header className="header">
            <div className="logo">
                <Link to="/">
                    <img src={logo} alt="Logo Gamer Challenges" />
                </Link>
            </div>

            {/* NAVBAR DESKTOP */}
            <ul ref={menuRef} className={`navbar desktop-only`}>
                <li><Link to="/" className="link-color">ACCUEIL</Link></li>
                <li><Link to="/challenges" className="link-color">CHALLENGES</Link></li>
                <li><Link to="/leaderboard" className="link-color">CLASSEMENT</Link></li>
            </ul>

            {/* AUTH LINKS DESKTOP */}
            <div className="desktop-only">
                {!user ?
                    <NavLink to="/connexion" className="default-button">Se connecter</NavLink>
                    :
                    <>
                        <NavLink to="/logout" className="default-button">Se déconnecter</NavLink>
                         {/* L'avatar desktop */}
                        <NavLink to={`/profile/${user.id}`}>
                            <img
                                src={localAvatarUrl ? localAvatarUrl : undefined}
                                alt={`photo de profil de ${user.pseudo}`}
                                className="profil-picture"
                            />
                        </NavLink>
                    </>
                }
            </div>

            {/* BOUTON BURGER MOBILE */}
            <button ref={burgerRef} className="burger mobile-only" onClick={() => setMenuOpen(true)}>
                <BurgerIcon />
            </button>

            {/* MENU FULLSCREEN MOBILE */}
            {menuOpen && (
                <div className="fullscreen-menu">
                    <nav ref={fullscreenMenuRef} className="fullscreen-content" onClick={(e) => e.stopPropagation()}>
                        <ul className="fullscreen-links">
                            {user && (
                                <li>
                                    <NavLink to={`/profile/${user.id}`} className="link-color" onClick={() => setMenuOpen(false)}>
                                        <img
                                            src={localAvatarUrl ? localAvatarUrl : undefined}
                                            alt={`Profil de ${user.pseudo}`}
                                            className="profil-picture mobile-only"
                                        />
                                    </NavLink>
                                </li>
                            )}
                            <li>
                                <NavLink to="/" className="link-color" onClick={() => setMenuOpen(false)}>
                                🏠 Accueil
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/challenges" className="link-color" onClick={() => setMenuOpen(false)}>
                                🎯 Challenges
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/leaderboard" className="link-color" onClick={() => setMenuOpen(false)}>
                                🏆 Classement
                                </NavLink>
                            </li>
                        </ul>
                        <div className="fullscreen-logo">
                            <img src={logo} alt="Logo Gamer Challenges" />
                        </div>
                        <div className="fullscreen-footer">
                            {!user ? (
                                <NavLink to="/connexion" className="default-button" onClick={() => setMenuOpen(false)}>
                                    Se connecter
                                </NavLink>
                            ) : (
                                <NavLink to="/logout" className="default-button" onClick={() => setMenuOpen(false)}>
                                    Se déconnecter
                                </NavLink>
                            )}
                        </div>
                    </nav>
                    {/* Ajouter la croix ici */}
                    <button className="close-button-fullscreen" onClick={() => setMenuOpen(false)}>
                        <CloseIcon />
                    </button>
                </div>
            )}
        </header>
    )
}
        

