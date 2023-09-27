import React from "react";
import "../../App.css";
import LeftBar from "../../components/Left-Bar";
import Footer from "../../components/MainFooter";
import MainCatalog from "./components/MainCatalog";
function Catalog() {
  return (
    <div className="page-container">
      <div className="content-wrap">
        <LeftBar />
        <MainCatalog />
        <Footer />
      </div>
    </div>
  );
}

export default Catalog;
