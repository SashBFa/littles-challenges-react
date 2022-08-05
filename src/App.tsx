import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Cookies from "./pages/cookies";
import Home from "./pages/home";
import Imc from "./pages/imc";
import Quizz from "./pages/quizz";
import Wikiapp from "./pages/wikiapp";

const App = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/imc" element={<Imc />} />
        <Route path="/quizz" element={<Quizz />} />
        <Route path="/wikiapp" element={<Wikiapp />} />
        <Route path="/cookies" element={<Cookies />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
