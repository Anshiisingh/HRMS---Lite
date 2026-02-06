import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-indigo-600 shadow-lg">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link to="/" className="text-white font-bold text-xl">HRMS Lite</Link>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link to="/" className="text-gray-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                Dashboard
                            </Link>
                            <Link to="/employees" className="text-gray-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                Employees
                            </Link>
                            <Link to="/attendance" className="text-gray-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                Attendance
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
