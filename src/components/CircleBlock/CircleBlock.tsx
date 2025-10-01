import React, { useEffect, useMemo, useState } from "react";
import { POINTS, Point } from "../../constants/points";
import './CircleBlock.scss'

interface CircleBlockProps {
  points?: Point[];
  currentIndex?: number;
  onSelect?: (index: number) => void;
}

export const CircleBlock: React.FC<CircleBlockProps> = ({ points = POINTS, currentIndex = 0, onSelect, }) => {
  if (!points.length) return null;

  const angleStep = useMemo(() => 360 / points.length, [points.length]);
  const rotationOffset = 30;
  const [visualAngle, setVisualAngle] = useState(-90 - currentIndex * angleStep);

  useEffect(() => {
    const targetAngle = -90 - currentIndex * angleStep;

    let diff = targetAngle - visualAngle;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;

    setVisualAngle(prev => prev + diff);
  }, [currentIndex, angleStep]);


  return (
    <div className="circle-block">
      <div className="circle"></div>
      <div className="circle__buttons"
        style={{
          transform: `translate(-50%, -50%) rotate(${visualAngle + rotationOffset}deg)`,
        }}>
        {points.map((point, i) => {
          const angle = i * angleStep;
          const isActive = i === currentIndex;
          return (
            <button
              key={i}
              className={`circle__button ${isActive ? "circle__button-active" : ""}`}
              onClick={() => onSelect?.(i)}
              style={{
                transform: `translate(-50%, -50%) rotate(${angle}deg) translate(150px)`,
              }}
            >
              <div className="circle__button-container"
                style={{
                  transform: `rotate(${- (visualAngle + rotationOffset + angle)}deg)`,
                }}
              >
                <span className="circle__button-number">{point.number}</span>
                <span className="circle__button-label">{point.label}</span>
              </div>
            </button>
          );
        })}
      </div >
    </div >
  );
};
