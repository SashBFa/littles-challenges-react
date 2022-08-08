import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LinearProgress, styled, TextField } from "@mui/material";
import { useEffect, useState } from "react";

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
const Formulaire = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const [isFocusName, setIsFocusName] = useState<boolean>(false);
  const [isFocusEmail, setIsFocusEmail] = useState<boolean>(false);
  const [isFocusPassword, setIsFocusPassword] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [infoSubmit, setInfoSubmit] = useState<string>("");
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(true);

  const validName = /^[a-zA-Z0-9]+$/;
  const validEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

  const checkingName = () => {
    if (name.length !== 0) {
      if (name.length <= 3) {
        return (
          <p className="text-red-500 text-xs text-center mt-2">
            Veuillez entrer un nom 4 caractères minimum !
          </p>
        );
      } else if (!name.match(validName)) {
        return (
          <p className="text-red-500 text-xs text-center mt-2">
            Veuillez entrer que des chiffres et des lettres.
          </p>
        );
      } else {
        return (
          <p className="text-lime-500 text-xs text-center mt-2">
            Votre nom d'utilisateur est correct !
          </p>
        );
      }
    }
  };

  const checkingEmail = () => {
    if (email.length !== 0) {
      if (!email.match(validEmail)) {
        return (
          <p className="text-red-500 text-xs text-center mt-2">
            Veuillez entrer un email valide.
          </p>
        );
      } else {
        return (
          <p className="text-lime-500 text-xs text-center mt-2">
            Votre email semble valide !
          </p>
        );
      }
    }
  };

  useEffect(() => {
    if (password.length !== 0) {
      if (
        password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{9,}$/)
      ) {
        setProgress(100);
      } else if (password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{9,}$/)) {
        setProgress(75);
      } else if (password.match(/^[A-Za-z0-9]\w{9,}$/)) {
        setProgress(50);
      } else if (
        password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/)
      ) {
        setProgress(75);
      } else if (password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/)) {
        setProgress(50);
      } else if (password.match(/^[A-Za-z0-9]\w{6,}$/)) {
        setProgress(25);
      } else {
        setProgress(10);
      }
    }
  }, [password]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmit(true);
    setIsError(true);
    if (name.length === 0) {
      setInfoSubmit("Completez votre nom d'utilisateur");
      return;
    } else if (name.length <= 3) {
      setInfoSubmit("Veuillez entrer un nom 4 caractères minimum");
      return;
    } else if (!name.match(validName)) {
      setInfoSubmit("Veuillez entrer que des chiffres et des lettres");
      return;
    } else if (email.length === 0) {
      setInfoSubmit("Completez votre email");
      return;
    } else if (!email.match(validEmail)) {
      setInfoSubmit("Veuillez entrer un email valide");
      return;
    } else if (password.length === 0) {
      setInfoSubmit("Veuillez entrer un mot de passe");
      return;
    } else if (password.length < 6) {
      setInfoSubmit("Le mot de passe doit contenir minimum 6 caractères");
      return;
    } else if (confirm.length === 0) {
      setInfoSubmit("Veuillez confirmer votre mot de passe");
      return;
    } else if (password !== confirm) {
      setInfoSubmit("Les mots de passe ne correspondent pas");
      return;
    } else {
      setIsError(false);
      setInfoSubmit("Création du compte réussie !");
      setName("");
      setEmail("");
      setPassword("");
      setConfirm("");
      setTimeout(() => {
        setIsSubmit(false);
      }, 5000);
    }
  };

  return (
    <main className="min-h-screen pt-16 bg-gradient-to-r from-purple-100 to-lime-100 px-4 md:px-24">
      <p
        className={`text-center mx-auto max-w-xs md:max-w-3xl rounded shadow font-bold text-white drop-shadow mb-4 py-2 px-4 transition-all duration-700 ease-in-out ${
          isError
            ? "bg-gradient-to-r from-red-600 to-red-500"
            : "bg-gradient-to-r from-lime-600 to-lime-500"
        } ${
          isSubmit
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-0 -translate-y-full"
        }`}
      >
        {infoSubmit}
      </p>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="relative flex flex-col items-center mx-auto max-w-xs md:max-w-3xl bg-gray-800 rounded shadow p-4"
      >
        <div className="rounded-full bg-gradient-to-b from-lime-500 to-lime-600 text-white shadow h-12 w-12 p-1 flex items-center justify-center text-2xl">
          <FontAwesomeIcon icon={faUser} />
        </div>
        <div className="my-1 w-full">
          <CssTextField
            label="Nom d'utilisateur"
            fullWidth
            type="text"
            variant="filled"
            sx={{
              input: { color: "white" },
              label: { color: "white" },
            }}
            onFocus={() => setIsFocusName(true)}
            onBlur={() => setIsFocusName(false)}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {isFocusName && checkingName()}
        </div>

        <div className="my-1 w-full">
          <CssTextField
            label="Entrez votre email"
            fullWidth
            type="email"
            variant="filled"
            sx={{
              input: { color: "white" },
              label: { color: "white" },
            }}
            onFocus={() => setIsFocusEmail(true)}
            onBlur={() => setIsFocusEmail(false)}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {isFocusEmail && checkingEmail()}
        </div>

        <div className="my-1 w-full">
          <CssTextField
            label="Mot de passe"
            fullWidth
            type="password"
            variant="filled"
            sx={{
              input: { color: "white" },
              label: { color: "white" },
            }}
            onFocus={() => setIsFocusPassword(true)}
            onBlur={() => setIsFocusPassword(false)}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isFocusPassword && (
            <div
              className={`w-full mt-2 rounded-lg overflow-hidden ${
                progress < 30
                  ? "text-red-600"
                  : progress < 60
                  ? "text-yellow-500"
                  : "text-lime-500"
              }`}
            >
              <LinearProgress
                variant="determinate"
                value={progress}
                color="inherit"
                sx={{ py: "7px" }}
              />
            </div>
          )}
        </div>

        <div className="my-1 w-full">
          <CssTextField
            label="Confirmez le mot de passe"
            fullWidth
            type="password"
            variant="filled"
            sx={{
              input: { color: "white" },
              label: { color: "white" },
            }}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-gradient-to-b from-lime-500 to-lime-600 px-4 py-2 rounded-md text-white shadow-md my-4 font-bold hover:scale-95 outline-none"
        >
          Création du compte
        </button>
      </form>
    </main>
  );
};

export default Formulaire;
