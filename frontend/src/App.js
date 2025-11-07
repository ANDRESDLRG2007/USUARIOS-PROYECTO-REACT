import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Errores from "./components/Errores";
import Login from "./components/Login";
import Header from "./components/Header";
import UserList from "./components/UserList";
import "./styles/theme.css";

function App() {
  return (
    <Router>
      <Header />
      <Routes>

        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Errores />} />


        <Route path="/admin" element={<UserList />} />

        <Route path="/usuario" element={<Errores />} />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
