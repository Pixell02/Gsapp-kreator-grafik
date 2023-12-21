import React, { PropsWithChildren } from "react";
import LeftBar from "./Left-Bar";
import Footer from "./MainFooter";

const Container = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <div className="page-container">
        <div className="content-wrap">
          <LeftBar />
          {children}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Container;
