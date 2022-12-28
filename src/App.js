import React, { useEffect } from "react";
import {BrowserRouter, Link , Route, Routes, Navigate} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import Header from "./components/Header";
import Footer from "./components/MainFooter";
import FormPage from "./components/form-elements/FormPage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Generator from "./pages/Generator/Generator";
import Catalog from "./pages/Catalog/Catalog";
import YourTeamPanel from "./pages/YourTeamPanel/YourTeamPanel";
import Players from "./pages/Players/Players";
import Opponents from "./pages/Opponents/Opponents";
import Sponsors from "./pages/Sponsors/Sponsors";
import YourTeams from "./pages/YourTeams/YourTeams";
import Offer from "./pages/Offer/Offer";
import Account from "./pages/Account/Account";
import "./App.css"
import Creator from "./pages/Creator/Creator";
import { useLogout } from './hooks/useLogout'
import { auth } from "./firebase/config";
import { browserSessionPersistence, getAuth, setPersistence, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
function App() {
  const {user, authIsReady} = useAuthContext()
  
  return (
    <BrowserRouter>
    {authIsReady && (
    <Routes>
      <Route path="/" element = {<Navigate to="/login" />} />
      <Route path="/login" element = {!user ? <Login /> : <Navigate to="/yourTeams" />} />
      <Route path="/register" element = {!user ? <Register /> : <Navigate to="yourTeams" />} />
      <Route path="/:id/generator" element = {user ? <Generator /> : <Navigate to="/login" />} />
      <Route path="/:id/catalog" element = {user ? <Catalog /> : <Navigate to="/login" />} />
      <Route path="/:id/yourTeamPanel" element = {user ? <YourTeamPanel /> : <Navigate to="/login" />} />
      <Route path="/:id/players" element = {user ? <Players /> : <Navigate to="/login" />} />
      <Route path="/:id/opponents" element = {user ? <Opponents /> : <Navigate to="/login" />} />
      <Route path="/:id/sponsors" element = {user ? <Sponsors /> : <Navigate to="/login" />} />
      <Route path="/yourTeams" element = {user ? <YourTeams /> : <Navigate to="/login" />} />
      <Route path="/:id/offer" element = {user ? <Offer /> : <Navigate to="/login" />} />
      <Route path="/:id/account" element = {user ? <Account /> : <Navigate to="/login" />} />
      <Route path="/:id/creator/:poster" element = {user ? <Creator /> : <Navigate to="/login" />} />
      <Route path="/*" element = {<Navigate to="/login" />} />
    </Routes>
    )}
    </BrowserRouter>
  );
}

export default App;
