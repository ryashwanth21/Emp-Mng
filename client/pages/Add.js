import { React, useState } from "react";
import axios from 'axios';
//const API = "http://localhost:5000/api/employees/"


export default function Add() {
    const [form, setform] = useState({
        EmployeeName: '', EmployeeID: '', Designation: '', Department: '', JoiningDate: ''
    });
    const [data, setdata] = useState("");
    const [msg, setmsg] = useState("");

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await axios.post('http://localhost:5000/api/employees/add', form);
            console.log(data);
            setmsg(data.datamsg);
            setdata(data.data.employee);
            console.log(data);

        }
        catch (err) {
            setmsg(data.msg)
            console.error(err);
        }
    }



    return (
        <>
            <div className="container">
                <form onSubmit={handleSubmit} className="container p-4 border rounded shadow bg-light">
                    <h3 className="text-center mb-4">Add Employee Details</h3>

                    <div className="mb-3">
                        <label className="form-label">Employee Name</label>
                        <input
                            name="EmployeeName"
                            type="text"
                            className="form-control"
                            value={form.EmployeeName}
                            onChange={handleChange}
                            placeholder="Enter employee name"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Employee ID</label>
                        <input
                            name="EmployeeID"
                            type="text"
                            className="form-control"
                            value={form.EmployeeID}
                            onChange={handleChange}
                            placeholder="Enter employee ID"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Designation</label>
                        <input
                            name="Designation"
                            type="text"
                            className="form-control"
                            value={form.Designation}
                            onChange={handleChange}
                            placeholder="Enter designation"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Department</label>
                        <input
                            name="Department"
                            type="text"
                            className="form-control"
                            value={form.Department}
                            onChange={handleChange}
                            placeholder="Enter department"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label">Joining Date</label>
                        <input
                            name="JoiningDate"
                            type="date"
                            className="form-control"
                            value={form.JoiningDate}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        SUBMIT
                    </button>
                </form>
            </div>

            {msg && <p>{msg}</p>}
            {data && (
                <table border='1' cellPadding="8" className='table table-bordered table-striped table-hover table-success'>
                    <thead className='table-dark'>
                        <tr>
                            <th> Field</th>
                            <th>value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td> Emp Name</td>
                            <td> {data.EmployeeName}</td>
                        </tr>
                        <tr>
                            <td> Emp ID</td>
                            <td> {data.EmployeeID}</td>
                        </tr>
                        <tr>
                            <td> Emp Designation</td>
                            <td> {data.Designation}</td>
                        </tr>
                        <tr>
                            <td> Emp Department</td>
                            <td> {data.Department}</td>
                        </tr>
                        <tr>
                            <td> Emp Joining </td>
                            <td> {data.JoiningDate}</td>
                        </tr>
                    </tbody>

                </table>
            )}
        </>
    );
}