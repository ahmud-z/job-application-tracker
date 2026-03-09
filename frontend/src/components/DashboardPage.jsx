import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react'
import ApplicationCard from './ApplicationCard';
import { Link, NavLink, useNavigate } from 'react-router';
import { api } from '../services/api';

const DashboardPage = () => {
    const [applications, setApplications] = useState([]);
    const [countByStatus, setCountByStatus] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate("/login");
            return;
        }

        api.get("/applications")
            .then(res => {
                const data = res.data;
                setApplications(data);

                const counts = data.reduce((acc, curr) => {
                    const key = curr.status || "unknown";
                    acc[key] = (acc[key] || 0) + 1;
                    return acc;
                }, {});

                setCountByStatus(counts);
            })
            .catch(err => {
                localStorage.removeItem('token')
                navigate("/login");
            });
    }, []);



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
            <nav className="fixed w-full bg-gray-800 border border-gray-700 px-6 py-4 shadow-md z-50">
                <div className="flex w-6xl items-center justify-between mx-auto">
                    <div className='space-y-1.5 text-white'>
                        <h1 className='text-2xl font-bold'>Job Application Tracker</h1>
                        <p className="text-sm font-medium text-gray-300">Manage your job applications effortlessly.</p>
                    </div>

                    <div className="flex applications-center space-x-6">
                        <NavLink
                            to={"/dashboard"}
                            className={({ isActive }) => (isActive ? "text-white font-medium border-b-2" : "")}
                        >
                            Dashboard
                        </NavLink>

                        <NavLink
                            to={"/applications"}
                            className="text-gray-300 hover:text-white transition duration-200"
                        >
                            Applications
                        </NavLink>
                        <NavLink
                            to={"#"}
                            className="text-gray-300 hover:text-white transition duration-200"
                        >
                            Analytics
                        </NavLink>
                        <NavLink
                            to={"#"}
                            onClick={logoutHandler}
                            className="text-gray-300 hover:text-white transition duration-200"
                        >
                            Logout
                        </NavLink>
                    </div>
                    <div>
                        <Link to={'/create-application'} className='bg-purple-500 font-semibold text-white py-2 px-4 rounded-lg'>Add new Application</Link>
                    </div>
                </div>
            </nav>
            <div className='min-w-6xl max-w-6xl'>
                <div className='space-y-4 mt-30'>

                    <div className="flex gap-6 text-white">
                        {Object.entries(countByStatus).map((item, idx) => (
                            <div key={idx} className="group w-full bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 backdrop-blur-lg rounded-2xl p-6 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300">

                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-blue-300 font-medium">{item[0]}</p>
                                    {/* <div className="text-blue-400 text-xl">📄</div> */}
                                </div>

                                <h2 className="text-4xl font-bold mt-3">{item[1]}</h2>

                                <div className="mt-4 h-[2px] bg-blue-500/30 relative overflow-hidden rounded">
                                    <div className="absolute left-0 top-0 h-full w-1/2 bg-blue-400"></div>
                                </div>
                            </div>
                        ))}
                    </div>


                    <div>
                        <input type="text" placeholder='Search applications' className='placeholder:text-gray-500 text-white w-full border border-gray-400 py-3 px-6 rounded-lg' />
                        <option value=""></option>
                    </div>


                    {applications.map((application) => (
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