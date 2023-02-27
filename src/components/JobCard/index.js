import {Link} from 'react-router-dom'
import {BsFillBriefcaseFill, BsStarFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const JobCard = props => {
  const {jobData} = props

  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = jobData

  return (
    <Link to={`/jobs/${id}`}>
      <li className="jobItem">
        <div className="logoTitleLocationContainer">
          <div className="logoTitleContainer">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="companyLogo"
            />
            <div className="titleRatingContainer">
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
        <h1 className="descriptionHeading">Description</h1>
        <p className="descriptionPara">{jobDescription}</p>
      </li>
    </Link>
  )
}
export default JobCard
