import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

interface searchDataInterface {
  ns: number;
  title: string;
  pageid: number;
  size: number;
  snippet: string;
  wordcount: number;
}

const Wikiapp = () => {
  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState<searchDataInterface[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const handleSearch = () => {
    setIsSearching(true);
    axios
      .get(
        `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${search}`
      )
      .then((element) => {
        setData(element.data.query.search);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setIsSearching(false);
  }, [search]);

  const makeBold = (item: string, keyword: string) => {
    var re = new RegExp(keyword, "g");
    return item.replace(re, "<b>" + keyword + "</b>");
  };

  return (
    <main className="min-h-screen pt-16 bg-gradient-to-r from-sky-100 to-indigo-200 px-4">
      <section className="relative flex flex-col items-center mx-auto max-w-xs md:max-w-xl lg:max-w-2xl">
        <img
          src="./images/wiki-logo.png"
          alt="wiki-logo"
          className="md:w-[350px]"
        />
        <h2 className="text-2xl md:text-4xl md:my-4">
          Recherche <b>Wikipedia</b>
        </h2>
        <div className="flex items-center my-4 w-full">
          <TextField
            type="search"
            label="Recherchez"
            variant="outlined"
            fullWidth
            className="bg-white shadow"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <button
            className="bg-gradient-to-b from-blue-800 to-blue-700 text-white px-4 py-2 rounded-md shadow-md font-bold h-16 w-16 hover:scale-95"
            onClick={handleSearch}
          >
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="text-2xl drop-shadow"
            />
          </button>
        </div>
        {isSearching && search.length > 0 && data.length === 0 && (
          <p className="w-full text-center">
            Oups nous n'avons pas pu trouver votre recherche!
          </p>
        )}
        {data && (
          <ul className="w-full">
            {data.map((element) => (
              <li key={element.pageid} className="mb-4">
                <a href={`https://en.wikipedia.org/?curid=${element.pageid}`}>
                  <h3 className="text-blue-800 text-2xl font-semibold">
                    {element.title}
                  </h3>
                  <p className="text-green-600 italic font-semibold">
                    https://en.wikipedia.org/?curid={element.pageid}
                  </p>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: makeBold(
                        element.snippet.replace(/(<([^>]+)>)/gi, ""),
                        search
                      ),
                    }}
                  />
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
};

export default Wikiapp;
