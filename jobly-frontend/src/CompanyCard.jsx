import React from "react";
import "./CompanyCard.css"
import { Link } from "react-router-dom";

function CompanyCard({ company }) {
    return (
        <Link to={`/companies/${company.handle}`}>
        <div className="company-card">
            <div className="company-name"><b>{company.name}</b></div>
            <p>{company.description}</p>
        </div>
        </Link>
    )
}

export default CompanyCard;