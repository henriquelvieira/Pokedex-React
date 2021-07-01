import {BrowserRouter, Route, Switch} from 'react-router-dom';


import { Home } from './pages/Home';
import { Detalhes } from './pages/Detalhes';

import { LoadingContextProvider } from './contexts/LoadingContext';
import './assets/css/main.css';

function App() {

  return (
    <BrowserRouter>
      <LoadingContextProvider>
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/pokemon/:id" component={Detalhes} />
        </Switch>
      </LoadingContextProvider>
    </BrowserRouter>

  );
}

export default App;
