import React from "react";
import {BrowserRouter,Link ,Route, Routes, Navigate} from "react-router-dom";
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
function App() {
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element = {<Navigate to="/login" />} />
      <Route path="/login" element = {<Login/>} />
      <Route path="/register" element = {<Register />} />
      <Route path="/generator" element = {<Generator />} />
      <Route path="/catalog" element = {<Catalog />} />
      <Route path="/yourTeamPanel" element = {<YourTeamPanel />} />
      <Route path="/players" element = {<Players />} />
      <Route path="/opponents" element = {<Opponents />} />
      <Route path="/sponsors" element = {<Sponsors />} />
      <Route path="/yourTeams" element = {<YourTeams />} />
      <Route path="/offer" element = {<Offer />} />
      <Route path="/account" element = {<Account />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
