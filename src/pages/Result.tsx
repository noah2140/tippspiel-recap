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
        // Base64 dekodieren
        const decodedData = atob(encodedData); // atob() dekodiert Base64
        const parsedData = JSON.parse(decodedData); // JSON wieder in das ursprüngliche Format umwandeln
        setResultData(parsedData); // Daten in den State setzen
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
