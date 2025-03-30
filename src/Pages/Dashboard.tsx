import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import Dropdown from "../Components/Dropdown";
import bg from "../assets/1506250.jpg";
import axios from "axios";
import CalendarWidget from "../Components/MyCalendar";
import GraphWidget from '../Components/MyChart';
import TableWidget from "../Components/MyTable";
import WeatherWidget from "../Components/Weather";
import ClockWidget from '../Components/Clock';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar(); 
  const [widgets, setWidgets] = useState<{ id: number; name: string; visible: boolean }[]>([]);

  useEffect(() => {
    const fetchWidgets = async () => {
      try {
        const response = await axios.get("http://localhost:5000/widget");
        setWidgets(response.data);
      } catch (error: any) {
        console.error("Error fetching widgets:", error.response?.data || error.message);
      }
    };

    fetchWidgets();
  }, []);


  const handleLogout = () => {
    localStorage.removeItem("token"); 
    enqueueSnackbar("Logged out successfully", { variant: "success" });
    navigate("/login");
  };

  const widgetComponents: { [key: string]: JSX.Element } = {
    calendar: <CalendarWidget />,
    graph: <GraphWidget />,
    table: <TableWidget />,
    weather: <WeatherWidget />,
    clock: <ClockWidget />
  };

  return (
    <div className="relative min-h-screen p-6 bg-gray-100">
      <div
        className="absolute inset-0 bg-black/50"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "brightness(30%)",
        }}
      ></div>

      <div className="relative z-10">
        <h1 className="text-3xl font-bold text-center text-white">Dashboard</h1>

        <div className="absolute top-6 right-6 flex items-center space-x-4">
          <Dropdown widgets={widgets} setWidgets={setWidgets} />
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-200"
          >
            Logout
          </button>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {widgets
            .filter((widget) => widget.visible)
            .map((widget) => (
              <div key={widget.id} className="p-4 bg-white bg-opacity-50 transition transform duration-500 ease-in-out hover:scale-105 shadow-lg rounded-lg">
                <h1 className="text-black font-bold text-center">{widget.name}</h1>
                {widgetComponents[widget.name]}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
