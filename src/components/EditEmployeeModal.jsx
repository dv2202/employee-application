import React, { useState, useEffect } from "react";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const EditEmployeeModal = ({ isOpen, onClose, employee, onSave }) => {
  const [formData, setFormData] = useState({
    emp_id: '',
    name: '',
    email: '',
    role: '',
    address: '',
    phoneNumber: '',
  });

  useEffect(() => {
    if (employee) {
      setFormData(employee);
    }
  }, [employee]);

  const handleChange = (e, value) => {
    if (value !== undefined) {
      setFormData({ ...formData, phoneNumber: value });
    } else {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl mb-4">Edit Employee</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Employee ID</label>
            <input
              type="text"
              name="emp_id"
              value={formData.emp_id}
              onChange={handleChange}
              className="w-full border-2 border-gray-300 p-2 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border-2 border-gray-300 p-2 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border-2 border-gray-300 p-2 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Role</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border-2 border-gray-300 p-2 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border-2 border-gray-300 p-2 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Contact Number</label>
            <PhoneInput
              country={'us'}
              value={formData.phoneNumber}
              onChange={(value) => handleChange(null, value)}
              buttonClass="border-2 border-gray-300"
              inputStyle={{
                width: '100%',
                height: '50px',
                border: '2px solid #d1d5db',
                borderRadius: '5px',
                padding: '0 50px',
                fontSize: '16px',
                color: '#000',
              }}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 bg-gray-500 text-white rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployeeModal;
