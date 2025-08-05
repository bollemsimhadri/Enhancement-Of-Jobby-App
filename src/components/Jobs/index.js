import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'

import JobCard from '../JobCard'
import Header from '../Header'
import FiltersGroup from '../FiltersGroup'
import './index.css'

const apiStatusContent = {
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

const noJobs = 'https://assets.ccbp.in/frontend/react-js/no-jobs-img.png'

class Jobs extends Component {
  state = {
    jobsList: [],
    employeeType: [],
    apistatus: apiStatusContent.initial,
    searchInput: '',
    minimumSalary: 0,
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({
      apistatus: apiStatusContent.inProgress,
    })
    const {searchInput, minimumSalary, employeeType} = this.state

    const url = `https://apis.ccbp.in/jobs?employment_type=${employeeType.join(
      ',',
    )}&search=${searchInput}&minimum_package=${minimumSalary}`

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const newjobdata = data.jobs.map(item => ({
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
        jobsList: newjobdata,
        apistatus: apiStatusContent.success,
      })
    } else {
      this.setState({
        apistatus: apiStatusContent.failure,
      })
    }
  }

  renderJobsSuccess = () => {
    const {jobsList} = this.state
    const nojobs = jobsList.length > 0

    return nojobs ? (
      <div>
        <ul>
          {jobsList.map(eachitem => (
            <JobCard key={eachitem.id} eachitem={eachitem} />
          ))}
        </ul>
      </div>
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
      <button
        type="button"
        className="retry-button"
        data-testid="button"
        onClick={this.getJobs}
      >
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

  changeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getJobs()
    }
  }

  changeSalary = salary => {
    this.setState({minimumSalary: salary}, this.getJobs)
  }

  changeEmployeeList = type => {
    this.setState(
      prevState => ({employeeType: [...prevState.employeeType, type]}),
      this.getJobs,
    )
  }

  render() {
    const {searchInput} = this.state
    return (
      <>
        <Header />
        <div className="job-container">
          <div className="job-content">
            <FiltersGroup
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              searchInput={searchInput}
              changeSearchInput={this.changeSearchInput}
              getJobs={this.getJobs}
              changeSalary={this.changeSalary}
              changeEmployeeList={this.changeEmployeeList}
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
                  <BsSearch size="30" className="search-icon" />
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
