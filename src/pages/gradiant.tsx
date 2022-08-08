import { Slider } from "@mui/material";
import { useEffect, useState } from "react";

const Gradiant = () => {
  const [colorPrimary, setColorPrimary] = useState<string>("#FF5F6D");
  const [colorSecondary, setColorSecondary] = useState<string>("#FFC371");
  const [yiqPrimary, setYiqPrimary] = useState<number>(147.706);
  const [yiqSecondary, setYiqSecondary] = useState<number>(206.982);
  const [orientation, setOrientation] = useState<number>(90);
  const [copyGrad, setCopyGrad] = useState<boolean>(false);
  let randomColor1 = Math.floor(Math.random() * 16777215).toString(16);
  let randomColor2 = Math.floor(Math.random() * 16777215).toString(16);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setOrientation(newValue as number);
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(
      `linear-gradient(${orientation}deg, ${colorPrimary}, ${colorSecondary})`
    );
    setCopyGrad(true);
    setTimeout(() => {
      setCopyGrad(false);
    }, 3000);
  };

  const handleRandom = () => {
    setOrientation(Math.floor(Math.random() * (360 - 0 + 1) + 0));
    setColorPrimary(`#${randomColor1}`);
    setColorSecondary(`#${randomColor2}`);
  };

  useEffect(() => {
    const hexColor = colorPrimary.replace("#", "");
    const red = parseInt(hexColor.slice(0, 2), 16);
    const green = parseInt(hexColor.slice(2, 4), 16);
    const blue = parseInt(hexColor.slice(4, 6), 16);
    setYiqPrimary((red * 299 + green * 587 + blue * 144) / 1000);
  }, [colorPrimary]);

  useEffect(() => {
    const hexColor = colorSecondary.replace("#", "");
    const red = parseInt(hexColor.slice(0, 2), 16);
    const green = parseInt(hexColor.slice(2, 4), 16);
    const blue = parseInt(hexColor.slice(4, 6), 16);
    setYiqSecondary((red * 299 + green * 587 + blue * 144) / 1000);
  }, [colorSecondary]);

  return (
    <main
      className={`min-h-screen pt-16 px-4 md:px-24`}
      style={{
        backgroundImage: `linear-gradient(${orientation}deg, ${colorPrimary}, ${colorSecondary})`,
      }}
    >
      <section className="relative flex flex-col items-center mx-auto max-w-xs max-h-screen">
        <label
          htmlFor="colorPrimary"
          className="w-full h-10 relative my-2 cursor-pointer"
        >
          <p
            className={`absolute left-4 text-2xl top-1/2 -translate-y-1/2 uppercase font-semibold ${
              yiqPrimary >= 128 ? "text-black" : "text-white"
            }`}
          >
            {colorPrimary}
          </p>
          <input
            id="colorPrimary"
            type="color"
            value={colorPrimary}
            onChange={(e) => setColorPrimary(e.target.value)}
            className="w-full h-full shadow cursor-pointer"
          />
        </label>
        <label
          htmlFor="colorSecondary"
          className="w-full h-10 relative my-2 cursor-pointer"
        >
          <p
            className={`absolute left-4 text-2xl top-1/2 -translate-y-1/2 uppercase font-semibold ${
              yiqSecondary >= 128 ? "text-black" : "text-white"
            }`}
          >
            {colorSecondary}
          </p>
          <input
            id="colorSecondary"
            type="color"
            value={colorSecondary}
            onChange={(e) => setColorSecondary(e.target.value)}
            className="w-full h-full shadow cursor-pointer"
          />
        </label>

        <div className="mt-8 w-full px-4 text-rose-700 bg-white pt-4 rounded-lg shadow">
          <Slider
            defaultValue={90}
            min={0}
            max={360}
            valueLabelDisplay="auto"
            sx={{ color: "inherit" }}
            marks={[
              { value: 0, label: "0°" },
              { value: 360, label: "360°" },
            ]}
            value={orientation}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-around w-full px-10">
          <button
            className="bg-gradient-to-b from-teal-100 to-white px-4 py-2 rounded-md shadow-md my-4 font-bold hover:scale-95"
            onClick={handleCopy}
          >
            Copier
          </button>
          <button
            className="bg-gradient-to-b from-teal-100 to-white px-4 py-2 rounded-md shadow-md my-4 font-bold hover:scale-95"
            onClick={handleRandom}
          >
            Random
          </button>
        </div>
        <div
          className={`fixed bottom-4  bg-gradient-to-b from-lime-600 to-lime-500 py-1 px-4 text-white font-semibold shadow transition-all duration-500 ease-in-out mix-blend-difference ${
            copyGrad ? "right-4 opacity-100" : "-right-full opacity-0"
          }`}
        >
          Gradiant copié !
        </div>
      </section>
    </main>
  );
};

export default Gradiant;
