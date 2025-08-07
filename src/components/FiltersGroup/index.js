import {BsSearch} from 'react-icons/bs'
import ProfileDetails from '../ProfileDetails'
import './index.css'

const FilterGroup = props => {
  const {
    searchInput,
    changeSearchInput,
    getJobs,
    employmentTypesList,
    salaryRangesList,
    changeSalary,
    changeEmployeeList,
    employeeType,
  } = props

  const onSearchInputChange = event => {
    changeSearchInput(event)
  }

  const onEnterSearch = event => {
    if (event.key === 'Enter') {
      getJobs()
    }
  }

  const onEmployeeTypeChange = event => {
    changeEmployeeList(event.target.value)
  }

  const renderSearchInput = () => (
    <div className="input-search-con">
      <input
        type="search"
        className="search-element"
        placeholder="Search"
        value={searchInput}
        onChange={onSearchInputChange}
        onKeyDown={onEnterSearch}
      />
      <button
        type="button"
        className="btn"
        data-testid="searchButton"
        onClick={getJobs}
      >
        <BsSearch size="25" className="search-icon" />
      </button>
    </div>
  )

  const renderEmploymentTypes = () => (
    <div className="salary-con">
      <h1 className="heading">Type of Employment</h1>
      <ul className="salary-list-con">
        {employmentTypesList.map(item => (
          <li className="list-item" key={item.employmentTypeId}>
            <input
              type="checkbox"
              id={item.employmentTypeId}
              value={item.employmentTypeId}
              className="check-box"
              onChange={onEmployeeTypeChange}
              checked={employeeType.includes(item.employmentTypeId)}
            />
            <label className="label" htmlFor={item.employmentTypeId}>
              {item.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  const renderLocation = () => {
    const {locationList, changeLocationList, locationType} = props

    const onLocationChange = event => {
      changeLocationList(event.target.value)
    }

    return (
      <div className="salary-con">
        <h1 className="heading">Location</h1>
        <ul className="salary-list-con">
          {locationList.map(eachitem => (
            <li className="list-item" key={eachitem.cityId}>
              <input
                type="checkbox"
                id={eachitem.cityId}
                value={eachitem.cityId}
                className="check-box"
                onChange={onLocationChange}
                checked={locationType.includes(eachitem.cityId)}
              />
              <label className="label" htmlFor={eachitem.cityId}>
                {eachitem.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  const renderSalaryRange = () => (
    <div className="salary-con">
      <h1 className="heading">Salary Range</h1>
      <ul className="salary-list-con">
        {salaryRangesList.map(item => (
          <li className="list-item" key={item.salaryRangeId}>
            <input
              type="radio"
              id={item.salaryRangeId}
              name="salary"
              className="check-box"
              onChange={() => changeSalary(item.salaryRangeId)}
            />
            <label className="label" htmlFor={item.salaryRangeId}>
              {item.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <div className="FilterGroup-container">
      {renderSearchInput()}
      <ProfileDetails />
      <hr className="line" />
      {renderEmploymentTypes()}
      <hr className="line" />
      {renderSalaryRange()}
      <hr className="line" />
      {renderLocation()}
    </div>
  )
}

export default FilterGroup
