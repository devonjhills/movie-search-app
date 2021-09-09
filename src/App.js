import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import MenuNavbar from "./components/MenuNavbar";
import MovieHub from "./components/MovieHub";
import TvHub from "./components/TvHub";
import SearchPage from "./components/SearchPage";
import MovieDetails from "./components/MovieDetails";
import FourOhFour from "./components/FourOhFour";

function App() {
  return (
    <Router>
      <MenuNavbar />
      <div className="App">
        <Switch>
          <Route exact path="/" component={MovieHub} />
          <Route exact path="/tvhub" component={TvHub} />
          <Route exact path="/:movieId" component={MovieDetails} />
          <Route exact path="/search" component={SearchPage} />
          <Route component={FourOhFour} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
