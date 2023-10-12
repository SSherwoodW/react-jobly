import { useState, useEffect } from "react";
import JoblyApi from "../../api";
import CompanyCard from "./CompanyCard";
import "./CompanyList.css"


function CompanyList() {
    const [companies, setCompanies] = useState([])
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        async function getCompanies() {
            const companiesResult = await JoblyApi.getCompanies();
            setCompanies(companiesResult);
            console.log(companies)
        };
        getCompanies();
    }, [])
    
    let allCompanies = companies.map(company => (
        <CompanyCard key={company.handle} company={company} />
    ))

    const handleChange = (evt) => {
        setSearchTerm(evt.target.value)
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        if (!searchTerm) {
            return null;
        }
        const companiesRes = await JoblyApi.searchCompanies(searchTerm)
        setCompanies(companiesRes);
    }

    return (
        <div>
            <div className="company-search">
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
            <div className="company-list">
            {allCompanies}
            </div>
        </div>
    )
}

export default CompanyList;