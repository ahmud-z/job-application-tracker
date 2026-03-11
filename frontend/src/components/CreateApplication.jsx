import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { api } from '../services/api';
import { ArrowLeft, Briefcase, Building2, DollarSign, MapPin, Calendar, FileText, File, DockIcon } from 'lucide-react';

const CreateApplication = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const [applicationData, setApplicationData] = useState({
        companyName: "",
        role: "",
        salary: "",
        status: "applied",
        location: "",
        appliedDate: new Date().toISOString().split('T')[0],
        notes: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        const token = localStorage.getItem('token');

        if (!token) {
            setError('Authentication token not found. Please login again.');
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await api.post("/create/job-application", applicationData);
            if (response.status === 200 || response.status === 201) {
                navigate('/dashboard');
            }
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Failed to create application. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const statusOptions = [
        { value: "applied", label: "Applied", color: "blue" },
        { value: "interviewing", label: "Interviewing", color: "yellow" },
        { value: "offered", label: "Offered", color: "green" },
        { value: "rejected", label: "Rejected", color: "red" },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-8 px-4">
            <div className="max-w-3xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Dashboard</span>
                </button>

                {/* Main Form Card */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden">
                    {/* Header */}
                    <h1 className="text-3xl text-center font-bold text-white py-5 bg-gray-500/30">
                        Create New Application
                    </h1>

                    {/* Error Message */}
                    {error && (
                        <div className="mx-8 mt-6 bg-red-500/10 border border-red-500/50 rounded-lg p-4">
                            <p className="text-red-400 text-sm">{error}</p>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Company Name */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                    <Building2 size={16} className="text-blue-400" />
                                    Company Name <span className="text-red-400">*</span>
                                </label>
                                <input
                                    required
                                    value={applicationData.companyName}
                                    type="text"
                                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="e.g. Google, Microsoft, Startup XYZ"
                                    onChange={(e) => setApplicationData({ ...applicationData, companyName: e.target.value })}
                                />
                            </div>

                            {/* Job Role */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                    <Briefcase size={16} className="text-blue-400" />
                                    Job Role <span className="text-red-400">*</span>
                                </label>
                                <input
                                    required
                                    value={applicationData.role}
                                    type="text"
                                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="e.g. Senior Frontend Developer"
                                    onChange={(e) => setApplicationData({ ...applicationData, role: e.target.value })}
                                />
                            </div>

                            {/* Salary */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                    <DollarSign size={16} className="text-blue-400" />
                                    Salary (BDT) <span className="text-red-400">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">৳</span>
                                    <input
                                        required
                                        value={applicationData.salary}
                                        type="number"
                                        min="0"
                                        className="w-full pl-8 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="50000"
                                        onChange={(e) => setApplicationData({ ...applicationData, salary: e.target.value })}
                                    />
                                </div>
                            </div>

                            {/* Status */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                    <FileText size={16} className="text-blue-400" />
                                    Status <span className="text-red-400">*</span>
                                </label>
                                <select
                                    required
                                    value={applicationData.status}
                                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    onChange={(e) => setApplicationData({ ...applicationData, status: e.target.value })}
                                >
                                    {statusOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Location */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                    <MapPin size={16} className="text-blue-400" />
                                    Location <span className="text-red-400">*</span>
                                </label>
                                <input
                                    required
                                    value={applicationData.location}
                                    type="text"
                                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="e.g. Dhaka, Bangladesh (Remote)"
                                    onChange={(e) => setApplicationData({ ...applicationData, location: e.target.value })}
                                />
                            </div>

                            {/* Application Date */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                    <Calendar size={16} className="text-blue-400" />
                                    Application Date <span className="text-red-400">*</span>
                                </label>
                                <input
                                    required
                                    value={applicationData.appliedDate}
                                    type="date"
                                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    onChange={(e) => setApplicationData({ ...applicationData, appliedDate: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                <DockIcon size={16} className="text-blue-400" />
                                CV/Resume
                            </label>

                            <input type="file" className='w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all' />

                        </div> */}

                        {/* Notes */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                <FileText size={16} className="text-blue-400" />
                                Notes
                            </label>
                            <textarea
                                rows="4"
                                value={applicationData.notes}
                                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                                placeholder="Add any additional notes about the application (interview notes, contact person, etc.)"
                                onChange={(e) => setApplicationData({ ...applicationData, notes: e.target.value })}
                            />
                        </div>

                        {/* Form Actions */}
                        <div className="flex gap-4 pt-4">
                            <button
                                type="button"
                                onClick={() => navigate('/dashboard')}
                                className="flex-1 px-6 py-3 border border-gray-600 rounded-lg text-gray-300 font-medium hover:bg-gray-700 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-500/25"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Creating...
                                    </span>
                                ) : 'Create Application'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateApplication;