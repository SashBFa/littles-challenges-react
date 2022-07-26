import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const BMIData = [
  { name: "Maigreur", color: "text-teal-500", range: [0, 18.5] },
  { name: "Bonne santé", color: "text-green-500", range: [18.5, 25] },
  { name: "Surpoids", color: "text-red-400", range: [25, 30] },
  { name: "Obésité modérée", color: "text-orange-500", range: [30, 35] },
  { name: "Obésité sévère", color: "text-rose-800", range: [35, 40] },
  { name: "Obésité morbide", color: "text-purple-900", range: 40 },
];

const Imc = () => {
  const [imcSize, setImcSize] = useState<number | string>();
  const [imcWeight, setImcWeight] = useState<number | string>();
  const [imcResult, setImcResult] = useState<number>(0);
  const [imcInfo, setImcInfo] = useState<string>("");
  const [colorAlert, setColorAlert] = useState<string>("");
  const [colorResult, setColorResult] = useState<string>("");

  console.log(imcSize);

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
            }
          } else if (imcCalcul > element.range) {
            setColorAlert(element.color);
            setColorResult(element.color);
            setImcResult(imcCalcul);
            setImcInfo(element.name);
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
  };

  return (
    <main className="h-screen pt-16 bg-gradient-to-r from-sky-500 to-indigo-500">
      <section className="relative bg-white p-6 shadow-md rounded-md flex flex-col items-center mx-auto max-w-xs md:max-w-3xl lg:max-w-5xl xl:max-w-7xl ">
        <h1 className="text-center text-2xl mb-3">
          Calcul d'<b>IMC</b>
        </h1>
        <div className="flex flex-col">
          <div>
            <label htmlFor="imcSize" className="pl-4">
              Votre taille en Cm, Ex: 180
            </label>
            <input
              type="number"
              id="imcSize"
              placeholder="Votre taille en cm"
              className="shadow-xl border w-full p-2 mt-1 mb-3"
              value={imcSize}
              onChange={(e) => setImcSize(parseInt(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="imcWeight" className="pl-4">
              Votre poids en Kg, Ex: 80
            </label>
            <input
              type="number"
              id="imcWeight"
              placeholder="Votre poids en kg"
              className="shadow-xl border w-full p-2 mt-1 mb-3"
              value={imcWeight}
              onChange={(e) => setImcWeight(parseInt(e.target.value))}
            />
          </div>
        </div>
        <button
          className="bg-amber-300 px-4 py-2 rounded-md shadow-md my-2 font-bold"
          onClick={handleResult}
        >
          Calculer un IMC
        </button>
        <div
          className={`text-5xl drop-shadow-md font-bold my-3 ${colorResult}`}
        >
          {imcResult}
        </div>
        <p className={`${colorAlert}`}>{imcInfo}</p>
        <FontAwesomeIcon
          icon={faTrash}
          className="absolute bottom-7 drop-shadow-md right-6 text-amber-300"
          onClick={handleReset}
        />
      </section>
    </main>
  );
};

export default Imc;
