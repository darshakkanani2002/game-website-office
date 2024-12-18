import React, { createContext, useContext, useState, useEffect } from 'react';

const TournamentContext = createContext();

export function useTournament() {
    return useContext(TournamentContext);
}

export function TournamentProvider({ children }) {
    const [liveUsers, setLiveUsers] = useState({});

    // Simulate live user data update on component mount
    useEffect(() => {
        // This is where you might connect to a WebSocket or some other real-time service
        // to update live users.
        const interval = setInterval(() => {
            // Example of incrementing live users count for demonstration purposes
            setLiveUsers((prevLiveUsers) => {
                const updatedUsers = { ...prevLiveUsers };
                Object.keys(updatedUsers).forEach((id) => {
                    updatedUsers[id] = (updatedUsers[id] || 0) + 1; // Increment user count
                });
                return updatedUsers;
            });
        }, 3000); // Update every 3 seconds for demonstration purposes

        return () => clearInterval(interval);
    }, []);

    const updateLiveUsers = (tournamentId, count) => {
        setLiveUsers((prevLiveUsers) => ({
            ...prevLiveUsers,
            [tournamentId]: count,
        }));
    };

    return (
        <TournamentContext.Provider value={{ liveUsers, updateLiveUsers }}>
            {children}
        </TournamentContext.Provider>
    );
}
