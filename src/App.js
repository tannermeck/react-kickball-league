import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TeamList from './views/TeamList';
import Home from './views/Home';
import Header from './views/Header';
import PlayerList from './views/PlayerList';
import TeamDetail from './views/TeamDetail';
import PlayerDetail from './views/PlayerDetail';


function App() {
  return (
    <div className="App">
      <Router>
        <Header />
          <Switch>
            <Route exact path='/teams' render={(routeProps) => (<TeamList {...routeProps} /> )} />
            <Route exact path='/teams/:id' render={(routeProps) => (<TeamDetail {...routeProps} /> )} />
            <Route exact path='/players' render={(routeProps) => (<PlayerList {...routeProps} /> )} />
            <Route exact path='/players/:id' render={(routeProps) => (<PlayerDetail {...routeProps} /> )} />
            <Route exact path='/' render={(routeProps) => (<Home {...routeProps} /> )} />
          </Switch>
      </Router>
    </div>
  );
}

export default App;
