import React from "react";
import { useParams } from "react-router-dom";
import LeftBar from "../../components/Left-Bar";
import { useCollection } from "../../hooks/useCollection";
import AddBackgroundWindow from "./components/AddBackgroundWindow";
import WorkSpace from "./WorkSpace";

export default function PosterCreator() {
  return (
    <div className="page-container">
      <div className="content-wrap">
        <LeftBar />
        <WorkSpace />
      </div>
    </div>
  );
}
