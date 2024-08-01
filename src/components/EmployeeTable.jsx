import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import TopContainer from "./TopContainer";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import "./CustomToastStyles.css";
import EditEmployeeModal from "./EditEmployeeModal"; 
const EmployeeTable = () => {
  const [record, setRecord] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [selectall, setSelectAll] = useState(false);
  const [selectRows, setSelectRows] = useState([]);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [refreshData, setRefreshData] = useState(false);
  const projectId = '66aa72328f90e5d0511a0293';
  const environmentId = '66aa72328f90e5d0511a0294';
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      const limit = pageSize;
      const offset = 0;

      try {
        const response = await fetch(
          `https://free-ap-south-1.cosmocloud.io/development/api/employee?limit=${limit}&offset=${offset}`,
          {
            method: 'GET',
            headers: {
              'projectId': projectId,
              'environmentId': environmentId,
              'Content-Type': 'application/json',
            },
          }
        );
        if (!response.ok) {
          throw new Error('Failed to fetch employees');
        }

        const data = await response.json();
        setRecord(data.data);
        setFilteredRecords(data.data);
        setPages(Math.ceil(data.page.total / pageSize));
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, [refreshData]);

  useEffect(() => {
    const filteredData = record.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredRecords(filteredData);
    setPages(Math.ceil(filteredData.length / pageSize));
    setCurrentPage(1); // Reset to the first page on search
  }, [searchTerm, record]);

  const pageNumber = Array.from({ length: pages }, (_, index) => index + 1);

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://free-ap-south-1.cosmocloud.io/development/api/employee/${id}`, {
        method: 'DELETE',
        headers: {
          'projectId': projectId,
          'environmentId': environmentId,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });
      if (response.ok) {
        toast.success("Employee deleted successfully!");
        setRefreshData((prev) => !prev);
      }
    } catch (error) {
      console.error("Error deleting the employee:", error);
      toast.error("An error occurred while deleting the employee.");
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setSelectRows([]);
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  const handleSave = async (updatedEmployee) => {
    try {
      const response = await fetch(`https://free-ap-south-1.cosmocloud.io/development/api/employee/${updatedEmployee._id}`, {
        method: 'PATCH',
        headers: {
          'projectId': projectId,
          'environmentId': environmentId,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emp_id: updatedEmployee.emp_id,
          name: updatedEmployee.name,
          email: updatedEmployee.email,
          role: updatedEmployee.role,
          address: updatedEmployee.address,
          phoneNumber: updatedEmployee.phoneNumber,
        }),
      });
      if (response.ok) {
        toast.success("Employee details updated successfully!");
        handleModalClose();
        setRefreshData((prev) => !prev);
      }
    } catch (error) {
      console.error("Error updating the employee:", error);
      toast.error("An error occurred while updating the employee.");
    }
  };

  const sortedRecords = [...filteredRecords].sort((a, b) => a.emp_id - b.emp_id);

  return (
    <div className="w-4/5 mx-auto">
    <TopContainer onSearchChange={handleSearchChange} toShow={true} />
      {sortedRecords.length === 0 ? (
        <>
          <div className="items-center justify-center flex mt-[25%] text-[20px] text-gray-600 text-center ">
            <div className="border rounded-md border-gray-400 pt-2 pb-2 pr-4 pl-4">No Employees in the system</div>
          </div>
        </>
      ) : (
        <div className="mx-auto">
          <ToastContainer autoClose={1500} />
          <table className="w-4/5 mx-auto ">
            <thead className="border">
              <tr className="items-center ">
                <th className="text-center text-gray-600 font-medium p-1">Employee ID</th>
                <th className="text-center text-gray-600 font-medium p-1">Name</th>
                <th className="text-center text-gray-600 font-medium p-1">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedRecords.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((list, index) => (
                <tr
                  key={index}
                  className="border hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    window.location.href = `/employee/${list._id}`;
                  }}
                >
                  <td className="font-medium text-center">{list.emp_id}</td>
                  <td className="font-medium text-center">{list.name}</td>
                  <td className="item-center text-center justify-center flex gap-2 my-auto pt-3 pb-3">
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(list);
                      }}
                      className="flex gap-2 items-center justify-center cursor-pointer w-10 h-10 border rounded-lg"
                    >
                      <FaRegEdit className="text-center text-black" />
                    </div>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(list._id);
                      }}
                      className="flex gap-2 items-center justify-center cursor-pointer w-10 h-10 border rounded-lg"
                    >
                      <MdDeleteOutline className="text-center text-red-600" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center w-4/5 mt-3 mx-auto mb-3">
            <div className="flex flex-row items-center w-[100%] justify-center">
              <div className="font-medium text-sm items-center text-gray-500 mr-3">Page {currentPage} of {pages}</div>
              <div className="justify-center flex items-center">
                {pageNumber.map((page) => (
                  <div key={page}>
                    <div
                      className={`cursor-pointer flex mx-1 w-7 h-7 justify-center items-center text-center rounded-md border-2 ${
                        page === currentPage ? "text-blue-500 font-bold text-sm" : "text-sm"
                      }`}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <EditEmployeeModal
            isOpen={isModalOpen}
            onClose={handleModalClose}
            employee={selectedEmployee}
            onSave={handleSave}
          />
        </div>
      )}
    </div>
  );
};

export default EmployeeTable;
