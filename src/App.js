import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import MenuNavbar from "./components/menus/MenuNavbar"
import MovieHub from "./components/media/movie/MovieHub"
import TvHub from "./components/media/tv/TvHub";
import SearchPage from "./components/searches/SearchPage";
import MovieDetails from "./components/media/movie/MovieDetails"
import FourOhFour from "./components/menus/FourOhFour"
import PersonDetails from "./components/media/person/PersonDetails"
import Footer from "./components/menus/Footer";
import DiscoverPage from "./components/searches/DiscoverPage";
import TvDetails from "./components/media/tv/TvDetails";

function App() {
  return (
    <div className="app">
      <div className="content-wrap">
        <Router>
          <MenuNavbar />

          <Switch>
            <Route exact path="/" component={MovieHub} />
            <Route exact path="/results" component={SearchPage} />
            <Route exact path="/discover" component={DiscoverPage} />
            <Route exact path="/tvhub" component={TvHub} />
            <Route exact path="/tvhub/:tvId" component={TvDetails} />
            <Route exact path="/:movieId" component={MovieDetails} />
            <Route exact path="/person/:personId" component={PersonDetails} />
            <Route exact path='/fourohfour' component={FourOhFour} />
            <Route component={FourOhFour} />
          </Switch>
        </Router>
      </div>
      <Footer />
    </div>
  );
}

export default App;
