import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

const socket = io('https://mst-full-stack-dev-test.herokuapp.com/');


function App() {

  const [playersData, setPlayersData] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    // Listen for 'data-update' event from the server
    socket.on('connect', () => {
      console.log('Connected to the server');
    });

    // Listen for any data from the server
    socket.on('data-update', (newPlayer) => {
      console.log('Received data from the server:', newPlayer);
      setPlayersData(prevPlayers => [...prevPlayers, newPlayer]);
      setLoading(false); // Set loading to false once data is received
    });

    // Clean up the socket connection on component unmount
    return () => {
      socket.disconnect();
    };


  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div>
      <h1>Golf Tournament Dashboard</h1>
      {loading ? (
        <div className="text-center mt-5 loading">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading...</p>
        </div>
      ) : (
        <table className="dashboard">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Nationality</th>
              <th>Score</th>
              <th>Today</th>
            </tr>
          </thead>
          <tbody>
            {playersData.map((player) => (
              <tr key={player.MSTID}>
                <td>{player.MSTID}</td>
                <td>{`${player.First} ${player.Last}`}</td>
                <td>{player.Nationality}</td>
                <td>{player.Score}</td>
                <td>{player.Today}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
