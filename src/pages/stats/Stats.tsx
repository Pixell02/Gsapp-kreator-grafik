import React from "react";
import LeftBar from "../../components/Left-Bar";
import "../../App.css";
import AdministratorPanel from "./components/AdministratorPanel";
import Container from "../../components/Container";

export default function Stats() {
  return (
    <Container>
      <LeftBar />
      <AdministratorPanel />
    </Container>
  );
}
