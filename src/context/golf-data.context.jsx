import { createContext, useState, useEffect } from "react";
import io from "socket.io-client";

export const GolfDataContext = createContext({
  playersData: [],
  loading: true,
});

export const GolfDataProvider = ({ children }) => {
  const [playersData, setPlayersData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const socket = io("https://mst-full-stack-dev-test.herokuapp.com/");
    // Listen for 'data-update' event from the server
    socket.on("connect", () => {
      //   console.log("Connected to the server");
    });

    // Listen for any data from the server
    socket.on("data-update", (newPlayer) => {
      //   console.log("Received data from the server:", newPlayer);
      //check if player is already in the list
      const playerIndex = playersData.findIndex(
        (player) => player.MSTID === newPlayer.MSTID
      );
      if (playerIndex !== -1) {
        // Update the player's data if it already exists in the list
        setPlayersData((prevPlayers) => {
          const updatedPlayers = [...prevPlayers];
          //   updatedPlayers[playerIndex].Score = newPlayer.Score;
          updatedPlayers[playerIndex].Today = newPlayer.Today;
          return updatedPlayers;
        });
        return;
      }
      setPlayersData((prevPlayers) => [...prevPlayers, newPlayer]);
      setLoading(false); // Set loading to false once data is received
    });

    // Clean up the socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, [playersData]); // Empty dependency array means this effect runs once on mount

  const value = { playersData, loading };

  return (
    <GolfDataContext.Provider value={value}>
      {children}
    </GolfDataContext.Provider>
  );
};
