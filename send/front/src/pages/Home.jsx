import React from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const checkNearestUser = () => {
    navigate("/nearest-users");
  };

  return (
    <DashboardLayout>
      {" "}
      <Button onClick={checkNearestUser} color="primary">
        Check for NearBy Freinds
      </Button>
    </DashboardLayout>
  );
}

export default Home;
