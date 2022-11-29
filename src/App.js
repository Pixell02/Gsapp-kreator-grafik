import React from "react";
import {BrowserRouter,Link ,Route, Routes} from "react-router-dom";
import { authentication } from "./firebase-config";
import Header from "./components/Header";
import Footer from "./components/MainFooter";
import FormPage from "./components/form-elements/FormPage";
import Login from "./components/Login";
import Register from "./components/Register";
import Generator from "./components/Generator";
import Catalog from "./components/Catalog";
import YourTeamPanel from "./components/YourTeamPanel";
import Players from "./components/Players";
import Opponents from "./components/Opponents";
import Sponsors from "./components/Sponsors";
import YourTeams from "./components/YourTeams";
import Offer from "./components/Offer";
import Account from "./components/Account";
import "./App.css"
function App() {

  return (
    <BrowserRouter>
    <Routes>
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
