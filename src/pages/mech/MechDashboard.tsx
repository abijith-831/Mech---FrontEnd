import Header from "../../components/mech/Header"
import Footer from "../../components/mech/Footer"


const MechDashboard = () => {



  return (
    <div>
      <Header/>
      <br />
      <div className='service-container'>
          
          <div className="box-left-box">
            
            <button className='service-btns'>Stock Management</button>
          </div>
          <div className='box-center-box'>
            <div className='center-box1'>
            <button className='service-btns'>Appointments</button>
            </div>
            <div className='center-box2'>
            <button className='service-btns'>Requests</button>
            </div>
          </div>

          <div className="box-right-box">
          <button className='service-btns'>Communicate with Customers</button>
          </div>
      </div>
      <br />
      <section className="py-16 bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            Why should you Partner with us?
          </h2>
          <div className="border-t-2 border-gray-200 w-20 mx-auto mt-2"></div>
        </div>

        <div className="mt-12 flex flex-col md:flex-row justify-around items-center space-y-8 md:space-y-0">
          <div className="flex flex-col items-center text-center">
            <div className="text-4xl text-gray-700">
              <i className="fas fa-users"></i>
            </div>
            <p className="mt-4 font-semibold">Attract new Customers</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="text-4xl text-gray-700">
              <i className="fas fa-truck"></i>
            </div>
            <p className="mt-4 font-semibold">Free Pickup & Dropoff</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="text-4xl text-gray-700">
              <i className="fas fa-headset"></i>
            </div>
            <p className="mt-4 font-semibold">24 x 7 Customer Care Support</p>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  )
}

export default MechDashboard
