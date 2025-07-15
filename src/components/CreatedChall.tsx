
import '../App.css'
import { IChallenge } from "../@types"
import { Link } from 'react-router-dom'
import { getYoutubeEmbedUrl } from '../utils/youtube';
interface CreatedChallenges {
    challenge: IChallenge
}

export default function CreatedChall({ challenge }: CreatedChallenges) {
    const embedUrl = getYoutubeEmbedUrl(challenge.video_url);


    return (

        <article className="boxes default-box-design" key={challenge.id}>

            <h3 className="low-title card-title items">{challenge.name}</h3>
            <iframe className="card-video" src={embedUrl}
                    title={`challenge-${challenge.id}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="no-referrer" allowFullScreen></iframe>

            <div className="card-tags">

            {challenge.category && (
                <p
                  className="default-tag-design challenges-tag"
                  style={{ backgroundColor: challenge.category.color }}
                >
                  {challenge.category.name}
                </p>
              )}

              {challenge.difficulty && (
                <p
                  className="default-tag-design challenges-tag"
                  style={{ backgroundColor: challenge.difficulty.color }}
                >
                  {challenge.difficulty.name}
                </p>
              )}

                <p className="default-tag-design challenges-tag" >{challenge.users.length} participants</p>
                
            </div>
                <Link to={`/challenges/${challenge.id}`} className="default-button card-details">Détails</Link>
        </article>  
    )
}