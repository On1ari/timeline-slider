import React, { useCallback, useEffect, useRef, useState } from 'react'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ranges } from '../../data/ranges'
import { RangeNavigation } from '../RangeNavigation/RangeNavigation';
import { CircleBlock } from '../CircleBlock/CircleBlock';
import { HistoricalSwiper } from '../HistoricalSwiper/HistoricalSwiper';
import gsap from 'gsap';
import './HomePage.scss'

interface AnimatedRangeProps {
  start: number;
  end: number;
}

const HomePage = () => {
  const [rangeIndex, setRangeIndex] = useState(0);
  const [showNav, setShowNav] = useState(window.innerWidth > 655);
  const activeRange = ranges[rangeIndex];
  const startRef = useRef<HTMLSpanElement>(null);
  const endRef = useRef<HTMLSpanElement>(null);

  const prevRangeRef = useRef(activeRange);

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

  useEffect(() => {
    const obj = { s: prevRangeRef.current.start, e: prevRangeRef.current.end };

    gsap.to(obj, {
      s: activeRange.start,
      e: activeRange.end,
      duration: 1,
      roundProps: 's,e',
      ease: 'power1.out',
      onUpdate: () => {
        if (startRef.current) startRef.current.textContent = String(obj.s);
        if (endRef.current) endRef.current.textContent = String(obj.e);
      },
    });
    prevRangeRef.current = activeRange;
  }, [activeRange]);

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
            <span ref={startRef} className='years__title years__title--start'>{activeRange.start}</span>
            <span ref={endRef} className='years__title years__title--end'>{activeRange.end}</span>
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

export default HomePage;