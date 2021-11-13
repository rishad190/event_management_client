import { Container, Divider } from "@mui/material";
import React from "react";
import DataTable from "./DataTable";

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Divider />
      <Container>
        <DataTable />
      </Container>
    </div>
  );
};

export default Dashboard;
