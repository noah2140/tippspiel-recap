import React from "react";

const Instructions: React.FC = () => {
  return (
    <div>
      <h2>Wie funktioniert das?</h2>
      <ol>
        <li>
          Exportiere die notwendigen CSV-Dateien aus Kicktipp:
          <ul>
            <li><b>Gesamtübersicht</b>: Enthält die Gesamtpunktzahlen.</li>
            <li><b>Tipps aller Spieler</b>: Enthält die Tipps für einen bestimmten Spieltag.</li>
          </ul>
        </li>
        <li>Gehe zur Upload-Seite und lade die Dateien hoch.</li>
        <li>Schaue dir die Daten an und analysiere sie.</li>
      </ol>
    </div>
  );
};

export default Instructions;
