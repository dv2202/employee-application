import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({});
  const projectId = "66aa72328f90e5d0511a0293";
  const environmentId = "66aa72328f90e5d0511a0294";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://free-ap-south-1.cosmocloud.io/development/api/employee/${id}`,
          {
            method: "GET",
            headers: {
              projectId: projectId,
              environmentId: environmentId,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch employee data");
        }
        const data = await response.json();
        setEmployee(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  if (!employee) {
    return <div>Loading...</div>;
  }
  console.log(employee);
  return (
    <div className="max-w-4xl mx-auto p-8 mt-12 bg-white rounded-xl shadow-md">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">Employee Details</h1>
      <div className="space-y-6 items-center justify-center flex flex-col gap-1">
        <div className="flex items-center gap-1">
          <p className="text-lg font-semibold text-gray-600">Employee ID:</p>
          <p className="text-lg text-gray-800">{employee.emp_id}</p>
        </div>
        <div className="flex justify-between  items-center gap-1">
          <p className="text-lg font-semibold text-gray-600">Name:</p>
          <p className="text-lg text-gray-800">{employee.name}</p>
        </div>
        <div className="flex justify-between items-center gap-1">
          <p className="text-lg font-semibold text-gray-600">Email:</p>
          <p className="text-lg text-gray-800">{employee.email}</p>
        </div>
        <div className="flex justify-between items-center gap-1">
          <p className="text-lg font-semibold text-gray-600">Role:</p>
          <p className="text-lg text-gray-800">{employee.role}</p>
        </div>
        <div className="flex justify-between items-center gap-1">
          <p className="text-lg font-semibold text-gray-600">Address:</p>
          <p className="text-lg text-gray-800">{employee.address}</p>
        </div>
        <div className="flex justify-between items-center gap-1">
          <p className="text-lg font-semibold text-gray-600">Phone Number:</p>
          <p className="text-lg text-gray-800">{employee.phoneNumber}</p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
