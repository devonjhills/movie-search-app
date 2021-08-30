import "./App.css";
import 'semantic-ui-css/semantic.darkly.min.css'
import MenuNavbar from "./components/MenuNavbar";
import TrendingPage from "./components/TrendingPage";

function App() {
  return (
    <div className="App">
      <MenuNavbar />
      <TrendingPage />
    </div>
  );
}

export default App;
