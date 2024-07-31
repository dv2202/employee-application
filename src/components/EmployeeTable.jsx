import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TopContainer from "./TopContainer";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import "./CustomToastStyles.css";
import { data } from "../data";
import EditEmployeeModal from "./EditEmployeeModal"; // Import the modal component

const EmployeeTable = () => {
  const [record, setRecord] = useState([]);
  const [selectall, setSelectAll] = useState(false);
  const [selectRows, setSelectRows] = useState([]);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  useEffect(() => {
    const filterData = data.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setRecord(filterData);
    setPages(Math.ceil(filterData.length / pageSize));
  }, [searchTerm]);

  const pageNumber = Array.from({ length: pages }, (_, index) => index + 1);

  const handleCheckBox = (id) => {
    if (id === "all") {
      setSelectAll(!selectall);
      setSelectRows(selectall ? [] : record.map((row) => row.id));
    } else {
      setSelectRows((prevSelectRows) => {
        if (prevSelectRows.includes(id)) {
          return prevSelectRows.filter((rowID) => rowID !== id);
        } else {
          return [...prevSelectRows, id];
        }
      });
    }
  };

  const handleDeleteRows = (e) => {
    if (selectRows.length > 0) {
      e.preventDefault();
      const updateData = record.filter((row) => !selectRows.includes(row.id));
      setRecord(updateData);
      setSelectRows([]);
      setSelectAll(false);
      toast.success("Selected rows deleted successfully!");
    } else {
      toast.error("Select at least 1 row");
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

  const handleSave = (updatedEmployee) => {
    const updatedRecords = record.map((item) =>
      item.id === updatedEmployee.id ? updatedEmployee : item
    );
    setRecord(updatedRecords);
    handleModalClose();
    toast.success("Employee details updated successfully!");
  };

  return (
    <div>
      <TopContainer onDelete={handleDeleteRows} onSearchChange={handleSearchChange} />
      <ToastContainer autoClose={1500} />
      <table className="w-4/5 mx-auto ">
        <thead className="border">
          <tr>
            <th>
              <div className="flex justify-start items-center pl-5 pt-4 pb-4">
                <input
                  type="checkbox"
                  name="allselect"
                  checked={selectall}
                  onChange={() => {
                    const allOnPage = record
                      .slice(
                        (currentPage - 1) * pageSize,
                        currentPage * pageSize
                      )
                      .map((row) => row.id);
                    const areAllSelected =
                      selectRows.length === allOnPage.length;

                    setSelectRows(areAllSelected ? [] : allOnPage);
                    setSelectAll(!areAllSelected);
                  }}
                  className="item-left"
                />
              </div>
            </th>
            <th className="text-left text-gray-600 font-medium">Employee ID</th>
            <th className="text-left text-gray-600 font-medium">Name</th>
            <th className="text-left text-gray-600 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {record
            .slice((currentPage - 1) * pageSize, currentPage * pageSize)
            .map((list, index) => (
              <tr key={index} className="border hover:bg-gray-100">
                <td className="p-5">
                  <input
                    type="checkbox"
                    checked={selectRows.includes(list.id)}
                    onChange={() => handleCheckBox(list.id)}
                  />
                </td>
                <td className="font-medium">{list.employeeId}</td>
                <td className="font-medium">{list.name}</td>
                <td className="item-center text-center flex gap-2 my-auto pt-3 pb-3">
                  <div
                    onClick={() => handleEdit(list)}
                    className="flex gap-2 items-center justify-center cursor-pointer w-10 h-10 border rounded-lg"
                  >
                    <FaRegEdit className="text-center text-black" />
                  </div>
                  <div
                    onClick={handleDeleteRows}
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
        <div className="font-medium text-sm items-center text-gray-500 ">{`${selectRows.length} of ${record.length} row(s) selected`}</div>
        <div className="flex flex-row items-center justify-end">
          <div className="font-medium text-sm items-center text-gray-500 mr-3">
            Page {currentPage} of {pages}
          </div>
          <div className=" justify-center flex items-center">
            {pageNumber.map((page) => (
              <div key={page}>
                <div
                  className={`cursor-pointer flex mx-1 w-7 h-7 justify-center items-center  text-center rounded-md border-2 ${
                    page === currentPage
                      ? "text-blue-500 font-bold text-sm"
                      : "text-sm"
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
  );
};

export default EmployeeTable;
