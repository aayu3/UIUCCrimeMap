import { Model } from "mongoose";
import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { JSCrimeEvent } from "./App";
import { colorPin } from "./icons/colorPin";

function crimeDate(props: JSCrimeEvent) {
  const crime = props;

  let diff = (+new Date() - +crime.jsDateOccured) / 1000 / 60 / 60 / 24;
  return colorPin(`hsl(${(diff * 180) / 60},100%,50%)`);

  // if (diff <= redDaysThreshold && diff >= greenLowerThreshold) {
  //   return redIcon;
  // } else if (diff <= yellowDaysThreshold) {
  //   return yellowIcon;
  // }
  // return greenIcon;
}

export const CrimeMap: React.FC<{
  crimeData: JSCrimeEvent[];
  location: any;
  mode: string;
}> = ({ crimeData, location , mode}) => {
  return (
    <MapContainer center={[location.lat, location.lng]} zoom={location.zoom}>
      <TileLayer
        url={mode}
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
              <h4>{crime.Description}</h4>
              <p>Date: {crime.DateOccurred}</p>
              <p>Time: {crime.TimeOccurred}</p>
              <p>Address: {crime.StreetAddress}</p>
              <p>Incident: {crime.CaseID}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default CrimeMap;
