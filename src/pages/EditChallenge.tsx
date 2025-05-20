import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IChallenge, IChallenges } from "../@types";
import { getChallengeById, getChallenges } from "../api";
import FormChallenge from "../components/FormChallenge";

export default function EditChallenge() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [challenge, setChallenge] = useState<IChallenge | null>(null);
  const [challenges, setChallenges] = useState<IChallenges>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChallenge = async () => {
      if (!id) return;
      const challengeData = await getChallengeById(Number(id));
      if (!challengeData) return navigate("/"); // Redirection si pas trouvé

      const allChallenges = await getChallenges();
      setChallenges(allChallenges);
      setChallenge(challengeData);
      setLoading(false);
    };
    fetchChallenge();
  }, [id, navigate]);

  if (loading) return <p>Chargement...</p>;
  if (!challenge) return <p>Challenge introuvable.</p>;

  return (
    <FormChallenge
      existingChallenges={challenges}
      challengeId={challenge.id}
      defaultValues={{
        name: challenge.name,
        description: challenge.description,
        video_url: challenge.video_url,
        category_id: challenge.category.id,
        difficulty_id: challenge.difficulty.id,
      }}
    />
  );
}
