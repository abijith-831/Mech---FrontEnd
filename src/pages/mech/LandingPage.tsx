import { useNavigate } from "react-router-dom";
import { useState } from "react";
import bannerImg from "../../assets/user/bg.jpg";
import { loginRequest } from "../../services/mech/mechApi";
import { toast } from "react-toastify";


const LandingPage = () => {
  const navigate = useNavigate();
  
  

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')

  const handleButtonClick = () => {
      navigate("/mech/register"); 
  };

  const closeModal = () => {
    setShowLoginModal(false);
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await loginRequest(email , password)

      console.log('ress',response);
      
  
      toast.success('Login Successful...!!!')
      navigate('/mech/dashboard')
      setShowLoginModal(false);
    } catch (error:any) {
      if (error.response) {
        console.log("Error response:", error.response.data.message);
  
        toast.error(error.response.data.message || "An error occurred!");
      } else {
        console.log("Unknown error:", error);
        toast.error("Submission failed. Please try again later.");
      }
    }

  };

  return (
    <div>
      <header className="flex justify-between items-center p-4 bg-transparent shadow-md">
        <div className="text-lg font-bold ml-8">LOGO</div>
        <div className="text-sm text-gray-600 mr-8">
          Need help? Call: <span className="font-medium">1234567890</span>
        </div>
      </header>

      <section
        className="relative h-[50vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${bannerImg})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-3xl md:text-4xl font-bold">
            Partner with us and Grow your Business
          </h1>
            <div className="flex flex-row items-center justify-between space-x-4">
              <button
                onClick={handleButtonClick}
                className="mt-4 px-6 py-3 bg-[#88c065] hover:bg-green-600 text-white rounded-md font-semibold">
                  Register your Workshop
              </button>
              <button onClick={() => setShowLoginModal(true)} 
                className="mt-4  px-4 py-3 bg-[#88c065] hover:bg-green-600 text-white rounded-md font-semibold">Login</button>
            </div>
          </div>

      </section>

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

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg w-96 p-8">
            <h2 className="text-xl text-center font-bold text-[#88c065] mb-4">Login</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  onChange={(e)=>setEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  onChange={(e)=>setPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                  required
                />
              </div>
              <div className="flex justify-between items-center">
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#88c065] text-white rounded-md font-semibold hover:bg-green-700"
                >
                  Login
                </button>
                <button
                  type="button"
                  className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md font-semibold hover:bg-gray-400"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
