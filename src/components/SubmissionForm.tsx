import { useState } from "react";
import "../App.css";
import { addSubmissionToChallenge } from "../api";
import useAuthStore from "../store";
import { useToast } from "../context/ToastContext";

interface SubmissionFormProps {
    close: () => void;
    challengeId: number;
    onSuccess: () => void;
}

export default function SubmissionForm({ close, challengeId, onSuccess }: SubmissionFormProps){
    const [videoUrl, setVideoUrl] = useState("");
    const showToast = useToast();

    // Récupérer le token, il sera envoyé dans la requête HTTP vers l'API.
    const token = useAuthStore(state => state.token);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            
            if (!token) {
                showToast("Connectes toi pour participer à un challenge.", "error");
                return;
            }

            // Vérifier si l'URL de la vidéo est bien fournie.
            if (!videoUrl.trim()) {
                showToast("L'URL de la vidéo est obligatoire pour participer.", "error");
                return;
            }

            // Soumettre la participation à l'API pour l'enregistrer en BDD.
            await addSubmissionToChallenge(
                challengeId,
                videoUrl,
                token
            );

            onSuccess();
            close();
        } catch(error) {
            console.error("Erreur lors de l'enregistrement.", error);
            showToast("Erreur lors de l'enregistrement.", "error");
        }
    }
    

    return (
        <div className="default-form-container default-form default-box-design">
            <form onSubmit={handleSubmit}>
                <p className="default-text">Envoie nous tes exploits !</p>

                <input 
                    type="text"
                    className="form-input"
                    name="video_url"
                    placeholder="URL de la vidéo"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                />
                
                <div className="form-button">
                    <button 
                        type="submit" 
                        className="default-button"
                    >
                        Soumettre
                    </button>

                    <button 
                        className="default-button"
                        onClick={close}
                    >
                        Fermer
                    </button>
                </div>
                
                
            </form>
        </div>
    )
}