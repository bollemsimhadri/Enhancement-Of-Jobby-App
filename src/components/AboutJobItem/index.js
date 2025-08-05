import {Component} from 'react'
import Cookies from 'js-cookie'
import {MdLocationOn} from 'react-icons/md'
import {AiFillStar} from 'react-icons/ai'
import {BiLinkExternal} from 'react-icons/bi'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SimilarJobItem from '../SimilarJobItem'

import './index.css'

const apiStatusContent = {
  initial: 'INISTIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AboutJobItem extends Component {
  state = {
    similarjobsData: [],
    jobDetails: [],
    apiStatus: apiStatusContent.initial,
  }

  componentDidMount() {
    this.getJobData()
  }

  getJobData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({apiStatus: apiStatusContent.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const fetchData = await response.json()
      const updatedData = [fetchData.job_details].map(eachitem => ({
        companyLogo: eachitem.company_logo_url,
        companyWebSiteUrl: eachitem.company_website_url,
        employmentType: eachitem.employment_type,
        id: eachitem.id,
        jobDescription: eachitem.job_description,
        lifeAtCompany: {
          description: eachitem.life_at_company.description,
          imageUrl: eachitem.life_at_company.image_url,
        },
        location: eachitem.location,
        packagePerAnnum: eachitem.package_per_annum,
        rating: eachitem.rating,
        skills: eachitem.skills.map(eachSkill => ({
          imageUrl: eachSkill.image_url,
          name: eachSkill.name,
        })),
        title: eachitem.title,
      }))

      const updatedSimilarJobDetails = fetchData.similar_jobs.map(eachitem => ({
        companyLogo: eachitem.company_logo_url,
        employmentType: eachitem.employment_type,
        id: eachitem.id,
        jobDescription: eachitem.job_description,
        location: eachitem.location,
        rating: eachitem.rating,
        title: eachitem.title,
      }))

      this.setState({
        similarjobsData: updatedSimilarJobDetails,
        jobDetails: updatedData,
        apiStatus: apiStatusContent.success,
      })
    } else {
      this.setState({apiStatus: apiStatusContent.failure})
    }
  }

  renderJobDetailsSuccess = () => {
    const {similarjobsData, jobDetails} = this.state
    if (jobDetails.length >= 1) {
      const {
        companyLogo,
        companyWebSiteUrl,
        employmentType,
        jobDescription,
        lifeAtCompany,
        location,
        packagePerAnnum,
        rating,
        skills,
        title,
      } = jobDetails[0]

      return (
        <>
          <div className="job-item-container">
            <div className="header-part-con">
              <div className="img-title-container">
                <img
                  className="logo"
                  src={companyLogo}
                  alt="job details company logo"
                />
                <div className="title-rating-container">
                  <h1 className="title-heading">{title}</h1>
                  <div className="star-rating-container">
                    <AiFillStar className="star-icon" />
                    <p className="rating-text">{rating}</p>
                  </div>
                </div>
              </div>
              <div className="location-p-container">
                <div className="location-job-container">
                  <div className="location-icon-container">
                    <MdLocationOn className="location-icon" />
                    <p className="location">{location}</p>
                  </div>
                  <div className="employment-type-icon-container">
                    <p className="job-type">{employmentType}</p>
                  </div>
                </div>
                <div className="package-container">
                  <p className="package">{packagePerAnnum}</p>
                </div>
              </div>
            </div>
            <hr className="hr-line" />
            <div className="middle-part-container">
              <div className="description-visit-container">
                <h1 className="description-heading">Description</h1>
                <a className="visit" href={companyWebSiteUrl}>
                  Visit <BiLinkExternal />
                </a>
              </div>
              <p className="description-para">{jobDescription}</p>
            </div>

            <div className="skills" style={{backgroundColor: 'red'}}>
              <h1>Skills</h1>
              <div>
                <ul className="ul-jobDetails-container">
                  {skills.map(eachitem => (
                    <li className="li-container" key={eachitem.name}>
                      <img
                        className="skill-img"
                        src={eachitem.imageUrl}
                        alt={eachitem.name}
                      />
                      <p>{eachitem.name}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="company-life-img-container">
              <div className="company-life-heading">
                <h1>Life at Company</h1>
                <p>{lifeAtCompany.description}</p>
              </div>
              <img src={lifeAtCompany.imageUrl} alt="life at company" />
            </div>
          </div>
          <h1 className="simila-jobs-heading">Similar Jobs</h1>

          <ul className="similar-jobs-container">
            {similarjobsData.map(eachitem => (
              <SimilarJobItem
                key={eachitem.id}
                SimilarJobsData={eachitem}
                employmentType={employmentType}
              />
            ))}
          </ul>
        </>
      )
    }
    return null
  }

  reTryJobItem = () => {
    this.getJobData()
  }

  renderJobFailure = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="img"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-para">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="retry-button"
        data-testid="button"
        onClick={this.reTryJobItem}
      >
        Retry
      </button>
    </div>
  )

  renderJobLoader = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderJobsDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusContent.success:
        return this.renderJobDetailsSuccess()
      case apiStatusContent.failure:
        return this.renderJobFailure()
      case apiStatusContent.inProgress:
        return this.renderJobLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-details-container">{this.renderJobsDetails()}</div>
      </>
    )
  }
}

export default AboutJobItem
