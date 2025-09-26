import React from "react";
import "../styles/styles.scss";

interface Point {
  number: number;
  label: string;
}

interface CircleBlockProps {
  points?: Point[];
  currentIndex?: number;
  onSelect?: (index: number) => void;
}

export const CircleBlock: React.FC<CircleBlockProps> = ({
  points = [
    { number: 1, label: "Книги" },
    { number: 2, label: "Кино" },
    { number: 3, label: "Литература" },
    { number: 4, label: "Музыка" },
    { number: 5, label: "Искусство" },
    { number: 6, label: "Наука" },
  ],
  currentIndex = 0,
  onSelect,
}) => {
  return (
    <div className="circle-block">
      <div className="circle">
      </div>
      <div className="circle__buttons">
        {points.map((point, i) => {
          const angle = (360 / points.length) * i;
          const isActive = i === currentIndex;
          return (
            <button
              key={i}
              className={`circle__button ${isActive ? "circle__button-active" : ""}`}
              onClick={() => onSelect?.(i)}
              style={{
                transform: `translate(-50%, -50%) rotate(${angle}deg) translate(150px) rotate(-${angle}deg)`,
              }}
            >
              <div className="circle__button-container">
                <span className="circle__button-number">{point.number}</span>
                <span className="circle__button-label">{point.label}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
