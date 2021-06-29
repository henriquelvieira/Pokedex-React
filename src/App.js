import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { Detalhes } from './pages/Detalhes';


import { Home } from './pages/Home';
import './assets/css/main.css';

function App() {

  return (
    <BrowserRouter>
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/pokemon/:id" component={Detalhes} />
        </Switch>
    </BrowserRouter>

  );
}

export default App;
