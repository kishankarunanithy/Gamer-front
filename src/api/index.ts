import type { IChallenges, IChallenge, IUser, IChallengePayload, ICategory, IDifficulty, IForgotPasswordResponse, IForgotPasswordPayload, IResetPasswordPayload, IResetPasswordResponse } from "../@types";

const baseUrl = import.meta.env.VITE_API_URL;

export async function getChallenges(): Promise<IChallenges> {
  const response = await fetch(`${baseUrl}/challenges`);
  const challenges = await response.json();
  if (!response.ok) {
    throw new Error("Impossible de récupérer les challenges.");
  }
  return challenges;
}

export async function getChallengeById(id: number): Promise<IChallenge> {
  const response = await fetch(
    `${baseUrl}/challenges/${id}`
  );
  const challenge = await response.json();
  if (!response.ok) {
    throw new Error("Impossible de récupérer le challenge.");
  }
  return challenge;
}

export async function getChallengesByUser(id: number): Promise<IChallenges> {
  const response = await fetch(`${baseUrl}/users/${id}/challenges`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Impossible de récupérer les challenges créés par l'utilisateur.");
  }
  return await response.json();
}

export async function getChallengesCreatedByUser(userId: number): Promise<IChallenges> {
  const response = await fetch(`${baseUrl}/challenges/user/${userId}`);
  if (!response.ok) {
    throw new Error("Impossible de récupérer les challenges créés par l'utilisateur.");
  }
  return await response.json();
}

export async function getUsers(): Promise<IUser[]> {
  const response = await fetch(`${baseUrl}/users`);
  const users = await response.json();
  return users;
}

export async function loginUser(pseudoOrEmail: string, password: string): Promise<{ token: string; userId: number}> {
  const response = await fetch(`${baseUrl}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pseudoOrEmail, password })
  })
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Nom d'utilisateur ou mot de passe incorrect");
  }
  return response.json();
}

export async function getUserById(userId: number, token?: string): Promise<IUser> {
  const headers: Record<string, string> = {};

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const response  = await fetch(`${baseUrl}/users/${userId}`, {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    throw new Error("Impossible de récupérer les informations de l'utilisateur.");
  }
  return response.json();
}

export async function addUserIntoApi(
  pseudo: string,
  email: string,
  password: string,
  confirmPassword: string,
  avatar: File | null
): Promise<null | IUser> {
  try {

    //* Créer un FormData pour envoyer les données textuelles et l'avatar
    const formData = new FormData();
    formData.append('pseudo', pseudo);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('confirmPassword', confirmPassword);
    

    //* Ajouter l'avatar seulement s'il existe
    if (avatar) {
      formData.append('avatar', avatar);
    }
    
    const result = await fetch(`${baseUrl}/users`, {
      method: 'POST',
      body: formData
      //* Le Content-Type, sera automatiquement défini à multipart/form-data
    });

    if (result.ok) {
      const newUser: IUser = await result.json();
      return newUser;
    }
    throw new Error("Impossible d'ajouter l'utilisateur.");
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'utilisateur", error);
    return null;
  }   
}

//* Update basic profil information
export async function updateUserIntoApi(
  id: number,
  token: string,
  avatar: File | null,
  pseudo?: string,
  email?: string,
): Promise<null | IUser> {

  try {

    const formData = new FormData();
    if (pseudo !== undefined) formData.append('pseudo', pseudo);
    if (email !== undefined) formData.append('email', email);
    if (avatar) formData.append('avatar', avatar);

    const result = await fetch(`${baseUrl}/users/${id}`, {
      method: "PATCH",
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (result.ok) {
      const updatedUser: IUser = await result.json();
      return updatedUser;
    }
    throw new Error("Impossible de mettre à jour le profil.");
  } catch (error) {
    console.error("Erreur lors de la mise à jour du profile", error);
    return null;
  }  
}

//* Update password profil
export async function updateUserPasswordIntoApi(
  id: number,
  token: string,
  password?: string,
  newPassword?: string,
  confirmNewPassword?: string
): Promise<null | IUser> {

  try {

    const formData = new FormData();
    if (password !== undefined) formData.append('password', password);
    if (newPassword !== undefined) formData.append('newPassword', newPassword);
    if (confirmNewPassword) formData.append('confirmNewPassword', confirmNewPassword);

    const result = await fetch(`${baseUrl}/users/${id}`, {
      method: "PATCH",
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (result.ok) {
      const updatedUserPassword: IUser = await result.json();
      return updatedUserPassword;
    }
    throw new Error("Impossible de mettre à jour le mot de passe.");
  } catch (error) {
    console.error("Erreur lors de la mise à jour du profile", error);
    throw new Error("Impossible de mettre à jour le mot de passe.");
  }  
}

//* Send forgot password request
export async function forgotPasswordRequest (email: string): Promise<IForgotPasswordResponse> {

  //* L'email est envoyé en verification au back
  const payload: IForgotPasswordPayload = { email };

  const result = await fetch(`${baseUrl}/forgot-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!result.ok) {
    throw new Error ("Erreur lors de la demande de réinitialisation.");
  }


  //* Si l'email correspond à un utilisateur un lien est envoyé sur sa boite mail
  //* Un token sera alors généré
  const data: IForgotPasswordResponse = await result.json();
  return data
}

export async function resetPasswordRequest (payload: IResetPasswordPayload): Promise<IResetPasswordResponse> {

  const response = await fetch(`${baseUrl}/reset-password`, {
    method: 'POST',
    headers: {
      'Content-Type': "application/json"
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error ("Erreur lors de la réinitialisation du mot de passe.");
  }

  const data: IResetPasswordResponse = await response.json();
  return data;
}



export async function addSubmissionToChallenge(challengeId: number, videoUrl: string, token: string) {
  const response = await fetch(`${baseUrl}/challenges/${challengeId}/submissions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ video_url: videoUrl }),
  })
  if (!response.ok) {
    console.error(response);
    throw new Error("Impossible d'ajouter la soumission.");
  }
  return await response.json();
}

export async function updateUserSubmission(userId: number, challengeId: number, videoUrl: string, token: string) {
  const response = await fetch(`${baseUrl}/users/${userId}/submissions/${challengeId}`, {
    method: 'PATCH',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
     },
    body: JSON.stringify({ video_url: videoUrl }),
  })
  if (!response.ok) {
    console.error(response);
    throw new Error("Impossible de mettre à jour la soumission.");
  }
  return await response.json()
}

export async function deleteUserSubmission(userId: number, challengId: number, token: string) {
  const response = await fetch(`${baseUrl}/users/${userId}/submissions/${challengId}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if(!response.ok) {
    console.error(response);
    throw new Error("Impossible de supprimer la soumission.");
  }
  return true;
}

export async function updateChallenge(
  id: number,
  data: object,
  token: string

): Promise<null | IChallenge> {
  try {
    const response = await fetch(`${baseUrl}/challenges/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erreur lors de la modification");
    }

    return await response.json();
  } catch (err) {
    console.error("Erreur API updateChallenge :", err);
    throw new Error("Erreur lors de la modification du challenge.");
  }
}

export async function addChallengeToApi(payload: IChallengePayload, token: string) {
  const response = await fetch(`${baseUrl}/challenges`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Erreur lors de l'ajout du challenge.");
  }

  return await response.json()
  
}

export async function getCategories(): Promise<ICategory[]> {
  const response = await fetch(`${baseUrl}/categories`);
  const categories = response.json();
  return categories
}

export async function getDifficulties(): Promise<IDifficulty[]>{
  const response = await fetch(`${baseUrl}/difficulties`);
  const difficulties = response.json();
  return difficulties;
}

export async function deleteChallenge(id: number, token: string): Promise<void> {
  const response = await fetch(`${baseUrl}/challenges/${id}`, {
    method: "DELETE",
    headers: { "Authorization": `Bearer ${token}` },
  })

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erreur lors de la suppression.");
  }
}
 
export async function deleteUser(userId: number, token: string): Promise<boolean> {
  const response = await fetch(`${baseUrl}/users/${userId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erreur lors de la suppression.");
  }

  return true;
}
