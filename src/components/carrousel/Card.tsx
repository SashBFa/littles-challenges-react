interface carrouselCardInterface {
  card: {
    id: number;
    picture: string;
    title: string;
    subtitle: string;
    color: string;
  };
}

const Card = ({ card }: carrouselCardInterface) => {
  return (
    <div className="flex flex-col items-center">
      <img
        src={card.picture}
        alt={card.title}
        className="rounded-full shadow w-40 h-40"
      />
      <h2 className="font-semibold text-white text-2xl mt-3">{card.title}</h2>
      <h3 className="font-light text-gray-400">{card.subtitle}</h3>
      <a href={card.picture}>
        <button
          style={{ background: `${card.color}` }}
          className="py-2 px-4 rounded shadow font-semibold mt-8 hover:scale-105"
        >
          En voir plus
        </button>
      </a>
    </div>
  );
};

export default Card;
