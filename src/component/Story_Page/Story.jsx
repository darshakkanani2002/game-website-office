import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import axios from 'axios';
import { Img_Url, Test_API } from '../Config';

export default function Story() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const swiperRef = useRef(null); // Ref for the Swiper instance
  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const { vCatId } = useParams(); // Get vCatId from the URL

  const onAutoplayTimeLeft = (swiper, time, progress) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty('--progress', 1 - progress);
    }
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  // Fetch story data when vCatId changes
  useEffect(() => {
    if (vCatId) {
      fetchData(vCatId);
    }
  }, [vCatId]);

  const fetchData = async (vCatId) => {
    try {
      const payload = { vCatId };
      const response = await axios.post(`${Test_API}story/list`, payload);
      const imageData = response.data.data;
      setImages(imageData);
    } catch (error) {
      console.error('Error fetching story data:', error);
    }
  };

  const handleBackButtonClick = () => {
    navigate('/stories');
  };

  // Restart autoplay when images are updated or when Swiper is re-initialized
  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.autoplay.start();
    }
  }, [images]);

  return (
    <div className="content-padding pb-0">
      <div className="background-height-bg overflow-hidden">
        <div className="row justify-content-center">
          <div className="col-7 position-relative">
            <Swiper
              ref={swiperRef} // Attach Swiper reference
              key={vCatId} // Ensure Swiper is reinitialized when vCatId changes
              className="mySwiper position-relative"
              spaceBetween={30}
              centeredSlides={true}
              loop={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
              onAutoplayTimeLeft={onAutoplayTimeLeft}
            >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    crossOrigin="anonymous"
                    src={`${Img_Url}${image.vImage}`}
                    alt={`story-${index}`}
                    className="img-fluid"
                  />
                </SwiperSlide>
              ))}
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
              <div className="story-back-icon">
                <button className="story-back-btn" onClick={handleBackButtonClick}>
                  <img
                    src="../../../public/img/backward.gif"
                    alt="backward"
                    className="img-fluid story-back-gif"
                  />
                </button>
              </div>
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}
