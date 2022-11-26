import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FormPage from "./components/FormPage";
import { authentication } from "./firebase-config";
import './App.css';

function App() {

  return (
  <div className="page-container">
    <div className="content-wrap">
      <Header />
      <div className="form-align-center">
        <FormPage />
      </div>
    </div>
      
  </div>
  );
}

export default App;
