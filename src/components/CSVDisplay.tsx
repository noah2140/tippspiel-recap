import React from "react";

interface CSVDisplayProps {
  data: string;
}

const CSVDisplay: React.FC<CSVDisplayProps> = ({ data }) => {
  const rows = data.split("\n").map((row) => row.split(","));

  return (
    <table border={1} style={{ width: "100%", marginTop: "20px", textAlign: "left" }}>
      <thead>
        <tr>
          {rows[0]?.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.slice(1).map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CSVDisplay;
