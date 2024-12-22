import React, { useState } from "react";
import FileUploader from "../components/FileUploader";
import GraphComponent from "../components/GraphComponent";
import TippsDisplay from "../components/TippsDisplay";

const Upload: React.FC = () => {
  const [gesamtuebersicht, setGesamtuebersicht] = useState<string | null>(null);
  const [tipps, setTipps] = useState<{ name: string; content: string }[]>([]);
  const [shareableLink, setShareableLink] = useState<string | null>(null);

  const handleGesamtuebersichtUpload = (content: string) => {
    setGesamtuebersicht(content);
  };

  const handleTippsUpload = (content: string, name: string) => {
    setTipps((prevTipps) => [...prevTipps, { name, content }]);
  };

  const createShareableLink = () => {
    const data = {
      gesamtuebersicht,
      tipps
    };
  
    // Die Daten in JSON umwandeln und Base64 kodieren
    const jsonData = JSON.stringify(data);
    const encodedData = btoa(jsonData); // btoa() wandelt in Base64 um
  
    // Generiere den Link mit der Base64-kodierten Datenzeichenkette
    const generatedLink = `${window.location.origin}/tippspiel-recap/#/result?data=${encodedData}`;
    setShareableLink(generatedLink);
  };

  return (
    <div>
      <h1>CSV-Dateien hochladen</h1>

      <div style={{ display: "flex", justifyContent: "space-between", gap: "20px" }}>
        <div style={{ flex: 1 }}>
          <h2>Upload Gesamtübersicht</h2>
          <FileUploader onUpload={handleGesamtuebersichtUpload} />
        </div>

        <div style={{ flex: 1 }}>
          <h2>Upload Tipps</h2>
          <FileUploader onUpload={(content, name) => handleTippsUpload(content, name)} multiple />
        </div>
      </div>

      <div style={{ marginTop: "40px" }}>
        {gesamtuebersicht && (
          <div style={{ marginTop: "20px" }}>
            <GraphComponent csvData={gesamtuebersicht} />
          </div>
        )}
        {tipps.length > 0 && (
          <div>
            <TippsDisplay csvFiles={tipps} />
          </div>
        )}
      </div>

      <div style={{ marginTop: "20px" }}>
        <button onClick={createShareableLink}>Link für Resultate erstellen</button>
      </div>

      {shareableLink && (
        <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc" }}>
          <h3>Erstellter Link:</h3>
          <a href={shareableLink} target="_blank" rel="noopener noreferrer">
            {shareableLink}
          </a>
        </div>
      )}
    </div>
  );
};

export default Upload;
