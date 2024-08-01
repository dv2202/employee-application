import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmployeeTable from "./components/EmployeeTable";
import EmployeeDetails from "./components/EmployeeDetails";
import CreateEmployee from "./components/CreateEmployee";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<EmployeeTable />} />
        <Route path="/employee/:id" element={<EmployeeDetails />} />
        <Route path="/create" element={<CreateEmployee />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
