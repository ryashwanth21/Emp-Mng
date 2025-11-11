import React, { useState } from "react";
import axios from "axios";

export default function Delete() {
  const [empid, setEmpid] = useState("");
  const [msg, setMsg] = useState("");

  const handleDelete = async () => {
    if (!empid) return setMsg("Enter Employee ID");
    try {
      await axios.delete(`http://localhost:5000/api/employees/delete/${empid}`);
      setMsg("Employee deleted successfully!");
      setEmpid("");
    } catch (err) {
      setMsg("Employee not found or error deleting.");
      console.error(err);
    }
  };

  return (
    <div className="container p-4">
      <h3>Delete Employee</h3>
      <input
        type="text"
        placeholder="Enter Employee ID"
        value={empid}
        onChange={(e) => setEmpid(e.target.value)}
        className="form-control mb-2"
      />
      <button onClick={handleDelete} className="btn btn-danger">
        Delete
      </button>
      {msg && <p className="mt-2">{msg}</p>}
    </div>
  );
}
