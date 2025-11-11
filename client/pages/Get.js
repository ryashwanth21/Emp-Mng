import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Get() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/employees");
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container p-4">
      <h3 className="mb-3">All Employees</h3>
      <table className="table table-bordered table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Designation</th>
            <th>Department</th>
            <th>Joining Date</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((emp) => (
              <tr key={emp.EmployeeID}>
                <td>{emp.EmployeeID}</td>
                <td>{emp.EmployeeName}</td>
                <td>{emp.Designation}</td>
                <td>{emp.Department}</td>
                <td>{emp.JoiningDate?.substring(0, 10)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No employees found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
