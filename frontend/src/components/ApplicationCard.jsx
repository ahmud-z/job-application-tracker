import { ChevronDown, MapPin, Calendar, DollarSign, Pencil, Trash2, Briefcase } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router";

const ApplicationCard = ({ application, handleDelete }) => {
    const [isOpen, setIsOpen] = useState(false);

    const statusConfig = {
        rejected: { bg: "bg-red-500/10", text: "text-red-400", border: "border-red-500/20", dot: "bg-red-400", label: "Rejected" },
        interviewing: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20", dot: "bg-amber-400", label: "Interviewing" },
        offered: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20", dot: "bg-emerald-400", label: "Offered" },
        applied: { bg: "bg-sky-500/10", text: "text-sky-400", border: "border-sky-500/20", dot: "bg-sky-400", label: "Applied" },
    };

    const status = statusConfig[application.status] || {
        bg: "bg-zinc-700/30", text: "text-zinc-400", border: "border-zinc-600/20", dot: "bg-zinc-400", label: application.status
    };

    const formatDate = (dateStr) =>
        new Date(dateStr).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

    return (
        <div
            className="group relative rounded-2xl overflow-hidden transition-all duration-300"
            style={{
                background: "linear-gradient(145deg, #18181b, #111113)",
                border: "1px solid rgba(255,255,255,0.06)",
                boxShadow: isOpen
                    ? "0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)"
                    : "0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)",
            }}
        >
            {/* Subtle top highlight line */}
            <div className="absolute top-0 left-6 right-6 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }} />

            {/* Status accent bar */}
            <div
                className="absolute left-0 top-4 bottom-4 w-0.5 rounded-full opacity-60"
                style={{ background: status.dot.includes("red") ? "#f87171" : status.dot.includes("amber") ? "#fbbf24" : status.dot.includes("emerald") ? "#34d399" : "#38bdf8" }}
            />

            <div className="p-5 pl-6">
                {/* Header Row */}
                <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                        {/* Company Icon */}
                        <div className="mt-0.5 flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
                            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                            <Briefcase size={16} className="text-zinc-400" />
                        </div>
                        <div className="min-w-0">
                            <h2 className="text-base font-semibold text-white leading-snug truncate" style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.01em" }}>
                                {application.companyName}
                            </h2>
                            <p className="text-sm text-zinc-500 truncate mt-0.5">{application.role}</p>
                        </div>
                    </div>

                    {/* Toggle Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                        style={{
                            background: isOpen ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.07)",
                            color: "#a1a1aa",
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
                        onMouseLeave={e => e.currentTarget.style.background = isOpen ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)"}
                    >
                        <ChevronDown
                            size={15}
                            style={{
                                transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                                transition: "transform 0.25s ease",
                            }}
                        />
                    </button>
                </div>

                {/* Badges Row */}
                <div className="flex items-center gap-2 mt-4 flex-wrap">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg ${status.bg} ${status.text} border ${status.border}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                        {status.label}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg bg-violet-500/10 text-violet-400 border border-violet-500/20">
                        <DollarSign size={10} strokeWidth={2.5} />
                        {Number(application.salary).toLocaleString()} BDT
                    </span>
                </div>

                {/* Expandable Section */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateRows: isOpen ? "1fr" : "0fr",
                        transition: "grid-template-rows 0.28s ease",
                    }}
                >
                    <div style={{ overflow: "hidden" }}>
                        <div className="pt-4 mt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>

                            {/* Meta Info */}
                            <div className="grid grid-cols-2 gap-3 mb-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
                                        style={{ background: "rgba(255,255,255,0.04)" }}>
                                        <Calendar size={11} className="text-zinc-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-zinc-600 leading-none mb-0.5">Applied</p>
                                        <p className="text-xs text-zinc-300 font-medium">{formatDate(application.appliedDate)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
                                        style={{ background: "rgba(255,255,255,0.04)" }}>
                                        <MapPin size={11} className="text-zinc-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-zinc-600 leading-none mb-0.5">Location</p>
                                        <p className="text-xs text-zinc-300 font-medium truncate">{application.location}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Notes */}
                            {application.notes && (
                                <div className="mb-4 px-3 py-2.5 rounded-xl text-xs text-zinc-400 leading-relaxed"
                                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                                    <span className="text-zinc-600 font-medium">Notes · </span>
                                    {application.notes}
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex gap-2">
                                <Link
                                    to={`/edit-application/${application._id}`}
                                    className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-xl transition-all duration-200"
                                    style={{
                                        background: "rgba(251,191,36,0.1)",
                                        color: "#fbbf24",
                                        border: "1px solid rgba(251,191,36,0.2)",
                                    }}
                                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(251,191,36,0.18)"; e.currentTarget.style.borderColor = "rgba(251,191,36,0.35)"; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(251,191,36,0.1)"; e.currentTarget.style.borderColor = "rgba(251,191,36,0.2)"; }}
                                >
                                    <Pencil size={12} strokeWidth={2.5} />
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(application._id)}
                                    className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-xl transition-all duration-200"
                                    style={{
                                        background: "rgba(239,68,68,0.1)",
                                        color: "#f87171",
                                        border: "1px solid rgba(239,68,68,0.2)",
                                    }}
                                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.18)"; e.currentTarget.style.borderColor = "rgba(239,68,68,0.35)"; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(239,68,68,0.1)"; e.currentTarget.style.borderColor = "rgba(239,68,68,0.2)"; }}
                                >
                                    <Trash2 size={12} strokeWidth={2.5} />
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApplicationCard;