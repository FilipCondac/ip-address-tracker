import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Map from "./components/Map";
import { url } from "inspector";
import { createImageUri } from "./util";

const App = () => {
  const [ipAddress, setIpAddress] = useState("");
  const [searchedIpAddress, setSearchedIpAddress] = useState("");

  const handleChange = (event: any) => {
    setIpAddress(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSearchedIpAddress(ipAddress);
  };

  return (
    <main className="flex flex-col h-screen justify-center">
      <div
        className="flex flex-col h-1/3 justify-center items-center"
        style={{
          backgroundImage: `url(${createImageUri(
            "/images/pattern-bg-desktop.png"
          )})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-center">
          <h1 className="">IP Address Track</h1>
          <form onSubmit={handleSubmit} className="flex mt-4">
            <input
              className="border-2 border-black rounded-l-lg p-2 w-96"
              value={ipAddress}
              onChange={handleChange}
            ></input>
            <button type="submit">
              <img
                src="./images/icon-arrow.svg"
                className="bg-black h-12 p-2 rounded-tr-lg rounded-br-lg"
              ></img>
            </button>
          </form>
        </div>
      </div>
      <Map value={{ ipAddress: searchedIpAddress }} />
    </main>
  );
};

export default App;
