import { useState, useEffect } from "react";
import "./styles/App.css";

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedIds, setClickedIds] = useState([]);
  const [pics, setPics] = useState([]);
  useEffect(() => {
    async function fetchPics() {
      const response = await fetch(
        "https://picsum.photos/v2/list?page=3&limit=8",
      );

      const data = await response.json();
      setPics(data);
    }

    fetchPics();
  }, []);
  function handleClick(id) {
    if (clickedIds.includes(id)) {
      setCurrentScore(0);
      setClickedIds([]);
    } else {
      setClickedIds([...clickedIds, id]);
      setCurrentScore(currentScore + 1);
      if (currentScore + 1 > bestScore) {
        setBestScore(currentScore + 1);
      }
    }
    setPics([...pics].sort(() => Math.random() - 0.5));
  }

  return (
    <>
      <h1>Memory Card Game</h1>
      <div className="container">
        {pics.map((img) => (
          <div className="IMG" key={img.id} onClick={() => handleClick(img.id)}>
            <img src={img.download_url} alt={img.author} width="200" />
          </div>
        ))}
      </div>
      <div>
        <button
          onClick={() => {
            setCurrentScore(0);
            setBestScore(0);
            setClickedIds([]);
            setPics([...pics].sort(() => Math.random() - 0.5));
          }}
        >
          Restart Game!
        </button>
      </div>
      <p>Score: {currentScore}</p>
      <p>Best Score: {bestScore}</p>
    </>
  );
}
export default App;
