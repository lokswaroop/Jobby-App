import {BsSearch} from 'react-icons/bs'

import ProfileDetails from '../ProfileDetails'
import './index.css'

const FiltersGroup = props => {
  const onChangeSearchInput = event => {
    const {changeSearchInput} = props
    changeSearchInput(event)
  }

  const onEnterSearchInput = event => {
    const {getJobs} = props
    if (event.key === 'Enter') {
      getJobs()
    }
  }
  const renderSearchInput = () => {
    const {getJobs, searchInput} = props
    return (
      <div className="searchInputContainer">
        <input
          type="search"
          value={searchInput}
          placeholder="Search"
          className="searchInput"
          onChange={onChangeSearchInput}
          onKeyDown={onEnterSearchInput}
        />
        <button
          type="button"
          id="searchButton"
          className="searchButton"
          onClick={getJobs}
        >
          <BsSearch />
        </button>
      </div>
    )
  }

  const renderTypeOfEmployment = () => {
    const {employmentTypesList} = props
    return (
      <div className="employmentTypeContainer">
        <h1 className="employmentTypeHeading">Type of Employment</h1>
        <ul className="employeeTypeListContainer">
          {employmentTypesList.map(each => {
            const {changeEmployeeList} = props
            const onSelectEmployeeType = event => {
              changeEmployeeList(event.target.value)
            }
            return (
              <li
                className="employeeItem"
                key={each.employmentTypeId}
                onChange={onSelectEmployeeType}
              >
                <input
                  type="checkbox"
                  id={each.employmentTypeId}
                  className="checkInput"
                  value={each.employmentTypeId}
                />
                <label className="checkLabel" htmlFor={each.employmentTypeId}>
                  {each.label}
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
      <div className="salaryRangeContainer">
        <h1 className="salaryRangeHeading">Salary Range</h1>
        <ul className="salaryRangeListContainer">
          {salaryRangesList.map(each => {
            const {changeSalary} = props
            const onClickSalary = () => {
              changeSalary(each.salaryRangeId)
            }
            return (
              <li
                className="salaryItem"
                key={each.salaryRangeId}
                onClick={onClickSalary}
              >
                <input
                  type="radio"
                  id={each.salaryRangeId}
                  name="salary"
                  className="checkInput"
                />
                <label className="checkLabel" htmlFor={each.salaryRangeId}>
                  {each.label}
                </label>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
  return (
    <div className="filtersGroupContainer">
      {renderSearchInput()}
      <ProfileDetails />
      <hr />
      {renderTypeOfEmployment()}
      <hr />
      {renderSalaryRange()}
    </div>
  )
}
export default FiltersGroup
