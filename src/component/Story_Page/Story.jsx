import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import './styles.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function Story() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  return (
    <>
      <div className='content-padding'>
        <div className='row justify-content-center'>
          <div className='col-8'>
            <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
              onAutoplayTimeLeft={onAutoplayTimeLeft}
              className="mySwiper"
            >
              <SwiperSlide>
                <img src="../../../public/img/all-game-img-01.png" alt="all-game-img-01" className='img-fluid' />
              </SwiperSlide>
              <SwiperSlide>
                <img src="../../../public/img/all-game-img-02.png" alt="all-game-img-02" className='img-fluid' />
              </SwiperSlide>
              <SwiperSlide>
                <img src="../../../public/img/all-game-img-03.png" alt="all-game-img-03" className='img-fluid' />
              </SwiperSlide>
              <SwiperSlide>
                <img src="../../../public/img/all-game-img-04.png" alt="all-game-img-04" className='img-fluid' />
              </SwiperSlide>
              <SwiperSlide>Slide 5</SwiperSlide>
              <SwiperSlide>Slide 6</SwiperSlide>
              <SwiperSlide>Slide 7</SwiperSlide>
              <SwiperSlide>Slide 8</SwiperSlide>
              <SwiperSlide>Slide 9</SwiperSlide>
              <div className="autoplay-progress" slot="container-end">
                {/* <svg viewBox="0 0 48 48" ref={progressCircle}>
                  <circle cx="24" cy="24" r="20"></circle>
                </svg> */}
                <span ref={progressContent}></span>
              </div>
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
}
