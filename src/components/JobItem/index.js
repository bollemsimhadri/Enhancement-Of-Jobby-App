import {FaRegStar} from 'react-icons/fa'
import {IoLocationOutline} from 'react-icons/io5'
import {BsBriefcase} from 'react-icons/bs'

import './index.css'

const JobItem = props => {
  const {jobDataDetails} = props
  const {
    companyLogo,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDataDetails
  return (
    <div>
      <div className="item-card">
        <div className="header-con">
          <img src={companyLogo} alt={companyLogo} className="logo" />
          <div className="title-rating-con">
            <p className="title">{title}</p>
            <div className="rating-con">
              <FaRegStar className="start-icon" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="middle-con">
          <div>
            <div className="icon-con">
              <IoLocationOutline className="icon" />
              <p className="location">{location}</p>
            </div>
            <div className="icon-con">
              <BsBriefcase className="icon" />
              <p className="employee-type">{employmentType}</p>
            </div>
          </div>
          <p className="package">{packagePerAnnum}</p>
        </div>
        <hr className="line" />
        <div className="Description-con">
          <h1 className="Description">Description</h1>
          <p className="Description-para">{jobDescription}</p>
        </div>
      </div>
    </div>
  )
}

export default JobItem
