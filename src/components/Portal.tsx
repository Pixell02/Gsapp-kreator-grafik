import { PropsWithChildren } from "react";
import ReactDOM from "react-dom";

const Portal = ({ children }: PropsWithChildren) => {
  return ReactDOM.createPortal(children, document.getElementById("portal")!);
};

export default Portal;
