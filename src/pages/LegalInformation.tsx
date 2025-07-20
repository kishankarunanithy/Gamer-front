import "../App.css";

export default function LegalInformation() {
  return (
    <main className="legal-information-page">
      <div className="default-box-design">
        <h1 className="main-title">⚖️ Mentions Légales</h1>
        
        <div className="legal-content">
          <p className="default-text">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
          </p>

          <section className="legal-section">
            <h2 className="subtitle">1. Éditeur du site</h2>
            <div className="legal-info-box">
              <p className="default-text">
                <strong>Nom du site :</strong> Gamer Challenges<br />
                <strong>Adresse :</strong> 404 Rue du Jurassic, 69000 Lyon<br />
                <strong>Téléphone :</strong> 06 06 06 06 06<br />
                <strong>Email :</strong> contact@gamerchallenges.com<br />
                <strong>Directeur de publication :</strong> Denver<br />
                <strong>Responsable de la rédaction :</strong> Petit Pied
              </p>
            </div>
          </section>

          <section className="legal-section">
            <h2 className="subtitle">2. Hébergement</h2>
            <div className="legal-info-box">
              <p className="default-text">
                <strong>Frontend (Interface utilisateur) :</strong><br />
                <strong>Hébergeur :</strong> Vercel Inc.<br />
                <strong>Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis<br />
                <strong>Site web :</strong> https://vercel.com<br />
                <strong>Email :</strong> privacy@vercel.com
              </p>
              <p className="default-text">
                <strong>Backend (API et base de données) :</strong><br />
                <strong>Hébergeur :</strong> Railway Corp.<br />
                <strong>Adresse :</strong> 2261 Market Street #5021, San Francisco, CA 94114, États-Unis<br />
                <strong>Site web :</strong> https://railway.app<br />
                <strong>Email :</strong> privacy@railway.app
              </p>
            </div>
          </section>

          <section className="legal-section">
            <h2 className="subtitle">3. Conditions d'utilisation</h2>
            <p className="default-text">
              L'utilisation de Gamer Challenges implique l'acceptation pleine et entière des conditions générales d'utilisation ci-après décrites. 
              Ces conditions d'utilisation sont susceptibles d'être modifiées ou complétées à tout moment.
            </p>
            
            <h3 className="low-title">3.1 Accès au service</h3>
            <p className="default-text">
              Gamer Challenges est accessible gratuitement à tout utilisateur disposant d'un accès Internet. 
              Tous les coûts afférents à l'accès au service (matériel informatique, logiciels, connexion Internet, etc.) 
              sont à la charge de l'utilisateur.
            </p>

            <h3 className="low-title">3.2 Inscription et compte utilisateur</h3>
            <ul className="legal-list">
              <li>L'inscription est obligatoire pour créer des défis et participer</li>
              <li>L'utilisateur doit fournir des informations exactes et à jour</li>
              <li>Chaque utilisateur est responsable de la confidentialité de ses identifiants</li>
              <li>L'utilisateur s'engage à ne pas partager son compte avec des tiers</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2 className="subtitle">4. Propriété intellectuelle</h2>
            
            <h3 className="low-title">4.1 Contenu du site</h3>
            <p className="default-text">
              L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. 
              Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
            </p>

            <h3 className="low-title">4.2 Contenu utilisateur</h3>
            <p className="default-text">
              En publiant du contenu sur Gamer Challenges, l'utilisateur :
            </p>
            <ul className="legal-list">
              <li>Garantit qu'il détient les droits sur le contenu publié</li>
              <li>Accorde à Gamer Challenges une licence non exclusive d'utilisation</li>
              <li>Autorise la diffusion de son contenu sur la plateforme</li>
              <li>Restera propriétaire de son contenu original</li>
            </ul>

            <h3 className="low-title">4.3 Marques et logos</h3>
            <p className="default-text">
              Les marques et logos présents sur le site sont la propriété de leurs détenteurs respectifs. 
              Toute reproduction sans autorisation préalable est interdite.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="subtitle">5. Responsabilité</h2>
            
            <h3 className="low-title">5.1 Responsabilité de l'éditeur</h3>
            <p className="default-text">
              Gamer Challenges s'efforce d'assurer au mieux l'exactitude et la mise à jour des informations diffusées sur ce site, 
              dont elle se réserve le droit de corriger, à tout moment et sans préavis, le contenu. 
              Cependant, Gamer Challenges ne peut garantir l'exactitude, la complétude, l'actualité des informations diffusées sur son site.
            </p>

            <h3 className="low-title">5.2 Responsabilité de l'utilisateur</h3>
            <ul className="legal-list">
              <li>L'utilisateur est responsable du contenu qu'il publie</li>
              <li>Il s'engage à ne pas publier de contenu illégal, diffamatoire ou offensant</li>
              <li>Il respecte les droits d'auteur et la propriété intellectuelle</li>
              <li>Il ne doit pas perturber le fonctionnement du service</li>
            </ul>

            <h3 className="low-title">5.3 Limitation de responsabilité</h3>
            <p className="default-text">
              Gamer Challenges ne pourra être tenue responsable des dommages directs ou indirects résultant de l'utilisation du site, 
              notamment en cas de perte de données, d'interruption de service ou d'erreurs techniques.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="subtitle">6. Modération et sanctions</h2>
            <p className="default-text">
              Gamer Challenges se réserve le droit de :
            </p>
            <ul className="legal-list">
              <li>Modérer tout contenu publié sur la plateforme</li>
              <li>Suspendre ou supprimer un compte utilisateur en cas de non-respect des règles</li>
              <li>Supprimer tout contenu inapproprié sans préavis</li>
              <li>Porter plainte en cas d'infraction pénale</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2 className="subtitle">7. Liens hypertextes</h2>
            <p className="default-text">
              Les liens hypertextes mis en place dans le cadre du présent site web en direction d'autres ressources présentes sur le réseau Internet 
              ne sauraient engager la responsabilité de Gamer Challenges.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="subtitle">8. Cookies</h2>
            <p className="default-text">
              Le site peut-être amené à vous demander l'acceptation des cookies pour des besoins de statistiques et d'affichage. 
              Un cookie ne nous permet pas de vous identifier ; il sert uniquement à enregistrer des informations relatives à la navigation 
              de votre ordinateur sur notre site.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="subtitle">9. Droit applicable</h2>
            <p className="default-text">
              Tout litige en relation avec l'utilisation du site Gamer Challenges est soumis au droit français. 
              Hormis les cas où la loi ne le permet pas, il est fait attribution exclusive de juridiction aux tribunaux compétents de [Votre ville].
            </p>
          </section>

          <section className="legal-section">
            <h2 className="subtitle">10. Protection des données personnelles</h2>
            <p className="default-text">
              Conformément aux dispositions de la loi n° 78-17 du 6 janvier 1978 modifiée, l'utilisateur dispose d'un droit d'accès, 
              de modification et de suppression des informations qui le concernent. Pour exercer ce droit, 
              adressez-vous à : privacy@gamerchallenges.com
            </p>
            <p className="default-text">
              Pour plus d'informations sur le traitement de vos données personnelles, 
              consultez notre <a href="/politique-confidentialite" className="link-color">Politique de confidentialité</a>.
            </p>
          </section>

          <section className="legal-section">
            <h2 className="subtitle">11. Contact</h2>
            <div className="contact-info">
              <p className="default-text">
                Pour toute question concernant ces mentions légales, vous pouvez nous contacter :<br />
                <strong>Email :</strong> legal@gamerchallenges.com<br />
                <strong>Adresse :</strong> 404 Rue du Jurassic, 69000 Lyon<br />
                <strong>Téléphone :</strong> 06 06 06 06 06
              </p>
            </div>
          </section>

          <div className="legal-footer">
            <p className="default-text">
              Ces mentions légales sont conformes aux exigences légales françaises et européennes. 
              Elles peuvent être modifiées à tout moment. La version en vigueur est celle accessible sur le site.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
