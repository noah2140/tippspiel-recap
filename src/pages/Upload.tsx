import React, { useState } from "react";
import FileUploader from "../components/FileUploader";
import GraphComponent from "../components/GraphComponent";
import TippsDisplay from "../components/TippsDisplay";

const Upload: React.FC = () => {
  const [gesamtuebersicht, setGesamtuebersicht] = useState<string | null>(null);
  const [tipps, setTipps] = useState<{ name: string; content: string }[]>([]);

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
  
    const encodedData = encodeURIComponent(JSON.stringify(data));
  
    const shareableLink = `${window.location.origin}/result?data=${encodedData}`;
    console.log(shareableLink);
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
    </div>
  );
};

export default Upload;
