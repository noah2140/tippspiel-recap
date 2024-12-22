import React, { useState, useMemo } from "react";
import "./TippsDisplay.css";

interface TippsDisplayProps {
  csvFiles: { name: string; content: string }[];
}

interface TippData {
  result: string;
  count: number;
  players: string[];
}

const TippsDisplay: React.FC<TippsDisplayProps> = ({ csvFiles }) => {
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
  const [isResultReversedConsideredSame, setIsResultReversedConsideredSame] = useState<boolean>(false);

    const normalizeResult = (result: string): string => {
        const cleanResult = result.trim().replace(/"/g, "");
    
        if (isResultReversedConsideredSame) {
        const [score1, score2] = cleanResult.split(":").map(Number);
    
        return `${Math.max(score1, score2)}:${Math.min(score1, score2)}`;
        }
    
        return cleanResult;
    };
  

  const analyzedData = useMemo(() => {
    const tippMap: Record<string, TippData> = {};

    csvFiles.forEach(({ content }) => {
      const rows = content.trim().split("\n").map((row) => row.split(";"));
      const players = rows.slice(1);

      players.forEach((player) => {
        const playerName = player[0];
        if (selectedPlayers.length > 0 && !selectedPlayers.includes(playerName)) {
          return;
        }

        for (let i = 2; i < player.length; i++) {
            const result = player[i];
            const normalizedResult = normalizeResult(result);
  
            if (!tippMap[normalizedResult]) {
              tippMap[normalizedResult] = { result: normalizedResult, count: 0, players: [] };
            }
            tippMap[normalizedResult].count++;
            if (!tippMap[normalizedResult].players.includes(playerName)) {
              tippMap[normalizedResult].players.push(playerName);
            }
          }
        });
      });
  
      return Object.values(tippMap).sort((a, b) => b.count - a.count);
    }, [csvFiles, selectedPlayers, isResultReversedConsideredSame]);

  const allPlayers = useMemo(() => {
    const playersSet = new Set<string>();
    csvFiles.forEach(({ content }) => {
      const rows = content.trim().split("\n").slice(1);
      rows.forEach((row) => {
        const playerName = row.split(";")[0];
        playersSet.add(playerName);
      });
    });
    return Array.from(playersSet);
  }, [csvFiles]);

  const togglePlayer = (playerName: string) => {
    setSelectedPlayers((prev) =>
      prev.includes(playerName)
        ? prev.filter((name) => name !== playerName)
        : [...prev, playerName]
    );
  };

  const toggleResultReversedConsideredSame = () => {
    setIsResultReversedConsideredSame((prev) => !prev);
  };

  return (
    <div>
      <h2>Übersicht der Tipps</h2>

      <div className="player-filter-container">
        {allPlayers.map((player) => (
          <label key={player} className="player-filter-item">
            <input
              type="checkbox"
              checked={selectedPlayers.includes(player)}
              onChange={() => togglePlayer(player)}
            />
            {player}
          </label>
        ))}
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={isResultReversedConsideredSame}
            onChange={toggleResultReversedConsideredSame}
          />
          Auswärts- und Heimresultate als gleiches Ergebnis werten?
        </label>
      </div>

      <div className="tipps-container">
        {/* Gesamtzahl an verschiedenen Tipps */}
        <div className="container-item tipps-summary">
          <h3>Verschiedene Tipps</h3>
          <p>Gesamtzahl an verschiedenen Tipps: {analyzedData.length}</p>
        </div>

        {/* Die verschiedenen Tipps aufgelistet */}
        <div className="container-item tipps-list">
          {analyzedData.map((tipp) => (
            <div key={tipp.result} className="tipp-item">
              <h4>{tipp.result}</h4>
              <p>{tipp.count} Mal getippt</p>
              <p>Spieler: {tipp.players.join(", ")}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TippsDisplay;
