import React, { useState } from "react"
import { registerRequest } from "../../services/mech/mechApi";


const RegisterPage = () => {


    const [formData , setFormData] = useState({
        workshopname:'',
        username:'',
        email:'',
        password:'',
        phone:'',
        shopno:'',
        floor:'',
        area:'',
        city:'',
        landmark:''
    })

    console.log('frrf',formData);
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value
        }));
      };


    const handleSubmit = async(e:React.FormEvent)=>{
        e.preventDefault()

        try {
            const response = await registerRequest(formData)

            console.log('ress',response);
            
        } catch (error) {
            console.log('submission error');
            
        }
    }


  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 flex flex-row">
    <div className="w-1/3 max-w-2xl mx-auto bg-gray-400">
                {/* Progress Steps */}
                <div className="mb-8 flex items-center">
          <div className="relative">
            <div className="flex items-center">
              <div className="rounded-full h-8 w-8 bg-green-500 flex items-center justify-center">
                <div className="text-white text-sm">1</div>
              </div>
              <div className="ml-4 text-sm font-medium text-green-500">Workshop Information</div>
            </div>
            <div className="h-16 w-px bg-gray-300 absolute top-8 left-4"></div>
          </div>
          
          <div className="ml-16 relative">
            <div className="flex items-center">
              <div className="rounded-full h-8 w-8 bg-gray-300 flex items-center justify-center">
                <div className="text-white text-sm">2</div>
              </div>
              <div className="ml-4 text-sm font-medium text-gray-500">Workshop Affiliation</div>
            </div>
            <div className="h-16 w-px bg-gray-300 absolute top-8 left-4"></div>
          </div>
          
          <div className="ml-16 relative">
            <div className="flex items-center">
              <div className="rounded-full h-8 w-8 bg-gray-300 flex items-center justify-center">
                <div className="text-white text-sm">3</div>
              </div>
              <div className="ml-4 text-sm font-medium text-gray-500">Workshop Information</div>
            </div>
          </div>
                </div>
    </div>
    <div className="w-2/3 max-w-2xl mx-auto bg-g">
        <div className="">
        {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-8">
                {/* Workshop Information */}
                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-6">Workshop Information</h2>
                    <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                        Workshop name
                        </label>
                        <div className="text-xs text-gray-500 mb-1">
                        Customers will see this name on website
                        </div>
                        <input
                        type="text"
                        id="workshopname"
                        name="workshopname"
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Enter your Workshop name"
                        />
                    </div>
                    </div>
                </div>

                {/* Owner Details */}
                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-6">Owner Details</h2>
                    <div className="space-y-4">
                    <div className="text-sm text-gray-500 mb-4">
                        We will use these details for all business communications and updates
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                        type="text"
                        id="username"
                        name="username"
                        onChange={handleChange}
                        className="p-2 border border-gray-300 rounded-md"
                        placeholder="Full Name"
                        />
                        <input
                        type="email"
                        id="email"
                        name="email"
                        onChange={handleChange}
                        className="p-2 border border-gray-300 rounded-md"
                        placeholder="Email Address"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex">

                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={handleChange}
                            className="flex-1 p-2 border border-gray-300 rounded-r-md"
                            placeholder="Password"
                        />
                        </div>
                        <div className="flex">
                        <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 rounded-l-md bg-gray-50 text-gray-500">
                            +91
                        </span>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            onChange={handleChange}
                            className="flex-1 p-2 border border-gray-300 rounded-r-md"
                            placeholder="Workshop's primary contact number"
                        />
                        </div>
                    </div>
                    </div>
                </div>

                {/* Location */}
                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-6">Add your Workshop's Location</h2>
                    {/* Map placeholder */}
                    <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        id="shopno"
                        name="shopno"
                        onChange={handleChange}
                        className="p-2 border border-gray-300 rounded-md"
                        placeholder="Shop no / building no"
                    />
                    <input
                        type="text"
                        id="floor"
                        name="floor"
                        onChange={handleChange}
                        className="p-2 border border-gray-300 rounded-md"
                        placeholder="Floor"
                    />
                    <input
                        type="text"
                        id="area"
                        name="area"
                        onChange={handleChange}
                        className="p-2 border border-gray-300 rounded-md"
                        placeholder="Area / locality"
                    />
                    <input
                        type="text"
                        id="city"
                        name="city"
                        onChange={handleChange}
                        className="p-2 border border-gray-300 rounded-md"
                        placeholder="City"
                    />
                    <input
                        type="text"
                        id="landmark"
                        name="landmark"
                        onChange={handleChange}
                        className="col-span-2 p-2 border border-gray-300 rounded-md"
                        placeholder="Add any nearby landmark (optional)"
                    />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                    <button
                    type="submit"
                    className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                    >
                    Submit
                    </button>
                </div>
                </form>
        </div>
        </div>

    </div>
  )
}

export default RegisterPage
