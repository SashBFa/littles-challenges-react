import {
  faArrowsRotate,
  faPause,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgress, Slider } from "@mui/material";
import { useEffect, useState } from "react";

const Pomodoro = () => {
  const [minWork, setMinWork] = useState<number>(30);
  const [secWork, setSecWork] = useState<number>(0);
  const [minBreak, setMinBreak] = useState<number>(5);
  const [secBreak, setSecBreak] = useState<number>(0);
  const [progress, setProgress] = useState<number>(100);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isWorking, setIsWorking] = useState<boolean>(true);
  const [mins, setMins] = useState<number>(minWork);
  const [secs, setSecs] = useState<number>(secWork);
  const [countCycle, setCountCycle] = useState<number>(0);

  const handleReset = () => {
    setIsPlaying(false);
    setIsWorking(true);
    setMins(minWork);
    setSecs(secWork);
    setProgress(100);
    setCountCycle(0);
  };

  useEffect(() => {
    if (isPlaying) {
      let sampleInterval = setInterval(() => {
        if (secs > 0) {
          setSecs(secs - 1);
        }
        if (secs === 0) {
          if (mins === 0) {
            if (isWorking) {
              setMins(minBreak);
              setSecs(secBreak);
              setIsWorking(false);
            } else if (!isWorking) {
              setMins(minWork);
              setSecs(secWork);
              setCountCycle(countCycle + 1);
              setIsWorking(true);
            }
          } else {
            setMins(mins - 1);
            setSecs(59);
          }
        }
      }, 1000);
      return () => {
        clearInterval(sampleInterval);
      };
    }
  }, [
    secs,
    mins,
    isPlaying,
    isWorking,
    countCycle,
    minBreak,
    secBreak,
    minWork,
    secWork,
  ]);

  useEffect(() => {
    const currentSec = mins * 60 + secs;
    if (isWorking) {
      const totalSecWorking = minWork * 60 + secWork;
      setProgress((currentSec / totalSecWorking) * 100);
    } else if (!isWorking) {
      const totalSecBreak = minBreak * 60 + secBreak;
      setProgress((currentSec / totalSecBreak) * 100);
    }
  }, [isWorking, minBreak, minWork, mins, secBreak, secWork, secs]);

  const handleMinWorkChange = (event: Event, newValue: number | number[]) => {
    setMinWork(newValue as number);
    handleReset();
  };
  const handleSecWorkChange = (event: Event, newValue: number | number[]) => {
    setSecWork(newValue as number);
    handleReset();
  };
  const handleMinBreakChange = (event: Event, newValue: number | number[]) => {
    setMinBreak(newValue as number);
    handleReset();
  };
  const handleSecBreakChange = (event: Event, newValue: number | number[]) => {
    setSecBreak(newValue as number);
    handleReset();
  };
  return (
    <main className="min-h-screen pt-16 bg-gradient-to-r from-orange-100 to-lime-200 px-4 md:px-24">
      <section className="relative flex flex-col items-center mx-auto max-w-xs md:max-w-3xl">
        <h2 className="text-center text-xl mb-3 md:text-3xl font-bold">
          Pomodoro
        </h2>
        <div className="relative w-full h-64">
          <div className="text-gray-300 absolute left-1/2 -translate-x-1/2">
            <CircularProgress
              variant="determinate"
              value={100}
              color="inherit"
              size={250}
              className="drop-shadow"
            />
          </div>
          <div className="text-lime-500 absolute left-1/2 -translate-x-1/2">
            <CircularProgress
              variant="determinate"
              value={progress}
              color="inherit"
              size={250}
              className="drop-shadow"
            />
          </div>
          <h3
            className={`absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-4xl font-bold drop-shadow text-transparent bg-clip-text bg-gradient-to-r from-lime-500 to-lime-400 ${
              progress <= 10 ? "animate-pulse" : ""
            }`}
          >
            {isWorking ? "Travail" : "Repos"}
          </h3>
          <p
            className={`absolute left-1/2 -translate-x-1/2 top-2/3 text-3xl font-bold drop-shadow text-transparent bg-clip-text bg-gradient-to-r from-lime-500 to-lime-400 ${
              progress <= 10 ? "animate-pulse" : ""
            }`}
          >
            {mins}:{secs < 10 ? "0" + secs : secs}
          </p>
        </div>
        <div className="flex justify-around w-full px-20">
          <button
            className="bg-gradient-to-b from-lime-300 to-lime-200 px-4 py-2 rounded-md shadow-md my-4 font-bold hover:scale-95"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? (
              <FontAwesomeIcon icon={faPause} />
            ) : (
              <FontAwesomeIcon icon={faPlay} />
            )}
          </button>
          <button
            className="bg-gradient-to-b from-lime-300 to-lime-200 px-4 py-2 rounded-md shadow-md my-4 font-bold hover:scale-95"
            onClick={handleReset}
          >
            <FontAwesomeIcon icon={faArrowsRotate} />
          </button>
        </div>
        <p className="text-xl">
          Cycle{countCycle > 1 ? "s" : ""} réalisé{countCycle > 1 ? "s" : ""}:{" "}
          {countCycle}
        </p>
        {countCycle === 0 && !isPlaying && (
          <div className="w-full">
            <div className="text-lime-500 w-full border border-lime-500 p-4 shadow bg-white rounded mt-4">
              <h2 className="font-bold">Temps de travail :</h2>
              <div className="flex items-center text-lime-500">
                <p>Min:</p>
                <Slider
                  defaultValue={30}
                  min={0}
                  max={59}
                  valueLabelDisplay="auto"
                  value={minWork}
                  onChange={handleMinWorkChange}
                  className="ml-4"
                  sx={{ color: "inherit" }}
                />
              </div>
              <div className="flex items-center text-lime-500">
                <p>Sec:</p>
                <Slider
                  defaultValue={30}
                  min={0}
                  max={59}
                  valueLabelDisplay="auto"
                  value={secWork}
                  onChange={handleSecWorkChange}
                  className="ml-4"
                  sx={{ color: "inherit" }}
                />
              </div>
            </div>
            <div className="text-lime-500 w-full border border-lime-500 p-4 shadow bg-white rounded mt-4">
              <h2 className="font-bold">Temps de Repos :</h2>
              <div className="flex items-center text-lime-500">
                <p>Min:</p>
                <Slider
                  defaultValue={30}
                  min={0}
                  max={59}
                  valueLabelDisplay="auto"
                  value={minBreak}
                  onChange={handleMinBreakChange}
                  className="ml-4"
                  sx={{ color: "inherit" }}
                />
              </div>
              <div className="flex items-center text-lime-500">
                <p>Sec:</p>
                <Slider
                  defaultValue={30}
                  min={0}
                  max={59}
                  valueLabelDisplay="auto"
                  value={secBreak}
                  onChange={handleSecBreakChange}
                  className="ml-4"
                  sx={{ color: "inherit" }}
                />
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default Pomodoro;
