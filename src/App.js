import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import MenuNavbar from "./components/MenuNavbar";
import MovieHub from "./components/MovieHub";
import TvHub from "./components/TvHub";
import SearchPage from "./components/SearchPage";
import MovieDetails from "./components/MovieDetails";
import FourOhFour from "./components/FourOhFour";
import PersonDetails from "./components/PersonDetails";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="app">
      <div className="content-wrap">
        <Router>
          <MenuNavbar />

          <Switch>
            <Route exact path="/" component={MovieHub} />
            <Route exact path="/search" component={SearchPage} />
            <Route exact path="/tvhub" component={TvHub} />
            <Route exact path="/:movieId" component={MovieDetails} />
            <Route exact path="/person/:personId" component={PersonDetails} />
            <Route component={FourOhFour} />
          </Switch>
        </Router>
      </div>
      <Footer />
    </div>
  );
}

export default App;
