import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Img_Url, Test_API } from "../Config";

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(1); // 1 for isStatus: 0, 2 for isStatus: 1
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [images, setImages] = useState([]); // Store fetched images
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch images on component mount and on currentQuestion change
  useEffect(() => {
    fetchImages(currentQuestion === 1 ? 0 : 1);
  }, [currentQuestion]);

  const fetchImages = async (isStatus) => {
    setLoading(true);
    try {
      const response = await axios.post(`${Test_API}simpleQuestion/list`, { isStatus });
      const data = response?.data?.data;

      if (Array.isArray(data)) {
        setImages(data.map((item) => item.vImage || [])); // Set image URLs, default to an empty array
      } else {
        console.error("Invalid image data received:", data);
        setImages([]);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (index) => {
    setSelectedAnswer(index);
    setIsAnimating(true);

    setTimeout(() => {
      setIsAnimating(false);
      setSelectedAnswer(null);

      if (currentQuestion === 1) {
        // Move to second question
        setCurrentQuestion(2);
      } else if (currentQuestion === 2) {
        // Navigate to congratulations
        navigate("/congrasulation");
      }
    }, 1000);
  };

  const renderQuestion = () => {
    if (currentQuestion === 1) {
      return {
        text: "Which one is your favorite movie Select one.",
        images,
      };
    } else if (currentQuestion === 2) {
      return {
        text: "Which one is your favorite Game Select one.",
        images,
      };
    }
    return null;
  };

  const current = renderQuestion();

  return (
    <div className="content-padding pb-0">
      {loading ? (
        <div>Loading...</div>
      ) : current ? (
        <div className="background-height-bg overflow-auto">
          <div>
            <div className="text-center pt-4 question-text">
              <h2 className="fw-bold">Let’s start with your Fantastic Brain</h2>
              <h3>Answer these Simple Questions</h3>
              <h2 className="coins-text">Get 100 Coins</h2>
              <div className="question-no text-white p-2 mb-3">
                Question {currentQuestion}/2
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className={`row ${isAnimating ? "fade-out" : "fade-in"}`}>
              <div className="col-12 text-center question-bg">
                <p className="question-text text-capitalize">{current.text}</p>
              </div>
              {current.images.slice(0, 4).map((vImage, index) =>
                typeof vImage === "string" ? (
                  <div
                    className={`answer-option col-3 ${selectedAnswer === index ? "selected" : ""
                      }`}
                    onClick={() => handleAnswerSelect(index)}
                    key={index}
                  >
                    <img
                      crossOrigin="anonymous"
                      src={`${Img_Url}${vImage}`}
                      alt="images"
                      className="img-fluid quiz-images w-100"
                    />
                  </div>
                ) : (
                  <div key={index}>Invalid image data</div>
                )
              )}
            </div>
          </div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 mt-5">
                <div>
                  <h2 className="quiz-game-text">Play Quiz and Games</h2>
                  <ul className="quiz-game-list">
                    <li>
                      Explore over 45 categories of quizzes, including
                      Entertainment, Cricket, Business, and more!
                    </li>
                    <li>
                      Participate in hourly-updated tournaments and challenge
                      yourself to win.
                    </li>
                    <li>Earn coins for each task you complete.</li>
                    <li>
                      Join millions of quiz enthusiasts who trust us as their
                      go-to platform for quizzes.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>No questions available</div>
      )}
    </div>
  );
}
