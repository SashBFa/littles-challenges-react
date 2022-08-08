import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

interface dataWeather {
  city: {
    name: string;
    country: string;
  };
  list: {
    dt: number;
    dt_txt: string;
    main: {
      temp: string;
      temp_max: number;
      temp_min: number;
    };
    weather: {
      id: number;
      description: string;
      icon: string;
    }[];
  }[];
}
interface dataMeteo {
  dt: number;
  dt_txt: string;
  main: {
    temp: string;
    temp_max: number;
    temp_min: number;
  };
  weather: {
    id: number;
    description: string;
    icon: string;
  }[];
}
interface itemDisplay {
  icon: string;
  temp: string;
}

const Meteoapp = () => {
  const [search, setSearch] = useState<string>("");
  const [errorSearch, setErrorSearch] = useState<boolean>(false);
  const [data, setData] = useState<dataWeather>();
  const [itemDisplay, setItemDisplay] = useState<itemDisplay>();
  const [toggleHours, setToggleHours] = useState<boolean>(true);
  const [togglePrev, setTogglePrev] = useState<boolean>(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((location) => {
        const long = location.coords.longitude;
        const lat = location.coords.latitude;
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=metric&appid=${process.env.REACT_APP_WEATHER_KEY}`
          )
          .then((element) => thenDisplay(element.data))
          .catch((err) => catchError());
      });
    }
  }, []);

  const handleSearch = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${search}&units=metric&appid=${process.env.REACT_APP_WEATHER_KEY}`
      )
      .then((element) => thenDisplay(element.data))
      .catch((err) => catchError());
  };
  const thenDisplay = (data: dataWeather) => {
    setErrorSearch(false);
    setData(data);
    const firtDisplay = {
      icon: data.list[0].weather[0].icon,
      temp: data.list[0].main.temp,
    };
    setItemDisplay(firtDisplay);
  };
  const catchError = () => {
    setErrorSearch(true);
  };

  const getHours = (date: string) => {
    const newDate = new Date(date);
    const hour = newDate.getHours();
    return `${hour}h`;
  };
  const getDay = (date: string) => {
    const newDate = new Date(date);
    const day = newDate.toLocaleString("default", { weekday: "short" });
    return `${day}`;
  };

  const handleToggle = (e: string) => {
    switch (e) {
      case "hours":
        setToggleHours(true);
        setTogglePrev(false);
        break;
      case "prev":
        setToggleHours(false);
        setTogglePrev(true);
        break;
      default:
        setToggleHours(true);
        setTogglePrev(false);
    }
  };

  useEffect(() => {
    setErrorSearch(false);
  }, [search]);

  return (
    <main className="min-h-screen pt-16 bg-gradient-to-r from-sky-100 to-indigo-200 px-4 md:px-24">
      <section className="relative flex flex-col items-center mx-auto max-w-xs max-h-screen">
        <h2 className="text-center text-xl mb-3 md:text-3xl">
          Application <b>Météo</b> <span className="text-3xl">☀️</span>
        </h2>
        <div className="flex items-center md:my-4 w-full">
          <TextField
            label="Choisissez une ville :"
            variant="outlined"
            value={search}
            type="search"
            fullWidth
            className="bg-white shadow"
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <button
            className="bg-gradient-to-b from-teal-700 to-teal-600 text-white px-4 py-2 rounded-md shadow-md font-bold h-16 w-16 hover:scale-95"
            onClick={handleSearch}
          >
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="text-2xl drop-shadow"
            />
          </button>
        </div>
        {errorSearch && (
          <div className="w-full py-2 shadow text-white rounded mt-4 text-center font-semibold text-lg bg-gradient-to-b from-red-600 to-red-500 drop-shadow-sm">
            {search.length <= 0
              ? "Vous n'avez pas choisi de ville"
              : "Impossible de trouver cette ville"}
          </div>
        )}
        {data && itemDisplay && (
          <article className="bg-gradient-to-t from-blue-100 to-white shadow-md rounded-md w-full mt-4">
            {
              <div className="flex flex-col items-center">
                <img
                  src={`./images/meteo/${itemDisplay.icon}.svg`}
                  alt="icon_weather"
                  className="h-36 md:h-48"
                />
                <h4 className="text-3xl md:text-4xl font-bold">
                  {parseInt(itemDisplay.temp)}°
                </h4>
                <h3 className="font-light text-xl md:text-2xl my-4">
                  {data.city.name}, <b>{data.city.country}</b>
                </h3>
              </div>
            }
            <div className="border py-4 bg-gradient-to-t from-blue-100 to-white flex flex-col items-center  rounded-t-3xl">
              <div className="mb-4">
                <button
                  onClick={() => handleToggle("hours")}
                  className={`border m-1 py-1 px-4 shadow-sm ${
                    toggleHours
                      ? "bg-gradient-to-t from-sky-200 to-sky-100"
                      : "bg-white"
                  }  hover:scale-95`}
                >
                  Heures
                </button>
                <button
                  onClick={() => handleToggle("prev")}
                  className={`border m-1 py-1 px-4 shadow-sm ${
                    togglePrev
                      ? "bg-gradient-to-t from-sky-200 to-sky-100"
                      : "bg-white"
                  }  hover:scale-95`}
                >
                  Prévisions
                </button>
              </div>

              <ul className="flex justify-between w-full px-2">
                {toggleHours &&
                  data.list.slice(0, 6).map((meteo: dataMeteo) => (
                    <li
                      key={meteo.dt}
                      className="shadow-sm bg-white px-2 rounded hover:scale-95"
                    >
                      <button
                        className="flex flex-col items-center font-light "
                        onClick={() =>
                          setItemDisplay({
                            icon: meteo.weather[0].icon,
                            temp: meteo.main.temp,
                          })
                        }
                      >
                        <b className="font-semibold">
                          {getHours(meteo.dt_txt)}
                        </b>
                        {parseInt(meteo.main.temp)}°
                      </button>
                    </li>
                  ))}
                {togglePrev &&
                  data.list.map(
                    (meteo: dataMeteo) =>
                      getHours(meteo.dt_txt) === "12h" && (
                        <li
                          key={meteo.dt}
                          className="shadow-sm bg-white px-2 rounded hover:scale-95"
                        >
                          <button
                            className="flex flex-col items-center font-light "
                            onClick={() =>
                              setItemDisplay({
                                icon: meteo.weather[0].icon,
                                temp: meteo.main.temp,
                              })
                            }
                          >
                            <b className="font-semibold">
                              {getDay(meteo.dt_txt)}
                            </b>
                            {parseInt(meteo.main.temp)}°
                          </button>
                        </li>
                      )
                  )}
              </ul>
            </div>
          </article>
        )}
      </section>
    </main>
  );
};

export default Meteoapp;
