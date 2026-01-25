import React from "react";
import { Link } from "react-router";

const ApplicationForm = () => {

    return (
        <div className="flex justify-center p-6">
            <form className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 space-y-4">
                <h2 className="text-xl font-semibold text-center">
                    Add Job Application
                </h2>

                <div className="space-y-1">
                    <label className="text-sm font-medium">Company Name</label>
                    <input
                        required
                        type="text"
                        placeholder="Google"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium">Job Role</label>
                    <input
                        required
                        type="text"
                        placeholder="Frontend Developer"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium">Status</label>
                    <select className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        <option value="">Select status</option>
                        <option>Applied</option>
                        <option>Interview</option>
                        <option>Offer</option>
                        <option>Rejected</option>
                    </select>
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium">
                        Application Date
                    </label>
                    <input
                        required
                        type="date"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium">Salary Range</label>
                    <input
                        required
                        type="text"
                        placeholder="$60k - $80k"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium">Location</label>
                    <input
                        required
                        type="text"
                        placeholder="Remote / New York"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium">Notes</label>
                    <textarea
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