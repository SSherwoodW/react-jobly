import { useEffect, useState } from "react";
import JoblyApi from "../../api";
import JobCard from "./JobCard";
import "./JobsList.css"


function JobsList({ applyToJob }) {
    const [jobs, setJobs] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [appliedStatus, setAppliedStatus] = useState(false)

    useEffect(() => {
        async function getJobs() {
            const jobsResult = await JoblyApi.getJobs();
            setJobs(jobsResult)
        };
        getJobs();
    }, [])

    let allJobs = jobs.map(job => (
        <JobCard key={job.id} job={job} applyToJob={applyToJob} />
    ))

    const handleChange = (evt) => {
        setSearchTerm(evt.target.value)
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        if (!searchTerm) {
            return null;
        }
        const jobsRes = await JoblyApi.searchJobs(searchTerm)
        setJobs(jobsRes);
    }


    return (
        <div>
            <div className="job-search">
                <form onSubmit={handleSubmit}>
                    <input type="text"
                        name="searchTerm"
                        placeholder="Enter search term"
                        value={searchTerm}
                        onChange={handleChange}
                    />
                    <button className="search-btn" type="submit">Search</button>
                </form>
            </div>
            <div className="jobs-list">
                {allJobs}
            </div>
        </div>
    )
}

export default JobsList;