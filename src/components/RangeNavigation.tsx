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
  return (
    <div className="main__navigation">
      <span>
        {formatNumber(currentIndex + 1)}/{formatNumber(total)}
      </span>
      <div className="main__container-button">
        <button
          className="main__years-button"
          onClick={onPrev}
          disabled={currentIndex === 0}
        >
          <img src={leftArrow} alt="left" width={8} height={14} />
        </button>
        <button
          className="main__years-button"
          onClick={onNext}
          disabled={currentIndex === total - 1}
        >
          <img src={rightArrow} alt="right" width={8} height={14} />
        </button>
      </div>
    </div>
  );
};
