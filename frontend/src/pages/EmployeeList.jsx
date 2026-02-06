import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { employeeService } from '../services/api';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await employeeService.getAll();
            setEmployees(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch employees');
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            try {
                await employeeService.delete(id);
                fetchEmployees(); // Refresh list
            } catch (err) {
                alert('Failed to delete employee');
            }
        }
    };

    if (loading) return <div className="text-center mt-10">Loading...</div>;
    if (error) return <div className="text-center mt-10 text-red-600">{error}</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-gray-900">Employees</h1>
                <Link to="/add-employee" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                    Add Employee
                </Link>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                    {employees.map((employee) => (
                        <li key={employee.id}>
                            <div className="px-4 py-4 sm:px-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <p className="text-sm font-medium text-indigo-600 truncate">{employee.full_name}</p>
                                        <p className="text-sm text-gray-500">{employee.email}</p>
                                    </div>
                                    <div className="ml-2 flex-shrink-0 flex space-x-2">
                                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                            {employee.department}
                                        </p>
                                        <Link to={`/attendance/${employee.employee_id}`} className="text-indigo-600 hover:text-indigo-900 text-sm">
                                            Attendance
                                        </Link>
                                        <button onClick={() => handleDelete(employee.employee_id)} className="text-red-600 hover:text-red-900 text-sm">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-2 text-sm text-gray-500">
                                    ID: {employee.employee_id}
                                </div>
                            </div>
                        </li>
                    ))}
                    {employees.length === 0 && (
                        <li className="px-4 py-4 sm:px-6 text-center text-gray-500">No employees found.</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default EmployeeList;
