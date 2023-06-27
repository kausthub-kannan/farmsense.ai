import React, {useState,useEffect} from 'react'
import './Dashboard.css'
import PiechartChicken from '../../components/Charts/chickenCharts/Piechart';
import PiechartPlant from '../../components/Charts/plantCharts/Piechart';
import barChartChicken from '../../components/Charts/chickenCharts/barChart';
import {auth} from '../../firebase'
import { useNavigate } from 'react-router-dom';
const Dashborad = () => {

  const navigate=useNavigate()
  
  useEffect(() => {
  
    if(!auth.currentUser){
      navigate("/")
    }
  }, [])

   // Sample datas
   const plantdata = [
    {
      name: "John Doe",
      time: "10:30 AM",
      city: "New York",
      disease: "Dutch Elm Disease",
    },
    {
      name: "Jane Smith",
      time: "2:45 PM",
      city: "Los Angeles",
      disease: "Late Blight",
    },
    {
      name: "David Johnson",
      time: "4:15 PM",
      city: "Chicago",
      disease: "Citrus Greening",
    },
  ];

  //Chicken Data
  const chickendata = [
    {
      name: "Emily Davis",
      time: "9:00 AM",
      city: "Seattle",
      disease: "Avian Influenza",
    },
    {
      name: "Ryan Lee",
      time: "11:30 AM",
      city: "Miami",
      disease: "Marek's Disease",
    },
    {
      name: "Avery Johnson",
      time: "3:45 PM",
      city: "Dallas",
      disease: "Coccidiosis",
    },
  ];
  

  const [tableTitle, setTableTitle] = useState("Animal");
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
    if (toggle) {
      setTableTitle("Animal");
    } else {
      setTableTitle("Plant");
    }
  };
  return (
    <div className=" container mx-auto my-8">
        <div className="tableTitle">
        <h1 className="lg:text-2xl text-xl textcolor font-bold mb-4  flex items-center justify-center">Dashboard:-{tableTitle}</h1>
        <button className="bg-[#0f766e] text-white hover:bg-[#14b8a6] hover:bg-blue-200 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center mb-5" onClick={handleToggle}>Toggle To  {tableTitle} Table</button>
        </div>
        {toggle?(
          <>
          <div className="bg-white shadow-md rounded-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2">Person Name</th>
                  <th className="px-4 py-2 sm:w-1/4">Time</th>
                  <th className="px-4 py-2 sm:w-1/4">City</th>
                  <th className="px-4 py-2 sm:w-1/4">Disease Found</th>
                </tr>
              </thead>
              <tbody>
                {plantdata.map((row, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{row.name}</td>
                    <td className="border px-4 py-2 sm:w-1/4">{row.time}</td>
                    <td className="border px-4 py-2 sm:w-1/4">{row.city}</td>
                    <td className="border px-4 py-2 sm:w-1/4">{row.disease}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <PiechartPlant/>
        </>
        ):(
          <>
          <div className="bg-white shadow-md rounded-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Person Name</th>
              <th className="px-4 py-2 sm:w-1/4">Time</th>
              <th className="px-4 py-2 sm:w-1/4">City</th>
              <th className="px-4 py-2 sm:w-1/4">Disease Found</th>
            </tr>
          </thead>
          <tbody>
            {chickendata.map((row, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{row.name}</td>
                <td className="border px-4 py-2 sm:w-1/4">{row.time}</td>
                <td className="border px-4 py-2 sm:w-1/4">{row.city}</td>
                <td className="border px-4 py-2 sm:w-1/4">{row.disease}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
        <div>
        <PiechartChicken/>
        <barChartChicken/>
        </div>
        </>
        )}

        
    </div>
  )
}

export default Dashborad
