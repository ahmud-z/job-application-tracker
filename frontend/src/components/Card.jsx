import React, { useEffect, useState } from "react";
import axios from 'axios';
import {
    MapPin,
    Calendar,
    DollarSign,
    Edit,
    Trash2,
    ChevronDown,
    ChevronUp,
} from "lucide-react";
import { Link } from "react-router";

const Card = () => {

    const [jobs, setJobs] = useState([])

    // get job applications api call
    useEffect(() => {
        axios.get("http://localhost:3000/").then((res) => {
            setJobs(res.data)
        }).catch(err => console.log(err))
    }, [])


    if (!jobs) {
        return (<p>Loading...</p>)
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


    return (
        <div>
            {
                jobs.map((job, idx) => (
                    <div key={idx} className="max-w-6xl mx-auto my-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition">
                        {/* Header */}
                        <div className="flex items-start justify-between">
                            <div>
                                <h1 className="text-xl font-semibold text-gray-800">
                                    {job.position}
                                </h1>
                                <p className="text-sm text-gray-500">{job.company_name}</p>

                                <div className="mt-3 flex gap-3">
                                    <span className="rounded-full bg-amber-100 px-4 py-1 text-sm font-medium text-amber-700">
                                        {job.application_status}
                                    </span>
                                    <span className="rounded-full bg-gray-100 px-4 py-1 text-sm text-gray-600">
                                        {new Date(job.application_date).toLocaleDateString("en-BD")}
                                    </span>
                                </div>
                            </div>

                            <button onClick={() => previewStatusHandler(job.id)} className="rounded-full p-2 hover:bg-gray-100">
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
                                <MapPin className="mt-1 text-gray-400" />
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
