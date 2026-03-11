import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Briefcase, ChevronDown, LogOut, PlusCircle, Search } from 'lucide-react'
import ApplicationCard from './ApplicationCard';
import { Link, NavLink, useNavigate } from 'react-router';
import { api } from '../services/api';

const DashboardPage = () => {
    const [applications, setApplications] = useState([]); // original data
    const [filteredApplications, setFilteredApplications] = useState([]); // filtered data
    const [statusFilter, setStatusFilter] = useState("all");
    const [sortType, setSortType] = useState("latest");
    const [searchTerm, setSearchTerm] = useState("");

    const [countByStatus, setCountByStatus] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        api.get("/applications")
            .then(res => {
                const data = res.data;

                setApplications(data);
                setFilteredApplications(data);

                const counts = data.reduce((acc, curr) => {
                    const key = curr.status || "unknown";
                    acc[key] = (acc[key] || 0) + 1;
                    return acc;
                }, {});

                setCountByStatus(counts);
            })
            .catch(() => {
                localStorage.removeItem("token");
                navigate("/login");
            });

    }, []);

    useEffect(() => {

        let updated = [...applications];

        if (statusFilter !== "all") {
            updated = updated.filter(app => app.status === statusFilter);
        }

        if (searchTerm) {
            updated = updated.filter(app =>
                app.companyName.toLowerCase().includes(searchTerm)
            );
        }

        if (sortType === "latest") {
            updated.sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate));
        }

        if (sortType === "company") {
            updated.sort((a, b) => a.companyName.localeCompare(b.companyName));
        }

        if (sortType === "status") {
            updated.sort((a, b) => a.status.localeCompare(b.status));
        }

        setFilteredApplications(updated);

    }, [applications, statusFilter, sortType, searchTerm]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const handleStatusFilter = (e) => {
        setStatusFilter(e.target.value);
    };

    const handleSort = (e) => {
        setSortType(e.target.value);
    };


    const logoutHandler = () => {
        localStorage.removeItem('token')
        navigate("/login")
    }


    const handleDelete = (id) => {
        console.log(id);
        api.delete(`/applications/${id}`)
            .then((res) => {
                setApplications(applications.filter((application) => application._id !== id))
                console.log(res.message);
            }).catch((err) => {
                console.log(err.message);
            })
    }


    return (
        <div className="bg-gray-900 min-h-screen flex justify-center">
            <nav className="fixed w-full bg-gray-900/90 border-b border-gray-700 px-4 sm:px-6 py-5 shadow-lg z-50">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <Link to="/dashboard" className="group flex items-center space-x-3">
                        {/* <div className="bg-blue-500 p-2 rounded-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <Briefcase className="w-5 h-5 text-white" />
                        </div> */}
                        <div className="hidden sm:block">
                            <h1 className="text-2xl font-bold text-white bg-clip-text">
                                Job Application Tracker
                            </h1>
                            <p className="text-md text-gray-400">Manage your job applications effortlessly.</p>
                        </div>
                    </Link>

                    <div className="flex items-center gap-3">
                        <Link
                            to={'/create-application'}
                            className="flex items-center gap-2 bg-blue-500 text-white font-medium py-3 px-6 rounded-lg transition-all transform hover:scale-101"
                        >
                            <PlusCircle size={18} />
                            <span className="hidden sm:inline text-lg">Add Application</span>
                            <span className="sm:hidden">Add</span>
                        </Link>

                        <button
                            onClick={logoutHandler}
                            className="flex items-center gap-2 text-white bg-red-600 hover:bg-red-500 cursor-pointer py-3 px-6 rounded-lg transition-all"
                        >
                            <LogOut size={18} />
                            <span className="hidden sm:inline text-lg font-semibold">Logout</span>
                        </button>
                    </div>
                </div>
            </nav>

            <div className='min-w-6xl max-w-6xl'>
                <div className='space-y-4 mt-30'>
                    <div className="grid grid-cols-1 py-4 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-white">
                        {Object.entries(countByStatus).map(([status, count], idx) => {
                            const statusConfig = {
                                offered: {
                                    bgColor: "bg-gradient-to-br from-green-500/50 to-green-600/10",
                                    borderColor: "border-green-500/50",
                                    shadowColor: "shadow-green-500/30",
                                },
                                applied: {
                                    bgColor: "bg-gradient-to-br from-gray-500/50 to-gray-700/10",
                                    borderColor: "border-gray-500/50",
                                    shadowColor: "shadow-gray-500/30",
                                },
                                rejected: {
                                    bgColor: "bg-gradient-to-br from-red-500/50 to-red-600/10",
                                    borderColor: "border-red-500/50",
                                    shadowColor: "shadow-red-500/30",
                                },
                                interviewing: {
                                    bgColor: "bg-gradient-to-br from-yellow-500/50 to-yellow-600/10",
                                    borderColor: "border-yellow-500/50",
                                    shadowColor: "shadow-yellow-500/30",
                                },
                            };

                            const config = statusConfig[status] || {
                                bgColor: "bg-gradient-to-br from-blue-500/20 to-blue-600/10",
                                borderColor: "border-blue-500/30",
                                shadowColor: "shadow-blue-500/20",
                            };

                            const displayStatus =
                                status.charAt(0).toUpperCase() + status.slice(1);

                            return (
                                <div
                                    key={idx}
                                    className={`relative p-6 rounded-xl border ${config.bgColor} ${config.borderColor} hover:shadow-lg ${config.shadowColor}`}
                                >
                                    {/* Header */}
                                    <div className="flex items-center relative z-10">
                                        <p className="text-md font-medium tracking-wide text-gray-200">
                                            {displayStatus}
                                        </p>
                                    </div>

                                    {/* Count */}
                                    <div className="relative z-10 mt-4">
                                        <h2 className="text-4xl font-bold tracking-tight">
                                            {count}
                                        </h2>
                                    </div>

                                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full" />
                                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-white/5 to-transparent rounded-tr-full" />
                                </div>
                            );
                        })}
                    </div>

                    <div className='relative py-2'>
                        <Search
                            size={22}
                            className="text-gray-200 absolute top-1/2 left-4 -translate-y-1/2"
                        />
                        <input
                            type="text"
                            placeholder="Search applications by company name"
                            onChange={handleSearch}
                            className="w-full bg-zinc-900 text-zinc-100 placeholder:text-zinc-400 border border-zinc-700 text-lg py-3 px-12 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition
        "
                        />
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <select onChange={handleStatusFilter} className="bg-gray-900 text-gray-200 border border-gray-700 rounded-lg px-4 py-2 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="all">All Status</option>
                            <option value="applied">Applied</option>
                            <option value="offered">Offered</option>
                            <option value="interviewing">Interviewing</option>
                            <option value="rejected">Rejected</option>
                        </select>

                        <select onChange={handleSort} className="bg-gray-900 text-gray-200 border border-gray-700 rounded-lg px-4 py-2 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="latest">Latest First</option>
                            <option value="company">Company A-Z</option>
                            <option value="status">Status</option>
                        </select>
                    </div>

                    {filteredApplications.map((application) => (
                        <div
                            key={application._id}
                            className="bg-gray-800 rounded-2xl p-6 shadow-lg w-full hover:shadow-xl transition duration-300"
                        >
                            <ApplicationCard
                                application={application}
                                handleDelete={handleDelete}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;