import React from "react";
import { Component } from 'react';
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

class App extends Component {
  constructor(props) {
      super(props);
      this.state = { crimes: [] };
  }

  getCrimes = () => {
      fetch("http://localhost:5000/api/crimes")
      .then(res => res.json())
      .then(res => this.setState({ crimes: Array.from(res) }))
      .catch(err => console.log(err));
  }

  

  componentDidMount() {
      this.getCrimes();
  }

  render() {

    console.log(this.state.crimes);
    
      return (
        <div>
        <div>
          <div class="header">
            <a href="#default" class="logo">UIUC Crime Map</a>
          </div>
        </div>
    
      <MapContainer center={[location.lat, location.lng]} zoom={location.zoom}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {this.state.crimes.map((crime, i) => 
      <Marker
      key={crime.CaseID}
      position={[crime.Latitude, crime.Longitude]}>
        icon = 
        <Popup position={[crime.Latitude, crime.Longitude]} > 
          <div>
            <h2>{crime.Description}</h2>
            <h3>Date: {crime.DateOccurred}</h3>
            <h3>Address: {crime.StreetAddress}</h3>
            <p>Incident: {crime.CaseID}</p>
          </div>
        </Popup>
      </Marker>)}
      
    
    
    </MapContainer>
    </div>
      );
  }
}

export default App;


