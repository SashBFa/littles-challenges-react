import axios from "axios";
import { useEffect, useState } from "react";
import { InputAdornment, styled, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#84cc16",
  },
  "& .MuiFilledInput-root:after": {
    borderBottomColor: "#84cc16",
  },
  "& .MuiFilledInput-root:before": {
    borderBottomColor: "#84cc16",
  },
  "& .MuiFilledInput-root": {
    "& fieldset": {
      color: "#84cc16",
    },

    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#84cc16",
    },
  },
});

interface userDataInterface {
  login: {
    uuid: string;
  };
  picture: {
    medium: string;
  };
  name: {
    first: string;
    last: string;
  };
  email: string;
  phone: string;
}

const Filtre = () => {
  const [userData, setUserData] = useState<userDataInterface[]>([]);
  const [userFiltred, setUserFiltred] = useState<userDataInterface[]>([]);
  const [filterEntry, setFilterEntry] = useState<string>("");
  const [sortedField, setSortedField] = useState<string>("");

  const findOccurences = (userData: userDataInterface) => {
    const searchEntry = filterEntry.toLowerCase().replace(/\s/g, "");
    const occurencesTypes = [
      userData.name.first.toLowerCase(),
      userData.name.last.toLowerCase(),
      `${userData.name.first + userData.name.last}`.toLowerCase(),
      `${userData.name.last + userData.name.first}`.toLowerCase(),
      userData.email.toLowerCase(),
      userData.phone.toLowerCase(),
    ];

    for (const prop in occurencesTypes) {
      if (occurencesTypes[prop].includes(searchEntry)) {
        return true;
      }
    }
  };

  useEffect(() => {
    if (userData.length === 0) {
      axios
        .get(`https://randomuser.me/api/?nat=fr&results=50`)
        .then((data) => {
          setUserData(data.data.results);
        })
        .catch((err) => console.log(err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userData.length > 0) {
      let sortedProducts;

      switch (sortedField) {
        case "name":
          sortedProducts = [...userData].sort(
            (a: userDataInterface, b: userDataInterface) => {
              return sortData(a.name.last, b.name.last);
            }
          );
          setUserFiltred(sortedProducts);
          break;
        case "name-rev":
          sortedProducts = [...userData].sort(
            (a: userDataInterface, b: userDataInterface) => {
              return sortData(b.name.last, a.name.last);
            }
          );
          setUserFiltred(sortedProducts);
          break;

        case "email":
          sortedProducts = [...userData].sort(
            (a: userDataInterface, b: userDataInterface) => {
              return sortData(a.email, b.email);
            }
          );
          setUserFiltred(sortedProducts);
          break;
        case "email-rev":
          sortedProducts = [...userData].sort(
            (a: userDataInterface, b: userDataInterface) => {
              return sortData(b.email, a.email);
            }
          );
          setUserFiltred(sortedProducts);
          break;
        case "phone":
          sortedProducts = [...userData].sort(
            (a: userDataInterface, b: userDataInterface) => {
              return sortData(a.phone, b.phone);
            }
          );
          setUserFiltred(sortedProducts);
          break;
        case "phone-rev":
          sortedProducts = [...userData].sort(
            (a: userDataInterface, b: userDataInterface) => {
              return sortData(b.phone, a.phone);
            }
          );
          setUserFiltred(sortedProducts);
          break;

        default:
          sortedProducts = [...userData].sort(
            (a: userDataInterface, b: userDataInterface) => {
              return sortData(a.name.last, b.name.last);
            }
          );
          setUserFiltred(sortedProducts);
          break;
      }
    }
  }, [userData, sortedField]);

  function sortData(a: any, b: any) {
    if (a < b) {
      return -1;
    } else if (a === b) {
      return 0;
    } else {
      return 1;
    }
  }

  useEffect(() => {
    if (filterEntry === "") {
      setUserFiltred(userData);
    } else {
      const dataUser = userFiltred.filter((user) => findOccurences(user));
      setUserFiltred(dataUser);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterEntry]);

  return (
    <main className="min-h-screen bg-gradient-to-r from-orange-100 to-lime-200 py-16 px-4">
      <section className="relative mx-auto max-w-xs md:max-w-2xl lg:max-w-6xl bg-gray-800 rounded shadow py-12 px-4">
        <div className="px-4 mb-4">
          <CssTextField
            label="Recherche"
            fullWidth
            type="search"
            variant="filled"
            className="shadow shadow-lime-500"
            sx={{
              input: { color: "white" },
              label: { color: "white" },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FontAwesomeIcon icon={faSearch} className="text-lime-500" />
                </InputAdornment>
              ),
            }}
            value={filterEntry}
            onChange={(e) => setFilterEntry(e.target.value)}
          />
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 px-4 lg:hidden">
          {userFiltred &&
            userFiltred.map((person) => (
              <li
                key={person.login.uuid}
                className={`flex flex-col items-center bg-white
                } shadow rounded py-4`}
              >
                <img
                  src={person.picture.medium}
                  alt={person.name.last}
                  className="rounded-full w-16 h-16 shadow drop-shadow"
                />
                <h2 className="font-semibold text-xl">
                  {person.name.last} {person.name.first}
                </h2>
                <p className="font-semilight">{person.email}</p>
                <p className="font-light">{person.phone}</p>
              </li>
            ))}
        </ul>
        <table className="hidden lg:table table-auto w-full border-separate border-spacing-y-1">
          <thead>
            <tr className="text-white text-4xl font-bold">
              <th>Database Results</th>
            </tr>
            <tr className="text-left h-12 text-white text-xl">
              <th>
                <button
                  onClick={() =>
                    setSortedField(sortedField === "name" ? "name-rev" : "name")
                  }
                >
                  Name
                </button>
              </th>
              <th>
                <button
                  onClick={() =>
                    setSortedField(
                      sortedField === "email" ? "email-rev" : "email"
                    )
                  }
                >
                  Email
                </button>
              </th>
              <th>
                <button
                  onClick={() =>
                    setSortedField(
                      sortedField === "phone" ? "phone-rev" : "phone"
                    )
                  }
                >
                  Phone
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {userFiltred &&
              userFiltred.map((person, index) => (
                <tr
                  key={person.login.uuid}
                  className={`${
                    index % 2 ? "bg-white" : "bg-white/90"
                  } rounded-lg overflow-hidden`}
                >
                  <td className="flex items-center text-xl">
                    <img
                      src={person.picture.medium}
                      alt={person.name.last}
                      className="rounded-full w-12 h-12 shadow drop-shadow mr-2 my-2 ml-2"
                    />
                    {person.name.last} {person.name.first}
                  </td>
                  <td className="text-xl">{person.email}</td>
                  <td className="text-xl">{person.phone}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default Filtre;
