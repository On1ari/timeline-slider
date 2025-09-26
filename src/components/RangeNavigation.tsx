import { useEffect, useState } from 'react';
import leftArrow from '../assets/leftArrow.svg';
import rightArrow from '../assets/rightArrow.svg';

interface RangeNavigationProps {
  currentIndex: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}

export const RangeNavigation = ({ currentIndex, total, onPrev, onNext }: RangeNavigationProps) => {

  const formatNumber = (n: number) => n.toString().padStart(2, "0");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 655);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 655);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="navigation">
      <div>
        <span className='navigation-text'>
          {formatNumber(currentIndex + 1)}/{formatNumber(total)}
        </span>
        <div className="navigation__container-button">
          <button
            className="navigation__button"
            onClick={onPrev}
            disabled={currentIndex === 0}
          >
            <img src={leftArrow} alt="left" width={8} height={14} />
          </button>
          <button
            className="navigation__button"
            onClick={onNext}
            disabled={currentIndex === total - 1}
          >
            <img src={rightArrow} alt="right" width={8} height={14} />
          </button>
        </div>
      </div>
      <div className='navigation__container-pagination'>
        {isMobile && <div className="custom-pagination"></div>}
      </div>
    </div>
  );
};
