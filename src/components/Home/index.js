import {Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="homeContainer">
      <div className="homeContent">
        <h1 className="homeHeading">Find the job That Fits Your Life</h1>
        <p className="homePara">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <Link to="/jobs">
          <button type="button" className="findJobsButton">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </>
)
export default Home
