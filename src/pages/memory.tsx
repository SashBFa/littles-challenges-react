import { useEffect, useState } from "react";
import Card from "../components/memory/Card";

const data = [
  { id: 0, code: "apple", find: false },
  { id: 1, code: "apple", find: false },
  { id: 2, code: "banana", find: false },
  { id: 3, code: "banana", find: false },
  { id: 4, code: "brocoli", find: false },
  { id: 5, code: "brocoli", find: false },
  { id: 6, code: "cherry", find: false },
  { id: 7, code: "cherry", find: false },
  { id: 8, code: "pepper", find: false },
  { id: 9, code: "pepper", find: false },
  { id: 10, code: "straw", find: false },
  { id: 11, code: "straw", find: false },
];

interface cardObject {
  id: number;
  code: string;
  find: boolean;
}

const Memory = () => {
  const [dataMemory, setDataMemory] = useState<cardObject[]>([]);
  const [selected, setSelected] = useState<cardObject[]>([]);
  const [count, setCount] = useState<number>(0);
  const [winScore, setWinScore] = useState<number>(0);

  useEffect(() => {
    const mixData = data.sort(() => Math.random() - 0.5);
    setDataMemory(mixData);
  }, []);

  useEffect(() => {
    if (selected.length === 2) {
      if (selected[0].code === selected[1].code) {
        const itemOneToDelete = {
          id: selected[0].id,
          code: selected[0].code,
          find: true,
        };

        const itemTwoToDelete = {
          id: selected[1].id,
          code: selected[1].code,
          find: true,
        };

        for (let i = 0; i < dataMemory.length; i++) {
          if (dataMemory[i].id === selected[0].id) {
            dataMemory[i] = itemOneToDelete;
          }
          if (dataMemory[i].id === selected[1].id) {
            dataMemory[i] = itemTwoToDelete;
          }
        }

        setTimeout(() => {
          setCount(count + 1);
          setWinScore(winScore + 1);
          setSelected([]);
        }, 500);
      } else {
        setTimeout(() => {
          setCount(count + 1);
          setSelected([]);
        }, 500);
      }
    }
  }, [count, dataMemory, selected, winScore]);

  return (
    <main className="min-h-screen pt-16 bg-gradient-to-r from-orange-200 to-lime-100 px-4 md:px-24">
      <section className="relative flex flex-col items-center mx-auto max-w-xs md:max-w-2xl">
        <h2 className="text-4xl text-center">
          Jeu des <b>cartes mémoires</b>
        </h2>
        <h3 className="text-lg text-center my-4">
          Tentez de gagner avec le moins d'essais possible.
        </h3>
        <h4 className="text-xl text-center mb-4">Nombre de coups : {count}</h4>
        <div className="grid grid-cols-4 gap-2 md:gap-3 w-full mb-4 lg:px-5">
          {dataMemory && winScore !== dataMemory.length / 2 ? (
            dataMemory.map((card) => {
              return (
                <Card
                  key={card.id}
                  card={card}
                  setSelected={setSelected}
                  selected={selected}
                />
              );
            })
          ) : (
            <div>
              <h2>Vous avez gagnez !</h2> <button>Rejouer</button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Memory;
