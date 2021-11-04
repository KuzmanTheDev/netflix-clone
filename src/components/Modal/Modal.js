import React from "react";
import Backdrop from "./Backdrop/Backdrop";
import "./Modal.css";

const Modal = (props) => {
  return (
    <>
      <Backdrop visible={props.visibility} />
      <div
        className={"Modal"}
        style={{
          opacity: props.visibility ? "1" : "0",
        }}
      >
        {props.children}
      </div>
    </>
  );
};

export default Modal;
