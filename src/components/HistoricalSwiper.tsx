import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { FreeMode, Navigation, Pagination } from 'swiper/modules';
import gsap from 'gsap';
import '../styles/styles.scss';

interface HistoricalSwiperProps {
  activeRange: Range;
  showNav: boolean;
}

interface Event {
  year: string | number;
  text: string;
}

interface Range {
  start: number;
  end: number;
  events: Event[];
}
export const HistoricalSwiper: React.FC<HistoricalSwiperProps> = ({ activeRange, showNav }) => {
  const swiperRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!swiperRef.current) return;

    const tl = gsap.timeline();
    tl.to(swiperRef.current, { opacity: 0, duration: 0.5 })
      .to(swiperRef.current, { opacity: 1, duration: 0.5, delay: 0.3, ease: 'power2.in' });

  }, [activeRange]);

  return (
    <Swiper
      slidesPerView={1}
      freeMode={true}
      spaceBetween={30}
      grabCursor={true}
      navigation={showNav}
      pagination={{
        el: ".custom-pagination",
        enabled: false,
        clickable: true,
      }}
      modules={[FreeMode, Navigation, Pagination]}
      onSwiper={(swiper) => (swiperRef.current = swiper.el)}
      breakpoints={{
        0: {
          slidesPerView: 1.5,
          spaceBetween: 20,
          pagination: {
            enabled: true,
            clickable: true,
          },
        },
        655: {
          slidesPerView: 2.5,
          spaceBetween: 20,
          pagination: {
            enabled: false,
            clickable: false,
          },
        },
        1100: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1440: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      }}
    >
      {activeRange.events.map((event: Event) => (
        <SwiperSlide key={event.year}>
          <div className="slide__content">
            <span className="slide__year">{event.year}</span>
            <p className='slide__text'>{event.text}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
