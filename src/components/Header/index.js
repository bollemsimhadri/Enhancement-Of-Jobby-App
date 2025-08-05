import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FiLogOut} from 'react-icons/fi'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const Header = props => {
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="nav-header">
      <div>
        <div className="nav-content">
          <Link to="/">
            <img
              className="website-logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </Link>

          <ul className="nav-menu">
            <li className="item-li">
              <Link to="/" className="nav-link">
                <AiFillHome size="30" />
              </Link>
            </li>
            <li className="item-li">
              <Link to="/jobs" className="nav-link">
                <BsFillBriefcaseFill size="30" />
              </Link>
            </li>
            <li className="item-li">
              <button
                type="button"
                className="logout-desktop-btn"
                onClick={onLogout}
              >
                <FiLogOut size="30" />
              </button>
            </li>
          </ul>
        </div>

        <div className="nav-large-con">
          <Link to="/">
            <img
              className="website-logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </Link>

          <ul className="nav-menu">
            <li className="li-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="li-item">
              <Link to="/jobs" className="nav-link">
                Jobs
              </Link>
            </li>
          </ul>
          <li className="li-item">
            <button
              type="button"
              className="logout-desktop-btn"
              onClick={onLogout}
            >
              Logout
            </button>
          </li>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Header)
