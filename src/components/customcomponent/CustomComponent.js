import React from "react";
import "./custom.style.scss";

const CustomComponent = ({ children, background }) => {
  return (
    <div
      className="custom-container"
      style={{ backgroundImage: `url(${background})` }}
    >
      {children}
    </div>
  );
};

export default CustomComponent;
