import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useNavigate } from 'react-router-dom';

const CreateEmployee = () => {
  const [empId, setEmpId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhone] = useState('');
  const [role, setRole] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate ();
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!empId || !name || !email || !role || !address || !phoneNumber) {
      toast.error('All fields are required!');
      return;
    }

    try {
      const response = await fetch('https://free-ap-south-1.cosmocloud.io/development/api/employee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
          'projectId': '66aa72328f90e5d0511a0293', 
          'environmentId': '66aa72328f90e5d0511a0294', 
        },
        body: JSON.stringify({
          emp_id: empId,
          name,
          email,
          role,
          address,
          phoneNumber,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create employee');
      }

      const data = await response.json();
      toast.success('Employee created successfully! Navigating to home page');
      
      // Clear form
      setEmpId('');
      setName('');
      setEmail('');
      setRole('');
      setAddress('');
      setPhone('');
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      toast.error('Error creating employee');
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer autoClose={1500} />
      <h2 className="text-2xl font-semibold mb-4">Create New Employee</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="empId" className="block text-sm font-medium text-gray-700">Employee ID</label>
          <input
            type="number"
            id="empId"
            value={empId}
            onChange={(e) => setEmpId(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
          <input
            type="text"
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Contact Number</label>
          <PhoneInput
            country={'us'}
            value={phoneNumber}
            onChange={phone => setPhone(phone)}
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
        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Create Employee
        </button>
      </form>
    </div>
  );
};

export default CreateEmployee;
