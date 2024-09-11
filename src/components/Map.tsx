import { MapContainer, ScaleControl, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";
import { SingleRadarData } from "../types";
import FlyMapTo from "./FlyMapTo";

interface MapProps {
  displayedData: undefined | SingleRadarData;
}

function Map({ displayedData }: MapProps) {
  // Richardson, TX
  const latCenter = 32.9483;
  const lngCenter = -96.7299;

  const zoomLevel = 10;

  return (
    <div className="map-div">
      <MapContainer
        center={[latCenter, lngCenter]}
        zoom={zoomLevel}
        style={{ height: "100%", width: "100%" }}
        id="map"
      >
        <FlyMapTo />
        <ScaleControl position="bottomleft" />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {displayedData && displayedData.path ? (
          <TileLayer
            url={`https://tilecache.rainviewer.com${displayedData.path}/512/{z}/{x}/{y}/1/1_1.png`}
          />
        ) : (
          <></>
        )}
      </MapContainer>
    </div>
  );
}

export default Map;
