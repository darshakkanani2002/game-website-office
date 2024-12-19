import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Img_Url, Test_API } from '../Config';
import { useTournament } from '../TournamentProvider';

export default function Tournament() {
    const { liveUsers, updateLiveUsers } = useTournament(); // Access the context values
    const [images, setImagesData] = useState([]); // Declare images state
    const [isLoading, setIsLoading] = useState(true); // Loading state to manage refresh effect

    useEffect(() => {
        // Fetch initial data and update images state
        fetchData().finally(() => setIsLoading(false));
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.post(`${Test_API}question/list`);
            console.log("Tournament Data ==>", response.data.data);
            setImagesData(Array.isArray(response.data.data) ? response.data.data : []);
        } catch (error) {
            console.log(error);
        }
    };

    const handleLiveUsersUpdate = (tournamentId, count) => {
        updateLiveUsers(tournamentId, count);
    };

    return (
        <div className='content-padding'>
            <div className='background-height-bg overflow-auto'>
                <div className='py-4'>
                    <div className='d-flex align-items-center'>
                        <div>
                            <img
                                src="/public/img/quize-tournament.gif"
                                alt="game-remoret-ic"
                                className='img-fluid quize-tournament-img'
                            />
                        </div>
                        <div>
                            <p className='mb-0 fw-bold'>Quiz Tournaments</p>
                        </div>
                    </div>
                </div>
                <div className='container-fluid'>
                    <div className='row'>
                        {isLoading ? (
                            <p>Loading...</p> // Show loading spinner or message
                        ) : (
                            images.map((item) => (
                                <div className='col-4 mb-3' key={item._id}>
                                    <div>
                                        <div className='position-relative'>
                                            <img
                                                crossOrigin="anonymous"
                                                src={`${Img_Url}${item.vImage}`}
                                                alt="tournament-img-01"
                                                className='img-fluid mb-1 border border-1 border-dark rounded'
                                            />
                                            <div className='tournament-lve-text text-center'>
                                                <p className='mb-0 pb-1 px-3 d-flex align-items-center'>
                                                    <span><img src="../../../public/img/live.gif" alt="live" className='img-fluid quize-tournament-live-img' /> </span> <br /> <span>{liveUsers[item._id] || 1}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                            <p className='tournament-winner-text mb-0'>
                                                Winner declares in 0-4 : 0-13 : 0-26
                                            </p>
                                            <h6 className='movi-name-text mb-0'>
                                                {item.vName}
                                            </h6>
                                            <p className='tournament-user-playing-text mb-0'>
                                                143 Users Playing
                                            </p>
                                        </div>
                                        <div className='d-flex justify-content-between align-items-end'>
                                            <div>
                                                <div className='d-flex'>
                                                    <div className='me-1'>
                                                        <img
                                                            src="../../../public/img/coin.gif"
                                                            alt="entry-coin-ic"
                                                            className='img-fluid coin-img'
                                                        />
                                                    </div>
                                                    <div>
                                                        <span className='entry-coin-text'>
                                                            Entry : {item.iEntry} Coins
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <Link to={`/rule/${item._id}`}>
                                                    <button className='tournament-play-btn'>Play</button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}
