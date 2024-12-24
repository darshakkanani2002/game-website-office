import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { setCoins } from '../component/Redux/coinsSlice';

export default function Navbar() {
    const location = useLocation();
    const coins = useSelector((state) => state.coins.value);
    const dispatch = useDispatch();

    // State for dark/light mode
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem("theme");
        return savedTheme ? savedTheme === "dark" : true;
    });

    // Function to toggle theme
    const toggleTheme = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };

    // Update theme class on body and save to localStorage
    useEffect(() => {
        document.body.className = isDarkMode ? "dark-mode" : "light-mode";
        localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    }, [isDarkMode]);

    // Function to get coins from session storage or local storage
    const getUpdatedCoins = () => {
        const storedCoins = sessionStorage.getItem("coins") || localStorage.getItem("coins");
        return parseInt(storedCoins, 10) || 0;
    };

    // Initialize or update coins when location changes
    useEffect(() => {
        const updatedCoins = getUpdatedCoins();

        // If on the Tournament page for the first time, set coins to 900
        if (location.pathname === "/tournament" && updatedCoins === 0) {
            sessionStorage.setItem("coins", 900);
            localStorage.setItem("coins", 900);
            dispatch(setCoins(900));
        } else if (updatedCoins !== coins) {
            dispatch(setCoins(updatedCoins));
        }
    }, [location.key, coins, dispatch]);

    // Save coins in session storage
    useEffect(() => {
        if (coins > 0) {
            sessionStorage.setItem("coins", coins);
            localStorage.setItem("coins", coins); // Optional for long-term persistence
        }
    }, [coins]);

    const isSpecialRoute = location.pathname === "/tournament" || location.pathname === "/stories" || location.pathname === "/game";

    return (
        <div>
            {isSpecialRoute ? (
                <div className="py-2 navigationbar mb-2 position-fixed top-0 px-2">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <Link to="/" className="logo">GamecWebs</Link>
                        </div>
                        <div>
                            <button onClick={toggleTheme} className="theme-toggle-btn">
                                <img
                                    src={isDarkMode ? "/img/day-mode-ic.svg" : "/img/night-mode.svg"}
                                    alt={isDarkMode ? "Night Mode" : "Day Mode"}
                                    className="img-fluid"
                                />
                            </button>
                        </div>
                        <div className="navbar-coins px-3 py-2 d-flex align-items-center">
                            <span className="me-2 fw-bold text-black">{coins} coins</span>
                            <img src="/img/coins.gif" alt="coins-icon" className="img-fluid nav-coins-img" />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="py-2 navigationbar position-fixed top-0 px-2">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <Link to="/" className="logo">GamecWebs</Link>
                        </div>
                        <div>
                            <button onClick={toggleTheme} className="theme-toggle-btn">
                                <img
                                    src={isDarkMode ? "/img/day-mode-ic.svg" : "/img/night-mode.svg"}
                                    alt={isDarkMode ? "Night Mode" : "Day Mode"}
                                    className="img-fluid"
                                />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
