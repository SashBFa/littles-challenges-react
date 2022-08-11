import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Card from "../components/carrousel/Card";
import { CarrouselData } from "../data/carrousel";

const Carrousel = () => {
  const [prevIndex, setPrevIndex] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState<number>(1);
  const [nextIndex, setNextIndex] = useState<number>(2);
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const [isMovingRight, setIsMovingRight] = useState<boolean>(false);
  const [isMovingLeft, setIsMovingLeft] = useState<boolean>(false);

  const dataLength = CarrouselData.length;
  let count = 0;

  useEffect(() => {
    if (currentIndex === 0) {
      setPrevIndex(dataLength - 1);
      setNextIndex(currentIndex + 1);
    } else if (currentIndex === dataLength - 1) {
      setPrevIndex(currentIndex - 1);
      setNextIndex(0);
    } else {
      setPrevIndex(currentIndex - 1);
      setNextIndex(currentIndex + 1);
    }
  }, [currentIndex, dataLength]);

  const handleOnNextClick = () => {
    if (!isMoving) {
      setIsMoving(true);
      setIsMovingRight(true);
      count = (currentIndex + dataLength - 1) % dataLength;
      setTimeout(() => {
        setCurrentIndex(count);
      }, 300);
      setTimeout(() => {
        setIsMoving(false);
        setIsMovingRight(false);
      }, 600);
    }
  };
  const handleOnPrevClick = () => {
    if (!isMoving) {
      setIsMoving(true);
      setIsMovingLeft(true);
      count = (currentIndex + dataLength + 1) % dataLength;
      setTimeout(() => {
        setCurrentIndex(count);
      }, 300);
      setTimeout(() => {
        setIsMoving(false);
        setIsMovingLeft(false);
      }, 600);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-r from-orange-100 to-lime-200 py-16 px-4">
      <section className="relative mx-auto max-w-xs md:max-w-2xl lg:max-w-4xl bg-gray-800 rounded shadow py-12 overflow-hidden">
        <div className="text-white/80 text-3xl w-full absolute top-1/2 -translate-y-1/2 flex justify-between px-8">
          <button
            onClick={handleOnPrevClick}
            className="hover:scale-105 hover:text-white drop-shadow"
          >
            <FontAwesomeIcon icon={faArrowAltCircleLeft} />
          </button>
          <button
            onClick={handleOnNextClick}
            className="hover:scale-105 hover:text-white drop-shadow"
          >
            <FontAwesomeIcon icon={faArrowAltCircleRight} />
          </button>
        </div>
        <div className="w-full flex items-center justify-center">
          <div className="w-full flex items-center justify-center md:hidden">
            <div
              className={`${isMovingRight ? "slideRight" : ""} ${
                isMovingLeft ? "slideLeft" : ""
              }`}
            >
              <Card card={CarrouselData[currentIndex]} />
            </div>
          </div>
          <div className="w-full hidden md:flex items-center justify-around lg:hidden px-24">
            <div
              className={`${isMovingRight ? "slideShadeInRight" : ""} ${
                isMovingLeft ? "slideShadeOutLeft" : ""
              } `}
            >
              <Card card={CarrouselData[currentIndex]} />
            </div>
            <div
              className={`${isMovingRight ? "slideShadeOutRight" : ""} ${
                isMovingLeft ? "slideShadeInLeft" : ""
              }`}
            >
              <Card card={CarrouselData[nextIndex]} />
            </div>
          </div>
          <div className="w-full hidden lg:flex items-center justify-around px-24">
            <div
              className={`${isMovingRight ? "slideShadeInRight" : ""} ${
                isMovingLeft ? "slideShadeOutLeft" : ""
              } `}
            >
              <Card card={CarrouselData[prevIndex]} />
            </div>
            <div
              className={`${isMovingRight ? "moveRight" : ""} ${
                isMovingLeft ? "moveLeft" : ""
              }`}
            >
              <Card card={CarrouselData[currentIndex]} />
            </div>
            <div
              className={`${isMovingRight ? "slideShadeOutRight" : ""} ${
                isMovingLeft ? "slideShadeInLeft" : ""
              }`}
            >
              <Card card={CarrouselData[nextIndex]} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Carrousel;
