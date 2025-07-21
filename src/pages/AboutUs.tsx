import "../App.css";

export default function AboutUs() {
  return (
    <main className="about-us-page">
      <div className="default-box-design">
        <h1 className="main-title">🎮 À Propos de Gamer Challenges</h1>
        
        <div className="about-content">
          <section className="about-section">
            <h2 className="subtitle">Notre Projet</h2>
            <p className="default-text">
              Gamer Challenges est une plateforme fictive de défis de jeux vidéo que nous avons développée 
              dans le cadre de notre projet de fin de formation Développeur Web et Web Mobile (DWWM). 
              Cette application web moderne permet aux joueurs de créer, partager et participer à des défis 
              en publiant leurs performances vidéo.
            </p>
          </section>

          <section className="about-section">
            <h2 className="subtitle">Notre Équipe</h2>
            <div className="team-grid">
              <div className="team-member">
                <div className="member-avatar">👩‍💻</div>
                <h3 className="low-title">Sandrine</h3>
                <p className="member-role">Product Owner</p>
                <p className="default-text">Développeuse Full-Stack</p>
              </div>
              <div className="team-member">
                <div className="member-avatar">👨‍💻</div>
                <h3 className="low-title">Kishan</h3>
                <p className="member-role">Scrum Master & Lead Dev Front</p>
                <p className="default-text">Développeur Full-Stack</p>
              </div>
              <div className="team-member">
                <div className="member-avatar">👨‍💻</div>
                <h3 className="low-title">Mathias</h3>
                <p className="member-role">Lead Dev Back</p>
                <p className="default-text">Développeur Full-Stack</p>
              </div>
              <div className="team-member">
                <div className="member-avatar">👨‍💻</div>
                <h3 className="low-title">Benjamin</h3>
                <p className="member-role">Git Master</p>
                <p className="default-text">Développeur Full-Stack</p>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2 className="subtitle">Notre Approche de Développement</h2>
            <div className="development-info">
              <h3 className="low-title">Méthodologie Agile</h3>
              <p className="default-text">
                Nous avons développé Gamer Challenges en utilisant une approche Agile avec 4 sprints d'une semaine chacun, 
                permettant une évolution progressive et itérative du projet.
              </p>
              
              <div className="sprint-timeline">
                <div className="sprint-item">
                  <div className="sprint-number">1</div>
                  <div className="sprint-content">
                    <h4>Sprint 1</h4>
                    <p>Conception et architecture du projet</p>
                  </div>
                </div>
                <div className="sprint-item">
                  <div className="sprint-number">2</div>
                  <div className="sprint-content">
                    <h4>Sprint 2</h4>
                    <p>Développement des fonctionnalités de base</p>
                  </div>
                </div>
                <div className="sprint-item">
                  <div className="sprint-number">3</div>
                  <div className="sprint-content">
                    <h4>Sprint 3</h4>
                    <p>Implémentation des fonctionnalités avancées</p>
                  </div>
                </div>
                <div className="sprint-item">
                  <div className="sprint-number">4</div>
                  <div className="sprint-content">
                    <h4>Sprint 4</h4>
                    <p>Finalisation et déploiement</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2 className="subtitle">Technologies Utilisées</h2>
            <div className="tech-stack">
              <div className="tech-category">
                <h3 className="low-title">Frontend</h3>
                <ul className="tech-list">
                  <li>React.js avec TypeScript</li>
                  <li>Vite pour le build</li>
                  <li>CSS personnalisé</li>
                  <li>React Router pour la navigation</li>
                  <li>Zustand pour la gestion d'état</li>
                </ul>
              </div>
              <div className="tech-category">
                <h3 className="low-title">Backend</h3>
                <ul className="tech-list">
                  <li>Node.js avec Express</li>
                  <li>Base de données SQL</li>
                  <li>JWT pour l'authentification</li>
                  <li>Multer pour la gestion des fichiers</li>
                  <li>Nodemailer pour l'envoi d'emails</li>
                </ul>
              </div>
              <div className="tech-category">
                <h3 className="low-title">Déploiement</h3>
                <ul className="tech-list">
                  <li>Vercel pour le frontend</li>
                  <li>Railway pour le backend</li>
                  <li>Git pour le versioning</li>
                  <li>GitHub pour la collaboration</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2 className="subtitle">Fonctionnalités Principales</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">🎯</div>
                <h3 className="low-title">Création de Défis</h3>
                <p className="default-text">Les utilisateurs peuvent créer des défis personnalisés avec des vidéos YouTube</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🎥</div>
                <h3 className="low-title">Soumission de Vidéos</h3>
                <p className="default-text">Partagez vos performances en répondant aux défis</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🏆</div>
                <h3 className="low-title">Classements</h3>
                <p className="default-text">Système de leaderboard pour les joueurs et les défis</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">👤</div>
                <h3 className="low-title">Profils Utilisateurs</h3>
                <p className="default-text">Gérez votre profil et suivez vos performances</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🔐</div>
                <h3 className="low-title">Authentification</h3>
                <p className="default-text">Système sécurisé d'inscription et de connexion</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📱</div>
                <h3 className="low-title">Responsive Design</h3>
                <p className="default-text">Interface adaptée à tous les appareils</p>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2 className="subtitle">Notre Vision</h2>
            <p className="default-text">
              Gamer Challenges représente notre vision d'une plateforme communautaire moderne où les joueurs 
              peuvent partager leur passion pour les jeux vidéo de manière créative et engageante. 
              Ce projet nous a permis de mettre en pratique toutes les compétences acquises lors de notre formation DWWM.
            </p>
          </section>

          <section className="about-section">
            <h2 className="subtitle">Formation DWWM</h2>
            <p className="default-text">
              Ce projet a été réalisé dans le cadre de notre formation Développeur Web et Web Mobile, 
              qui nous a permis d'acquérir les compétences nécessaires pour développer des applications web modernes 
              et performantes. Cette expérience nous a préparés aux défis du développement web professionnel.
            </p>
          </section>

          <div className="about-footer">
            <p className="default-text">
              Merci de découvrir Gamer Challenges ! Ce projet représente le fruit de notre collaboration 
              et de notre passion pour le développement web. 🚀
            </p>
            <div className="project-info">
              <p className="default-text">
                <strong>Projet de fin de formation DWWM</strong><br />
                Développé avec ❤️ par Sandrine, Kishan, Mathias et Benjamin
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
