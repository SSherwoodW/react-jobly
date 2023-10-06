import React from "react";
import "./JobCard.css"

function JobCard({ job }) {
    

    return (
        <div className="job-card" key={job.id}>
            <h6><b>{job.title}</b></h6>
            <h6>{job.companyName}</h6>
            <div>Salary: {job.salary}</div>
            {job.equity ? <div>Equity: {job.equity}</div> : <div>Equity: None</div>}
            
            <button className="apply-btn">Apply</button>
        </div>
    )
}

export default JobCard;