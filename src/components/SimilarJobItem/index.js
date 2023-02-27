import {BsFillBriefcaseFill, BsStarFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const SimilarJobItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = jobDetails

  return (
    <li className="similarJobItem">
      <div>
        <div>
          <img
            src={companyLogoUrl}
            alt="similar job company logo"
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
        <h1 className="descriptionHeading">Description</h1>
        <p className="descriptionPara">{jobDescription}</p>
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
      </div>
    </li>
  )
}
export default SimilarJobItem
