import { Link } from 'react-router-dom';
import { capitalizeText } from '../../services/utilities';
//import './styles.scss';

/*
function Card1({ 
    imagem, 
    name
  }) {
    return (
           <div className="card">
              <Link to={`/pokemon/${name}`}>
                <img src={imagem} alt={name} />
                <div className="container">
                  <h4><b>{capitalizeText(name)}</b></h4>
                  <p>Habilidades</p>
                </div>
              </Link>
            </div>
    )
}

function Card2({ 
  imagem, 
  name
}) {
  return (
          <article>
              
              <span className="image">
                <img src={imagem} alt={name} />
              </span>
              
              <Link to={`/pokemon/${name}`}>
                <h2>{name}</h2>
              </Link>
            
          </article>
  )
}
*/
function Card({ 
  imagem, 
  name
}) {
  return (
          <li>
            <Link to={`/pokemon/${name}`}>
              <span className="image"> 
                <img src={imagem} alt={name} />
              </span>
              <h3>{capitalizeText(name)}</h3>
            </Link>
        </li>
  )
}




export { Card };