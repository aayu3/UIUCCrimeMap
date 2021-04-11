import React from "react";
import { Component } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {  greenIcon  } from './icons/greenIcon';
import {  yellowIcon  } from './icons/yellowIcon';
import {  redIcon  } from './icons/redIcon';
import {  noIcon  } from './icons/noIcon';
import   uiucCrimeLogo2   from './icons/uiucCrimeLogo2.png';
import websitelogo from './icons/websitelogo.png'
import websitelogo2 from './icons/websitelogo2.png'
import   greenMarker   from './icons/greenMarker.svg';
import   yellowMarker   from './icons/yellowMarker.svg';
import   redMarker   from './icons/redMarker.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import profilepic from './icons/defaultprofilepic.png';
import aaronyu from './icons/aaronpfp.png';

console.log(profilepic);

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
      Red markers indicate a crime that has occured in the last week, yellow markers indicate a crime that happened in the last month, and green markers indicate the rest. By clicking on the points on the map, you can find information about the crime type, date,
      location, and incident code for every crime occured on campus.
    </p>
  </div>
  );


const team = () => (
  <div className="team">
    <div>
      <a href="https://github.com/aayu3"><img className="profilepic" src={aaronyu} alt="Aaron Yu"/></a>
      
      <div className="name">
        Aaron Yu
      </div>
      <div className="bio">
         Aaron is a Freshman at UIUC in Mathematics + Computer Science. In his spare time he enjoys playing with his cat and reading.
      </div>
    </div>
    <div>
      <img className="profilepic" src={profilepic} alt="Foo"/>
      <div className="name">
        Foo
      </div>
      <div className="bio">
         Lorem ipsum dolor sit amet,
         consectetur adipiscing elit, sed do eiusmod tempor
         incididunt ut labore et dolore magna aliqua.
      </div>
    </div>
    <div>
      <img className="profilepic" src={profilepic} alt="Foo"/>
      <div className="name">
        Foo
      </div>
      <div className="bio">
         Lorem ipsum dolor sit amet,
         consectetur adipiscing elit, sed do eiusmod tempor
         incididunt ut labore et dolore magna aliqua.
      </div>
    </div>
    <div className="break"></div>
    <div>
      <img className="profilepic" src={profilepic} alt="Foo"/>
      <div className="name">
        Foo
      </div>
      <div className="bio">
         Lorem ipsum dolor sit amet,
         consectetur adipiscing elit, sed do eiusmod tempor
         incididunt ut labore et dolore magna aliqua.
      </div>
    </div>
    <div>
      <img className="profilepic" src={profilepic} alt="Foo"/>
      <div className="name">
        Foo
      </div>
      <div className="bio">
         Lorem ipsum dolor sit amet,
         consectetur adipiscing elit, sed do eiusmod tempor
         incididunt ut labore et dolore magna aliqua.
      </div>
    </div>
    <div>
      <img className="profilepic" src={profilepic} alt="Foo"/>
      <div className="name">
        Foo
      </div>
      <div className="bio">
         Lorem ipsum dolor sit amet,
         consectetur adipiscing elit, sed do eiusmod tempor
         incididunt ut labore et dolore magna aliqua.
      </div>
    </div>
  </div>
);

  class App extends Component {
    constructor(props) {
        super(props);
        // get date info
        var today = new Date();
        
        /*
        let curday = parseInt(today.getDate());
        let curmonth = parseInt(today.getMonth() + 1);
        let curyear = parseInt(today.getFullYear());
        */

        let curday = 2;
        let curmonth = 4;
        let curyear = 21;

        this.state = { 
          crimes : [] ,
          day : curday,
          month : curmonth,
          year : curyear,
          redDaysThreshold : 7,
          yellowMonthThreshold : 1

        };
    }
  
    getCrimes = () => {
        fetch("/api/crimes")
        .then(res => res.json())
        .then(res => this.setState({ crimes: Array.from(res) }))
        .catch(err => console.log(err));
    }
    
    // Red only map
    RedMap = () => (
      <div className="map-legend-outerContainer">
            <div className="iconlegend">
              <h2><b>Red Map</b></h2>
              This map only displays the red markers, which are crimes that happened in the past {this.state.redDaysThreshold} days.
            </div>
      <div className="redMap">
        <MapContainer center={[location.lat, location.lng]} zoom={location.zoom} >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {this.state.crimes.map((crime, i) => 
        <Marker
      //key={crime.CaseID}
      position={[crime.Latitude, crime.Longitude]} 
      
      icon = {this.returnRed(crime)}
      
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
          </MapContainer> 
      </div>
      </div>
      );

      YellowMap = () => (
        <div className="map-legend-outerContainer">
            <div className="iconlegend">
              <h2><b>Yellow Map</b></h2>
              This map only displays the yellow markers, which are crimes that happened in the past {this.state.yellowMonthThreshold} months.
            </div>
        <div className="yellowMap">
          <MapContainer center={[location.lat, location.lng]} zoom={location.zoom} >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {this.state.crimes.map((crime, i) => 
          <Marker
        //key={crime.CaseID}
        position={[crime.Latitude, crime.Longitude]} 
        
        icon = {this.returnYellow(crime)}
        
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
            </MapContainer> 
        </div></div>
        );    

        GreenMap = () => (
          <div className="map-legend-outerContainer">
            <div className="iconlegend">
              <h2><b>Green Map</b></h2>
              This map displays all crimes currently in the <a href="https://police.illinois.edu/crime-reporting/daily-crime-log/">University Police Daily Crime Log</a>.
            </div>
          <div className="yellowMap">
            <MapContainer center={[location.lat, location.lng]} zoom={location.zoom} >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              {this.state.crimes.map((crime, i) => 
            <Marker
          //key={crime.CaseID}
          position={[crime.Latitude, crime.Longitude]} 
          
          icon = {greenIcon}
          
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
              </MapContainer> 
          </div>
          </div>
          );    

    crimeDate(props) {
      const crime = props;
      var dateOccurred = crime.DateOccurred.split("/");
      var monthOccurred = parseInt(dateOccurred[0]);
      var dayOccurred = parseInt(dateOccurred[1]);      
      if ((Math.abs(dayOccurred - this.state.day) <= this.state.redDaysThreshold && monthOccurred === this.state.month) || 
      // Check if previous month date is within the  7 day threshold
      ((dayOccurred + this.state.redDaysThreshold > 30) && ((dayOccurred + this.state.redDaysThreshold) % 30) >= this.state.day && monthOccurred + 1 === this.state.month)) {
        return redIcon;
      } else if (Math.abs(monthOccurred - this.state.month) <= this.state.yellowMonthThreshold) {
        return yellowIcon;
      }
      return greenIcon;
    }

    returnRed(props) {
      const crime = props;
      var dateOccurred = crime.DateOccurred.split("/");
      var monthOccurred = parseInt(dateOccurred[0]);
      var dayOccurred = parseInt(dateOccurred[1]);
      if ((Math.abs(dayOccurred - this.state.day) <= this.state.redDaysThreshold && monthOccurred === this.state.month) || 
      // Check if previous month date is within the  7 day threshold
      ((dayOccurred + this.state.redDaysThreshold > 30) && ((dayOccurred + this.state.redDaysThreshold) % 30) >= this.state.day && monthOccurred + 1 === this.state.month)) {
        return redIcon;
      } return noIcon;
    }

    returnYellow(props) {
      const crime = props;
      var dateOccurred = crime.DateOccurred.split("/");
      var monthOccurred = parseInt(dateOccurred[0]);
      var dayOccurred = parseInt(dateOccurred[1]);
      if (Math.abs(monthOccurred - this.state.month) <= this.state.yellowMonthThreshold) {
        return yellowIcon;
      } return noIcon;
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
                <a href="/" className="logo">
                  {/* UIUC Crime Map */}
                <img  className = "fullLogo" src ={websitelogo2} alt="logo"/>
                
                  </a>
                


                  <div class="header-right">
                  <a href="https://github.com/aayu3/UIUCCrimeMap">
                    <button href="https://github.com/aayu3/UIUCCrimeMap" type="button" class="btn btn-outline-light">
                      <i class="fa fa-github"></i> GitHub</button>
                      </a>
                    <a href="/team">
                      <button href=" /team" type="button" class="btn btn-outline-light">Team</button>
                    </a>
                    <a href="/about">
                    <button href=" /about" type="button" class="btn btn-outline-light">About</button>
                    </a>
                    <a href="/greenMap">
                    <button href=" /greenMap" type="button" class="btn btn-outline-success">Green Marker Map</button>
                      </a>
                    <a href="/yellowMap">
                    <button href=" /yellowMap" type="button" class="btn btn-outline-warning">Yellow Marker Map</button>
                      </a>
                    <a href="/redMap">
                    <button href=" /redMap" type="button" class="btn btn-outline-danger">Red Marker Map</button>
                      </a>
                     
                </div>

              </div>
              <Switch>
              <Route path="/" exact render={() =>
              <div className="map-legend-outerContainer">
            <div className="iconlegend">
              <h2><b>Legend:</b></h2>
              <h5>Crimes within...</h5>
              <img src={redMarker}/> {this.state.redDaysThreshold} Days
              <br></br>
              <br></br>
              <img src={yellowMarker}/>{this.state.yellowMonthThreshold} Months
              <br></br>
              <br></br>
              <img src={greenMarker}/>All Time
            </div>
      
        <div className="map">
        <MapContainer center={[location.lat, location.lng]} zoom={location.zoom} >
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
      
   

        </MapContainer> 

        </div>
        </div> }/>

                <Route path="/about" component={About} />
                <Route path="/team" component={team} />
                <Route path="/greenMap" component={this.GreenMap} />
                <Route path="/yellowMap" component={this.YellowMap} />
                <Route path="/redMap" component={this.RedMap} />
              </Switch>
            </main>
          </Router>
      </div>
        );
    }
  }
  
  export default App;
  
  
  

