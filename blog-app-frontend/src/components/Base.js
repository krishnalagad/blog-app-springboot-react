import React from "react";
import CustomNavbar from "./CustomNavbar";

const Base = ({ title = "Welcome to Blog App", children }) => {
  return (
    <div className="container-fluid p-0 m-0">
      {/* Custom Navbar Code */}
      <CustomNavbar />

      {/* Main Content */}
      <div className="all-children">{children}</div>

      {/* Footer code */}
    </div>
  );
};

export default Base;
