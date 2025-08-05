import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import './index.css'

const apiStatusContent = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProfileCard extends Component {
  state = {
    profileData: {},
    apiStatus: apiStatusContent.initial, // Separate API status for profile
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({apiStatus: apiStatusContent.inProgress}) // Use separate API status
    const token = Cookies.get('jwt_token') // Fix token key to match what's used in Jobs
    const url = 'https://apis.ccbp.in/profile'

    const optionsProfile = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    try {
      const profileResponse = await fetch(url, optionsProfile)

      if (profileResponse.ok) {
        const newProfileData = await profileResponse.json()
        const profileItemDetails = {
          name: newProfileData.profile_details.name,
          profileImageUrl: newProfileData.profile_details.profile_image_url,
          shortBio: newProfileData.profile_details.short_bio,
        }

        this.setState({
          apiStatus: apiStatusContent.success,
          profileData: profileItemDetails,
        })
      } else {
        this.setState({
          apiStatus: apiStatusContent.failure,
        })
      }
    } catch (error) {
      this.setState({
        apiStatus: apiStatusContent.failure,
      })
    }
  }

  renderProfileSuccess = () => {
    const {profileData} = this.state
    const {name, shortBio, profileImageUrl} = profileData
    return (
      <div className="profile-con">
        <img src={profileImageUrl} alt="profile" className="profile-icon" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  renderProfileFailure = () => (
    <div className="failure-btn-con">
      <button
        type="button"
        data-testid="button"
        className="failure-btn"
        onClick={this.getProfileDetails}
      >
        Retry
      </button>
    </div>
  )

  renderJobsLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
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
}

export default ProfileCard
