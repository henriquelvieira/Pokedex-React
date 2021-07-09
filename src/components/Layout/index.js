import { useLoading } from '../../hooks/useLoading';
import { Link } from 'react-router-dom';

import logo from '../../assets/images/logo.svg';
import './styles.scss';


function Layout({ 
    page_name,
    children, 
}) {

    //Importação do state loading e o Componente Loading do Hook useLoading
    const { loading, Loading } = useLoading();
    
    return (
        <div id="wrapper">
                
                {page_name && (      
                    <header id="header" className="alt">
                        <Link to='/'>
                            <img src={logo} alt='Pokémon Logo' />
                        </Link>
                    </header>
                )}

                <div id="main">
                    <Loading status = {loading}  />
                    {children}
                </div>

        </div>
    )
  }
  
  
  
  
  export { Layout };