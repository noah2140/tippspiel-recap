import React from "react";
import { Link } from "react-router-dom";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <header style={{ padding: "10px", background: "#282c34", color: "white" }}>
        <nav>
          <Link to="/" style={{ marginRight: "20px", color: "white", textDecoration: "none" }}>Home</Link>
          <Link to="/upload" style={{ marginRight: "20px", color: "white", textDecoration: "none" }}>Upload</Link>
        </nav>
      </header>
      <main style={{ padding: "20px" }}>{children}</main>
    </div>
  );
};

export default Layout;
