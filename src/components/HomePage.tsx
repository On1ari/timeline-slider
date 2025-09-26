import React, { useCallback, useEffect, useState } from 'react'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ranges } from '../data/ranges'
import { RangeNavigation } from './RangeNavigation';
import '../styles/styles.scss'
import { CircleBlock } from './CircleBlock';
import { HistoricalSwiper } from './HistoricalSwiper';

const Home = () => {
  const [rangeIndex, setRangeIndex] = useState(0);
  const activeRange = ranges[rangeIndex];
  const [showNav, setShowNav] = useState(window.innerWidth > 655);

  useEffect(() => {
    const handleResize = () => setShowNav(window.innerWidth > 655);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePrev = useCallback(() => {
    setRangeIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setRangeIndex((prev) => Math.min(ranges.length - 1, prev + 1));
  }, []);

  return (
    <div className='wrapper'>
      <div className='container'>
        <CircleBlock
          currentIndex={rangeIndex}
          onSelect={(index) => setRangeIndex(index)}
        />
        <div className='content'>
          <header className='header'>
            <h2 className='header__title'>Исторические <br /> даты</h2>
          </header>
          <main className='years__container'>
            <span className='years__title years__title--start'>{activeRange.start}</span>
            <span className='years__title years__title--end'>{activeRange.end}</span>
          </main>
          <RangeNavigation
            currentIndex={rangeIndex}
            total={ranges.length}
            onPrev={handlePrev}
            onNext={handleNext}
          />
          <HistoricalSwiper activeRange={activeRange} showNav={showNav} />
        </div>
      </div>
    </div>
  )
}

export default Home