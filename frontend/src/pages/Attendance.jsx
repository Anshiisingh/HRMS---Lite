import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { attendanceService, employeeService } from '../services/api';

const Attendance = () => {
    const { id } = useParams(); // Employee ID from URL
    const navigate = useNavigate();

    const [employeeId, setEmployeeId] = useState(id || '');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [status, setStatus] = useState('Present');
    const [records, setRecords] = useState([]);
    const [loadingRecords, setLoadingRecords] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (id) {
            setEmployeeId(id);
            fetchAttendance(id);
        }
    }, [id]);

    const fetchAttendance = async (empId) => {
        setLoadingRecords(true);
        try {
            const response = await attendanceService.get(empId);
            setRecords(response.data);
            setError('');
        } catch (err) {
            console.error(err);
            // If 404, maybe employee doesn't exist or just no records
            if (err.response && err.response.status === 404) {
                setError('Employee not found');
                setRecords([]);
            } else {
                setRecords([]);
            }
        } finally {
            setLoadingRecords(false);
        }
    };

    const handleMarkAttendance = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            await attendanceService.mark({
                employee_id: employeeId,
                date: date,
                status: status
            });
            setSuccess('Attendance marked successfully!');
            fetchAttendance(employeeId); // Refresh records
        } catch (err) {
            setError(err.response?.data?.detail || 'Failed to mark attendance');
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (employeeId) {
            navigate(`/attendance/${employeeId}`);
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold text-gray-900">Attendance Management</h1>

            {/* Mark Attendance Section */}
            <div className="bg-white shadow sm:rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Mark Attendance</h2>
                {success && <div className="mb-4 text-green-600 text-sm">{success}</div>}
                {error && <div className="mb-4 text-red-600 text-sm">{error}</div>}

                <form onSubmit={handleMarkAttendance} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Employee ID</label>
                        <input
                            type="text"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={employeeId}
                            onChange={(e) => setEmployeeId(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Date</label>
                        <input
                            type="date"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Status</label>
                        <select
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="Present">Present</option>
                            <option value="Absent">Absent</option>
                        </select>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Mark
                        </button>
                    </div>
                </form>
            </div>

            {/* View Attendance Section */}
            <div className="bg-white shadow sm:rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-medium text-gray-900">Attendance Records</h2>
                    <form onSubmit={handleSearch} className="flex space-x-2">
                        <input
                            type="text"
                            placeholder="Employee ID"
                            className="px-3 py-1 border border-gray-300 rounded-md text-sm"
                            value={employeeId}
                            onChange={(e) => setEmployeeId(e.target.value)}
                        />
                        <button type="submit" className="px-3 py-1 bg-gray-200 rounded-md text-sm hover:bg-gray-300">Search</button>
                    </form>
                </div>

                {loadingRecords ? (
                    <div className="text-gray-500">Loading records...</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee ID</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {records.length > 0 ? (
                                    records.map((record) => (
                                        <tr key={record.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.date}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${record.status === 'Present' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                    }`}>
                                                    {record.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.employee_id}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">
                                            No records found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Attendance;
