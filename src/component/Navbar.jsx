import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { setCoins } from '../component/Redux/coinsSlice';

export default function Navbar() {
    const location = useLocation();
    const coins = useSelector((state) => state.coins.value);
    const dispatch = useDispatch();

    useEffect(() => {
        const updatedCoins = parseInt(location.state?.coins || sessionStorage.getItem("coins"), 10) || 0;
        dispatch(setCoins(updatedCoins));
    }, [location.state, dispatch]);

    useEffect(() => {
        if (coins > 0) {
            sessionStorage.setItem("coins", coins);
        }
    }, [coins]);

    const isSpecialRoute = location.pathname === "/tournament" || location.pathname === "/stories" || location.pathname === "/game";

    return (
        <div>
            {isSpecialRoute ? (
                <div className="bg-white py-4 navigationbar mb-2">
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
                <div className="bg-white py-4 navigationbar">
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
