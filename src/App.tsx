import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import Map from "./components/Map";
import { createImageUri } from "./util";

const App = () => {
  //States
  const [ipAddress, setIpAddress] = useState("");
  const [searchedIpAddress, setSearchedIpAddress] = useState("");
  const [ipInformation, setIpInformation] = useState({
    ip: "",
    location: "",
    timezone: "",
    isp: "",
  });

  //Handle change and submit
  const handleChange = (event: any) => {
    setIpAddress(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSearchedIpAddress(ipAddress);
  };

  return (
    <main className="flex flex-col h-screen justify-center font-googleFont">
      <div
        className="flex flex-col h-96 justify-center items-center"
        style={{
          backgroundImage: `url(${createImageUri(
            "/images/pattern-bg-desktop.png"
          )})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-center">
          <h1 className="text-3xl text-white font-semibold mobile:mt-4">
            IP Address Tracker
          </h1>
          <form onSubmit={handleSubmit} className="flex mt-4">
            <input
              className=" rounded-l-lg p-2 w-96 mobile:w-64 font-bold tracking-wider"
              value={ipAddress}
              onChange={handleChange}
              placeholder="Search for any IP address or domain"
            ></input>
            <button type="submit">
              <img
                src="./images/icon-arrow.svg"
                className="bg-black h-12 p-4 rounded-tr-lg rounded-br-lg"
              ></img>
            </button>
          </form>
        </div>
        {/* Display IP info */}
        <div className="flex mobile:flex-col bg-white mt-10 -mb-32 w-10/12 z-10 justify-center rounded-xl pb-10 pt-8 shadow-lg h-fit">
          <div className="flex-col w-1/4 border-r-2 pl-10 mobile:border-r-0 mobile:m-auto mobile:w-full mobile:text-center mobile:p-0">
            <h3 className="text-darkGray mb-2">IP Address</h3>
            <p className="text-2xl font-bold mobile:m-0 break-all mr-3">
              {ipInformation.ip}
            </p>
          </div>
          <div className="flex-col w-1/4 border-r-2 pl-10  mobile:border-r-0 mobile:m-auto mobile:text-center mobile:w-full mobile:p-0">
            <h3 className="text-darkGray mb-2">Location</h3>
            <p className="text-2xl font-bold break-normal mr-3 mobile:m-0">
              {ipInformation.location}
            </p>
          </div>
          <div className="flex-col w-1/4 border-r-2 pl-10  mobile:border-r-0 mobile:m-auto mobile:text-center mobile:w-full mobile:p-0">
            <h3 className="text-darkGray mb-2">Timezone</h3>
            <p className="text-2xl font-bold break-normal mr-3 mobile:m-0">
              UTC {ipInformation.timezone}
            </p>
          </div>
          <div className="flex-col w-1/4 pl-10  mobile:border-r-0 mobile:m-auto mobile:text-center mobile:w-full mobile:p-0">
            <h3 className="text-darkGray mb-2">ISP</h3>
            <p className="text-xl font-bold break-all mr-3 mobile:m-0 mobile:text-2xl">
              {ipInformation.isp}
            </p>
          </div>
        </div>
      </div>
      {/* Map */}
      <Map
        value={{ ipAddress: searchedIpAddress }}
        setIpInformation={setIpInformation}
      />
    </main>
  );
};

export default App;
