import React, { useContext, useEffect, useState } from "react";
import "./JobCard.css"
import JoblyApi from '../../api';
import UserContext from "./userContext";

function JobCard({ job }) {
    const { currentUser, token, hasAppliedToJob, applyToJob } = useContext(UserContext)
    const [applied, setApplied] = useState()

    useEffect(function updateAppliedStatus() {
        console.debug("JobCard useEffect updateAppliedStatus", "id=", job.id)
        setApplied(hasAppliedToJob(job.id))
  }, [job.id, hasAppliedToJob])
    
    const handleClick = async (evt) => {
        if (hasAppliedToJob(job.id)) return;
        const appRes = await applyToJob(currentUser.user.username, job.id, token);
        setApplied(true)
        return appRes;
    }

    return (
        <div className="job-card" key={job.id}>
            <h6><b>{job.title}</b></h6>
            <h6>{job.companyName}</h6>
            <div>Salary: {job.salary}</div>
            {job.equity ? <div>Equity: {job.equity}</div> : <div>Equity: None</div>}
            <button
          className="apply-btn"
          onClick={handleClick}
          disabled={applied}
        >
          {applied ? "Applied" : "Apply"}
        </button>
        </div>
    )
}

export default JobCard;