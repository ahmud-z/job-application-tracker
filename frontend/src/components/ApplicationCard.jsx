import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router";

const ApplicationCard = ({ application, handleDelete }) => {
    const [isOpen, setIsOpen] = useState(false);

    const statusColors = {
        rejected: "bg-red-500/10 text-red-300 border border-red-500/30",
        interviewing: "bg-yellow-500/10 text-yellow-300 border border-yellow-500/30",
        offered: "bg-emerald-500/10 text-emerald-300 border border-emerald-500/30",
        applied: "bg-blue-500/10 text-blue-300 border border-blue-500/30",
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric"
        });
    };

    return (
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-xl p-7 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-zinc-700">

            {/* Header */}
            <div className="flex items-start justify-between">
                <div className="space-y-1">
                    <h2 className="text-2xl font-bold text-white tracking-tight">
                        {application.companyName}
                    </h2>
                    <p className="text-lg text-zinc-300 font-medium">
                        {application.role}
                    </p>
                </div>

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="bg-zinc-800 hover:bg-zinc-700 transition rounded-full w-11 h-11 flex items-center justify-center text-zinc-200 border border-zinc-700"
                >
                    {isOpen ? <ChevronUp size={22} /> : <ChevronDown size={22} />}
                </button>
            </div>

            {/* Status + Salary */}
            <div className="flex items-center gap-3 mt-5 flex-wrap">
                <span
                    className={`px-4 py-2 text-base font-semibold rounded-full ${statusColors[application.status] ||
                        "bg-zinc-800 text-zinc-200 border border-zinc-700"
                        }`}
                >
                    {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                </span>

                <span className="px-4 py-2 text-base font-semibold rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30">
                    {new Intl.NumberFormat("en-BD", {
                        style: "currency",
                        currency: "BDT",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                    }).format(application.salary)}
                </span>
            </div>

            {/* Quick Info */}
            <div className="flex items-center gap-6 mt-5 text-base text-zinc-300">

                <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {application.location}
                </span>

                <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Applied: {formatDate(application.appliedDate)}
                </span>
            </div>

            {/* Expanded Section */}
            {isOpen && (
                <div className="mt-6 pt-6 border-t border-zinc-800 space-y-5">

                    {/* Details */}
                    <div className="grid grid-cols-2 gap-4 text-base">
                        <div className="bg-zinc-800/40 rounded-lg p-4">
                            <p className="text-zinc-400 text-sm mb-1">Application Date</p>
                            <p className="text-zinc-100 font-medium">
                                {formatDate(application.appliedDate)}
                            </p>
                        </div>

                        <div className="bg-zinc-800/40 rounded-lg p-4">
                            <p className="text-zinc-400 text-sm mb-1">Location</p>
                            <p className="text-zinc-100 font-medium">
                                {application.location}
                            </p>
                        </div>
                    </div>

                    {/* Notes */}
                    {application.notes && (
                        <div className="bg-zinc-800/40 rounded-lg p-4">
                            <p className="text-zinc-400 text-sm mb-2">Notes</p>
                            <p className="text-zinc-200 text-base leading-relaxed">
                                {application.notes}
                            </p>
                        </div>
                    )}

                    {/* Buttons */}
                    <div className="flex gap-3 pt-2">
                        <Link
                            to={`/edit-application/${application._id}`}
                            className="flex-1 px-4 py-3 text-base font-semibold rounded-lg bg-yellow-400 hover:bg-yellow-500 transition text-black text-center shadow-lg shadow-yellow-500/20"
                        >
                            Edit Application
                        </Link>

                        <button
                            onClick={() => handleDelete(application._id)}
                            className="flex-1 px-4 py-3 text-base font-semibold rounded-lg bg-red-600 hover:bg-red-700 transition text-white cursor-pointer border border-red-500/30"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ApplicationCard;