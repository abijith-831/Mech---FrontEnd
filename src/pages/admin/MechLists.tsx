import { useEffect, useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import { getMechanics , verifyMechanic} from "../../services/admin/adminApi";

interface Mechanic {
  _id: string;
  username: string;
  email: string;
  phone: string;
  area: string;
  workshopname: string;
  shopno:string;
  floor:string;
  city:string;
  landmark:string;
  isVerified: boolean;
}

const MechLists = () => {
  const [mechanics, setMechanics] = useState<Mechanic[]>([]);
  const [viewModal, setViewModal] = useState(false);
  const [selectedMechanic, setSelectedMechanic] = useState<Mechanic | null>(null);


  useEffect(() => {
    const getMechanicsData = async () => {
      try {
        const response = await getMechanics();
        setMechanics(response.data);
      } catch (error) {
        console.error("Error fetching mechanics data:", error);
      }
    };

    getMechanicsData();
  }, []);

  const handleView = (mech: Mechanic) => {
    setSelectedMechanic(mech);
    setViewModal(true);
  };

  const handleCloseModal = () => {
    setSelectedMechanic(null);
    setViewModal(false);
  };


  const handleVerify = async(mech:Mechanic)=>{
    try {
      const response = await verifyMechanic(mech._id)
      
      console.log('ress',response);
      
    } catch (error) {
      
    }
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-[#f8fafc] min-h-screen">
        <h2 className="text-3xl font-bold text-center mb-6 text-[#88c065]">Mechanics List</h2>
        <div className="overflow-x-auto bg-white shadow-md">
          <table className="min-w-full table-auto">
            <thead className="bg-[#1a202c] text-white">
              <tr>
                <th className="py-3 px-6 text-left">WorkShop</th>
                <th className="py-3 px-6 text-left">Area</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mechanics.length > 0 ? (
                mechanics.map((mech) => (
                  <tr key={mech._id} className="border-b hover:bg-gray-100">
                    <td className="py-3 px-6">{mech.workshopname}</td>
                    <td className="py-3 px-6">{mech.area}</td>
                    <td className="py-3 px-6">{mech.username}</td>
                    <td className="py-3 px-6">{mech.email}</td>
                    <td className="py-3 px-6">
                      {mech.isVerified ? (
                        "Verified"
                      ) : (
                        <button onClick={()=>handleVerify(mech)} className="bg-[#88c065] hover:bg-green-500 text-white px-4 py-2 rounded-md">
                          Verify
                        </button>
                      )}
                    </td>
                    <td className="py-3 px-6">
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">
                        Edit
                      </button>
                      <button className="bg-red-500 text-white px-4 py-2 rounded-md mr-2">
                        Delete
                      </button>
                      <button
                        className="bg-gray-400 text-white px-4 py-2 rounded-md"
                        onClick={() => handleView(mech)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-4">
                    No mechanics found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {viewModal && selectedMechanic && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">{selectedMechanic.workshopname}</h2>

            <p>
              <strong>Mechanic Name:</strong> {selectedMechanic.username}
            </p>
            <p>
              <strong>Email:</strong> {selectedMechanic.email}
            </p>
            <p>
              <strong>Phone:</strong> {selectedMechanic.phone}
            </p>
            <p>
              <strong>Shop No:</strong> {selectedMechanic.shopno}
            </p>
            <p>
              <strong>Floor:</strong> {selectedMechanic.floor}
            </p>
            <p>
              <strong>Area:</strong> {selectedMechanic.area}
            </p>
            <p>
              <strong>City:</strong> {selectedMechanic.city}
            </p>
            <p>
              <strong>Landmark:</strong> {selectedMechanic.landmark}
            </p>
            <button
              className="bg-red-500 text-white px-4 py-2 mt-4 rounded-md"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MechLists;
