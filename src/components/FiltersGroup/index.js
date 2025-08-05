import {BsSearch} from 'react-icons/bs'

import ProfileDetails from '../ProfileDetails'

import './index.css'

const FilterGroup = props => {
  const searchinput = event => {
    const {changeSearchInput} = props
    changeSearchInput(event)
  }

  const enterSearchInput = event => {
    const {getJobs} = props
    if (event.key === 'Enter') {
      getJobs()
    }
  }

  const renderSearchinput = () => {
    const {searchInput, getJobs} = props
    return (
      <div className="input-search-con">
        <input
          type="search"
          className="search-element"
          placeholder="Search"
          value={searchInput}
          onChange={searchinput}
          onKeyDown={enterSearchInput}
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
  }

  const rendertypeOfEmployee = () => {
    const {employmentTypesList} = props
    return (
      <div className="salary-con">
        <h1 className="heading">Type of Employment</h1>
        <ul className="salary-list-con">
          {employmentTypesList.map(eachitem => {
            const {changeEmployeeList} = props
            const selectEmployeeOptions = event => {
              changeEmployeeList(event.target.value)
            }
            return (
              <li
                className="list-item"
                key={eachitem.employmentTypeId}
                onClick={selectEmployeeOptions}
              >
                <input
                  type="checkbox"
                  id={eachitem.employmentTypeId}
                  value={eachitem.employmentTypeId}
                  className="check-box"
                />
                <label className="label" htmlFor={eachitem.employmentTypeId}>
                  {eachitem.label}
                </label>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  const renderSalaryRange = () => {
    const {salaryRangesList} = props
    return (
      <div className="salary-con">
        <h1 className="heading">Salary Range</h1>
        <ul className="salary-list-con">
          {salaryRangesList.map(eachitem => {
            const {changeSalary} = props
            const radioOptions = () => {
              changeSalary(eachitem.salaryRangeId)
            }
            return (
              <li
                className="list-item"
                key={eachitem.salaryRangeId}
                onClick={radioOptions}
              >
                <input
                  type="radio"
                  id={eachitem.salaryRangeId}
                  name="salary"
                  className="check-box"
                />
                <label className="label" htmlFor={eachitem.salaryRangeId}>
                  {eachitem.label}
                </label>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  return (
    <div className="FilterGroup-container">
      {renderSearchinput()}
      <ProfileDetails className="profile" />
      <hr className="line" />
      {rendertypeOfEmployee()}
      <hr className="line" />
      {renderSalaryRange()}
    </div>
  )
}

export default FilterGroup
