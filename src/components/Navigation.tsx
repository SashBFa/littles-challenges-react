import { Link } from "react-router-dom";

const router = ["home", "imc", "quizz"];

const Navigation = () => {
  return (
    <nav className="w-screen p-4 absolute top-0 left-0">
      <ul className="flex justify-between w-full">
        {router.map((route) => {
          if (route === "home") {
            return (
              <li key={route}>
                <Link to={"/"}>Home</Link>
              </li>
            );
          } else {
            return (
              <li key={route}>
                <Link to={`/${route}`} className="capitalize">
                  {route}
                </Link>
              </li>
            );
          }
        })}
      </ul>
    </nav>
  );
};

export default Navigation;
