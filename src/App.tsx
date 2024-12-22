import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Layout from "./components/Layout";
import Result from "./pages/Result";

const App: React.FC = () => {
  return (
    <Router basename="/tippspiel-recap">
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/upload"
          element={
            <Layout>
              <Upload />
            </Layout>
          }
        />
        
        <Route path="/result" element={<Result />} />
      </Routes>
    </Router>
  );
};

export default App;
