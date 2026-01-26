import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";

const ApplicationForm = () => {

    const navigate = useNavigate();
    const [applicationInfo, setApplicationInfo] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(applicationInfo);

        axios.post("http://localhost:3000/api/create", applicationInfo).then((res) => {
            console.log(res);
            navigate("/")

        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className="flex justify-center p-6">
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 space-y-4">
                <h2 className="text-xl font-semibold text-center">
                    Add Job Application
                </h2>

                <div className="space-y-1">
                    <label className="text-sm font-medium">Company Name</label>
                    <input
                        value={applicationInfo.company_name}
                        onChange={(e) => setApplicationInfo({ ...applicationInfo, company_name: e.target.value })}
                        required
                        type="text"
                        placeholder="Google"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium">Job Role</label>
                    <input
                        value={applicationInfo.position}
                        onChange={(e) => setApplicationInfo({ ...applicationInfo, position: e.target.value })}
                        required
                        type="text"
                        placeholder="Frontend Developer"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium">Status</label>
                    <select
                        value={applicationInfo.status || ""}
                        onChange={(e) =>
                            setApplicationInfo({
                                ...applicationInfo,
                                status: e.target.value
                            })
                        }
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="" disabled>Select status</option>
                        <option value="Applied">Applied</option>
                        <option value="Interview">Interview</option>
                        <option value="Offer">Offer</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium">
                        Application Date
                    </label>
                    <input
                        value={applicationInfo.applied_date}
                        onChange={(e) => setApplicationInfo({ ...applicationInfo, applied_date: e.target.value })}
                        required
                        type="date"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium">Salary Range</label>
                    <input
                        value={applicationInfo.salary_range}
                        onChange={(e) => setApplicationInfo({ ...applicationInfo, salary_range: e.target.value })}
                        required
                        type="text"
                        placeholder="$60k - $80k"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium">Location</label>
                    <input
                        value={applicationInfo.location}
                        onChange={(e) => setApplicationInfo({ ...applicationInfo, location: e.target.value })}
                        required
                        type="text"
                        placeholder="Remote / New York"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium">Notes</label>
                    <textarea
                        value={applicationInfo.notes}
                        onChange={(e) => setApplicationInfo({ ...applicationInfo, notes: e.target.value })}
                        rows="3"
                        placeholder="Any extra details..."
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                    <Link
                        to={"/"}
                        className="rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700"
                    >
                        Add Application
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ApplicationForm;