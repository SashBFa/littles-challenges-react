import { Link } from "react-router-dom";
import { router } from "./../components/Navigation";
const Home = () => {
  console.log(router);

  return (
    <main className="min-h-screen py-16 bg-gradient-to-r from-orange-100 to-lime-200 px-4 md:px-24">
      <ul className="flex flex-wrap justify-center gap-4 mx-auto max-w-xs md:max-w-3xl">
        {router.slice(1).map((app) => (
          <Link key={app} to={`/${app}`}>
            <li className="border w-32 h-32 rounded-lg shadow bg-white hover:scale-95 flex items-center justify-center capitalize">
              <p>{app}</p>
            </li>
          </Link>
        ))}
      </ul>
    </main>
  );
};

export default Home;
