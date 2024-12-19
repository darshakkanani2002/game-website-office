import React, { useRef, useState } from "react";
import { FaTimes, FaShareAlt } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";

const Story = () => {
  const progressBarRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const images = [
    {
      url: "../../../public/img/movie-img-01.png",
      caption: "The Infinix Hot 50 is a smartphone with sleek design...",
      storyname: "story-1",
    },
    {
      url: "../../../public/img/movie-img-02.png",
      caption: "This is the second image in the slider.",
      storyname: "story-2",
    },
    {
      url: "../../../public/img/movie-img-03.png",
      caption: "Another caption for the third image.",
      storyname: "story-3",
    },
  ];

  // Update progress bar width
  const onAutoplayTimeLeft = (swiper, time, progress) => {
    if (progressBarRef.current) {
      const progressWidth = progress * 50; // Calculate width percentage
      progressBarRef.current.style.width = `${progressWidth}%`; // Set width dynamically
      progressBarRef.current.style.right = `${100 - progressWidth}%`; // Adjust the position for right-to-left
    }
  };

  return (
    <div className="background-height-bg overflow-auto d-flex align-items-center">
      <div style={{ position: "relative", width: "90%", margin: "auto" }}>
        {/* Header with close and share buttons */}
        <div className="story-close-btn" style={{ display: "flex", justifyContent: "space-between", padding: "10px" }}>
          <button style={{ background: "none", border: "none" }}>
            <FaTimes size={24} color="orange" />
          </button>
          <span style={{ fontWeight: "bold", color: "black" }}>
            {images[activeIndex].storyname}
          </span>
          <button style={{ background: "none", border: "none" }}>
            <FaShareAlt size={24} color="orange" />
          </button>
        </div>

        {/* Swiper Component */}
        <div className="text-center d-flex justify-content-center">
          <Swiper
            effect="cards"
            loop={true}
            grabCursor
            autoplay={{
              delay: 5000, // 5 seconds per slide
              disableOnInteraction: false,
            }}
            modules={[EffectCards, Autoplay]}
            className="mySwiper"
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)} // Update active index
            onAutoplayTimeLeft={onAutoplayTimeLeft}
          >
            {images.map((image, index) => (
              <SwiperSlide key={index} className="story-slider">
                <img
                  src={image.url}
                  alt={`slide-${index}`}
                  className="img-fluid w-100 slider-img"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Caption for the Active Slide */}
        <div
          className="d-none"
          style={{
            position: "absolute",
            bottom: "20px",
            left: "10%",
            right: "10%",
            margin: "auto",
            backgroundColor: "#ffe4c4",
            padding: "10px",
            borderRadius: "10px",
            textAlign: "center",
            fontWeight: "bold",
            color: "#333",
            zIndex: 1,
          }}
        >
          <p style={{ margin: 0 }}>{images[activeIndex].caption}</p>
        </div>

        {/* Progress Bar */}
        <div className="d-flex justify-content-center m-auto">
          <div
            ref={progressBarRef}
            style={{
              position: "absolute",
              top: "103px",
              left: 0, // Start from the right
              width: "0%", // Start with 0% width
              height: "5px",
              backgroundColor: "orange",
              transition: "width 0.1s linear, right 0.1s linear", // Smoothly animate both width and position
              zIndex: "9999"
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Story;
