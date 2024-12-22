import React from "react";
import { Link } from "react-router-dom";
import Instructions from "../components/Instructions";

const Home: React.FC = () => {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Kicktipp CSV-Analyzer</h1>
      <Instructions />
      <p>
        Gehe zur <Link to="/upload">Upload-Seite</Link>, um Dateien hochzuladen.
      </p>
    </div>
  );
};

export default Home;
