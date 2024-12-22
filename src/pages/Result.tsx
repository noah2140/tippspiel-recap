// Result.tsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // Um die URL-Parameter zu holen
import GraphComponent from "../components/GraphComponent"; // Importiere deine Graph-Komponente
import TippsDisplay from "../components/TippsDisplay"; // Importiere deine Tipps-Komponente

const Result: React.FC = () => {
  const [resultData, setResultData] = useState<any>(null);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const encodedData = queryParams.get("data");

    if (encodedData) {
      try {
        const decodedData = JSON.parse(decodeURIComponent(encodedData));
        setResultData(decodedData);
      } catch (e) {
        console.error("Fehler beim Entschlüsseln der Daten:", e);
      }
    }
  }, [location]);

  if (!resultData) {
    return <div>Lade Ergebnisse...</div>;
  }

  return (
    <div>
      {resultData.gesamtuebersicht && (
        <div style={{ marginTop: "20px" }}>
          <GraphComponent csvData={resultData.gesamtuebersicht} />
        </div>
      )}

      {resultData.tipps && resultData.tipps.length > 0 && (
        <div>
          <TippsDisplay csvFiles={resultData.tipps} />
        </div>
      )}
    </div>
  );
};

export default Result;
