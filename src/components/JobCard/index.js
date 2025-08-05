// import {Link} from 'react-router-dom'
import {Link} from 'react-router-dom'
import {BsFillBriefcaseFill, BsStarFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'

import './index.css'

const JobCard = props => {
  const {eachitem} = props
  const {
    companyLogo,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = eachitem
  return (
    <Link to={`/jobs/${id}`} className="nav-link">
      <li className="li" key={eachitem.id}>
        <div className="item-card">
          <div className="header-con">
            <img src={companyLogo} alt="company logo" className="logo" />
            <div className="title-rating-con">
              <h1 className="title">{title}</h1>
              <div className="rating-con">
                <BsStarFill className="start-icon" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="middle-con">
            <div>
              <div className="icon-con">
                <MdLocationOn className="icon" />
                <p className="location">{location}</p>
              </div>
              <div className="icon-con">
                <BsFillBriefcaseFill className="icon" />
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
      </li>
    </Link>
  )
}

export default JobCard
