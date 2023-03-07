import React, { useEffect } from "react";
import {BrowserRouter, Link , Route, Routes, Navigate} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import Success from "./pages/Success/Success";
import Header from "./components/Header";
import Footer from "./components/MainFooter";
import FormPage from "./components/form-elements/FormPage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Catalog from "./pages/Catalog/Catalog";
import YourTeamPanel from "./pages/YourTeamPanel/YourTeamPanel";
import Players from "./pages/Players/Players";
import Opponents from "./pages/Opponents/Opponents";
import Sponsors from "./pages/Sponsors/Sponsors";
import YourTeams from "./pages/YourTeams/YourTeams";
import YourCatalog from "./pages/YourCatalog/YourCatalog";
import Offer from "./pages/Offer/Offer";
import Account from "./pages/Account/Account";
import "./App.css"
import Creator from "./pages/Creator/Creator";
import { useLogout } from './hooks/useLogout'
import { auth } from "./firebase/config";
import { browserSessionPersistence, getAuth, setPersistence, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import Stats from "./pages/stats/Stats";
import PosterCreator from "./pages/posterCreator/PosterCreator";
import UserAccount from "./pages/stats/components/UserAccountComponents/UserAccount";
import ResetPassword from "./pages/Login/components/ResetPassword";
import Guide from "./pages/Guide/Guide";
function App() {
  const {user, authIsReady} = useAuthContext()
  
  
  return (
    <BrowserRouter>
    {authIsReady && (
    <Routes>
      <Route path="/" element = {<Navigate to="/login" />} />
      <Route path="/resetPassword" element = {<ResetPassword />} />
      <Route path="/login" element = {!user ? <Login /> : <Navigate to="/yourTeamPanel" />} />
      <Route path="/register" element = {!user ? <Register /> : <Navigate to="yourTeamPanel" />} />
      <Route path="/yourCatalog" element = {user ? <YourCatalog /> : <Navigate to="/login" /> } />
      <Route path="/catalog" element = {user ? <Catalog /> : <Navigate to="/login" />} />
      <Route path="/yourTeamPanel" element = {user ? <YourTeamPanel /> : <Navigate to="/login" />} />
      <Route path="/players" element = {user ? <Players /> : <Navigate to="/login" />} />
      <Route path="/opponents" element = {user ? <Opponents /> : <Navigate to="/login" />} />
      {/* <Route path="/sponsors" element = {user ? <Sponsors /> : <Navigate to="/login" />} /> */}
      <Route path="/success" element = {user ? <Success /> : <Navigate to="/login" />} />
      <Route path="/success/*" element = {user ? <Success /> : <Navigate to="/login" />} />
      <Route path="/offer" element = {user ? <Offer /> : <Navigate to="/login" />} />
      
      <Route path="/account" element = {user ? <Account /> : <Navigate to="/login" />} />
      <Route path="/creator/:poster" element = {user ? <Creator /> : <Navigate to="/login" />} />
      <Route path="/catalog/*" element = {user ? <Catalog /> : <Navigate to="/login" /> } />
      
      <Route path="/stats" element = {user ? <Stats /> : <Navigate to="/login" /> } />
      {user && user.uid === "hgwaMbxg3qWnQyqS44AtyTrkSA93" && (
        <>
       <Route path="/stats" element = {user ? <Stats /> : <Navigate to="/login" /> } />
      <Route path="/posterCreator" element = {user ? <PosterCreator /> : <Navigate to="/login" /> } />
      <Route path="/stats/:id" element = {user ? <UserAccount /> : <Navigate to="/login" /> } />
       </>
      )}
      {user && user.uid === "ait7T01TWaPDqx3a4YsogOQrL4O2" && (
        <>
       <Route path="/stats" element = {user ? <Stats /> : <Navigate to="/login" /> } />
      <Route path="/posterCreator" element = {user ? <PosterCreator /> : <Navigate to="/login" /> } />
      <Route path="/stats/:id" element = {user ? <UserAccount /> : <Navigate to="/login" /> } />
       </>
      )}
      <Route path="/guide" element = {user ? <Guide /> : <Navigate to="/login" /> } />

      <Route path="/*" element = {<Navigate to="/login" />} />
    </Routes>
    )}
    </BrowserRouter>
  );
}

export default App;
