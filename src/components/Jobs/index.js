import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'

import JobCard from '../JobCard'
import Header from '../Header'
import FiltersGroup from '../FiltersGroup'
import './index.css'

const apiStatusContent = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const employmentTypesList = [
  {label: 'Full Time', employmentTypeId: 'FULLTIME'},
  {label: 'Part Time', employmentTypeId: 'PARTTIME'},
  {label: 'Freelance', employmentTypeId: 'FREELANCE'},
  {label: 'Internship', employmentTypeId: 'INTERNSHIP'},
]

const salaryRangesList = [
  {salaryRangeId: '1000000', label: '10 LPA and above'},
  {salaryRangeId: '2000000', label: '20 LPA and above'},
  {salaryRangeId: '3000000', label: '30 LPA and above'},
  {salaryRangeId: '4000000', label: '40 LPA and above'},
]

const locationList = [
  {cityId: 'Hyderabad', label: 'Hyderabad'},
  {cityId: 'Bangalore', label: 'Bangalore'},
  {cityId: 'Chennai', label: 'Chennai'},
  {cityId: 'Delhi', label: 'Delhi'},
  {cityId: 'Mumbai', label: 'Mumbai'},
]

const noJobs = 'https://assets.ccbp.in/frontend/react-js/no-jobs-img.png'

class Jobs extends Component {
  state = {
    jobsList: [],
    employeeType: [],
    locationType: [],
    apistatus: apiStatusContent.initial,
    searchInput: '',
    minimumSalary: '',
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({apistatus: apiStatusContent.inProgress})

    const {searchInput, minimumSalary, employeeType} = this.state

    const url = `https://apis.ccbp.in/jobs?employment_type=${employeeType.join(
      ',',
    )}&search=${searchInput}&minimum_package=${minimumSalary}`

    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const formattedJobs = data.jobs.map(job => ({
        companyLogo: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDescription: job.job_description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }))
      this.setState({
        jobsList: formattedJobs,
        apistatus: apiStatusContent.success,
      })
    } else {
      this.setState({apistatus: apiStatusContent.failure})
    }
  }

  changeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') this.getJobs()
  }

  changeSalary = salary => {
    this.setState({minimumSalary: salary}, this.getJobs)
  }

  changeEmployeeList = type => {
    this.setState(prevState => {
      const updated = prevState.employeeType.includes(type)
        ? prevState.employeeType.filter(t => t !== type)
        : [...prevState.employeeType, type]
      return {employeeType: updated}
    }, this.getJobs)
  }

  changeLocationList = city => {
    this.setState(prevState => {
      const updated = prevState.locationType.includes(city)
        ? prevState.locationType.filter(c => c !== city)
        : [...prevState.locationType, city]
      return {locationType: updated}
    }, this.getJobs)
  }

  renderJobsSuccess = () => {
    const {jobsList, locationType} = this.state

    const filteredJobs =
      locationType.length === 0
        ? jobsList
        : jobsList.filter(job => locationType.includes(job.location))

    return filteredJobs.length > 0 ? (
      <ul>
        {filteredJobs.map(job => (
          <JobCard key={job.id} eachitem={job} />
        ))}
      </ul>
    ) : (
      <div className="no-job-con">
        <img src={noJobs} alt="no jobs" className="no-job-img" />
        <h1 className="heading">No jobs found</h1>
        <p className="failure-para">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  renderFailure = () => (
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
      <button type="button" className="retry-button" onClick={this.getJobs}>
        Retry
      </button>
    </div>
  )

  renderLoader = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderAllJobs = () => {
    const {apistatus} = this.state
    switch (apistatus) {
      case apiStatusContent.success:
        return this.renderJobsSuccess()
      case apiStatusContent.failure:
        return this.renderFailure()
      case apiStatusContent.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    const {searchInput, locationType, employeeType} = this.state
    return (
      <>
        <Header />
        <div className="job-container">
          <div className="job-content">
            <FiltersGroup
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              locationList={locationList}
              searchInput={searchInput}
              changeSearchInput={this.changeSearchInput}
              getJobs={this.getJobs}
              changeSalary={this.changeSalary}
              changeEmployeeList={this.changeEmployeeList}
              changeLocationList={this.changeLocationList}
              locationType={locationType}
              employeeType={employeeType}
            />
            <div className="search-jobs-con">
              <div className="search-con">
                <input
                  type="search"
                  className="search-element"
                  placeholder="Search"
                  onChange={this.changeSearchInput}
                  onKeyDown={this.onEnterSearchInput}
                />
                <button
                  type="button"
                  className="btn"
                  data-testid="searchButton"
                  onClick={this.getJobs}
                >
                  <BsSearch size={260} style={{color: 'yellow'}} />
                </button>
              </div>
              {this.renderAllJobs()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
