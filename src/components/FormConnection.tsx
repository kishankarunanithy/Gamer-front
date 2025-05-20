import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import useAuthStore from "../store";
import { NavLink, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { getUserById, loginUser, forgotPasswordRequest, resetPasswordRequest } from "../api";
import { IUser } from "../@types";


interface IUserProps {
  addUser: (
    pseudo: string,
    email: string,
    password: string,
    confirmPasword: string,
    avatar: File | null
  ) => Promise<void>;
}

interface FormUpdateProfileProps {
  initialUser: IUser;
  onUpdate: (
    avatar: File | null,
    pseudo: string,
    email: string,
  ) => Promise<void>;
}

interface UpdateProfilePasswordProps {
  initialUser: IUser;
  onUpdatePassword: (
    password: string,
    newPassword: string,
    confirmNewPassword: string,
  ) => Promise<void>;
}

interface IInputProps {
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
  name: string;
  type: string;
  label?: string;
}

interface IFileInputProps {
  setFile: (file: File | null) => void;
  name: string;
  label?: string;
  accept?: string;
}

function Input ({value, setValue, name, type, placeholder, label}: IInputProps) {
  return (
    <>
      <label htmlFor={label}></label> 
      <input
        className="form-input"
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </>
  );
}

function Fileinput({setFile, name, label, accept}: IFileInputProps) {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    } else {
      setFile(null);
    }
  };

  return (
    <>
    <label className="default-text label" htmlFor={label}>Télécharger un avatar</label>
    <input 
        className="form-input"
        type="file" 
        id={name} 
        name={name} 
        onChange={handleFileChange}
        accept={accept || "image/*"} 
    />
    </>
  )
}

function FormSubscribe ({addUser}: IUserProps) {

  const [pseudo, setPseudo] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [avatar, setAvatar] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async(e: FormEvent) => {
    e.preventDefault()
    setError(null);

    try {
      if (password !== confirmPassword) {
        setError("Les mots de passe ne correspondent pas");
        return;
      }

      if (avatar && !(avatar instanceof File)) {
        setError("Format d'avatar invalide. Veuillez sélectionner une image.");
        return;
      }

      await addUser(pseudo, email, password, confirmPassword, avatar)
      setPseudo("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setAvatar(null);

      //Réinitialiser le champ de fichier manuellement
      const fileInput = document.getElementById("avatar") as HTMLInputElement;
      if (fileInput) fileInput.value = "";

    } catch (error) {
      setError("Une erreur s'est produite lors de l'inscription");
      console.error("Erreur d'inscription:", error);
    }
  };

  return <>
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      {error && <div className="error-message">{error}</div>}

      <Input 
        value={pseudo}
        setValue={setPseudo}
        name="pseudo"
        placeholder="Pseudo"
        type="text" 
        label="Pseudo"
      />

      <Input 
        value={email}
        setValue={setEmail}
        name="email"
        placeholder="Email"
        type="email" 
        label="Email"
      />

      <Input 
        value={password}
        setValue={setPassword}
        name="password"
        placeholder="Password"
        type="password"
        label="Password"
      />

      <Input 
        value={confirmPassword}
        setValue={setConfirmPassword}
        name="confirm"
        placeholder="Confirmez votre mot de passe"
        type="password" 
        label="Confirmation"
      />

      <Fileinput
        setFile={setAvatar}
        name="avatar"
        label="Avatar (JPG, JPEG, PNG, GIF uniquement)"
        accept="image/jpeg, image/jpg, image/png, image/gif"
      />

      <div className="form-button align-button">
        <button className="default-button" type="submit">Confirmer</button>
      </div>
    </form>
  </>
}

function FormLogin () {

  const location = useLocation();
  const [successMessage, setSuccessMessage] = useState(location.state?.successMessage || null);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 5000); // 5000ms = 5 secondes

      // Nettoyer le timer si le composant est démonté
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const { login } = useAuthStore()
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [pseudoOrEmail, setPseudoOrEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async(e: FormEvent) => {
    e.preventDefault()
    setError(null);
    
    try {
      const { token, userId } = await loginUser(pseudoOrEmail, password);
      const user = await getUserById(userId, token);

      login(user, token);
     
      //  Redirection dynamique
      const redirect = searchParams.get("redirect");
      navigate(redirect || `/profile/${user.id}`, { 
        state: { 
          successMessage: `Bienvenu ${user.pseudo} !` 
        }
      });

    } catch (error) {
      setError("Échec de la connexion. Vérifiez vos identifiants.");
      console.error("Erreur de connexion:", error);
    }
  };
  return <>
    <form onSubmit={handleSubmit}>
      {error && <div className="error-message">{error}</div>}

      {successMessage && (
        <div className="toast-message success-toast">
          <span>{successMessage}</span>
        </div>
      )}

      <Input 
        value={pseudoOrEmail}
        setValue={setPseudoOrEmail}
        name="pseudoOrEmail"
        placeholder="Pseudo ou Email"
        type="text"
        label="Identifiant"
      />

      <Input 
        value={password}
        setValue={setPassword}
        name="password"
        placeholder="Mot de passe"
        type="password" 
        label="Mot de passe"
      />

      <NavLink to="/mot-de-passe-oublie" className="link-password-reset">Mot de passe oublié</NavLink>

      <div className="form-button align-button">
        <button className="default-button" type="submit">Confirmer</button>
      </div>
    </form>
  </>
}

function FormUpdateProfile({ initialUser, onUpdate }: FormUpdateProfileProps) {
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  

  useEffect(() => {
    if (initialUser) {
      setPseudo(initialUser.pseudo || "");
      setEmail(initialUser.email || "");
    }
  }, [initialUser]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    await onUpdate(avatar, pseudo, email);
    setPseudo("");
    setEmail("");
    setAvatar(null);
  };

  

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      {error && <div className="error-message">{error}</div>}

      <Input
        value={pseudo}
        setValue={setPseudo}
        name="pseudo"
        placeholder="Pseudo"
        type="text"
        label="Pseudo"
      />

      <Input
        value={email}
        setValue={setEmail}
        name="email"
        placeholder="Email"
        type="email"
        label="Email"
      />

      <Fileinput
        setFile={setAvatar}
        name="avatar"
        label="Avatar (JPG, JPEG, PNG, GIF uniquement)"
        accept="image/jpeg, image/jpg, image/png, image/gif"
      />

      <div className="form-button align-button">
        <button className="default-button" type="submit">
          Confirmer
        </button>
        
      </div>
    </form>
  );
}

//* Change password function
function FormUpdatePasswordProfile ({initialUser, onUpdatePassword}: UpdateProfilePasswordProps) {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async(e: FormEvent) => {
    e.preventDefault()
    setError(null);

    try {
        if (newPassword !== confirmNewPassword) {
          setError("Les mots de passe ne correspondent pas");
          return;
        }

        
        await onUpdatePassword(password, newPassword, confirmNewPassword)
        setPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
        
        //  Redirection dynamique
        const redirect = searchParams.get("redirect");
        navigate(redirect || `/profile/${initialUser.id}`);
        
    } catch (error) {
      setError("Échec de la connexion. Vérifiez vos identifiants.");
      console.error("Erreur de connexion:", error);
    }
  };

  return <>
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      {error && <div className="error-message">{error}</div>}

      <Input 
        value={password}
        setValue={setPassword}
        name="password"
        placeholder="Mot de passe"
        type="password" 
        label="Mot de passe"
      />

      <Input 
        value={newPassword}
        setValue={setNewPassword}
        name="password"
        placeholder="Nouveau mot de passe"
        type="password" 
        label="Nouveau mot de passe"
      />

      <Input 
        value={confirmNewPassword}
        setValue={setConfirmNewPassword}
        name="confirmNewpassword"
        placeholder="Confimer le nouveau Password"
        type="password" 
        label="Confirmer le nouveau mot de passe"
      />

      <div className="form-button align-button">
        <button className="default-button" type="submit">Confirmer</button>
      </div>
    </form>
  </>
}

//* Forgot password
const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setMessage("");

    if (!email) {
      setError("Veuillez saisir votre email.");
      setIsSubmitting(false);
      return;
    }

    try {
      //* L'email est récupéré via le formualire et envoyé vers l'api
      const response = await forgotPasswordRequest(email);
      setMessage(response.message);
      
    } catch (error) {
      setError("Une erreur est survenue. Veuillez réessayer");
      console.error("Erreur de connexion:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {message && (
        <div className="alert alert-success">
          {message}
        </div>
      )}
      
      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {!message && (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {error && <div className="error-message">{error}</div>}

          <Input 
            value={email}
            setValue={setEmail}
            name="email"
            placeholder="Votre addresse email"
            type="email" 
            label="Email"
          />

          <div className="form-button align-button">
            <button className="default-button" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Envoi en cours...' : 'Envoyer le lien'}
            </button>

            <button
              type="button"
              className="default-button"
              onClick={() => navigate('/connexion')}
              disabled={isSubmitting}
            >
              Retour
            </button>
          </div>
        </form>
      )}
    </>
  )
}

//* Reset password if forgot password passed
function ResetPasswordForm () {

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [isValidToken, setIsValidToken] = useState(false);
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  //* Ici on récupère le token et l'email dans les params 
  useEffect(() => {
    const tokenFromUrl = searchParams.get('token');
    const emailFormUrl = searchParams.get('email');

  //* Si ils sont présent on initialise et validToken passe à true sinon message d'erreur
    if (tokenFromUrl && emailFormUrl) {
      setToken(tokenFromUrl);
      setEmail(emailFormUrl);
      setIsValidToken(true);
    } else {
      setError("Token ou email de réinitialisation manquant ou invalide.");
    }
  }, [searchParams]);

  //* On créer un schéma de validation suplémentaire coté front
  const validatePassword = (password: string): boolean => {
    // Au minimum 8 caractères, au moins une lettre et un chiffre
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
  };

  //* Gestion de soumission du formulaire
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    if (!newPassword || !confirmNewPassword) {
      setError("Veuillez remplir tous les champs.");
      setIsSubmitting(false);
      return;
    }

    if (!validatePassword(newPassword)) {
      setError("Le mot de passe doit contenir au moins 8 caractères, une lettre et un chiffre.");
      setIsSubmitting(false);
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError("Les mots de passe ne correspondent pas.");
      setIsSubmitting(false);
      return;
    }

    try {
      //* On récupère les données dans un payload
      const payload = {
        token,
        email,
        newPassword,
        confirmNewPassword
      };

      //* Si le payload est complet et valide il est envoyer vers la requette API
      await resetPasswordRequest(payload);
      
      //* Redirection vers la page de connexion avec un message de succès
      navigate('/connexion', { 
        state: { 
          successMessage: "Mot de passe réinitialisé avec succès ! Vous pouvez maintenant vous connecter." 
        }
      });
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Une erreur est survenue. Veuillez réessayer.");
      }
      console.error("Erreur lors de la réinitialisation:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isValidToken) {
    return (
      <div className="error-container">
        <h3>Lien invalide</h3>
        <p>{error}</p>
        <button onClick={() => navigate('/mot-de-passe-oublie')}>
          Demander un nouveau lien
        </button>
      </div>
    );
  }

  return (
    <>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {error && <div className="error-message">{error}</div>}

          <Input 
            value={newPassword}
            setValue={setNewPassword}
            name="password"
            placeholder="Nouveau mot de passe"
            type="password" 
            label="password"
          />

          <Input 
            value={confirmNewPassword}
            setValue={setConfirmNewPassword}
            name="password"
            placeholder="Confimer nouveau mot de passe"
            type="password" 
            label="password"
          />

          {error && (
            <div className="error-message" role="alert">
              {error}
            </div>
          )}

          <div className="form-button align-button">
            <button className="default-button" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Réinitialisation...' : 'Réinitialiser'}
            </button>

            <button
              type="button"
              className="default-button"
              onClick={() => navigate('/connexion')}
              disabled={isSubmitting}
            >
              Retour
            </button>
          </div>
        </form>
    </>
  )
}

export { FormSubscribe, FormLogin, FormUpdateProfile, FormUpdatePasswordProfile, ForgotPasswordForm, ResetPasswordForm, Input}
