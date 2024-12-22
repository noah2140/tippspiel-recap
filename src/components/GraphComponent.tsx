import React, { useEffect, useState } from "react";
import './GraphComponent.css';
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
} from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

interface GraphComponentProps {
  csvData: string;
}

interface PlayerData {
  playerName: string;
  points: number[];
}

interface RankData {
  playerName: string;
  ranks: number[];
}

const GraphComponent: React.FC<GraphComponentProps> = ({ csvData }) => {
  const [graphData, setGraphData] = useState<any>(null);
  const [rankData, setRankData] = useState<any>(null);
  const [cumulativePointsData, setCumulativePointsData] = useState<any>(null); // Für den dritten Graphen (kumulative Punkte)

  useEffect(() => {
    if (csvData) {
      const rows = csvData.trim().split("\n").map((row) => row.split(";").map((item) => item.trim().replace(/"/g, "")));

      if (rows.length < 2) {
        console.error("CSV hat keine ausreichenden Daten.");
        return;
      }

      const headers = rows[0];
      const players = rows.slice(1);

      const validIndices = headers
        .map((header, index) =>
          header.includes("Spieltag") && players.some((player) => player[index] !== "")
            ? index
            : null
        )
        .filter((index) => index !== null) as number[];

      const filteredHeaders = validIndices.map((i) => {
        const header = headers[i];
        const match = header.match(/(\d+)/);
        return match ? match[1] : '';
      });

      const bonusPointsIndex = headers.length - 3;

      const datasets = players.map((player, index) => {
        const positions = validIndices.map((i) =>
          player[i] ? parseInt(player[i], 10) : null
        );

        const bonusPoints = player[bonusPointsIndex] ? parseInt(player[bonusPointsIndex], 10) : 0;
        positions.push(bonusPoints); 

        return {
          label: player[1],
          data: positions,
          fill: false,
          borderColor: `hsl(${(index * 360) / players.length}, 70%, 50%)`,
          tension: 0,
        };
      });

      const cumulativePoints: PlayerData[] = players.map((player) => {
        let totalPoints = 0;
        const totalPointsPerPlayer = validIndices.map((i, index) => {
          const currentPoints = player[i] ? parseInt(player[i], 10) : 0;
          totalPoints += currentPoints;
          return totalPoints;
        });

        const bonusPoints = player[bonusPointsIndex] ? parseInt(player[bonusPointsIndex], 10) : 0;
        totalPointsPerPlayer.push(totalPoints + bonusPoints);

        return {
          playerName: player[1],
          points: totalPointsPerPlayer,
        };
      });

      const cumulativePointsDataset = cumulativePoints.map((playerPoints, index) => ({
        label: playerPoints.playerName,
        data: playerPoints.points,
        fill: false,
        borderColor: `hsl(${(index * 360) / players.length}, 70%, 50%)`,
        tension: 0,
      }));

      const ranks: RankData[] = cumulativePoints.map((playerPoints) => {
        const playerRanks = playerPoints.points.map((_, index) => {
          const totalPoints = playerPoints.points[index];
          const sortedPlayers = [...cumulativePoints].sort((a, b) => {
            return b.points[index] - a.points[index];
          });

          return sortedPlayers.findIndex((player) => player.points[index] === totalPoints) + 1;
        });

        return {
          playerName: playerPoints.playerName,
          ranks: playerRanks,
        };
      });

      const rankDatasets = ranks.map((rank, index) => ({
        label: rank.playerName,
        data: rank.ranks,
        fill: false,
        borderColor: `hsl(${(index * 360) / players.length}, 70%, 50%)`,
        tension: 0,
      }));

      filteredHeaders.push("Bonus");

      setGraphData({
        labels: filteredHeaders,
        datasets: datasets,
      });

      setRankData({
        labels: filteredHeaders,
        datasets: rankDatasets,
      });

      setCumulativePointsData({
        labels: filteredHeaders,
        datasets: cumulativePointsDataset,
      });
    }
  }, [csvData]);

  if (!graphData) {
    return <p>Bitte laden Sie eine gültige CSV-Datei hoch.</p>;
  }

  return (
    <div>
      <h2>Gesamtübersicht</h2>
      <div className="graph-container">
        <div className="graph-item">
          <Line
            data={graphData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text: "Punktzahlen aller Spieler an jedem Spieltag",
                },
              },
              scales: {
                y: {
                  title: {
                    display: true,
                    text: "Punkte",
                  },
                },
                x: {
                  title: {
                    display: true,
                    text: "Spieltag",
                  },
                },
              },
            }}
          />
        </div>

        <div className="graph-item">
          {rankData && (
            <Line
              data={rankData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top",
                  },
                  title: {
                    display: true,
                    text: "Rang der Spieler an jedem Spieltag",
                  },
                },
                scales: {
                  y: {
                    title: {
                      display: true,
                      text: "Rang",
                    },
                    min: 0.97, 
                    reverse: true,
                    ticks: {
                      stepSize: 1,
                      precision: 0,
                      callback: function(value: string | number): string {
                        return Math.ceil(Number(value)).toString();
                      }
                    },
                  },
                  x: {
                    title: {
                      display: true,
                      text: "Spieltag",
                    },
                  },
                },
              }}
            />
          )}
        </div>

        <div className="graph-item">
          {cumulativePointsData && (
            <Line
              data={cumulativePointsData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top",
                  },
                  title: {
                    display: true,
                    text: "Gesamtpunkte der Spieler über alle Spieltage",
                  },
                },
                scales: {
                  y: {
                    title: {
                      display: true,
                      text: "Gesamtpunkte",
                    },
                  },
                  x: {
                    title: {
                      display: true,
                      text: "Spieltag",
                    },
                  },
                },
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default GraphComponent;
