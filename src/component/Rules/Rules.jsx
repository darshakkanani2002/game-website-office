import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Modal, Button } from "react-bootstrap"; // Using React Bootstrap for modal
import { Img_Url, Test_API } from "../Config";

export default function Rules() {
    const [images, setImagesData] = useState([]);
    const { id } = useParams(); // Get the ID from the URL parameter
    const [currentBalance, setCurrentBalance] = useState(0);
    const [showModal, setShowModal] = useState(false); // State for modal visibility
    const navigate = useNavigate();

    useEffect(() => {
        const savedCoins = parseInt(sessionStorage.getItem("coins"), 10) || 900; // Default balance: 900
        setCurrentBalance(savedCoins);

        fetchData();
    }, [id]);

    const fetchData = () => {
        axios
            .post(`${Test_API}question/list`)
            .then((response) => {
                const filteredData = Array.isArray(response.data.data)
                    ? response.data.data.map((item) => ({
                        _id: item._id, // Quiz ID
                        vImage: item.vImage, // Quiz image
                        vName: item.vName, // Quiz name
                        iEntry: item.iEntry, // Entry fees
                        rankIconUrl: item.rankIconUrl || "../../../public/img/ranking.gif", // Default rank icon
                    }))
                    : [];
                setImagesData(filteredData);
            })
            .catch((error) => {
                console.error("Error fetching question data:", error);
            });
    };

    const handleStartTournament = (entryFee) => {
        if (currentBalance >= entryFee) {
            const updatedBalance = currentBalance - entryFee;
            setCurrentBalance(updatedBalance);
            sessionStorage.setItem("coins", updatedBalance);
            alert(`Tournament started! ${entryFee} coins have been deducted.`);
            navigate(`/questions/${id}`);
        } else {
            setShowModal(true); // Show the modal
        }
    };

    const handleCloseModal = (redirectToGame = false) => {
        setShowModal(false); // Close the modal
        if (redirectToGame) {
            navigate("/game"); // Redirect to the "game" route
        }
    };

    return (
        <div className="content-padding pb-0">
            <div className="background-height-bg overflow-auto">
                <div className="pt-4">
                    <div className="container-fluid">
                        {images
                            .filter((item) => item._id === id)
                            .map((item, index) => (
                                <div className="row align-items-center" key={index}>
                                    <div className="col-4 mb-5">
                                        <img
                                            crossOrigin="anonymous"
                                            src={`${Img_Url}${item.vImage}`}
                                            alt={`rule-img-${index}`}
                                            className="img-fluid"
                                        />
                                    </div>
                                    <div className="col-8 mb-5">
                                        <h3 className="mb-0">{item.vName}</h3>
                                        <p className="mb-0">
                                            <span className="entry-coin-text">
                                                Entry Fees: {item.iEntry}
                                            </span>
                                        </p>
                                        <h6>
                                            Your Current Balance:{" "}
                                            {currentBalance - item.iEntry >= 0
                                                ? currentBalance - item.iEntry
                                                : currentBalance}{" "}
                                            coins
                                        </h6>
                                        <div className="view-rank-sec">
                                            <div className="d-flex align-items-center">
                                                <p className="mb-0 pt-2 fw-bold me-1 text-black">View Rank</p>
                                                <img
                                                    src={item.rankIconUrl}
                                                    alt={`rule-rank-ic-${index}`}
                                                    className="img-fluid quize-tournament-img"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 text-center">
                                        <button
                                            className="question-no text-white border-0 py-2 px-4 mb-3 text-uppercase"
                                            onClick={() => handleStartTournament(item.iEntry)}
                                        >
                                            Start Tournament
                                        </button>
                                    </div>
                                </div>
                            ))}
                    </div>

                    <div className="container">
                        <div className="col-12 text-center mt-4">
                            <h5 className="mb-4">
                                Tap below to start playing this tournament. The entry fee will be
                                deducted from your wallet when you tap below.
                            </h5>
                        </div>
                        <div className="col-12 pb-4">
                            <div className="tournament-rule-box p-4">
                                <h2 className="tournament-rule-text text-black">Tournament Rules</h2>
                                <ul className="tournament-rule-list text-black">
                                    <li className="mb-2 fw-semibold">
                                        You'll get 90 seconds to answer as many questions as you can
                                        (Max 25 questions).
                                    </li>
                                    <li className="mb-2 fw-semibold">
                                        Each question has 4 options; one is the correct answer.
                                    </li>
                                    <li className="mb-2 fw-semibold">
                                        You earn 20 points for each correct answer.
                                    </li>
                                    <li className="mb-2 fw-semibold">
                                        You lose 10 points for each wrong answer.
                                    </li>
                                    <li className="mb-2 fw-semibold">
                                        Hattrick bonus: 10 points for 3 consecutive correct answers.
                                    </li>
                                    <li className="mb-2 fw-semibold">
                                        The winner is determined by the total score of participants.
                                    </li>
                                    <li className="mb-0 fw-semibold">
                                        Winners are declared at a predefined time.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for insufficient coins */}
            <Modal show={showModal} onHide={() => handleCloseModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title className="text-black">Insufficient Coins</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="text-black">You do not have enough coins to join this tournament. Please earn or purchase more coins to participate.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleCloseModal(false)}>
                        Close
                    </Button>
                    <Button className="earn-coin-modal-btn" onClick={() => handleCloseModal(true)}>
                        Earn Coins
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
