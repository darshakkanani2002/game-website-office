import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { setCoins } from '../component/Redux/coinsSlice';

export default function Navbar() {
    const location = useLocation();
    const coins = useSelector((state) => state.coins.value);
    const dispatch = useDispatch();

    // Function to get coins from location state or session storage
    const getUpdatedCoins = () => {
        return parseInt(location.state?.coins || sessionStorage.getItem("coins"), 10) || 0;
    };

    // Update coins when location state changes or URL is revisited
    useEffect(() => {
        const updatedCoins = getUpdatedCoins();
        if (updatedCoins !== coins) {
            dispatch(setCoins(updatedCoins));
        }
    }, [location.key, coins, dispatch]); // Add location.key to track even same URL reload

    // Save coins in session storage and local storage
    useEffect(() => {
        if (coins > 0) {
            sessionStorage.setItem("coins", coins);
        }

        // Save to local storage if coins reach 900
        if (coins === 900) {
            localStorage.setItem("coins", coins);
        }
    }, [coins]);

    const isSpecialRoute = location.pathname === "/tournament" || location.pathname === "/stories" || location.pathname === "/game";

    return (
        <div>
            {isSpecialRoute ? (
                <div className="py-4 navigationbar mb-2 position-fixed top-0 px-2">
                    <div className="d-flex justify-content-between">
                        <div>
                            <Link to="/" className="logo">GamecWebs</Link>
                        </div>
                        <div className="navbar-coins px-3 py-2 d-flex align-items-center">
                            <span className="me-2 fw-bold">{coins} coins</span>
                            <img src="/img/coins.gif" alt="coins-icon" className="img-fluid nav-coins-img" />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="py-4 navigationbar position-fixed top-0 px-2">
                    <div className="d-flex justify-content-between">
                        <div>
                            <Link to="/" className="logo">GamecWebs</Link>
                        </div>
                        <div>
                            <img src="/img/day-mode-ic.svg" alt="day-mode-icon" className="img-fluid" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
