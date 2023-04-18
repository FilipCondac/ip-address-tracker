import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L, { Icon } from "leaflet";

import { useEffect, useRef, useState } from "react";
//@ts-ignore
interface MapProps {
  value: {
    ipAddress: string;
  };
}

interface ChangeViewProps {
  center: [number, number];
  zoom: number;
}

const Map: React.FC<MapProps> = ({ value }) => {
  const mapRef = useRef<L.Map | null>(null);

  const ipAddress = value.ipAddress;
  const [position, setPosition] = useState<[number, number]>([0, 0]);
  const [location, setLocation] = useState<[string, string]>(["", ""]);

  const ChangeView: React.FC<ChangeViewProps> = ({ center, zoom }) => {
    const map = useMap();
    useEffect(() => {
      map.flyTo(center, zoom);
    }, [center, zoom, map]);
    return null;
  };

  const customIcon = new L.Icon({
    iconUrl: "./images/icon-location.svg",
    iconSize: [35, 45], // size of the icon in pixels
    iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -41], // point from which the popup should open relative to the iconAnchor
  });

  useEffect(() => {
    fetchLocation(ipAddress);
  }, [ipAddress]);

  const apiKey = process.env.REACT_APP_API_KEY;

  const fetchLocation = (ipAddress: string) => {
    fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ipAddress}`
    )
      .then((res) => res.json())
      .then((data) => {
        const { lat, lng } = data.location;
        const { current: mapInstance } = mapRef;
        setPosition([lat, lng]);
        if (mapInstance) {
          mapInstance.flyTo([lat, lng], 13);
        }
      });
  };

  return (
    <div className="h-full w-full m-auto">
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
        <Marker position={[position[0], position[1]]} icon={customIcon}>
          <Popup>
            {}
            <br /> {ipAddress}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
