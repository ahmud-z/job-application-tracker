import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { api } from '../services/api';

const EditApplication = () => {

    const navigate = useNavigate();
    const { id } = useParams()

    const [applicationData, setApplicationData] = useState({
        companyName: "",
        role: "",
        salary: "",
        status: "",
        location: "",
        appliedDate: "",
        notes: ""
    })

    useEffect(() => {
        api.get(`/application/${id}`)
            .then((res) => {

                const data = res.data;

                setApplicationData({
                    ...data,
                    appliedDate: data.appliedDate
                        ? data.appliedDate.split("T")[0]
                        : ""
                });

            })
            .catch((err) => {
                console.log(err.message);
            })
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        if (!token) {
            return console.log("No token found");
        }

        api.put(`/application/${id}`, applicationData)
            .then((res) => {
                console.log(res.status);
                navigate('/dashboard');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="bg-gray-900 min-h-screen flex items-center justify-center p-6">
            <div className="bg-gray-800 w-full border border-gray-500 max-w-lg p-8 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">
                    Create Application
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div className="flex flex-col">
                        <label className="text-gray-300 mb-1">Company Name</label>
                        <input
                            value={applicationData.companyName}
                            type="text"
                            className="px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder='Enter company name (e.g. InfinixLab It)'
                            onChange={(e) => setApplicationData({ ...applicationData, companyName: e.target.value })}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-300 mb-1">Job Role</label>
                        <input
                            value={applicationData.role}
                            type="text"
                            className="px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder='Enter job role (e.g. Software Engineer)'
                            onChange={(e) => setApplicationData({ ...applicationData, role: e.target.value })}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-300 mb-1">Salary</label>
                        <input
                            value={applicationData.salary}
                            type="text"
                            className="px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder='Enter job role (e.g. Software Engineer)'
                            onChange={(e) => setApplicationData({ ...applicationData, salary: e.target.value })}
                        />
                    </div>


                    <div className="flex flex-col">
                        <label className="text-gray-300 mb-1">Status</label>
                        <select
                            value={applicationData.status}
                            className="px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) =>
                                setApplicationData({
                                    ...applicationData,
                                    status: e.target.value
                                })
                            }
                        >
                            <option value="accepted">Accepted</option>
                            <option value="offered">Offered</option>
                            <option value="rejected">Rejected</option>
                            <option value="interviewing">Interviewing</option>
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-300 mb-1">Location</label>
                        <input
                            value={applicationData.location}
                            type="text"
                            className="px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder='Enter company location (e.g. Mirpur, Dhaka)'
                            onChange={(e) => setApplicationData({ ...applicationData, location: e.target.value })}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-300 mb-1">Application Date</label>
                        <input
                            value={applicationData.appliedDate}
                            type="date"
                            className="px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setApplicationData({ ...applicationData, appliedDate: e.target.value })}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-300 mb-1">Notes</label>
                        <textarea
                            value={applicationData.notes}
                            rows="3"
                            className="px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            placeholder='Write notes (if any)'
                            onChange={(e) => setApplicationData({ ...applicationData, notes: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition duration-200"
                    >
                        Update Application
                    </button>

                </form>
            </div>
        </div>
    );
};

export default EditApplication;