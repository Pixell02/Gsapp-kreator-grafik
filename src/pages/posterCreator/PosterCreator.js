import React from "react";
import LeftBar from "../../components/Left-Bar";
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
