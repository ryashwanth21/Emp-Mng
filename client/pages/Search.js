import React, { useState } from 'react';
import axios from 'axios';

export default function Search() {
  const [empid, setEmpid] = useState('');
  const [emp, setEmp] = useState(null);
  const [status, setStatus] = useState(''); // for messages

  const handleChange = (e) => {
    setEmpid(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://localhost:5000/api/employees/search/${empid}`);
      setEmp(res.data);
      setStatus('Employee found');
    } catch (err) {
      console.error(err);
      setEmp(null);
      if (err.response && err.response.status === 404) {
        setStatus('Employee not found, you can add one');
      } else {
        setStatus('Error fetching employee');
      }
    }
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit} className="container p-4 rounded border shadow bg-light">
          <div className="mb-3">
            <label className="form-label">Enter Employee ID to search</label>
            <input
              className="form-control"
              placeholder="Enter ID"
              type="text"
              value={empid}
              onChange={handleChange}
              required
            />
            <button type="submit" className="btn btn-primary mt-2">
              Search
            </button>
          </div>
        </form>

        {/* Status message */}
        {status && <p className="text-info">{status}</p>}

        {/* Employee details if found */}
        {emp && (
          <div className="card shadow-sm mb-3 p-3">
            <p><strong>ID:</strong> {emp.EmployeeID}</p>
            <p><strong>Name:</strong> {emp.EmployeeName}</p>
            <p><strong>Designation:</strong> {emp.Designation}</p>
            <p><strong>Department:</strong> {emp.Department}</p>
            <p><strong>Joining Date:</strong> {emp.JoiningDate?.substring(0,10)}</p>
          </div>
        )}
      </div>
    </>
  );
}
