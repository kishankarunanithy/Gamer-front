import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormChallenge from "../components/FormChallenge";
import useAuthStore from "../store";

export default function Creation() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/connexion?redirect=/creation");
    } else {
      setChecking(false);
    }
  }, [user, navigate]);

  if (checking) return <p className="paragraph-center">Chargement...</p>;

  return (
    <main className="formulaire-section">
      
      <FormChallenge onFormSubmit={() => navigate("/")} />
    </main>
  );
}

