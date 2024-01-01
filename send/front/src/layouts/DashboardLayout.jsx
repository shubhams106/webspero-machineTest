import React from "react";
import Navbar from "./Navbar";

function DashboardLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      {/* <EditProfile /> */}
    </>
  );
}

export default DashboardLayout;
