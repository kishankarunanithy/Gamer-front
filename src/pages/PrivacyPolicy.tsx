import "../App.css";

export default function PrivacyPolicy() {
  return (
    <main className="privacy-policy-page">
      <div className="default-box-design">
        <h1 className="main-title">🔒 Politique de Confidentialité</h1>
        
        <div className="privacy-content">
          <p className="default-text">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
          </p>

          <section className="privacy-section">
            <h2 className="subtitle">1. Introduction</h2>
            <p className="default-text">
              Bienvenue sur Gamer Challenges ! Nous respectons votre vie privée et nous nous engageons à protéger vos données personnelles. 
              Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations lorsque vous utilisez notre plateforme de défis de jeux vidéo.
            </p>
          </section>

          <section className="privacy-section">
            <h2 className="subtitle">2. Informations que nous collectons</h2>
            
            <h3 className="low-title">2.1 Informations que vous nous fournissez</h3>
            <ul className="privacy-list">
              <li>Informations de compte : nom d'utilisateur, adresse e-mail, mot de passe</li>
              <li>Profil utilisateur : avatar, biographie, préférences de jeu</li>
              <li>Contenu créé : défis, vidéos, commentaires, soumissions</li>
              <li>Communications : messages, commentaires, interactions avec d'autres utilisateurs</li>
            </ul>

            <h3 className="low-title">2.2 Informations collectées automatiquement</h3>
            <ul className="privacy-list">
              <li>Données de connexion : adresse IP, type de navigateur, système d'exploitation</li>
              <li>Données d'utilisation : pages visitées, temps passé, interactions</li>
              <li>Cookies et technologies similaires pour améliorer votre expérience</li>
              <li>Données de localisation (si vous l'autorisez)</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2 className="subtitle">3. Comment nous utilisons vos informations</h2>
            <ul className="privacy-list">
              <li>Fournir et maintenir notre service de défis de jeux vidéo</li>
              <li>Gérer votre compte et vos préférences</li>
              <li>Permettre la création et la participation aux défis</li>
              <li>Faciliter les interactions entre utilisateurs</li>
              <li>Améliorer nos services et développer de nouvelles fonctionnalités</li>
              <li>Assurer la sécurité et prévenir les abus</li>
              <li>Vous informer des mises à jour et nouveautés</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2 className="subtitle">4. Partage de vos informations</h2>
            <p className="default-text">
              Nous ne vendons, n'échangeons ni ne louons vos informations personnelles à des tiers. 
              Nous pouvons partager vos informations dans les cas suivants :
            </p>
            <ul className="privacy-list">
              <li>Avec votre consentement explicite</li>
              <li>Avec nos prestataires de services (hébergement, analyse, support)</li>
              <li>Pour respecter les obligations légales</li>
              <li>Pour protéger nos droits et la sécurité de nos utilisateurs</li>
              <li>En cas de fusion ou acquisition de notre entreprise</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2 className="subtitle">5. Sécurité des données</h2>
            <p className="default-text">
              Nous mettons en place des mesures de sécurité appropriées pour protéger vos informations :
            </p>
            <ul className="privacy-list">
              <li>Chiffrement des données sensibles</li>
              <li>Accès restreint aux données personnelles</li>
              <li>Surveillance continue de nos systèmes</li>
              <li>Formation de notre équipe sur la protection des données</li>
              <li>Sauvegardes sécurisées</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2 className="subtitle">6. Vos droits</h2>
            <p className="default-text">
              Conformément au RGPD et aux lois applicables, vous disposez des droits suivants :
            </p>
            <ul className="privacy-list">
              <li><strong>Droit d'accès :</strong> Demander une copie de vos données personnelles</li>
              <li><strong>Droit de rectification :</strong> Corriger des informations inexactes</li>
              <li><strong>Droit à l'effacement :</strong> Demander la suppression de vos données</li>
              <li><strong>Droit à la portabilité :</strong> Récupérer vos données dans un format structuré</li>
              <li><strong>Droit d'opposition :</strong> Vous opposer au traitement de vos données</li>
              <li><strong>Droit de limitation :</strong> Limiter le traitement de vos données</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2 className="subtitle">7. Conservation des données</h2>
            <p className="default-text">
              Nous conservons vos données personnelles aussi longtemps que nécessaire pour :
            </p>
            <ul className="privacy-list">
              <li>Fournir nos services</li>
              <li>Respecter nos obligations légales</li>
              <li>Résoudre les litiges</li>
              <li>Faire respecter nos accords</li>
            </ul>
            <p className="default-text">
              Les données sont supprimées ou anonymisées lorsque nous n'en avons plus besoin.
            </p>
          </section>

          <section className="privacy-section">
            <h2 className="subtitle">8. Cookies et technologies similaires</h2>
            <p className="default-text">
              Nous utilisons des cookies et des technologies similaires pour :
            </p>
            <ul className="privacy-list">
              <li>Mémoriser vos préférences et paramètres</li>
              <li>Analyser l'utilisation de notre site</li>
              <li>Améliorer nos services</li>
              <li>Assurer la sécurité</li>
            </ul>
            <p className="default-text">
              Vous pouvez contrôler l'utilisation des cookies via les paramètres de votre navigateur.
            </p>
          </section>

          <section className="privacy-section">
            <h2 className="subtitle">9. Transferts internationaux</h2>
            <p className="default-text">
              Vos données peuvent être transférées et traitées dans des pays autres que votre pays de résidence. 
              Nous nous assurons que ces transferts respectent les lois applicables et mettons en place des garanties appropriées.
            </p>
          </section>

          <section className="privacy-section">
            <h2 className="subtitle">10. Protection des mineurs</h2>
            <p className="default-text">
              Notre service n'est pas destiné aux enfants de moins de 13 ans. 
              Nous ne collectons pas sciemment d'informations personnelles auprès d'enfants de moins de 13 ans. 
              Si vous êtes parent ou tuteur et que vous pensez que votre enfant nous a fourni des informations personnelles, 
              contactez-nous immédiatement.
            </p>
          </section>

          <section className="privacy-section">
            <h2 className="subtitle">11. Modifications de cette politique</h2>
            <p className="default-text">
              Nous pouvons mettre à jour cette politique de confidentialité de temps à autre. 
              Nous vous informerons de tout changement important en publiant la nouvelle politique sur cette page 
              et en mettant à jour la date de "dernière mise à jour".
            </p>
          </section>

          <section className="privacy-section">
            <h2 className="subtitle">12. Nous contacter</h2>
            <p className="default-text">
              Si vous avez des questions concernant cette politique de confidentialité ou nos pratiques de protection des données, 
              n'hésitez pas à nous contacter :
            </p>
            <div className="contact-info">
              <p className="default-text">
                <strong>Email :</strong> privacy@gamerchallenges.com<br />
                <strong>Adresse :</strong> [Votre adresse]<br />
                <strong>Téléphone :</strong> [Votre numéro]
              </p>
            </div>
          </section>

          <section className="privacy-section">
            <h2 className="subtitle">13. Autorités de contrôle</h2>
            <p className="default-text">
              Si vous résidez dans l'Union européenne et que vous avez des préoccupations concernant le traitement de vos données, 
              vous avez le droit de déposer une plainte auprès de l'autorité de contrôle compétente de votre pays.
            </p>
          </section>

          <div className="privacy-footer">
            <p className="default-text">
              En utilisant Gamer Challenges, vous acceptez les termes de cette politique de confidentialité. 
              Merci de faire confiance à notre plateforme pour vos défis de jeux vidéo !
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
