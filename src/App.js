import "./App.css";
import 'semantic-ui-css/semantic.darkly.min.css'
import MenuNavbar from "./components/MenuNavbar";
import MovieNewReleasesPage from "./components/MovieNewReleasesPage";

function App() {
  return (
    <div className="App">
      <MenuNavbar />
      <MovieNewReleasesPage />
    </div>
  );
}

export default App;
