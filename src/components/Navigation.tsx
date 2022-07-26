import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="w-screen p-4 absolute top-0 left-0">
      <ul className="flex justify-between w-full">
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/imc"}>IMC</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
