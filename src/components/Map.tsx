import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L, { Icon } from "leaflet";
import { useEffect, useRef, useState } from "react";

//Interfaces
interface MapProps {
  value: {
    ipAddress: string;
  };
  setIpInformation: (info: {
    ip: string;
    location: string;
    timezone: string;
    isp: string;
  }) => void;
}

interface ChangeViewProps {
  center: [number, number];
  zoom: number;
}

const Map: React.FC<MapProps> = ({ value, setIpInformation }) => {
  const mapRef = useRef<L.Map | null>(null);

  //States
  const ipAddress = value.ipAddress;
  const [position, setPosition] = useState<[number, number]>([0, 0]);
  const [displayInfo, setDisplayInfo] = useState({
    ip: "",
    location: "",
    timezone: "",
    isp: "",
  });

  //Change view and use fly to when map changes
  const ChangeView: React.FC<ChangeViewProps> = ({ center, zoom }) => {
    const map = useMap();
    useEffect(() => {
      map.flyTo(center, zoom);
    }, [center, zoom, map]);
    return null;
  };

  //Custom icon for marker
  const customIcon = new L.Icon({
    iconUrl: "./images/icon-location.svg",
    iconSize: [35, 45], // size of the icon in pixels
    iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -41], // point from which the popup should open relative to the iconAnchor
  });

  //Fetch location data from API and set position and display info on IP change
  useEffect(() => {
    fetchLocation(ipAddress);
  }, [ipAddress]);

  //   //Fetch location data from API and set position and display info on IP change
  const fetchLocation = (ipAddress: string) => {
    if (ipAddress === "") {
      ipAddress = "149.44.191.24";
    }
    const apiKey = process.env.REACT_APP_API_KEY;
    fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ipAddress}`
    )
      .then((res) => res.json())
      .then((data) => {
        const { lat, lng } = data.location;
        const { current: mapInstance } = mapRef;

        setIpInformation({
          ip: data.ip,
          location: `${data.location.city}, ${data.location.country}`,
          timezone: data.location.timezone,
          isp: data.isp,
        });

        setDisplayInfo({
          ip: data.ip,
          location: `${data.location.city}, ${data.location.country}`,
          timezone: data.location.timezone,
          isp: data.isp,
        });

        setPosition([lat, lng]);
        if (mapInstance) {
          mapInstance.flyTo([lat, lng], 13);
        }
      });
  };

  return (
    <div className="h-full w-full m-auto z-0">
      {/* Give latitude and logitiude to map */}
      <MapContainer
        center={[position[0], position[1]]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        //@ts-ignore
        whenCreated={(map) => (mapRef.current = map)}
      >
        <ChangeView center={position} zoom={13} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* Give latitude and logitiude to marker */}
        <Marker position={[position[0], position[1]]} icon={customIcon}>
          {/* Display marker info */}
          <Popup>
            <div className="text-center">
              <b>{displayInfo.ip}</b>
              <br />
              {displayInfo.location}
              <br />
              {displayInfo.timezone}
              <br />
              {displayInfo.isp}
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
