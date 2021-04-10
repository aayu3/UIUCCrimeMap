import React from "react";
import { Component } from 'react';
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {  greenIcon  } from './icons/greenIcon';
import {  yellowIcon  } from './icons/yellowIcon';
import {  redIcon  } from './icons/redIcon';



// Define Center Location
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

  class App extends Component {
    constructor(props) {
        super(props);
        // get date info
        var today = new Date();
        
        let curday = parseInt(today.getDate());
        let curmonth = parseInt(today.getMonth() + 1);
        let curyear = parseInt(today.getFullYear());

        this.state = { 
          crimes : [] ,
          day : curday,
          month : curmonth,
          year : curyear,

        };
    }
  
    getCrimes = () => {
        fetch("/api/crimes")
        .then(res => res.json())
        .then(res => this.setState({ crimes: Array.from(res) }))
        .catch(err => console.log(err));
    }
    

    crimeDate(props) {
      const crime = props;
      var dateOccurred = crime.DateOccurred.split("/");
      var monthOccurred = parseInt(dateOccurred[0]);
      var dayOccurred = parseInt(dateOccurred[1]);
      if (Math.abs(dayOccurred - this.state.day) <= 3 && monthOccurred == this.state.month) {
        return redIcon;
      }
      return greenIcon;
    }
  
    componentDidMount() {
        this.getCrimes();
    }
  
    render() {
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
        {this.state.crimes.map((crime, i) => 
        <Marker
      //key={crime.CaseID}
      position={[crime.Latitude, crime.Longitude]} 
      
      icon = {this.crimeDate(crime)}
      
      >
        
        <Popup position={[crime.Latitude, crime.Longitude]} > 
          <div>
            <h2>{crime.Description}</h2>
            <h3>Date: {crime.DateOccurred}</h3>
            <h3>Address: {crime.StreetAddress}</h3>
            <p>Incident: {crime.CaseID}</p>
          </div>
        </Popup>
        
      </Marker>)}
      
      
        </MapContainer> } />
                <Route path="/about" component={About} />
              </Switch>
            </main>
          </Router>
      </div>
        );
    }
  }
  
  export default App;
  
  
  

