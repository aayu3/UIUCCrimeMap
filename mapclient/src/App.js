import React from "react";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import {Icon} from "leaflet";
import crimeData from "./data/illinoisCrimeShort.json";
import "./App.css";



const location = {
  address: '1401 West Green Street, Urbana, Illinois.',
  lat: 40.1092,
  lng: -88.2272,
  zoom: 17,
}

export default function App() {

  return <MapContainer center={[location.lat, location.lng]} zoom={location.zoom}>
  <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  />
  {crimeData.map(crime => (
    <Marker 
    key={crime.Incident}
    position={[crime.GeneralLocation[0], crime.GeneralLocation[1]]}>
      icon = 
      <Popup position={[crime.GeneralLocation[0], crime.GeneralLocation[1]]} > 
        <div>
          <h2>{crime.CrimeDescription}</h2>
          <h3>Date: {crime.DateOccurred}</h3>
          <h3>Address: {crime.StreetAddress}</h3>
          <p>Incident: {crime.Incident}</p>
        </div>
      </Popup>
    </Marker>
  ))}


</MapContainer>
}
