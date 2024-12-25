import React, { createContext, useContext, useState } from 'react';

const TournamentContext = createContext();

export const TournamentProvider = ({ children }) => {
    const [liveUsers, setLiveUsers] = useState({});

    const updateLiveUsers = (tournamentId, count) => {
        setLiveUsers((prev) => ({
            ...prev,
            [tournamentId]: count,
        }));
    };

    return (
        <TournamentContext.Provider value={{ liveUsers, updateLiveUsers }}>
            {children}
        </TournamentContext.Provider>
    );
};

export const useTournament = () => useContext(TournamentContext);
    