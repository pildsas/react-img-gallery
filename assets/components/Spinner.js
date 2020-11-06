import React from "react";
import "../styles/spinner.css";

export const Spinner = () => {
  return (
    <div className="spinner">
      <div className="blob top"></div>
      <div className="blob bottom"></div>
      <div className="blob left"></div>

      <div className="blob move-blob"></div>
    </div>
  );
};
