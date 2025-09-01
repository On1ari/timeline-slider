import React, { useCallback, useRef, useState } from 'react'
import '../styles/styles.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { FreeMode, Navigation, Pagination } from 'swiper/modules';
import { ranges } from '../data/ranges'
import { RangeNavigation } from './RangeNavigation';

const Home = () => {
  const [rangeIndex, setRangeIndex] = useState(0);
  const activeRange = ranges[rangeIndex];

  const handlePrev = useCallback(() => {
    setRangeIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setRangeIndex((prev) => Math.min(ranges.length - 1, prev + 1));
  }, []);

  return (
    <div className='wrapper'>
      <div className='container'>
        <div className='content'>
          <header className='header'>
            <h2 className='header__title'>Исторические даты</h2>
          </header>
          <main className='main__years'>
            <span className='main__years-title main__years-title--start'>{activeRange.start}</span>
            <span className='main__years-title main__years-title--end'>{activeRange.end}</span>
          </main>
          <RangeNavigation
            currentIndex={rangeIndex}
            total={ranges.length}
            onPrev={handlePrev}
            onNext={handleNext}
          />
          <Swiper
            slidesPerView={3}
            freeMode={true}
            spaceBetween={30}
            grabCursor={true}
            navigation={true}
            modules={[FreeMode, Navigation]}
          >
            {activeRange.events.map((event) => (
              <SwiperSlide key={event.year}>
                <div className="slide__content">
                  <span className="slide__content-year">{event.year}</span>
                  <p className='slide__content-text'>{event.text}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  )
}

export default Home