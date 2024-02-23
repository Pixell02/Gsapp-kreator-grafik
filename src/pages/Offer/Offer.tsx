import React from "react";
import LeftBar from "../../components/Left-Bar";
import MainContentOffer from "./components/MainContentOffer";
import "../../App.css";
import { PromoCodeProvider } from "./context/PromoCodeContext";
import Container from "../../components/Container";
function Offer() {
  return (
    <PromoCodeProvider>
      <Container>
        <LeftBar />
        <MainContentOffer />
      </Container>
    </PromoCodeProvider>
  );
}

export default Offer;
