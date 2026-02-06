import React, { useEffect, useState } from 'react';
import { dashboardService } from '../services/api';

const Dashboard = () => {
    const [stats, setStats] = useState({
        total_employees: 0,
        total_present: 0,
        total_absent: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await dashboardService.getStats();
                setStats(response.data);
            } catch (error) {
                console.error("Failed to fetch dashboard stats", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <div className="text-center mt-10">Loading Dashboard...</div>;

    const cards = [
        { title: 'Total Employees', value: stats.total_employees, color: 'bg-blue-500' },
        { title: 'Present Today', value: stats.total_present, color: 'bg-green-500' },
        { title: 'Absent Today', value: stats.total_absent, color: 'bg-red-500' },
    ];

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cards.map((card, index) => (
                    <div key={index} className={`${card.color} rounded-lg shadow-lg p-6 text-white`}>
                        <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
                        <p className="text-4xl font-bold">{card.value}</p>
                    </div>
                ))}
            </div>

            <div className="mt-10 bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* You could add charts or recent activity lists here later */}
                    <p className="text-gray-500">Welcome to HRMS Lite. Use the navigation bar to manage employees and attendance.</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
