import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Slider, styled, TextField } from "@mui/material";
import { useState } from "react";

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

const Password = () => {
  const [dataPassword, setDataPassword] = useState<string>("HelloWord");
  const [sizePassword, setSizePassword] = useState<number>(9);
  const [checkMin, setCheckMin] = useState<boolean>(true);
  const [checkMaj, setCheckMaj] = useState<boolean>(true);
  const [checkNum, setCheckNum] = useState<boolean>(false);
  const [checkSymb, setCheckSymb] = useState<boolean>(false);
  const [passwordCopied, setPasswordCopied] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);

  const handleSetSizeValue = (event: Event, newValue: number | number[]) => {
    setSizePassword(newValue as number);
  };

  const handleCopyPassword = () => {
    setPasswordCopied(true);
    navigator.clipboard.writeText(`${dataPassword}`);
    setTimeout(() => {
      setPasswordCopied(false);
    }, 1500);
  };

  const getRandomNumber = (min: number, max: number) => {
    let randomNumber = crypto.getRandomValues(new Uint32Array(1))[0];
    randomNumber = randomNumber / 4294967296;
    return Math.trunc(randomNumber * (max - min + 1)) + min;
  };

  const addCharacter = (fromCode: number, toCode: number) => {
    let characterList = "";
    for (let i = fromCode; i <= toCode; i++) {
      characterList += String.fromCharCode(i);
    }
    return characterList;
  };

  const charactersSet = {
    lowercaseChars: addCharacter(97, 122),
    upperCaseChars: addCharacter(65, 90),
    numbers: addCharacter(48, 57),
    symbols:
      addCharacter(33, 47) +
      addCharacter(58, 64) +
      addCharacter(91, 96) +
      addCharacter(123, 126),
  };

  const handleGeneratePassword = () => {
    const passwordArray: string[] = [];
    let password = "";
    if (checkMin || checkMaj || checkNum || checkSymb) {
      setErrorMessage(false);
      checkMin && passwordArray.push(charactersSet.lowercaseChars);
      checkMaj && passwordArray.push(charactersSet.upperCaseChars);
      checkNum && passwordArray.push(charactersSet.numbers);
      checkSymb && passwordArray.push(charactersSet.symbols);

      const minimalPassword: string[] = [];
      for (let i = 0; i < passwordArray.length; i++) {
        minimalPassword.push(
          passwordArray[i][getRandomNumber(0, passwordArray[i].length - 1)]
        );
      }

      const allInOneArray: string = passwordArray.reduce(
        (acc, cur) => acc + cur
      );
      for (let i = passwordArray.length; i < sizePassword; i++) {
        password += allInOneArray[getRandomNumber(0, allInOneArray.length - 1)];
      }

      minimalPassword.forEach((item: string, index: number) => {
        const randomIndex = getRandomNumber(0, password.length);
        password =
          password.slice(0, randomIndex) +
          minimalPassword[index] +
          password.slice(randomIndex);
      });

      setDataPassword(password);
    } else {
      setErrorMessage(true);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-r from-orange-100 to-lime-200 py-16 px-4">
      <section className="relative mx-auto max-w-xs bg-gray-800 rounded shadow p-4 overflow-hidden flex flex-col">
        <div className="w-full flex flex-col items-start text-lime-500 mb-4">
          <p className="pl-3 text-base mb-2">Votre mot de passe</p>
          <div className="flex w-full">
            <CssTextField
              fullWidth
              value={dataPassword}
              type="text"
              InputProps={{
                readOnly: true,
              }}
              variant="filled"
              sx={{
                input: { color: "white", pt: 0 },
                label: { color: "white" },
              }}
            />
            <button
              onClick={handleCopyPassword}
              className="text-white rounded bg-lime-500 w-8 h-8 shadow ml-2 hover:scale-105 drop-shadow"
            >
              <FontAwesomeIcon icon={faCopy} />
            </button>
          </div>
        </div>
        <div className="w-full flex flex-col items-start text-lime-500 ">
          <p className="pl-3 text-base mb-2">
            Taille du mot de passe : {sizePassword}
          </p>
          <Slider
            min={4}
            max={20}
            value={sizePassword}
            onChange={handleSetSizeValue}
            valueLabelDisplay="auto"
            sx={{ color: "inherit" }}
          />
        </div>
        <div className="grid grid-cols-2 gap-2 px-16 py-4">
          <button
            onClick={() => setCheckMin(!checkMin)}
            className={`rounded shadow drop-shadow py-1 px-4 border border-lime-500 text-xl hover:scale-105 ${
              checkMin ? "bg-lime-500 text-white" : "text-lime-500"
            }`}
          >
            a-z
          </button>
          <button
            onClick={() => setCheckMaj(!checkMaj)}
            className={`rounded shadow drop-shadow py-1 px-4 border border-lime-500 text-xl hover:scale-105 ${
              checkMaj ? "bg-lime-500 text-white " : "text-lime-500"
            }`}
          >
            A-Z
          </button>
          <button
            onClick={() => setCheckNum(!checkNum)}
            className={`rounded shadow drop-shadow py-1 px-4 border border-lime-500 text-xl hover:scale-105 ${
              checkNum ? "bg-lime-500 text-white " : "text-lime-500"
            }`}
          >
            0-9
          </button>
          <button
            onClick={() => setCheckSymb(!checkSymb)}
            className={`rounded shadow drop-shadow py-1 px-4 border border-lime-500 text-xl hover:scale-105 ${
              checkSymb ? "bg-lime-500 text-white " : "text-lime-500"
            }`}
          >
            !-&
          </button>
        </div>
        <button
          onClick={handleGeneratePassword}
          className="bg-lime-500 text-white rounded shadow drop-shadow py-1 px-4 text-xl hover:scale-105 mt-4"
        >
          Générer
        </button>
      </section>
      <p
        className={`mx-auto max-w-xs rounded shadow font-bold text-center text-white drop-shadow mb-4 py-2 px-4 transition-all duration-700 ease-in-out bg-red-500 mt-4 ${
          errorMessage ? "opacity-100 scale-1" : "opacity-0 scale-0"
        }`}
      >
        Veuillez coché au moins une case
      </p>
      <div
        className={`fixed bottom-4  bg-gradient-to-b from-lime-600 to-lime-500 py-1 px-4 text-white font-semibold shadow transition-all duration-500 ease-in-out ${
          passwordCopied ? "right-4 opacity-100" : "-right-full opacity-0"
        }`}
      >
        Mot de passe copié !
      </div>
    </main>
  );
};

export default Password;
