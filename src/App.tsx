import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Carrousel from "./pages/carrousel";
import Cookies from "./pages/cookies";
import Filtre from "./pages/filtre";
import Formulaire from "./pages/formulaire";
import Gradiant from "./pages/gradiant";
import Home from "./pages/home";
import Imc from "./pages/imc";
import Memory from "./pages/memory";
import Meteoapp from "./pages/meteoapp";
import Password from "./pages/password";
import Pomodoro from "./pages/pomodoro";
import Quizz from "./pages/quizz";
import Scroll from "./pages/scroll";
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
        <Route path="/meteoapp" element={<Meteoapp />} />
        <Route path="/gradiant" element={<Gradiant />} />
        <Route path="/pomodoro" element={<Pomodoro />} />
        <Route path="/formulaire" element={<Formulaire />} />
        <Route path="/memory" element={<Memory />} />
        <Route path="/scroll" element={<Scroll />} />
        <Route path="/carrousel" element={<Carrousel />} />
        <Route path="/password" element={<Password />} />
        <Route path="/filtre" element={<Filtre />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
