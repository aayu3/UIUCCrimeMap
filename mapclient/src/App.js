import React from "react";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import {Icon} from "leaflet";
import crimeData from "./data/illinoisCrimeShort.json";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";




const location = {
  address: '1401 West Green Street, Urbana, Illinois.',
  lat: 40.1092,
  lng: -88.2272,
  zoom: 17,
}

const About = () => (
  <div className="about">
    <h1>About UIUC Crime Map</h1>
    <p id="description">UIUC Crime Map is a website that tracks data about crimes in the University Illinois Campustown
      area and displays detailed information about each crime incident. 
      <br></br>
      <br></br>
      By clicking on the points on the map, you can find information about the crime type, date,
      location, and incident code for every crime occured on campus.
    </p>
  </div>
  );

export default function App() {

  return ( 
  <div>
    <Router>
      <main>
        <div className="header">
          <a href="/" className="logo">UIUC Crime Map</a>
            <div class="header-right">
              <a href="/about">About</a>
          </div>
        </div>
        <Switch>
        <Route path="/" exact render={() =>


  <MapContainer center={[location.lat, location.lng]} zoom={location.zoom}>
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


  </MapContainer> } />
          <Route path="/about" component={About} />
        </Switch>
      </main>
    </Router>
</div>
  )
}
