import {BrowserRouter, Route, Switch} from 'react-router-dom';


import { Home } from './pages/Home';
import { Detalhes } from './pages/Detalhes';

import { LoadingContextProvider } from './contexts/LoadingContext';

//Context usada na paginação para que ao voltar da página de detalhes para a principal o usuário continue na mesma página em que estava
import { PaginationContextProvider } from './contexts/PaginationContext';  
import './assets/css/main.css';

function App() {

  return (
    <BrowserRouter>
      <LoadingContextProvider>
        <Switch>

          <PaginationContextProvider> 
            <Route path="/" exact={true} component={Home} />
            <Route path="/pokemon/:id" component={Detalhes} />
          </PaginationContextProvider>
          
        </Switch>

      </LoadingContextProvider>
    </BrowserRouter>

  );
}

export default App;
