import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Home } from "./pages/Home";
import { Flow } from "./pages/Flow";

export default function App() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: 16 }}>
      <header style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <strong>Life Insurance Suite</strong>
        <nav style={{ display: "flex", gap: 12 }}>
          <Link to="/">Home</Link>
          <Link to="/flow">Flow</Link>
        </nav>
      </header>
      <hr />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/flow" element={<Flow />} />
      </Routes>
    </div>
  );
}
