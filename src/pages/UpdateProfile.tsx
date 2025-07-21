import { useEffect, useState } from "react";
import { IUser } from "../@types";
import { FormUpdateProfile, FormUpdatePasswordProfile } from "../components/FormConnection";
import { getUserById, updateUserIntoApi, updateUserPasswordIntoApi } from "../api";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store";
import { deleteUser } from "../api";
import  logout  from "../pages/logout";
import { useToast } from "../context/ToastContext";

function UpdateProfile () {

  const navigate = useNavigate();
  const { user, token, login } = useAuthStore();
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const showToast = useToast();
  useEffect(() => {
      const fetchProfile = async () => {
        if (!user?.id || !token) {
          showToast("Vous devez être connecté pour modifier votre profil.", "error");
          setLoading(false);
          return;
        }
        try {
          const userData = await getUserById(user.id, token);
          setCurrentUser(userData);
          setLoading(false);
        } catch (err) {
          showToast("Erreur lors du chargement de votre profil.", "error");
          console.error(err);
          setLoading(false);
        }
      };
  
      fetchProfile();
    }, [user?.id, token, showToast]);

    const handleUpdateProfile = async (
      avatar: File | null,
      pseudo: string,
      email: string,
    ) => {
      if (!user?.id || !token) {
        showToast("Vous devez être connecté pour modifier votre profil.", "error");
        return;
      }
      try {
        const updatedUser = await updateUserIntoApi(
          user.id,
          token,
          avatar,
          pseudo,
          email,
        );
        
        if (updatedUser) {
          showToast("Votre profil a été mis à jour avec succès.", "success");
          login(updatedUser, token);
          navigate(`/profile/${user.id}`);
        } else {
          showToast("La mise à jour du profil a échoué.", "error");
        }
      } catch (err) {
        showToast("Erreur lors de la mise à jour de votre profil.", "error");
        console.error(err);
      }
    };

    const handleUpdatePassword = async (
      password: string,
      newPassword: string,
      confirmNewPassword: string,
    ) => {
      if (!user?.id || !token) {
        showToast("Vous devez être connecté pour modifier votre mot de passe.", "error");
        return;
      }
      try {
        const updatedUserPassword = await updateUserPasswordIntoApi (
          user.id,
          token,
          password,
          newPassword,
          confirmNewPassword
        );
        
        if (updatedUserPassword) {
          showToast("Votre mot de passe a été mis à jour avec succès.", "success");
          login(user, token);
          navigate(`/profile/${user.id}`);
        } else {
          showToast("La mise à jour du profil a échoué.", "error");
        }
      } catch (err) {
        showToast("Erreur lors de la mise à jour de votre profil.", "error");
        console.error(err);
      }
    };
    const handleDeleteAccount = async () => {
      const confirmDelete = window.confirm(
        "Êtes-vous sûr de vouloir supprimer votre compte ?"
      );
      if (!confirmDelete) return;
  
      if (!token || !user?.id) {
        showToast("Non autorisé.", "error");
        return;
      }
  
      setLoading(true);
      try {
        const success = await deleteUser(user.id, token);
        if (success) {
          showToast("Votre compte a été supprimé avec succès.", "success");
          logout();
          navigate("/");
        } else {
          showToast("Échec de la suppression du compte.", "error");
        }
      } catch (err) {
        showToast("Erreur lors de la suppression du compte.", "error");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (loading) return <p>Chargement de votre profil...</p>; 
    if (!currentUser) return <p>Profil non trouvé.</p>;
  

  return (
    <>
      <div className="update-profile-button">
        <button className="default-button" onClick={() => navigate(`/profile/${user?.id}`)}>Retour</button>
      </div>
      <section className="default-form-container default-form default-box-design">
        <h3 className="low-title">Modifier le profile</h3>
        <FormUpdateProfile initialUser={currentUser} onUpdate={handleUpdateProfile} />
      </section>
      <section className="password-form default-form-container default-form default-box-design">
        <h3 className="low-title">Modifier le mot de passe</h3>
        <FormUpdatePasswordProfile initialUser={currentUser} onUpdatePassword={handleUpdatePassword} />
        
      </section>
      <div className="delete-account-container"> 
        <button
          className="danger-button" 
          type="button"
          onClick={handleDeleteAccount}
        >
          Supprimer mon compte
        </button>
      </div>
    </>
  )
}

export { UpdateProfile }