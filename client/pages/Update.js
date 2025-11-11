import React, { useState } from "react";
import axios from "axios";

export default function Update() {
  const [empid, setEmpid] = useState("");
  const [form, setForm] = useState({
    EmployeeName: "",
    Designation: "",
    Department: "",
    JoiningDate: "",
  });
  const [found, setFound] = useState(false);
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Search employee
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `http://localhost:5000/api/employees/search/${empid}`
      );
      const emp = res.data;
      setForm({
        EmployeeName: emp.EmployeeName,
        Designation: emp.Designation,
        Department: emp.Department,
        JoiningDate: emp.JoiningDate?.substring(0, 10),
      });
      setFound(true);
      setMsg("Employee found — update below");
    } catch (err) {
      setFound(false);
      setMsg("Employee not found — create one");
      setForm({ EmployeeName: "", Designation: "", Department: "", JoiningDate: "" });
    }
  };

  // Update or create
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (found) {
        await axios.put(
          `http://localhost:5000/api/employees/update/${empid}`,
          form
        );
        setMsg("Employee updated successfully!");
      } else {
        await axios.post("http://localhost:5000/api/employees/add", {
          ...form,
          EmployeeID: empid,
        });
        setMsg("New employee created successfully!");
      }
    } catch (err) {
      console.error(err);
      setMsg("Error saving employee data");
    }
  };

  return (
    <div className="container p-4">
      <h3 className="text-center mb-3">Search / Update Employee</h3>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Enter Employee ID"
          value={empid}
          onChange={(e) => setEmpid(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>

      {/* Show message */}
      {msg && <p className="text-info">{msg}</p>}

      {/* If employee found or new form creation */}
      {(found || msg.includes("create")) && (
        <form onSubmit={handleSubmit} className="p-3 border rounded bg-light shadow-sm">
          <div className="mb-3">
            <label className="form-label">Employee Name</label>
            <input
              type="text"
              name="EmployeeName"
              value={form.EmployeeName}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Designation</label>
            <input
              type="text"
              name="Designation"
              value={form.Designation}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Department</label>
            <input
              type="text"
              name="Department"
              value={form.Department}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Joining Date</label>
            <input
              type="date"
              name="JoiningDate"
              value={form.JoiningDate}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <button type="submit" className="btn btn-success">
            {found ? "Update Employee" : "Create Employee"}
          </button>
        </form>
      )}
    </div>
  );
}
