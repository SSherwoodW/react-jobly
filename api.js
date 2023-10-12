import axios from "axios";

const BASE_URL = "http://localhost:3001";
// const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

// localStorage.setItem("token", JoblyApi.token);

class JoblyApi {
    // the token for interaction with the API will be stored here.
    static token;

    static async request(endpoint, data = {}, method = "get", token) {
        console.debug("API Call:", endpoint, data, method);

        //there are multiple ways to pass an authorization token, this is how you pass it in the header.
        //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: token || `Bearer ${JoblyApi.token}` };
        const params = method === "get" ? data : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    // Individual API routes

    /** Get details on a company by handle. */

    static async getCompany(handle) {
        let res = await this.request(`companies/${handle}`);
        return res.company;
    }

    static async getCompanies() {
        let res = await this.request(`companies`);
        console.log(res.companies);
        return res.companies;
    }

    static async searchCompanies(term) {
        let res = await this.request(`companies?name=${term}`);
        console.log(res.companies);
        return res.companies;
    }

    static async getJobs() {
        let res = await this.request(`jobs`);
        console.log(res.jobs);
        return res.jobs;
    }

    static async searchJobs(term) {
        let res = await this.request(`jobs?title=${term}`);
        console.log(res.jobs);
        return res.jobs;
    }

    static async signUp(formData) {
        let res = await this.request(`auth/register`, formData, "post");
        JoblyApi.token = res.token;
        console.log(res.token);
        return res;
    }

    static async getUser(username, token) {
        console.log(`inside getUser@api function: ${token}`);
        let res = await this.request(`users/${username}`, {}, "get", token);
        return res;
    }

    static async logIn(formData) {
        let loginRes = await this.request(`auth/token`, formData, "post");
        JoblyApi.token = loginRes.token;
        console.log(`inside logIn @ api function: ${JoblyApi.token}`);
        return loginRes;
    }

    static async apply(username, jobId, token) {
        let applicationRes = await this.request(
            `users/${username}/jobs/${jobId}`,
            {},
            "post",
            token
        );
        return applicationRes;
    }
}

// // for now, put token ("testuser" / "password" on class)
// JoblyApi.token =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//     "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//     "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;
