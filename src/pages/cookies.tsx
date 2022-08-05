import { faArrowsRotate, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface cookiesInterface {
  id: string;
  name: string;
  value: string;
}

const LOCAL_STORAGE_KEY: string = "cookieApp.cookies";

const Cookies = () => {
  const [inputName, setInputName] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [arrayCookies, setArrayCookies] = useState<cookiesInterface[]>([]);
  const [errorName, setErrorName] = useState<boolean>(false);
  const [errorValue, setErrorValue] = useState<boolean>(false);
  const [cookieExist, setCookieExist] = useState<boolean>(false);
  const [showCookies, setShowCookies] = useState<boolean>(true);
  const [updateItem, setUpdateItem] = useState<boolean>(false);
  const [infoCreated, setInfoCreated] = useState<boolean>(false);
  const [infoUpdated, setInfoUpdated] = useState<boolean>(false);
  const [infoDeleted, setInfoDeleted] = useState<boolean>(false);
  const [updateCookie, setUpdateCookie] = useState<cookiesInterface>({
    id: "",
    name: "",
    value: "",
  });

  useEffect(() => {
    if (arrayCookies?.length) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(arrayCookies));
    }
  }, [arrayCookies]);

  useEffect(() => {
    const storage = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storage !== null) {
      const storedCookies = JSON.parse(storage);
      storedCookies && setArrayCookies(storedCookies);
    }
  }, []);

  const handleCreate = () => {
    const newCookie = {
      id: uuidv4(),
      name: inputName,
      value: inputValue,
    };
    const indexIDCookies = arrayCookies.findIndex((e) => e.id === newCookie.id);
    const indexNameCookies = arrayCookies.findIndex(
      (e) => e.name === newCookie.name
    );

    if (inputName.length === 0) {
      setErrorName(true);
      return;
    } else if (inputValue.length === 0) {
      setErrorValue(true);
      return;
    } else if (indexIDCookies === -1 && indexNameCookies === -1) {
      setArrayCookies([...arrayCookies, newCookie]);
      setInfoCreated(true);
      setTimeout(() => {
        setInfoCreated(false);
      }, 3000);
    } else {
      setCookieExist(true);
      return;
    }
    setInputName("");
    setInputValue("");
  };

  const handleDelete = (element: string) => {
    for (let i = 0; i < arrayCookies.length; i++) {
      if (arrayCookies[i].id === element) {
        let arr = [...arrayCookies];
        arr.splice(i, 1);
        setArrayCookies(arr);
      }
    }
    setInfoDeleted(true);
    setTimeout(() => {
      setInfoDeleted(false);
    }, 3000);
  };
  const handleUpdate = (element: string) => {
    for (let i = 0; i < arrayCookies.length; i++) {
      if (arrayCookies[i].id === element) {
        setInputName(arrayCookies[i].name);
        setInputValue(arrayCookies[i].value);
        setUpdateItem(true);
        const thisCookies = {
          id: arrayCookies[i].id,
          name: arrayCookies[i].name,
          value: arrayCookies[i].value,
        };
        setUpdateCookie(thisCookies);
      }
    }
  };
  const handleUpdateAction = () => {
    const newCookie = {
      id: updateCookie.id,
      name: inputName,
      value: inputValue,
    };
    const indexIDCookies = arrayCookies.findIndex((e) => e.id === newCookie.id);
    if (inputName.length === 0) {
      setErrorName(true);
      return;
    } else if (inputValue.length === 0) {
      setErrorValue(true);
      return;
    } else if (indexIDCookies !== -1) {
      arrayCookies[indexIDCookies] = newCookie;
      setInfoUpdated(true);
      setTimeout(() => {
        setInfoUpdated(false);
      }, 3000);
    }
    setInputName("");
    setInputValue("");
    setUpdateItem(false);
  };

  useEffect(() => {
    setErrorName(false);
    setErrorValue(false);
    setCookieExist(false);
  }, [inputName, inputValue]);

  return (
    <main className="min-h-screen pt-16 bg-gradient-to-r from-orange-100 to-lime-200">
      <section className="relative flex flex-col items-center mx-auto max-w-xs md:max-w-3xl">
        <h2 className="text-2xl">
          Création de <b>Cookies</b> <span className="text-3xl">🍪</span>
        </h2>
        <div className="flex flex-col w-full mt-4">
          <label htmlFor="nameInput" className="text-xl font-semibold pl-2">
            Nom du Cookie
          </label>
          <input
            id="nameInput"
            type="text"
            className="h-10 shadow pl-2"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                updateItem ? handleUpdateAction() : handleCreate();
              }
            }}
          />
        </div>

        <div className="flex flex-col w-full mt-4">
          <label htmlFor="valorInput" className="text-xl font-semibold pl-2">
            Valeur du Cookie
          </label>
          <input
            id="valorInput"
            type="text"
            className="h-10 shadow pl-2"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                updateItem ? handleUpdateAction() : handleCreate();
              }
            }}
          />
        </div>
        {(errorName || errorValue) && (
          <div className="w-full py-2 shadow text-white rounded mt-4 text-center font-semibold text-lg bg-gradient-to-b from-red-600 to-red-500 drop-shadow-sm">
            Veuillez remplir tous les champs.
          </div>
        )}
        {cookieExist && (
          <div className="w-full py-2 shadow text-white rounded mt-4 text-center font-semibold text-lg bg-gradient-to-b from-red-600 to-red-500 drop-shadow-sm">
            Ce cookie existe déjà!
          </div>
        )}
        <div className="mt-4">
          {updateItem ? (
            <button
              className="bg-gradient-to-b from-teal-700 to-teal-600 shadow m-1 text-white font-semibold rounded-md py-2 px-4"
              onClick={handleUpdateAction}
            >
              Modifier
            </button>
          ) : (
            <button
              className="bg-gradient-to-b from-teal-700 to-teal-600 shadow m-1 text-white font-semibold rounded-md py-2 px-4"
              onClick={handleCreate}
            >
              Créer
            </button>
          )}

          <button
            className="bg-gradient-to-b from-teal-700 to-teal-600 shadow m-1 text-white font-semibold rounded-md py-2 px-4"
            onClick={() => setShowCookies(!showCookies)}
          >
            Afficher
          </button>
        </div>
        {arrayCookies.length === 0 && (
          <p>Vous n'avez pas encore de cookies !</p>
        )}
        {showCookies && (
          <ul className="w-full flex flex-wrap mt-4 gap-1">
            {arrayCookies &&
              arrayCookies.map((element) => (
                <li key={element.name} className="bg-white rounded p-4 shadow">
                  <p className="text-center">
                    <b>{element.name}</b>
                  </p>
                  <p>Valeur : {element.value}</p>
                  <div className="flex justify-around items-center mt-2 gap-2">
                    <button
                      className="w-6 h-6 bg-gradient-to-b from-blue-600 to-blue-500 rounded text-white shadow"
                      onClick={() => handleUpdate(element.id)}
                    >
                      <FontAwesomeIcon icon={faArrowsRotate} />
                    </button>

                    <button
                      className="w-6 h-6 bg-gradient-to-b from-red-600 to-red-500 rounded text-white shadow"
                      onClick={() => handleDelete(element.id)}
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        )}
        <div
          className={`fixed bottom-4  bg-gradient-to-b from-lime-600 to-lime-500 py-1 px-4 text-white font-semibold shadow transition-all duration-500 ease-in-out ${
            infoCreated ? "right-4 opacity-100" : "-right-full opacity-0"
          }`}
        >
          Cookie créé !
        </div>
        <div
          className={`fixed bottom-4  bg-gradient-to-b from-lime-600 to-lime-500 py-1 px-4 text-white font-semibold shadow transition-all duration-500 ease-in-out ${
            infoUpdated ? "right-4 opacity-100" : "-right-full opacity-0"
          }`}
        >
          Cookie modifié !
        </div>
        <div
          className={`fixed bottom-4  bg-gradient-to-b from-red-600 to-red-500 py-1 px-4 text-white font-semibold shadow transition-all duration-500 ease-in-out ${
            infoDeleted ? "right-4 opacity-100" : "-right-full opacity-0"
          }`}
        >
          Cookie supprimé !
        </div>
      </section>
    </main>
  );
};

export default Cookies;
