import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TextField } from "@mui/material";
import { useState } from "react";
import { BMIData } from "../data/imc";

const Imc = () => {
  const [imcSize, setImcSize] = useState<number | string>();
  const [imcWeight, setImcWeight] = useState<number | string>();
  const [imcResult, setImcResult] = useState<number>(0);
  const [imcInfo, setImcInfo] = useState<string>("");
  const [colorAlert, setColorAlert] = useState<string>("");
  const [colorResult, setColorResult] = useState<string>("");
  const [resetIcon, setResetIcon] = useState<boolean>(false);

  const handleResult = () => {
    if (imcSize && imcSize > 60) {
      if (imcWeight && imcWeight > 20) {
        const imcCalcul = Number(
          (Number(imcWeight) / Math.pow(Number(imcSize) / 100, 2)).toFixed(2)
        );

        BMIData.forEach((element) => {
          if (Array.isArray(element.range)) {
            if (imcCalcul > element.range[0] && imcCalcul <= element.range[1]) {
              setColorAlert(element.color);
              setColorResult(element.color);
              setImcResult(imcCalcul);
              setImcInfo(element.name);
              setResetIcon(true);
            }
          } else if (imcCalcul > element.range) {
            setColorAlert(element.color);
            setColorResult(element.color);
            setImcResult(imcCalcul);
            setImcInfo(element.name);
            setResetIcon(true);
          }
        });
      } else {
        setImcResult(0);
        setColorResult("text-black");
        setImcInfo("Veuillez entrer un poids valide");
        setColorAlert("text-red-500");
      }
    } else {
      setImcResult(0);
      setColorResult("text-black");
      setImcInfo("Veuillez entrer une taille valide");
      setColorAlert("text-red-500");
    }
  };

  const handleReset = () => {
    setImcSize("");
    setImcWeight("");
    setImcResult(0);
    setImcInfo("");
    setColorResult("text-black");
    setResetIcon(false);
  };

  return (
    <main className="min-h-screen pt-16 bg-gradient-to-r from-sky-100 to-indigo-200 px-4">
      <section className="relative bg-gradient-to-b from-blue-100 to-white p-4 shadow-md rounded-md flex flex-col items-center mx-auto max-w-xs md:max-w-xl lg:max-w-4xl">
        <h1 className="text-center text-2xl mb-3 md:text-4xl">
          Calcul d'<b>IMC</b>
        </h1>
        <div className="flex flex-col lg:flex-row gap-4 w-full">
          <TextField
            id="outlined-basic"
            label="Votre taille en Cm, Ex: 180"
            variant="filled"
            fullWidth
            required
            className="bg-white shadow"
            value={imcSize}
            onChange={(e) => setImcSize(parseInt(e.target.value))}
          />
          <TextField
            id="outlined-basic"
            label="Votre poids en Kg, Ex: 80"
            variant="filled"
            fullWidth
            required
            className="bg-white shadow"
            value={imcWeight}
            onChange={(e) => setImcWeight(parseInt(e.target.value))}
          />
        </div>
        <button
          className="bg-gradient-to-b from-amber-300 to-amber-200 px-4 py-2 rounded-md shadow-md my-4 font-bold hover:scale-95"
          onClick={handleResult}
        >
          Calculer
        </button>
        <div
          className={`text-5xl drop-shadow-md font-bold my-3 ${colorResult}`}
        >
          {imcResult}
        </div>
        <p className={`${colorAlert} md:text-2xl md:font-semibold`}>
          {imcInfo}
        </p>
        {resetIcon && (
          <FontAwesomeIcon
            icon={faTrash}
            className="absolute top-7 drop-shadow-md right-6 text-xl cursor-pointer"
            onClick={handleReset}
          />
        )}
      </section>
    </main>
  );
};

export default Imc;
