import React, { use, useEffect, useState } from "react";
import axios from 'axios';
import {
    MapPin,
    Calendar,
    DollarSign,
    Edit,
    Trash2,
    ChevronDown,
    ChevronUp,
    NotebookPen,
    Search
} from "lucide-react";
import { data, Link } from "react-router";

const Card = () => {

    const [jobs, setJobs] = useState([])
    const [allJobs, setAllJobs] = useState([])

    // get job applications api call

    useEffect(() => {
        axios.get("http://localhost:3000/")
            .then(res => {
                const data = res.data

                // default: All + A–Z
                const sorted = [...data].sort((a, b) =>
                    a.company_name.localeCompare(b.company_name)
                )

                setAllJobs(data)
                setJobs(sorted)
            })
    }, [])


    if (jobs.length === 0) {
        return <p>Loading...</p>;
    }

    const previewStatusHandler = (id) => {
        setJobs((prevJobs) =>
            prevJobs.map((job) =>
                job.id === id ? { ...job, previewStatus: !job.previewStatus } : { ...job, previewStatus: false }
            )
        )
    }

    // delete job applications api call
    const deleteHandler = (id) => {
        axios.delete(`http://localhost:3000/api/applications/${id}`).then((res) => {
            console.log("res from delele axios: ", res)
            location.reload();
        }).catch((err) => {
            console.log("err from delele axios: ", err)
        })
    }


    const sortHandler = (sortType) => {
        if (sortType === "a-z") {
            const sortedJobs = [...jobs].sort((a, b) =>
                a.company_name.localeCompare(b.company_name)
            );
            setJobs(sortedJobs);
        } else {
            const sortedJobs = [...jobs].sort(
                (a, b) =>
                    Date.parse(b.application_date) -
                    Date.parse(a.application_date)
            );
            setJobs(sortedJobs);
        }
    };

    const filterHandler = (status) => {

        if (status === "All") {
            setJobs(allJobs);
            return;
        }

        const filteredJobs = [...allJobs].filter((job) => job.application_status === status);
        setJobs(filteredJobs);
    }


    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex flex-col space-y-4 py-8">
                <div>
                    <h1 className="text-3xl font-medium">Job Application Counts by Status</h1>
                </div>
                <div className="flex justify-between gap-4">
                    <div className="bg-emerald-200/10 py-10 w-full border-2 border-green-400/40 rounded-2xl text-center space-y-2">
                        <p className="text-4xl font-bold">5</p>
                        <p className="text-xl font-medium text-green-500">Accepted</p>
                    </div>
                    <div className="bg-emerald-200/10 py-10 w-full border-2 border-green-400/40 rounded-2xl text-center space-y-2">
                        <p className="text-4xl font-bold">5</p>
                        <p className="text-xl font-medium text-green-500">Accepted</p>
                    </div>
                    <div className="bg-emerald-200/10 py-10 w-full border-2 border-green-400/40 rounded-2xl text-center space-y-2">
                        <p className="text-4xl font-bold">5</p>
                        <p className="text-xl font-medium text-green-500">Accepted</p>
                    </div>
                    <div className="bg-emerald-200/10 py-10 w-full border-2 border-green-400/40 rounded-2xl text-center space-y-2">
                        <p className="text-4xl font-bold">5</p>
                        <p className="text-xl font-medium text-green-500">Accepted</p>
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute top-1/2 left-3 -translate-y-1/2">
                        <Search className="text-gray-600" />
                    </div>
                    <input type="text" placeholder="Search by Company or Status" className="border-2 border-gray-400 placeholder:text-lg placeholder:font-medium rounded-xl w-full py-4 px-10" />
                </div>


                <div className="flex space-x-8">
                    <div className="">
                        <select onChange={(e) => filterHandler(e.target.value)} name="" id="" className="border py-2 px-4 rounded">
                            <option value="All">All Status</option>
                            <option value="Applied">Applied</option>
                            <option value="Accepted">Accepted</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Interview">Interviewing</option>
                        </select>
                    </div>

                    <div className="">
                        <select onChange={(e) => sortHandler(e.target.value)} name="" id="" className="border py-2 px-4 rounded">
                            <option value="a-z">Sort: A-Z</option>
                            <option value="by-date">Sort: Latest First</option>
                        </select>
                    </div>
                </div>
            </div>

            {
                jobs.map((job, idx) => (
                    <div key={idx} onClick={() => previewStatusHandler(job.id)} className="mx-auto mb-5 rounded-2xl border-2 border-gray-200 hover:border-violet-200 bg-white p-6 hover:shadow-md transition">
                        {/* Header */}
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-xl font-semibold text-gray-800">
                                    {job.position}
                                </h1>
                                <p className="text-sm text-gray-500">{job.company_name}</p>

                                <div className="mt-3 flex gap-3">
                                    <span className={`rounded-full px-4 py-1 text-sm font-medium
                                         ${job.application_status === "Accepted" ? "bg-emerald-200/30 border border-green-400/30 text-green-500"
                                            : job.application_status === "Rejected" ? "bg-red-200/30 border border-red-400/30 text-red-500"
                                                : job.application_status === "Applied" ? "bg-blue-200/30 border border-blue-400/30 text-blue-500"
                                                    : "bg-violet-200/30 border border-violet-400/30 text-violet-500"}`}>
                                        {job.application_status}
                                    </span>
                                    <span className="rounded-full bg-gray-100 px-4 py-1 text-sm text-gray-600">
                                        {new Date(job.application_date).toLocaleDateString("en-BD")}
                                    </span>
                                </div>
                            </div>

                            <button className="rounded-full p-2 hover:bg-gray-100 cursor-pointer">
                                {job.previewStatus ? <ChevronUp /> : <ChevronDown />}
                            </button>
                        </div>

                        {job.previewStatus && <div>
                            <hr className="my-6 border-gray-200" />
                            {/* Info Grid */}
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <InfoItem icon={<MapPin />} label="Location" value={job.location} />
                                <InfoItem
                                    icon={<DollarSign />}
                                    label="Salary Range"
                                    value={job.salary_range}
                                />
                                <InfoItem
                                    icon={<Calendar />}
                                    label="Applied"
                                    value={new Date(job.application_date).toLocaleDateString("en-BD")}
                                />
                                <InfoItem
                                    icon={<Calendar />}
                                    label="Last Updated"
                                    value={new Date(job.updated_at).toLocaleDateString("en-BD")}
                                />
                            </div>

                            <hr className="my-6 border-gray-200" />

                            {/* Notes */}
                            <div className="flex gap-3">
                                <NotebookPen className="mt-1 text-gray-400" />
                                <div>
                                    <p className="text-sm font-semibold text-gray-600">NOTES</p>
                                    <p className="mt-1 rounded-xl bg-gray-50 p-4 text-sm text-gray-700">
                                        {job.notes}
                                    </p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="mt-6 flex gap-4">
                                <Link to={`/edit-application/${job.id}`} className="flex items-center gap-2 rounded-full bg-violet-500 px-6 py-2 text-white hover:bg-violet-600">
                                    <Edit size={18} /> Edit
                                </Link>
                                <button onClick={() => deleteHandler(job.id)} className="flex items-center gap-2 rounded-full bg-red-500 px-6 py-2 text-white hover:bg-red-600">
                                    <Trash2 size={18} /> Delete
                                </button>
                            </div>


                        </div>}

                    </div>
                ))
            }
        </div>
    );
};

const InfoItem = ({ icon, label, value }) => (
    <div className="flex gap-3">
        <div className="text-gray-400">{icon}</div>
        <div>
            <p className="text-sm text-gray-500">{label}</p>
            <p className="font-medium text-gray-800">{value}</p>
        </div>
    </div>
);

export default Card;
