import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../tournament/Footer";
import { Test_API } from "../Config";

export default function Questions() {
    const [questions, setQuestions] = useState([]);
    const [timeLeft, setTimeLeft] = useState(90); // 90 seconds for the entire quiz
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [wrongAnswers, setWrongAnswers] = useState(0);
    const [skippedAnswers, setSkippedAnswers] = useState(0);
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams(); // Get the ID from the URL

    const currentQuestion = questions[currentQuestionIndex];

    // Fetch questions from the API based on the ID
    useEffect(() => {
        const fetchQuestions = async () => {
            if (!id) {
                setError("ID is missing from the URL.");
                setLoading(false);
                return;
            }

            try {
                console.log("Requesting questions with ID:", id);

                const response = await axios.post(`${Test_API}question/list`);
                console.log("API Response:", response.data);

                const fetchedQuestions = response.data?.data[0]?.arrQuestion || [];
                setQuestions(fetchedQuestions);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching questions:", err);
                setError("Failed to load questions. Please try again later.");
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [id]);

    // Timer logic for the entire quiz
    useEffect(() => {
        if (timeLeft > 0 && !selectedAnswer) {
            const timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0 && !selectedAnswer) {
            handleSkip();
        }
    }, [timeLeft, selectedAnswer]);

    // Handle answer selection
    const handleAnswerClick = (answer) => {
        if (selectedAnswer) return;
        setSelectedAnswer(answer);

        if (answer === currentQuestion.vAns) {
            setCorrectAnswers((prev) => prev + 1);
        } else {
            setWrongAnswers((prev) => prev + 1);
            setShowCorrectAnswer(true);
        }

        setTimeout(() => {
            nextQuestion();
        }, 1100);
    };

    // Handle skip action
    const handleSkip = () => {
        setSkippedAnswers((prev) => prev + 1);
        nextQuestion();
    };

    // Proceed to the next question
    const nextQuestion = () => {
        setSelectedAnswer(null);
        setShowCorrectAnswer(false);

        // Don't reset the timer
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        } else {
            handleQuizCompletion();
        }
    };

    // Handle quiz completion
    const handleQuizCompletion = () => {
        const quizData = {
            correct: correctAnswers,
            wrong: wrongAnswers,
            skipped: skippedAnswers,
        };

        navigate("/quiz-analysis", { state: quizData });
    };

    // Loading and error states
    if (loading) {
        return <div>Loading questions...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!currentQuestion) {
        return <div>No questions available.</div>;
    }

    // Render quiz component
    const options = [
        { label: "A", key: "vA" },
        { label: "B", key: "vB" },
        { label: "C", key: "vC" },
        { label: "D", key: "vD" },
    ];

    return (
        <div className="content-padding">
            <div className="background-height-bg overflow-auto">
                <div className="container-fluid pt-5">
                    {/* Quiz Header */}
                    <div className="d-flex justify-content-end">
                        <div className="timer-box d-flex align-items-center">
                            <div className="question-quize-time h6 text-black">
                                Quiz<br />time
                            </div>
                            <div className={`timer-circle quize-timer ${timeLeft <= 10 ? "warning" : ""}`}>
                                <h6 className="timer-text mb-0 text-black">{timeLeft}</h6>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container-fluid">
                    {/* Question Section */}
                    <div className="row mb-3">
                        <div className="col-12 text-center">
                            <h5 className="mb-0 fw-bold">
                                Question {currentQuestionIndex + 1}/{questions.length}
                            </h5>
                        </div>
                        <div className="col-12 text-center mt-4 question-txt-shadow">
                            <div className="questions-bg py-3">
                                <h3 className="text-black">{currentQuestion.vQuestion}</h3>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Options Section */}
                <div className="container px-4">
                    <div className="row justify-content-center">
                        {options.map(({ label, key }) => {
                            const optionText = currentQuestion[key];
                            const isSelected = selectedAnswer === optionText;
                            const isCorrect = optionText === currentQuestion.vAns;

                            const answerClass = isSelected
                                ? isCorrect
                                    ? "border-green"
                                    : "border-red"
                                : showCorrectAnswer && isCorrect
                                    ? "border-green"
                                    : "";

                            const answerAlpha = isSelected
                                ? isCorrect
                                    ? "bg-green"
                                    : "bg-red"
                                : showCorrectAnswer && isCorrect
                                    ? "bg-green"
                                    : "";
                            return (
                                <div
                                    key={key}
                                    className={`col-5 text-center mb-3 position-relative ${answerClass}`}
                                    onClick={() => timeLeft > 0 && !selectedAnswer && handleAnswerClick(optionText)}
                                    style={{ cursor: "pointer" }}
                                >
                                    <div className={`question-answer-sec py-3 text-black ${answerClass}`}>
                                        <h5 className="mb-0">{optionText}</h5>
                                    </div>
                                    <div className={`answers-text py-2 ${answerAlpha}`}>
                                        <span>{label} </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="container my-4">
                    <button
                        className="btn btn-primary me-2"
                        onClick={handleSkip}
                        disabled={!!selectedAnswer}
                    >
                        Skip
                    </button>
                </div>
                <div className="container px-4 pb-5">
                    <div className="row justify-content-center">
                        <div className="col-4 text-center">
                            <div className="correct-answer py-3">
                                <span className="fw-semibold">Correct: {correctAnswers}</span>
                            </div>
                        </div>
                        <div className="col-4 text-center">
                            <div className="wrong-answer py-3">
                                <span className="fw-semibold">Wrong: {wrongAnswers}</span>
                            </div>
                        </div>
                        <div className="col-4 text-center">
                            <div className="skipped-answer py-3">
                                <span className="fw-semibold">Skipped: {skippedAnswers}</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Footer Section */}
                <Footer />
            </div>
        </div>
    );
}
