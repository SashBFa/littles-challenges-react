import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";

const router = ["home", "imc", "quizz", "wikiapp"];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <nav className="w-screen p-4 absolute top-0 left-0 flex flex-row-reverse justify-between">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`text-2xl w-8 h-8 mr-4 ${
          isOpen ? "rotate-90" : ""
        } transition-all duration-500 ease-in-out`}
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
              <Link to={"/"} onClick={() => setIsOpen(false)}>
                <li
                  key={route}
                  className="shadow w-full h-10 mb-2 flex items-center pl-4 hover:bg-blue-400/10 text-xl"
                >
                  Home
                </li>
              </Link>
            );
          } else {
            return (
              <Link to={`/${route}`} onClick={() => setIsOpen(false)}>
                <li
                  key={route}
                  className="capitalize shadow w-full h-10 mb-2 flex items-center pl-4 hover:bg-blue-400/10 text-xl"
                >
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
