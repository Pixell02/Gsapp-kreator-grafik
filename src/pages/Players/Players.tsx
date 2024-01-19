import React from "react";
import "../../App.css";
import MainContent from "./components/MainContent";
import Container from "../../components/Container";
import { CalendarProvider } from "../Creator/context/CalendarContext";

const Players = () => {
  return (
    <CalendarProvider>
      <Container>
        <MainContent />
      </Container>
    </CalendarProvider>
  );
};

export default Players;
