import { CarrouselInterfaceType } from "../containers/entities/entities";
import { useState } from "react";
import { Card } from "./cardInterface";

export const CarouselInterface = ({ slides }: CarrouselInterfaceType) => {
  const [activeCard, setActiveCard] = useState(slides.length - 2);

  const isRigthOrLeft = (index: number) => {
    if (activeCard !== index) {
      if (activeCard > index) {
        return "translate-x-[12vw]  md:translate-x-[20vw] blur-xs scale-90";
      } else {
        return "translate-x-[-12vw] md:translate-x-[-20vw] blur-xs scale-90";
      }
    } else {
      return "z-40";
    }
  };
  const handleClick = (index: number) => {
    if (index >= slides.length) {
      setActiveCard(slides.length - 1);
    } else {
      if (index <= 0) {
        setActiveCard(0);
      } else {
        setActiveCard(index);
      }
    }
  };

  const circleClassName = [
    "mr-4 md:mr-0",
    "mr-8",
    "mr-12 md:mr-16",
    "mr-16 md:mr-24",
  ];
  return (
    <>
      {slides.map((data, index) => {
        return (
          <div key={index} className="flex items-center justify-center">
            {activeCard === index && (
              <>
                <div
                  className=" h-[60%] w-2/4 md:w-1/4 right-1/2 absolute z-[60] cursor-pointer"
                  onClick={() => {
                    return handleClick(index + 1);
                  }}
                ></div>
                <div
                  className=" h-[60%] w-2/4 md:w-1/4 left-1/2 absolute z-[60] cursor-pointer"
                  onClick={() => {
                    return handleClick(index - 1);
                  }}
                ></div>
              </>
            )}
            <Card.Root
              className={`rounded-lg bg-white pt-16 lg:pt-8 2xl:pt-20 px-8 lg:px-16 pb-8 h-[26rem] lg:h-[20rem] 2xl:h-[28rem] cursor-pointer absolute transition-transform duration-300 ease-linear w-[75vw] md:max-w-[50vw] lg:max-w-[36vw] 2xl:max-w-[45vw] z-20
              ${
                (index === activeCard - 1 || index === activeCard + 1) && "z-30"
              } ${
                (index === activeCard ||
                  index === activeCard - 1 ||
                  index === activeCard + 1) &&
                "shadow-2xl shadow-[#888888]/25"
              } ${isRigthOrLeft(index)}`}
              onClick={() => {
                return handleClick(index);
              }}
            >
              <Card.Content className="flex flex-col h-full justify-between items-center text-center font-bold">
                <h2 className="text-base lg:text-xl 2xl:text-3xl">
                  {data.description}
                </h2>
                <div className="mt-12">
                  <p className="text-sm 2xl:text-xl">{data.title}</p>
                  <p className="mt-2 text-primary text-xs 2xl:text-xl">
                    {data.titleLogo}
                  </p>
                </div>
              </Card.Content>
            </Card.Root>
            <div
              onClick={() => {
                handleClick(index);
              }}
              className={`w-2 h-2 lg:w-3 lg:h-3 rounded-full z-30 border border-primary absolute bottom-40 md:mb-[-5rem] lg:bottom-44 2xl:bottom-60 right-[38vw] md:right-[47vw] cursor-pointer ${
                circleClassName[index]
              } ${index === activeCard && "bg-primary"}`}
            ></div>
          </div>
        );
      })}
    </>
  );
};
