import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/home";
import Imc from "./pages/imc";
import Quizz from "./pages/quizz";

const App = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/imc" element={<Imc />} />
        <Route path="/quizz" element={<Quizz />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
