import {  useEffect, useState } from "react";
import { changeImage , removeImage , changeName, addNumber ,addAddress , deleteAddress} from "../../services/user/ProfileAPI";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../../redux/store';
import { updateUserImage , removeUserImage , updateUserName , addPhoneNumber , addAddresss}  from '../../redux/slices/userSlice';
import { useSnackbar } from 'notistack';




const EditProfile = () => {

  const { enqueueSnackbar } = useSnackbar(); 
  const { currentUser } = useSelector((state: RootState) => state.user);


  const [imageName, setImageName] = useState('');
  const [imageSrc, setImageSrc] = useState('https://via.placeholder.com/150');
  const [isUploading, setIsUploading] = useState(false);


  console.log('cvv',currentUser);
  

  const [username, setUsername] = useState(currentUser?.username || '');
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);

  const [phone, setPhone] = useState<string | undefined>(currentUser?.phone || '');


  const [formData, setFormData] = useState({
    area: "",
    village: "",
    city: "",
    pincode: "",
    landmark: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);


  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser?.image) {
      setImageSrc(currentUser.image); 
    } else {
      setImageSrc(`https://source.unsplash.com/random/150x150`);
    }
  }, [currentUser?.image]);


  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      enqueueSnackbar('Please upload an image file', { variant: 'error' });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      enqueueSnackbar('Image size should be less than 5MB', { variant: 'error' });
      return;
    }

    setImageName(file.name);
  
    const formData = new FormData();
    formData.append("profileImage", file);

    if (currentUser) {
      formData.append('userId', currentUser.userId);
    }
  
    try {
      setIsUploading(true);
      const response = await changeImage(formData);
  
      if (response.data?.success) {
        const imageUrl = `http://localhost:3000/${response.data?.data?.imageUrl}`;
        setImageSrc(imageUrl);
        dispatch(updateUserImage(imageUrl));
        enqueueSnackbar('Profile image updated successfully', { variant: 'success' });
      } else {
        enqueueSnackbar('Failed to update profile image', { variant: 'error' });
      }
    } catch (error: any) {
      enqueueSnackbar(error.response?.data?.message || 'Failed to upload image', { variant: 'error' });
      setImageSrc('https://via.placeholder.com/150');
    } finally {
      setIsUploading(false);
    }
  };
  
  
  const handleImageRemove = async () => {
    if (!currentUser?.userId) {
      enqueueSnackbar('User ID is missing. Cannot remove the profile image.', { variant: 'error' });
      return;
    }
  
    try {
      const response = await removeImage(currentUser?.userId);
      console.log('res',response)
  
      setImageName('');
      dispatch(removeUserImage());
      setImageSrc('https://via.placeholder.com/150');
  
      enqueueSnackbar('Profile image removed successfully.', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('An error occurred while removing the profile image.', { variant: 'error' });
      console.error('Error:', error);
    }
  };
  


  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };


  const handleEditSaveClick = async () => {
    if (isEditingName && currentUser?.userId) {
      try {
        const response = await changeName(currentUser.userId, username); 

        
        if (response?.status === 200 && response?.data?.message === 'Name changed successfully') {
          dispatch(updateUserName(username))
          enqueueSnackbar('Name updated successfully!', { variant: 'success' });
        } else {
          enqueueSnackbar('Failed to update name', { variant: 'error' });
        }
      } catch (error: any) {
        enqueueSnackbar(error.response?.data?.message || "An error occurred while updating the name", { variant: 'error' });
      }
    }
    setIsEditingName(!isEditingName);  
  };
  

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);  
  };

  const handlePhoneSave = async () => {
    if (isEditingPhone) {
      try {
        if (currentUser?.userId && phone) {
          const response = await addNumber(currentUser?.userId, phone);
  
          if (response?.data) {
            dispatch(addPhoneNumber(response?.data?.user?.phone));
            enqueueSnackbar('Phone number updated successfully!', { variant: 'success' });
          } else {
            enqueueSnackbar('Failed to update phone number', { variant: 'error' });
          }
        }
      } catch (error) {
        enqueueSnackbar('An error occurred while saving phone number.', { variant: 'error' });
        console.error('Error saving phone number:', error);
      }
    }
    setIsEditingPhone(!isEditingPhone);
  };


  const handleAddressChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddAddressModal = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
    

  const handleAddressSubmit = async (e: any) => {
    e.preventDefault();
    
    if (formData && currentUser?.userId) {
      try {
        const form = new FormData();
        form.append("area", formData.area);
        form.append("village", formData.village);
        form.append("city", formData.city);
        form.append("pincode", formData.pincode);
        form.append("landmark", formData.landmark);
  
        const response = await addAddress(currentUser?.userId, form);
  
        if (response?.user?.addresses) {
          const lastAddress = response.user.addresses[response.user.addresses.length - 1];
          console.log('fsss',lastAddress);
          
          dispatch(addAddresss(lastAddress));
          enqueueSnackbar("Address Added Successfully!", { variant: "success" });
          setIsModalOpen(false);
        } else {
          enqueueSnackbar("Failed to add address", { variant: "error" });
        }
      } catch (error) {
        console.error("Error submitting address:", error);
        enqueueSnackbar("An error occurred", { variant: "error" });
      }
    }
  };
  
  
  const handleDeleteAddress = async(index:number)=>{
    try {
      if(currentUser?.userId){
        const response = await deleteAddress(currentUser?.userId , index)
       
        console.log('ress',response);

      }
      
    } catch (error) {
      
    }
  }


  return (
    <div className="p-6">

      <div className="h-44 border shadow-lg rounded-lg text-[#88c065] relative">
        <h3 className="absolute font-semibold top-3 left-3">Profile Picture 
        {!currentUser?.image && (
      <span className="text-sm ml-10 text-black">
       ( Upload image for complete 25% )
      </span>
    )}</h3>
        
        <div className="flex justify-start items-center h-full ml-8 mt-4">
          <div className="w-24 h-24 bg-gray-300 rounded-full overflow-hidden relative">
            {isUploading && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
              </div>
            )}
            <img
              src={imageSrc}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="absolute top-3 right-5 flex items-center space-x-2">

          {!currentUser?.image ? (
            <label className="cursor-pointer text-blue-500 font-semibold">
              {isUploading ? 'Uploading...' : 'Add Image'}
              <input
                type="file"
                className="hidden"
                onChange={handleImageChange}
                accept="image/*"
                disabled={isUploading}
              />
            </label>
          ) : (
            <label className="cursor-pointer text-blue-500 font-semibold">
              <i className="fa fa-edit"></i>
              <input
                type="file"
                className="hidden"
                onChange={handleImageChange}
                accept="image/*"
                disabled={isUploading}
              />
            </label>
          )}
          {imageSrc !== 'https://via.placeholder.com/150' && (
            <button
              type="button"
              onClick={handleImageRemove}
              className="text-red-500 cursor-pointer"
              disabled={isUploading}
            >
              <i className="fa fa-trash"></i>
            </button>
          )}
        </div>

        {imageName && (
          <p className="absolute top-20 left-40 text-gray-600 font-medium">{imageName}</p>
        )}
      </div><br />




      <div className="border shadow-lg rounded-lg text-[#88c065] relative">
        <h3 className="absolute font-semibold top-3 left-3">Name and Details</h3>

        <div className="mt-12 ml-3">

          <label htmlFor="name" className="block font-medium text-sm text-gray-600">Name</label>
            <div className="flex items-center w-[90%] mt-1">
              <input
                id="name"
                type="text"
                value={username}
                onChange={handleNameChange}
                disabled={!isEditingName}
                placeholder="Enter Your name"
                className={`flex-grow p-2 border border-gray-300 rounded-l-lg ${isEditingName ? 'text-green-600' : 'text-black'}`}
              />
              <button
                onClick={handleEditSaveClick}
                className="p-2 bg-[#88c065] text-white rounded-r-lg hover:bg-[#76a754]"
              >
                {isEditingName ? 'Save' : currentUser?.username ? 'Edit' : 'Add'}
              </button>
            </div>

          <label htmlFor="phone" className="block font-medium mx-auto text-sm text-gray-600 mt-4">Phone Number
          {!currentUser?.phone && (
          <span className="text-sm ml-10 font-semibold text-black">
          ( Add Phone Number for complete 25% )
          </span>)}
          </label>
            <div className="flex items-center w-[90%] mt-1">
              <input
                id="phone"
                type="text"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="Enter phone number"
                className={`flex-grow p-2 border border-gray-300 rounded-l-lg ${
                  isEditingPhone ? 'text-green-600' : 'text-black'
                }`}
                disabled={!isEditingPhone}
              />
              <button
                onClick={handlePhoneSave}
                className="p-2 bg-[#88c065] text-white rounded-r-lg hover:bg-[#76a754]"
              >
                {isEditingPhone ? "Save" : currentUser?.phone ? "Edit" : "Add"}
              </button>
            </div>

        </div>
        <br />
      </div>
      <br />

      <div className="border shadow-lg rounded-lg text-[#88c065] relative">
        <h3 className="absolute font-semibold top-3 left-3">Add Addresses
        {!currentUser?.addresses && (
          <span className="text-sm ml-10 font-semibold text-black">
          ( Add Phone Number for complete 25% )
          </span>)}</h3>
        <br />
        <button className="absolute font-semibold top-3 right-10 text-[#88c065] bg-transparent border-none cursor-pointer"
        onClick={handleAddAddressModal}>
          Add
        </button>
        <div className="p-4">

              {(currentUser?.addresses?.length ?? 0) > 0 ? (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {currentUser?.addresses?.map((address, index) => (
                      <li
                        key={index}
                        className={`bg-gradient-to-r from-green-400 to bg-green-600 text-white font-semibold p-4 shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105
                        `}
                      >
                        <div className="absolute top-2 right-2 flex gap-3">
                          <span
                            className="cursor-pointer hover:text-yellow-300 text-lg"
                            // onClick={() => handleEditAddress(index)}
                            title="Edit Address"
                          >
                            ✏️
                          </span>
                          <span
                            className="cursor-pointer hover:text-red-400 text-lg"
                            onClick={() => handleDeleteAddress(index)}
                            title="Delete Address"
                          >
                            🗑️
                          </span>
                        </div>
                        <p>
                          <strong>Area:</strong> {address.area}
                        </p>
                        <p>
                          <strong>Village:</strong> {address.village}
                        </p>
                        <p>
                          <strong>City:</strong> {address.city}
                        </p>
                        <p>
                          <strong>Pincode:</strong> {address.pincode}
                        </p>
                        <p>
                          <strong>Landmark:</strong> {address.landmark}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 mt-2">No addresses found. Please add one!</p>
                )}
        </div>




        <br />
      </div>


      {isModalOpen &&
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center px-10">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]   ">
            <h3 className="font-semibold text-xl mb-4">Add New Address</h3>
            <form onSubmit={handleAddressSubmit}>
              <div className="grid grid-cols-2 gap-4 ">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Area</label>
                  <input
                    type="text"
                    name="area"
                    value={formData.area}
                    onChange={handleAddressChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Village</label>
                  <input
                    type="text"
                    name="village"
                    value={formData.village}
                    onChange={handleAddressChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleAddressChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleAddressChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-600">Landmark</label>
                  <input
                    type="text"
                    name="landmark"
                    value={formData.landmark}
                    onChange={handleAddressChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-between">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-md"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      }

    </div>
  );
};


export default EditProfile;
