import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiOutlineSearch} from 'react-icons/ai'
import Header from '../Header'
import JobItem from '../JobItem'
import './index.css'

const apiStatusContent = {
  initial: 'INISTIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
const apiJobsStatusContent = {
  initial: 'INISTIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]
const noJobsImage = 'https://assets.ccbp.in/frontend/react-js/no-jobs-img.png'

class AllJobs extends Component {
  state = {
    apiStatus: apiStatusContent.initial,
    apiJobsStatus: apiJobsStatusContent.initial,
    jobsData: [],
    profileData: [],
    checkboxinputs: [],
    searchinput: '',
    radioinput: '',
  }

  componentDidMount() {
    this.getJobsDetails()
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({apiStatus: apiStatusContent.inProgress})
    const jwtToken = Cookies.get('jwt-token')
    const url = 'https://apis.ccbp.in/profile'
    const optionsProfile = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const profileReponse = await fetch(url, optionsProfile)
    if (profileReponse.ok) {
      const profileData = await profileReponse.json()

      const profileItemDetails = profileData.map(item => ({
        name: item.profile_details.name,
        profileImageUrl: item.profile_details.profile_image_url,
        shortBio: item.profile_details.short_bio,
      }))
      this.setState({
        apiStatus: apiStatusContent.success,
        profileData: profileItemDetails,
        responseSuccess: true,
      })
    } else {
      this.setState({
        apiStatus: apiStatusContent.failure,
      })
    }
  }

  reTryProfile = () => {
    this.getProfileDetails()
  }

  renderProfileFailure = () => (
    <div className="failure-btn-con">
      <button type="button" className="failure-btn" onClick={this.reTryProfile}>
        Retry
      </button>
    </div>
  )

  renderProfileSuccess = () => {
    const {profileData, responseSuccess} = this.state

    if (responseSuccess) {
      const {name, shortBio, profileImageUrl} = profileData
      return (
        <div className="profile-con">
          <img src={profileImageUrl} alt="profile" className="profile-icon" />
          <h1 className="profile-name">{name}</h1>
          <p className="profile-bio">{shortBio}</p>
        </div>
      )
    }
    return null
  }

  renderProfileStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusContent.success:
        return this.renderProfileSuccess()
      case apiStatusContent.failure:
        return this.renderProfileFailure()
      case apiStatusContent.inProgress:
        return this.renderJobsLoader()
      default:
        return null
    }
  }

  getJobsDetails = async () => {
    const {searchinput, radioinput, checkboxinputs} = this.state
    const jwtToken = Cookies.get('jwt-token')
    const url = `https://apis.ccbp.in/jobs?minimum_package=${radioinput}&search=${searchinput}&employment_type=${checkboxinputs}`
    const optionsjobs = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const jobsReponse = await fetch(url, optionsjobs)
    if (jobsReponse.ok) {
      const jobsData = await jobsReponse.json()

      const jobItemDetails = jobsData.jobs.map(item => ({
        companyLogo: item.company_logo_url,
        employmentType: item.employment_type,
        id: item.id,
        jobDescription: item.job_description,
        location: item.location,
        packagePerAnnum: item.package_per_annum,
        rating: item.rating,
        title: item.title,
      }))
      this.setState({
        apiStatus: apiJobsStatusContent.success,
        jobsData: jobItemDetails,
      })
    } else {
      this.setState({
        apiStatus: apiJobsStatusContent.failure,
      })
    }
  }

  reTryJobItem = () => {
    this.getJobsDetails()
  }

  renderJobsFailure = () => (
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

  renderJobsLoader = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderJobsSuccess = () => {
    const {jobsData} = this.state
    const nojobs = jobsData.length === 0

    return nojobs ? (
      <div className="no-job-con">
        <img src={noJobsImage} alt="no jobs" className="no-job-img" />
        <h1 className="heading">No jobs found</h1>
        <p className="failure-para">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    ) : (
      <ul>
        {jobsData.map(eachitem => (
          <JobItem key={eachitem.id} jobDataDetails={eachitem} />
        ))}
      </ul>
    )
  }

  renderJobsStatus = () => {
    const {apiJobsStatus} = this.state
    switch (apiJobsStatus) {
      case apiJobsStatusContent.success:
        return this.renderJobsSuccess()
      case apiJobsStatusContent.failure:
        return this.renderJobsFailure()
      case apiJobsStatusContent.inProgress:
        return this.renderJobsLoader()
      default:
        return null
    }
  }

  inputOptions = event => {
    const {checkboxinputs} = this.state
    const inputList = checkboxinputs.filter(
      eachitem => eachitem === event.target.id,
    )

    if (inputList.length === 0) {
      this.setState(
        prevState => ({
          checkboxinputs: [...prevState.checkboxinputs, event.target.id],
        }),
        this.getJobsDetails,
      )
    } else {
      const filterData = checkboxinputs.filter(
        eachitem => eachitem !== event.target.id,
      )
      this.setState({checkboxinputs: filterData}, this.getJobsDetails)
    }
  }

  renderCheckBox = () => (
    <ul className="employee-con">
      {employmentTypesList.map(eachitem => (
        <li className="list-item" key={eachitem.employmentTypeId}>
          <input
            type="checkbox"
            id={eachitem.employmentTypeId}
            className="check-box"
            onClick={this.inputOptions}
          />
          <label className="label" htmlFor={eachitem.employmentTypeId}>
            {eachitem.label}
          </label>
        </li>
      ))}
    </ul>
  )

  radioOptions = event => {
    this.setState({radioinput: event.target.id}, this.getJobsDetails)
  }

  renderRadioBtn = () => (
    <ul className="employee-con">
      {salaryRangesList.map(eachitem => (
        <li className="list-item" key={eachitem.salaryRangeId}>
          <input
            type="radio"
            id={eachitem.salaryRangeId}
            className="check-box"
            onClick={this.radioOptions}
          />
          <label className="label" htmlFor={eachitem.salaryRangeId}>
            {eachitem.label}
          </label>
        </li>
      ))}
    </ul>
  )

  serchInput = event => {
    this.setState({searchinput: event.target.value})
  }

  enterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getJobsDetails()
    }
  }

  submitSearch = () => {
    this.getJobsDetails()
  }

  render() {
    const {searchinput} = this.state
    return (
      <>
        <Header />
        <div className="allJobs-con">
          <div className="SideBar-container">
            {this.renderProfileStatus()}
            <hr className="line" />
            <h1>Type of Employment</h1>
            {this.renderCheckBox()}
            <hr className="line" />
            <h1>Salary Range</h1>
            {this.renderRadioBtn()}
          </div>
          <div className="jobs-container">
            <div>
              <input
                type="search"
                className="search-element"
                placeholder="Search"
                value={searchinput}
                onChange={this.serchInput}
                onKeyDown={this.enterSearchInput}
              />
              <button
                type="button"
                className="btn"
                data-testid="searchButton"
                onClick={this.submitSearch}
              >
                <AiOutlineSearch size="25" />
              </button>
            </div>
            {this.renderJobsStatus()}
          </div>
        </div>
      </>
    )
  }
}
export default AllJobs
