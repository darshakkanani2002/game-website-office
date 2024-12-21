import React, { useRef } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function Story() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);

  const onAutoplayTimeLeft = (s, time, progress) => {
    // Update the progress bar
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  return (
    <>
      <div className='content-padding pb-0'>
        <div className="background-height-bg overflow-hidden">
          <div className="row justify-content-center">
            <div className="col-8">
              <Swiper
                spaceBetween={30}
                centeredSlides={true}
                loop={true}
                autoplay={{
                  delay: 5000, // Set delay time (5 seconds per slide)
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
                  <img src="../../../public/img/all-game-img-01.png" alt="all-game-img-01" className="img-fluid" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="../../../public/img/all-game-img-02.png" alt="all-game-img-02" className="img-fluid" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="../../../public/img/all-game-img-03.png" alt="all-game-img-03" className="img-fluid" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="../../../public/img/all-game-img-04.png" alt="all-game-img-04" className="img-fluid" />
                </SwiperSlide>
                <div className="autoplay-progress" slot="container-end">
                  <svg viewBox="0 0 36 36" ref={progressCircle}>
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      stroke="#ccc"
                      strokeWidth="4"
                    ></circle>
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      stroke="#FF4600"
                      strokeWidth="4"
                      strokeDasharray="100"
                      strokeDashoffset="100"
                      style={{
                        strokeDashoffset: 'calc(100 * var(--progress))',
                      }}
                    ></circle>
                  </svg>
                  <span ref={progressContent}></span>
                </div>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
