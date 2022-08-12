import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";

export const router = [
  "home",
  "imc",
  "quizz",
  "wikiapp",
  "cookies",
  "meteoapp",
  "gradiant",
  "pomodoro",
  "formulaire",
  "memory",
  "scroll",
  "carrousel",
  "password",
  "filtre",
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <nav className="w-screen p-4 fixed top-0 left-0 flex flex-row-reverse justify-between z-20">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`text-xl w-8 h-8 mr-4 ${
          isOpen ? "rotate-90" : ""
        } transition-all duration-500 ease-in-out shadow bg-white rounded-full`}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
      <ul
        className={`absolute p-4 min-h-screen z-10 shadow w-52 bg-white flex flex-col transition-all duration-500 ease-in-out top-0 ${
          isOpen ? "left-0" : "-left-full"
        }`}
      >
        {router.map((route) => {
          if (route === "home") {
            return (
              <Link key={route} to={"/"} onClick={() => setIsOpen(false)}>
                <li className="bg-gradient-to-b from-teal-700 to-teal-600 shadow w-full h-10 mb-2 flex items-center pl-4 hover:text-white hover:font-semibold hover:bg-white/20 text-xl rounded-sm">
                  Home
                </li>
              </Link>
            );
          } else {
            return (
              <Link
                key={route}
                to={`/${route}`}
                onClick={() => setIsOpen(false)}
              >
                <li className="bg-gradient-to-b from-teal-700 to-teal-600 capitalize shadow w-full h-10 mb-2 flex items-center pl-4 hover:text-white hover:font-semibold hover:bg-white/20 text-xl rounded-sm">
                  {route}
                </li>
              </Link>
            );
          }
        })}
      </ul>
    </nav>
  );
};

export default Navigation;
