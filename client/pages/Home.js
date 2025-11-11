import { Link } from "react-router-dom";
import React from "react";

export default function Home() {
  return (
    <div className="container p-4">
      <h3 className="mb-4">Employee Management</h3>
      <div className="d-grid gap-2">
        <Link to="/add" className="btn btn-primary btn-block">
          Add Employee
        </Link>
        <Link to="/search" className="btn btn-info btn-block">
          Search by ID
        </Link>
        <Link to="/delete" className="btn btn-danger btn-block">
          Delete by ID
        </Link>
        <Link to="/update" className="btn btn-warning btn-block">
          Update by ID
        </Link>
        <Link to="/get" className="btn btn-success btn-block">
          View All Employees
        </Link>
      </div>
    </div>
  );
}
