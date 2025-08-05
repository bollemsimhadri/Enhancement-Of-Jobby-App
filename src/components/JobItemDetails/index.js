import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import {MdLocationOn} from 'react-icons/md'
import {BiLinkExternal} from 'react-icons/bi'
import {BsFillBriefcaseFill, BsStarFill} from 'react-icons/bs'

import Header from '../Header'
import SkillsCard from '../SkillsCard'

import SimilarJobItem from '../SimilarJobItem'

import './index.css'

const statusForJobs = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADER',
}

class JobItemDetails extends Component {
  state = {
    statusForJobsSession: statusForJobs.initial,
    jobData: {},
    similarJobs: [],
  }

  componentDidMount() {
    this.dataForEachJobFinding()
  }

  getFormatedData = fetchingInJson => ({
    companyLogo: fetchingInJson.company_logo_url,
    companyWebSiteUrl: fetchingInJson.company_website_url,
    employmentType: fetchingInJson.employment_type,
    id: fetchingInJson.id,
    jobDescription: fetchingInJson.job_description,
    lifeAtCompany: {
      description: fetchingInJson.life_at_company.description,
      imageUrl: fetchingInJson.life_at_company.image_url,
    },
    location: fetchingInJson.location,
    packagePerAnnum: fetchingInJson.package_per_annum,
    rating: fetchingInJson.rating,
    title: fetchingInJson.title,
    skills: fetchingInJson.skills.map(eachSkill => ({
      imageUrl: eachSkill.image_url,
      name: eachSkill.name,
    })),
  })

  getFormatedSimilarData = fetchingInJson => ({
    companyLogo: fetchingInJson.company_logo_url,
    employmentType: fetchingInJson.employment_type,
    id: fetchingInJson.id,
    jobDescription: fetchingInJson.job_description,
    location: fetchingInJson.location,
    rating: fetchingInJson.rating,
    title: fetchingInJson.title,
  })

  dataForEachJobFinding = async () => {
    this.setState({statusForJobsSession: statusForJobs.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    const jwtToken = Cookies.get('jwt_token')
    const urlData = `https://apis.ccbp.in/jobs/${id}`

    console.log(urlData)
    const optionsJobs = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const fetchingJobs = await fetch(urlData, optionsJobs)
    console.log(fetchingJobs)

    if (fetchingJobs.ok) {
      const fetchingInJson = await fetchingJobs.json()
      console.log(fetchingInJson)

      const updatedData = this.getFormatedData(fetchingInJson.job_details)
      const updatedSimilarData = fetchingInJson.similar_jobs.map(eachitem =>
        this.getFormatedSimilarData(eachitem),
      )

      this.setState({
        jobData: updatedData,
        similarJobs: updatedSimilarData,
        statusForJobsSession: statusForJobs.success,
      })
    } else {
      this.setState({statusForJobsSession: statusForJobs.failure})
    }
  }

  failureViewJobs = () => (
    <div className="failure-container-2">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img-2"
      />
      <h1 className="failure-heading-2">Oops! Something Went Wrong</h1>
      <p className="failure-para-2">
        We cannot seem to find the page you are looking for
      </p>
      <button
        onClick={this.dataForEachJobFinding}
        type="button"
        className="failure-btn-2"
      >
        Retry
      </button>
    </div>
  )

  loaderViewJobs = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  successViewJobs = () => {
    const {jobData, similarJobs} = this.state
    const {
      companyLogo,
      companyWebSiteUrl,
      employmentType,
      jobDescription,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      title,
      skills,
    } = jobData
    const {description} = lifeAtCompany

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
                  <BsStarFill className="star-icon" />
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
                  <BsFillBriefcaseFill className="location-icon" />
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
                Visit
              </a>
              <BiLinkExternal className="location-icon" />
            </div>
          </div>
          <p className="description-para">{jobDescription}</p>

          <ul className="ul-jobDetails-container">
            <h1 className="simila-jobs-heading">Skills</h1>
            {skills.length > 0 ? (
              skills.map(eachitem => (
                <SkillsCard skillDetails={eachitem} key={eachitem.name} />
              ))
            ) : (
              <p>No skills available</p>
            )}
          </ul>

          <div className="company-life-img-container">
            <div className="company-life-heading">
              <h1>Life at Company</h1>
              <p>{description}</p>
            </div>
            <img src={lifeAtCompany.imageUrl} alt="life at company" />
          </div>
        </div>
        <div className="similar-job-div">
          <ul className="similar-jobs-container">
            <h1 className="simila-jobs-heading">Similar Jobs</h1>
            {similarJobs.length > 0 ? (
              similarJobs.map(eachitem => (
                <SimilarJobItem key={eachitem.id} similarJobsData={eachitem} />
              ))
            ) : (
              <p>No similar jobs available</p>
            )}
          </ul>
        </div>
      </>
    )
  }

  conditionCheckingForJobs = () => {
    const {statusForJobsSession} = this.state

    switch (statusForJobsSession) {
      case statusForJobs.success:
        return this.successViewJobs()
      case statusForJobs.failure:
        return this.failureViewJobs()
      case statusForJobs.loading:
        return this.loaderViewJobs()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bgJobItemDetail">
        <Header />
        {this.conditionCheckingForJobs()}
      </div>
    )
  }
}
export default JobItemDetails
