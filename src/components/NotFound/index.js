import Header from '../Header'
import './index.css'

const NotFound = () => (
  <>
    <Header />
    <div className="failure-con">
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
        className="img"
      />
      <h1 className="heading">Page Not Found</h1>
      <p className="notfound-para">
        We are sorry, the page you requested could not be found
      </p>
    </div>
  </>
)

export default NotFound
