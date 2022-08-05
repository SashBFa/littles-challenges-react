import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { quizzData } from "../data/quizz";

type respArrayTypes = {
  id: number;
  question: string;
  response: boolean;
};
const emojis = ["✔️", "✨", "👀", "😭", "👎"];

const Quizz = () => {
  const [respArray, setRespArray] = useState<respArrayTypes[]>([]);
  const [colorCheck, setColorCheck] = useState<boolean>(false);
  const [isCheck, setIsCheck] = useState<boolean>(false);
  const [goodAns, setGoodAns] = useState<respArrayTypes[]>([]);
  const [titleAns, setTitleAns] = useState<string>("");
  const [iconAns, setIconAns] = useState<number>(0);
  let score: number = (goodAns.length / respArray.length) * 100;

  const handleResult = () => {
    if (respArray.length === quizzData.length) {
      setColorCheck(true);
      setGoodAns(respArray.filter((element) => element.response === true));

      setIsCheck(true);
    } else {
      alert("Veuillez remplir toutes les questions !");
    }
  };
  useEffect(() => {
    switch (true) {
      case score === 100:
        setIconAns(0);
        setTitleAns("Parfait");
        break;
      case score >= 75:
        setIconAns(1);
        setTitleAns("Vous vous en sortez bien");
        break;
      case score >= 50:
        setIconAns(2);
        setTitleAns("Vous pouvez mieux faire");
        break;
      case score >= 25:
        setIconAns(3);
        setTitleAns("C'est pas vraiment ça");
        break;
      case score >= 0:
        setIconAns(4);
        setTitleAns("Seulement ?");
        break;
      default:
        setIconAns(0);
        setTitleAns("error");
    }
  }, [score]);

  return (
    <main className="min-h-screen pt-16 bg-blue-100">
      <section className="relative flex flex-col items-center mx-auto max-w-xs md:max-w-3xl">
        <h1 className="text-xl">
          <b>Quizz</b> Culture générale.
          <span className="border border-black bg-blue-700 text-white px-1 ml-2 rounded-sm">
            <FontAwesomeIcon icon={faCheck} />
          </span>
        </h1>
        {quizzData.map((question) => {
          const changeCheck = (e: string) => {
            const newObject = {
              id: question.id,
              question: question.name,
              response: e === question.goodResponse ? true : false,
            };
            const index = respArray.findIndex((e) => e.id === newObject.id);
            index === -1
              ? setRespArray([...respArray, newObject])
              : (respArray[index] = newObject);
          };

          let color;
          respArray.forEach((element) => {
            if (element.id === question.id) {
              if (element.response) {
                color = "bg-gradient-to-r from-green-500 to-lime-300";
              } else {
                color = "bg-gradient-to-r from-rose-400 to-red-500";
              }
            }
          });

          return (
            <article
              key={question.id}
              className={`bg-white mt-6 shadow-md rounded-md w-full p-4 ${
                colorCheck && color
              }`}
            >
              <h3 className="mb-4">{question.question}</h3>
              <div className="mt-2">
                <input
                  type="radio"
                  id={question.name + question.response1}
                  name={question.name}
                  value={question.response1}
                  onChange={(e) => changeCheck(e.target.value)}
                />
                <label
                  htmlFor={question.name + question.response1}
                  className="ml-2"
                >
                  {question.response1}
                </label>
              </div>
              <div className="mt-2">
                <input
                  type="radio"
                  id={question.name + question.response2}
                  name={question.name}
                  value={question.response2}
                  onChange={(e) => changeCheck(e.target.value)}
                />
                <label
                  htmlFor={question.name + question.response2}
                  className="ml-2"
                >
                  {question.response2}
                </label>
              </div>
              <div className="mt-2">
                <input
                  type="radio"
                  id={question.name + question.response3}
                  name={question.name}
                  value={question.response3}
                  onChange={(e) => changeCheck(e.target.value)}
                />
                <label
                  htmlFor={question.name + question.response3}
                  className="ml-2"
                >
                  {question.response3}
                </label>
              </div>
            </article>
          );
        })}
        <button
          className="bg-gradient-to-b from-amber-300 to-amber-200 px-4 py-2 rounded-md shadow-md my-2 font-bold mt-8"
          onClick={handleResult}
        >
          Valider <FontAwesomeIcon icon={faCheck} className="ml-2" />
        </button>
        {!isCheck && (
          <div className="bg-white mt-6 shadow-md rounded-md w-full p-4 mb-4">
            <p className="text-center text-xl">
              Cliquez sur <b>valider</b> pour les voir les <b>résultats.</b>
            </p>
          </div>
        )}
        {isCheck && (
          <div className="bg-white mt-6 shadow-md rounded-md w-full p-4 mb-4">
            <h4 className="text-bold text-center">
              {emojis[iconAns]} {titleAns} {emojis[iconAns]}
            </h4>
            <p className="text-center text-2xl my-2">
              Score :{" "}
              <b>
                {goodAns.length}/{respArray.length}
              </b>
            </p>
            {goodAns.length / respArray.length !== 1 && (
              <p className="text-center">
                Retentez une autre réponse dans les cases rouges, puis
                re-validez !
              </p>
            )}
          </div>
        )}
      </section>
    </main>
  );
};

export default Quizz;
