import './Home.css'
import Card from '../../components/user/Card'

const Home = () => {
  return (
    <div>
        <div className="banner-container">
          <div className="banner">
            <h1>Find Your Nearest Workshop with , </h1><br />
          </div>
        </div>
        <div className="search-container">
            {/* Location Section */}
            <div className="location">
                <div className="icon-input">
                    <i className="fas fa-map-marker-alt location-icon"></i>
                    <select className="dropdown">
                        <option value="" disabled selected>Select Location</option>
                        <option value="new-york">New York</option>
                        <option value="los-angeles">Los Angeles</option>
                        <option value="chicago">Chicago</option>
                        <option value="houston">Houston</option>
                    </select>
                </div>
            </div>

            {/* Search Field Section */}
            <div className="search-field">
                <div className="icon-input">
                    <i className="fas fa-search search-icon"></i>
                    <input 
                        type="text" 
                        placeholder="Search Workshops" 
                        className="search-input" 
                    />
                </div>
            </div>
        </div>

        <h2 className='pop-services'>Popular Services</h2>
        <div className='service-container'>
          
              <div className="box-left-box">
                
                <button className='service-btns'>Book a service</button>
              </div>
              <div className='box-center-box'>
                <div className='center-box1'>
                <button className='service-btns'>Manage Services</button>
                </div>
                <div className='center-box2'>
                <button className='service-btns'>Contact Us</button>
                </div>
              </div>

              <div className="box-right-box">
              <button className='service-btns'>Chat - Advise</button>
              </div>
        </div>
        <h2 className='top_rated'>Top Rated Workshops</h2>
        <div className='card-container'>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
        </div>

        <br /><br /><br />

    </div>
  )
}

export default Home
