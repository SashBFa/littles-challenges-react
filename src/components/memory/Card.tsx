import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface cardObject {
  id: number;
  code: string;
  find: boolean;
}

interface memoryCard {
  setSelected: Dispatch<SetStateAction<cardObject[]>>;
  selected: cardObject[];
  card: {
    id: number;
    code: string;
    find: boolean;
  };
}

const Card = ({ card, setSelected, selected }: memoryCard) => {
  const [isLock, setIsLock] = useState<boolean>(false);
  useEffect(() => {
    if (selected.length === 0) {
      setIsLock(false);
    }
    selected.forEach((element) => {
      if (element.id === card.id) {
        setIsLock(true);
      }
    });
  }, [card.id, selected]);

  return (
    <div
      className={`group w-16 h-16 md:w-32 md:h-32 lg:w-36 lg:h-36 text-black hover:cursor-pointer hover:scale-105 transition-all ${
        card.find ? "opacity-0" : "opacity-100"
      }`}
      onClick={() => setSelected([...selected, card])}
    >
      <div
        className={`relative bg-white w-full h-full rounded shadow transition-all duration-500 ease-in-out group-active:[transform:rotateY(180deg)] ${
          isLock && "[transform:rotateY(180deg)]"
        }`}
        style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
      >
        <div
          className="absolute w-full h-full flex items-center justify-center p-2"
          style={{ backfaceVisibility: "hidden" }}
        >
          <img src={`./images/memory/question.svg`} alt={card.code} />
        </div>
        <div
          className="absolute w-full h-full flex items-center justify-center [transform:rotateY(180deg)] p-2"
          style={{ backfaceVisibility: "hidden" }}
        >
          <img src={`./images/memory/${card.code}.svg`} alt={card.code} />
        </div>
      </div>
    </div>
  );
};

export default Card;
