import React, { useState, useEffect } from "react";

const Card = ({ title }) => {
  const [count, setCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    console.log(`${title} has been liked: ${hasLiked}`);
},[hasLiked]);
 
  return (
    <div className="card" onClick={() => setCount((prevState) => prevState + 1)}>
     
      <h2>
        {title} <br /> {count || null}
      </h2>
      <button onClick={() => setHasLiked(!hasLiked)}>{hasLiked ? "❤️" : "🤍"}</button>
    </div>
  );
};

const App = () => {
  return (
    <div className="card-container">
      <Card title="The Crudes" rating={5} isCool={true} />
      <Card title="SWAT" />
      <Card title="Lorax" />
    </div>
  );
};

export default App;
