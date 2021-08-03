import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { JSCrimeEvent } from "./App";
import { colorPin } from "./icons/colorPin";
import { address, dateOfYear, description, ID, time } from "./PopupStyles";

function crimeDate(props: JSCrimeEvent) {
  const crime = props;

  let diff = (+new Date() - +crime.jsDate) / 1000 / 60 / 60 / 24;
  return colorPin(`hsl(${(diff * 180) / 60},100%,50%)`);

  // if (diff <= redDaysThreshold && diff >= greenLowerThreshold) {
  //   return redIcon;
  // } else if (diff <= yellowDaysThreshold) {
  //   return yellowIcon;
  // }
  // return greenIcon;
}

const CrimeMap:React.FC<{
  crimeData: JSCrimeEvent[];
  location: any;
}> = ({
  crimeData,
  location,
}) => {
  return (
    <MapContainer center={[location.lat, location.lng]} zoom={location.zoom}>
      <TileLayer
        url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {crimeData.map((crime, i) => (
        <Marker
          //key={crime.CaseID}
          position={[crime.Latitude, crime.Longitude]}
          icon={crimeDate(crime)}
        >
          <Popup position={[crime.Latitude, crime.Longitude]}>
            <div>
              <div style={description}>{crime.Description}</div>
              <div style={dateOfYear}>Date: {crime.DateOccurred}</div>
              <div style={time}>Time: {crime.TimeOccurred}</div>
              <div style={address}>Address: {crime.StreetAddress}</div>
              <div style={ID}>Incident: {crime.CaseID}</div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default CrimeMap;
