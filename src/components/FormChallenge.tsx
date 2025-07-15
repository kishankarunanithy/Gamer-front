
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ICategory, IChallenge, IDifficulty } from "../@types";
import { addChallengeToApi, getCategories, getDifficulties, updateChallenge } from "../api/index";
import useAuthStore from "../store"; 
import { useToast } from "../context/ToastContext";

// Props optionnelles : une fonction à appeler après soumission du formulaire
interface Props {
  onFormSubmit?: () => void;
  challengeId?: number;
  defaultValues?: {
    name: string;
    description: string;
    video_url: string;
    category_id: number;
    difficulty_id: number;
  };
  isModal?: boolean;
  existingChallenges?: IChallenge[];
}

function FormChallenge({ onFormSubmit, challengeId, defaultValues, isModal, existingChallenges }: Props) {
  const navigate = useNavigate();
  const showToast = useToast();
  // États pour stocker les catégories, difficultés et erreurs éventuelles
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [difficulties, setDifficulties] = useState<IDifficulty[]>([]);

  // État pour gérer les données du formulaire
  const [formData, setFormData] = useState({
    name: defaultValues?.name || "",
    description: defaultValues?.description || "",
    video_url: defaultValues?.video_url || "",
    category_id: defaultValues?.category_id?.toString() || "",
    difficulty_id: defaultValues?.difficulty_id?.toString() || "",
  });

  // Récupère les catégories et difficultés depuis le back au chargement du composant
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await getCategories();
        if (Array.isArray(categoriesData)) {
          setCategories(categoriesData);
        } else {
          showToast("Catégories non valides.", "error");
          setCategories([]);
        }

        const difficultiesData = await getDifficulties();
        if(Array.isArray(difficultiesData)) {
          setDifficulties(difficultiesData);
        } else {
          showToast("Difficultés non valides.", "error");
          setDifficulties([]);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
        showToast("Erreur lors du chargement des données.", "error");
        setCategories([]);
        setDifficulties([]);
      }
    };

    fetchData();
  }, [showToast]);

  // Gère le changement de valeur dans les champs du formulaire
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  // Envoie du formulaire à la base de données
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
        
    if (!user || !token) {
      showToast("Tu dois être connecté pour modifier ou créer un challenge.", "error");
      return;
    }
  
    const payload = {
      ...formData,
      user_id: user.id, 
      category_id: Number(formData.category_id),
      difficulty_id: Number(formData.difficulty_id),
    };

    
    const nameExists = existingChallenges?.some(challenge => challenge.name === formData.name && challenge.id !== challengeId);
        if (nameExists) {
            showToast("Ce nom de challenge existe déjà. Veuillez en choisir un autre.", "error");
            return; // Important: Arrêter la soumission si le nom existe déjà
        }
  
    try {
      let responseData;
  
      if (challengeId) {
        responseData = await updateChallenge(challengeId, payload, token);
        showToast("Votre challenge à été modifié avec succès.", "success");
      } else {
        responseData = await addChallengeToApi(payload, token);
        showToast("Votre challenge à été crée avec succès.", "success");
      }
  
      if (onFormSubmit) onFormSubmit();

      navigate(`/challenges/${responseData?.id}`, { 
        state: { 
          successMessage: "Votre challenge à été modifié avec succès.", 
        }
      });
  
    } catch (error) {
      console.error("Une erreur s'est produite.", error);
      showToast("Une erreur s'est produite.", "error");
    }
  };
  

  // Rendu du formulaire
  return (
    <section className="default-box-design">
  <form className="form-challenge" onSubmit={handleSubmit}>
    <p className="paragraph-center low-title">
      {challengeId ? "Modifier le Challenge" : "Créer un Challenge"}
    </p>

    <input
      type="text"
      className="form-input"
      name="name"
      placeholder="Titre"
      value={formData.name}
      onChange={handleChange}
      required
    />

    <textarea
      className="form-input"
      name="description"
      placeholder="Description"
      value={formData.description}
      onChange={handleChange}
      required
    />

    <input
      type="text"
      className="form-input"
      name="video_url"
      placeholder="URL de la vidéo"
      value={formData.video_url}
      onChange={handleChange}
      required
    />

    <select
      name="category_id"
      className="form-input"
      value={formData.category_id}
      onChange={handleChange}
      required
    >
      <option value="">-- Sélectionner une catégorie --</option>
      {categories.map((cat) => (
        <option key={cat.id} value={cat.id}>
          {cat.name}
        </option>
      ))}
    </select>

    <select
      name="difficulty_id"
      className="form-input"
      value={formData.difficulty_id}
      onChange={handleChange}
      required
    >
      <option value="">-- Sélectionner une difficulté --</option>
      {difficulties.map((diff) => (
        <option key={diff.id} value={diff.id}>
          {diff.name}
        </option>
      ))}
    </select>

        <div className="form-buttons">
          <button type="submit" className="default-button form-button">
            Valider
          </button>
          {!isModal && (
            <button
              type="button"
              className="default-button form-button"
              onClick={() => navigate("/")}
            >
              Retour
            </button>
          )}
          
        </div>
      </form>
    </section>
  );
}

export default FormChallenge;
