import {BsFillBriefcaseFill, BsStarFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const SimilarJobItem = props => {
  const {similarJobsData} = props
  const {
    companyLogo,

    employmentType,

    jobDescription,

    location,

    rating,

    title,
  } = similarJobsData
  return (
    <li className="similar-job-item-1">
      <div className="item-card">
        <div className="header-con">
          <img
            src={companyLogo}
            alt="similar job company logo"
            className="sim-img"
          />
          <div className="title-rating-con">
            <h1 className="title">{title}</h1>
            <div className="rating-con">
              <BsStarFill className="start-icon" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <h1 className="Description">Description</h1>
        <p className="Description-para">{jobDescription}</p>
        <div className="middle-con">
          <div className="icon-con">
            <MdLocationOn className="icon" />
            <p className="location">{location}</p>
          </div>
          <div className="icon-con">
            <BsFillBriefcaseFill className="icon" />
            <p className="employee-type">{employmentType}</p>
          </div>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobItem
