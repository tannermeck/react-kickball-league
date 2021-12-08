import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TeamList from './views/teams/TeamList';
import Home from './views/home/Home';
import Header from './views/header/Header';
import PlayerList from './views/players/PlayerList';
import TeamDetail from './views/teams/TeamDetail';
import PlayerDetail from './views/players/PlayerDetail';


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
