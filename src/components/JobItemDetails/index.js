import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsFillBriefcaseFill, BsStarFill} from 'react-icons/bs'
import {BiLinkExternal} from 'react-icons/bi'
import {MdLocationOn} from 'react-icons/md'
import Header from '../Header'
import SimilarJobItem from '../SimilarJobItem'
import SkillsCard from '../SkillsCard'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobData: {},
    similarJobsData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobData()
  }

  getFormattedSimilarData = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    location: data.location,
    rating: data.rating,
    title: data.title,
  })

  getFormattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    lifeAtCompany: {
      description: data.life_at_company.description,
      imageUrl: data.life_at_company.image_url,
    },
    location: data.location,
    rating: data.rating,
    title: data.title,
    packagePerAnnum: data.package_per_annum,
    skills: data.skills.map(eachSkill => ({
      imageUrl: eachSkill.image_url,
      name: eachSkill.name,
    })),
  })

  getJobData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = this.getFormattedData(data.job_details)
      const updatedSimilarJobsData = data.similar_jobs.map(eachSimilarJob =>
        this.getFormattedSimilarData(eachSimilarJob),
      )
      console.log(updatedData)
      console.log(updatedSimilarJobsData)
      this.setState({
        jobData: updatedData,
        similarJobsData: updatedSimilarJobsData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoading = () => (
    <div className="job-item-loader-container" id="loader" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailure = () => {
    const {match} = this.props
    const {params} = match
    console.log(params)
    return (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="jobItemFailureImage"
        />
        <h1>Oops! Something Went Wrong</h1>
        <p>We cannot seem to find the page you are looking for</p>
        <button
          type="button"
          id="button"
          className="jobItemFailureButton"
          onClick={this.getJobData}
        >
          Retry
        </button>
      </div>
    )
  }

  renderJobDetails = () => {
    const {jobData, similarJobsData} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      lifeAtCompany,
      skills,
    } = jobData
    const {description, imageUrl} = lifeAtCompany
    return (
      <div className="jobDetailsViewContainer">
        <div className="jobItem">
          <div className="logoTitleLocationContainer">
            <div className="logoTitleContainer">
              <img
                src={companyLogoUrl}
                alt="job details company logo"
                className="companyLogo"
              />
              <div>
                <h1 className="titleHeading">{title}</h1>
                <div className="ratingContainer">
                  <BsStarFill className="ratingIcon" />
                  <p className="ratingPara">{rating}</p>
                </div>
              </div>
            </div>
            <div className="locationPackageContainer">
              <div className="locationEmployeeContainer">
                <div className="locationContainer">
                  <MdLocationOn className="locationIcon" />
                  <p className="locationPara">{location}</p>
                </div>
                <div className="employeeTypeContainer">
                  <BsFillBriefcaseFill className="briefCaseIcon" />
                  <p className="employeeTypePara">{employmentType}</p>
                </div>
              </div>
              <p className="packagePara">{packagePerAnnum}</p>
            </div>
          </div>
          <hr />
          <div className="descriptionVisitContainer">
            <h1 className="descriptionHeading">Description</h1>
            <div className="visitContainer">
              <a href={companyWebsiteUrl} className="visitHeading">
                Visit
              </a>
              <BiLinkExternal className="visitIcon" />
            </div>
          </div>
          <p className="descriptionPara">{jobDescription}</p>
          <h1 className="descriptionHeading">Skills</h1>
          <ul className="skillsListContainer">
            {skills.map(each => (
              <SkillsCard skillDetails={each} key={each.name} />
            ))}
          </ul>
          <h1 className="descriptionHeading">Life at Company</h1>
          <div className="descriptionAndImageContainer">
            <p className="descriptionPara">{description}</p>
            <img
              src={imageUrl}
              alt="life at company"
              className="lifeAtCompanyImage"
            />
          </div>
        </div>
        <h1 className="similarJobsHeading">Similar Jobs</h1>
        <ul className="similarJobsList">
          {similarJobsData.map(each => (
            <SimilarJobItem jobDetails={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  jobDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetails()
      case apiStatusConstants.failure:
        return this.renderFailure()
      case apiStatusConstants.inProgress:
        return this.renderLoading()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div>{this.jobDetails()}</div>
      </>
    )
  }
}
export default JobItemDetails
