import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#84cc16",
  },
  "& .MuiFilledInput-root:after": {
    borderBottomColor: "#84cc16",
  },
  "& .MuiFilledInput-root:before": {
    borderBottomColor: "white",
  },
  "& .MuiFilledInput-root": {
    "& fieldset": {
      color: "white",
    },

    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#84cc16",
    },
  },
});

type dataInterface = {
  id: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
    small_s3: string;
  };
};

const Scroll = () => {
  const observerElement = useRef<any>();
  const [observerElementIsVisible, setObserverElementIsVisible] =
    useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [maxPages, setMaxPages] = useState<number>(5);
  const [dataPicture, setDataPicture] = useState<dataInterface[]>([]);
  const [dataError, setDataError] = useState<string>("");
  let pageIndex = 0;

  const getSearch = () => {
    axios
      .get(
        `https://api.unsplash.com/search/photos?page=${pageIndex}&per_page=30&query=${
          search ? search : "cat"
        }&client_id=${process.env.REACT_APP_UNSPLASH_KEY}`
      )
      .then((img) => {
        setMaxPages(img.data.total_pages);
        let arr = [...dataPicture, ...img.data.results];
        console.log("newArr", [...dataPicture, ...img.data.results]);

        setDataPicture([...dataPicture, ...arr]);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setObserverElementIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          pageIndex <= maxPages && pageIndex++;
          console.log("page", pageIndex);
          getSearch();
        }
      },
      { root: null, rootMargin: "50%", threshold: 0 }
    );
    observer.observe(observerElement.current);
  }, []);

  return (
    <main className="min-h-screen pt-16 bg-gradient-to-r from-orange-100 to-lime-200 px-4 md:px-24">
      <section className="relative flex flex-col items-center mx-auto max-w-xs md:max-w-3xl">
        <h2 className="text-2xl">
          Clone <b>Unsplash</b>
        </h2>
        <div className="flex w-full my-4">
          <div className="my-1 w-full">
            <CssTextField
              label="Recherche"
              fullWidth
              type="text"
              variant="filled"
              sx={{
                input: { color: "black" },
                label: { color: "black" },
              }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              // onKeyDown={(e) => {
              //   if (e.key === "Enter") {
              //     getSearch();
              //   }
              // }}
            />
          </div>
          <button
            className="bg-gradient-to-b from-lime-600 to-lime-500 text-white px-4 py-2 rounded-md shadow-md font-bold h-16 w-16 hover:scale-95"
            // onClick={() => getSearch()}
          >
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="text-2xl drop-shadow"
            />
          </button>
        </div>
        {dataError && <p>{dataError}</p>}
        <div className="w-full columns-1 md:columns-2 lg:columns-3 gap-2">
          {dataPicture &&
            dataPicture.map((image) => (
              <img
                key={image.id}
                src={`${image.urls?.regular}`}
                alt="ima"
                className="mb-2 rounded shadow"
              />
            ))}
        </div>
        <div ref={observerElement} className="bg-red-500 w-full h-32" />
      </section>
    </main>
  );
};

export default Scroll;
