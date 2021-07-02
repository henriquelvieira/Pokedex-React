import { Link } from 'react-router-dom';
import { capitalizeText } from '../../services/utilities';
//import './styles.scss';

function Card({ 
  imagem, 
  name, 
  id
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