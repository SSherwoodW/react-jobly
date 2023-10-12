import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JobCard from "./JobCard";
import JoblyApi from "../../api";
import "./CompanyDetail.css"

function CompanyDetail() {
    const { handle } = useParams();
    const [company, setCompany] = useState(null)

    useEffect(() => {
        async function getCompany() {
            const companyRes = await JoblyApi.getCompany(handle)
            setCompany(companyRes)
        }
        getCompany();
        console.log(company)
    }, [])


    

    return (
        <div>
            {company ? (
                <div className="company-jobs">
                    <h3 id="company-name">{company.name}</h3>
                    <h5 id="company-desc">{company.description}</h5>
                    <div>
                    {company.jobs.map((job) => (
                        // <div key={job.id}>
                        //     <h6>{job.title}</h6>
                        //     <div>Salary: {job.salary}</div>
                        //     <div>Equity: {job.equity}</div>
                        //     <button className="apply-btn">Apply</button>
                        // </div>
                        <JobCard key={job.id} job={job} />
                    ))}
                    </div>
                </div>
                
            ) : (
                    <p>Loading...</p>
            )}
            
        </div>
    )
    
}

export default CompanyDetail;