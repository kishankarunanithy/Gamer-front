# 🎮 Gamer Challenges

Plateforme fictive de défis de jeux vidéo, réalisée dans le cadre du projet de fin de formation DWWM (Développeur Web et Web Mobile).

---

## 🚀 Présentation

Gamer Challenges est une application web permettant aux joueurs de créer, partager et relever des défis autour de leurs jeux vidéo favoris. Les utilisateurs peuvent poster leurs performances en vidéo, participer à des classements, et interagir avec la communauté.

Ce projet a été développé en 4 sprints d'une semaine, selon une organisation Agile.

---

## ✨ Fonctionnalités principales

- Création de défis personnalisés avec vidéo YouTube
- Soumission de vidéos pour répondre aux défis
- Classements (leaderboards) pour joueurs et défis
- Profils utilisateurs personnalisés
- Système d’authentification sécurisé (inscription/connexion)
- Responsive design (mobile, tablette, desktop)
- Modération et gestion des contenus

---

## 🛠️ Stack technique

### Frontend
- React.js + TypeScript
- Vite
- Zustand (gestion d’état)
- React Router
- CSS personnalisé
- Hébergement : **Vercel**

### Backend
- Node.js + Express
- Base de données SQL
- JWT (authentification)
- Multer (upload fichiers)
- Nodemailer (emails)
- Hébergement : **Railway**

### Outils & Déploiement
- Git & GitHub (versioning/collaboration)
- Méthodologie Agile (4 sprints)

---

## 👥 Équipe & Rôles

- **Sandrine** : Product Owner, Développeuse Full-Stack
- **Kishan** : Scrum Master & Lead Dev Front, Développeur Full-Stack
- **Mathias** : Lead Dev Back, Développeur Full-Stack
- **Benjamin** : Git Master, Développeur Full-Stack

---

## 📁 Structure du projet (frontend)

```
├── public/
├── src/
│   ├── api/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── store/
│   ├── styles/
│   └── utils/
├── App.tsx
├── App.css
├── index.html
└── ...
```

---

## ⚙️ Installation & lancement local

1. **Cloner le dépôt**
   ```bash
   git clone [URL_DU_DEPOT]
   cd gamer-challenges-front
   ```
2. **Installer les dépendances**
   ```bash
   npm install
   ```
3. **Lancer le projet en développement**
   ```bash
   npm run dev
   ```
4. **Accéder à l’application**
   - Ouvrir [http://localhost:5173](http://localhost:5173) dans votre navigateur

> ⚠️ Le backend doit être lancé séparément (voir dossier `/gamer-challenges-back`).

---

## 🌍 Déploiement

- **Frontend** : [Vercel](https://vercel.com)
- **Backend** : [Railway](https://railway.app)

---

## 🔗 Liens utiles

- [À propos](./src/pages/AboutUs.tsx)
- [Mentions légales](./src/pages/LegalInformation.tsx)
- [Politique de confidentialité](./src/pages/PrivacyPolicy.tsx)
- [Documentation API (Swagger)](../gamer-challenges-back/docs/swagger.yaml)

---

## 🙏 Remerciements & contexte

Ce projet a été réalisé dans le cadre de la formation DWWM (Développeur Web et Web Mobile). Il nous a permis de mettre en pratique nos compétences en développement web, travail d’équipe, gestion de projet Agile et déploiement cloud.

Merci à tous les formateurs et à l’équipe pour cette belle aventure !

---

**Projet fictif à but pédagogique.**
