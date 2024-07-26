import { useContext } from "react";
import { GolfDataContext } from "../../context/golf-data.context";
import "./styles.css";

function SocreTable() {
  const { playersData, loading } = useContext(GolfDataContext);

  return (
    <>
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
            {playersData.reverse().map((player) => (
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
    </>
  );
}

export default SocreTable;
