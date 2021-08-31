import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MenuNavbar from "./components/MenuNavbar";
import searchPage from "./components/searchPage";
import MovieHub from "./components/MovieHub";

function App() {
  return (
    <Router>
      <MenuNavbar />
      <div className="App">
        <Switch>
          <Route exact path="/" component={MovieHub} />
          <Route path="/search" component={searchPage} />
          <Route path="*" component={MovieHub} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
