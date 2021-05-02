import React from "react";
import { Component } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import websitelogo2 from './icons/websitelogo2.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import profilepic from './icons/defaultprofilepic.png';
import aaronyu from './icons/aaronpfp.png';
import petervandervelde from './icons/peterpfp.png';
import angelshah from './icons/angelshah.jpg'
import mohammad from './icons/mohammadpfp.png';
import illiaborzov from './icons/illiapfp.jpg';
import CrimeMap from './CrimeMap';
import { createSliderWithTooltip, SliderTooltip } from "rc-slider";


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
      The data is scraped from the <a href="https://police.illinois.edu/crime-reporting/daily-crime-log/">University Police Daily Crime Log</a>, which is updated daily. It is then pushed to a MongoDB Atlas database which this website interacts with through the <code>express.js</code> backend.
      <br></br>
      <br></br>
      Red markers indicate a crime that has occured in the last week, yellow markers indicate a crime that happened in the last month,
       and green markers indicate every crime in the <a href="https://police.illinois.edu/crime-reporting/daily-crime-log/">University Police Daily Crime Log</a>.
        By clicking on the points on the map, you can find information about the crime type, date,
      location, and incident code for every crime occured on campus.
      <br></br>
      <br></br>
      To filter crimes by their date, you can click on the markers in the legend to view only the markers of those colors.
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

      <a href="https://github.com/r0ckwav3"><img className="profilepic" src={petervandervelde} alt="Peter Vandervelde"/></a>
      <div className="name">
        Peter Vandervelde
      </div>
      <div className="bio">
        Peter is a High Schooler at Proof School who is interested in CS and Mathematics. His hobbies include acrobatics and digital drawing.

      </div>
    </div>
    <div>
      <a href="https://github.com/jchoi25"><img className="profilepic" src={profilepic} alt="Juyoung Choi"/></a>
      <div className="name">
        Juyoung Choi
      </div>
      <div className="bio">
        I am a Freshman at UIUC majoring in Physics from South Korea. I love observing the night sky and playing the guitar.
      </div>
    </div>
    <div className="break"></div>
    <div>
    <a href="https://github.com/Angel-Shah"><img className="profilepic" src={angelshah} alt="Angel Shah"/></a>
      
      <div className="name">
        Angel Shah
      </div>
      <div className="bio">
         Angel is a sophomore studying Computer Engineering at the University of Waterloo. In his spare time, he loves learning piano and reading. <i class="fa fa-book"></i>
      </div>
    </div>
    <div>
      <a href="https://github.com/zer0key123"><img className="profilepic" src={illiaborzov} alt="Illia Borzov"/></a>
      
      <div className="name">
        Illia Borzov
      </div>
      <div className="bio">
         Illia is a freshman studying Computer Science at NYU. In addition to CS, he enjoys linguistics and graphic design.
      </div>
    </div>
    <div>
      <a href="https://github.com/mraahemi"><img className="profilepic" src={mohammad} alt="Mohammad"/></a>
      <div className="name">
        Mohammad Raahemi
      </div>
      <div className="bio">
      Mohammad is an MSc student at the University of Ottawa.<br></br> He is studying CS as his major program, and his minor stream is in Data Science.
      </div>
    </div>
  </div>
);
const Range = createSliderWithTooltip(Slider.Range);

  class App extends Component {
    constructor(props) {
        super(props);
        // get date info
        var today = new Date();
        
        let curday = parseInt(today.getDate());
        let curmonth = parseInt(today.getMonth() + 1);
        let curyear = parseInt(today.getFullYear());
        let redDaysThreshold = 7;
        let yellowDaysThreshold = 30;
        

        this.state = { 
          allCrimes : [],
          crimesToDisplay : [] ,
          thresholds : [redDaysThreshold, yellowDaysThreshold],
          date : [curday, curmonth, curyear],
          day : curday,
          month : curmonth,
          year : curyear,
          rangeValue : [0, redDaysThreshold, yellowDaysThreshold],
          rangeMin : 1,
          rangeMax : 60
        };

        // bind function to use this
        this.changeToYellow = this.changeToYellow.bind(this);
        this.changeToRed = this.changeToRed.bind(this);
        this.resetMap = this.resetMap.bind(this);
        this.onSliderChange = this.onSliderChange.bind(this);
    }

    resetMap() {
      this.setState({crimesToDisplay : this.state.allCrimes});
    }

    changeToYellow() {
      let filtered = this.filterYellow(this.state.allCrimes);
      this.setState( {crimesToDisplay : filtered});
    }

    filterYellow(crimes) {
      var filtered = [];

      for (var i = 0; i < crimes.length; i++) {
        let crime = crimes[i];
        var dateOccurred = crime.DateOccurred.split("/");
        var monthOccurred = parseInt(dateOccurred[0]);
        var dayOccurred = parseInt(dateOccurred[1]);
        var yearOccurred = parseInt(dateOccurred[2]);

        var curDateInDays = this.state.day + (this.state.month - 1) * 30 + (this.state.year - 2000) * 365;
        var dateOccurredInDays = dayOccurred + (monthOccurred -1) * 30 + (yearOccurred - 2000) * 365;
        if (curDateInDays - dateOccurredInDays <= this.state.thresholds[1]) {
          filtered.push(crime);
        } 
      }
      return filtered;
    }

    changeToRed() {
      let filtered = this.filterRed(this.state.allCrimes);
      this.setState( {crimesToDisplay : filtered});
    }

    filterRed(crimes) {
      var filtered = [];

      for (var i = 0; i < crimes.length; i++) {
        let crime = crimes[i];
        var dateOccurred = crime.DateOccurred.split("/");
        var monthOccurred = parseInt(dateOccurred[0]);
        var dayOccurred = parseInt(dateOccurred[1]);
        var yearOccurred = parseInt(dateOccurred[2]);

        var curDateInDays = this.state.day + (this.state.month - 1) * 30 + (this.state.year - 2000) * 365;
        var dateOccurredInDays = dayOccurred + (monthOccurred -1) * 30 + (yearOccurred - 2000) * 365;
        if (curDateInDays - dateOccurredInDays <= this.state.thresholds[0]) {
          filtered.push(crime);
        } 
      }
      return filtered;
    }
    
    getCrimes = () => {
        fetch("/api/crimes")
        .then(res => res.json())
        .then(res => this.setState({ allCrimes: Array.from(res) , crimesToDisplay : Array.from(res)}))
        .catch(err => console.log(err));
    }
  
    componentDidMount() {
        this.getCrimes();
    }

    onSliderChange(value) {
      let newThreshold = [value[1], value[2]];
      this.setState({thresholds : newThreshold});
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
                  <a href="https://youtu.be/1rHvtO1x0PI">
                    <button href="https://youtu.be/1rHvtO1x0PI" type="button" class="btn btn-outline-light">
                      <i class="fa fa-youtube"></i> YouTube</button>
                      </a>
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
                     
                </div>

              </div>
              <Switch>
              <Route path="/" exact render={() =>
              <div className="map-legend-outerContainer">
            <div className="iconlegend">
              <h2><b>Legend:</b></h2>
              <h5>Crimes within...</h5>
              <button onClick={this.changeToRed} type="button" class="btn btn-danger">Filter Red Only</button> <br></br>
              Crimes within {this.state.thresholds[0]} Days.  
              <br></br>
              <br></br>
              <button onClick={this.changeToYellow} type="button" class="btn btn-warning">Filter Yellow Only</button> <br></br>
              Crimes within {this.state.thresholds[1]} Days.
              <br></br>
              <br></br>
              <button onClick={this.resetMap} type="button" class="btn btn-outline-primary">Reset Map</button> 
              <br></br>
              <br></br>
              <h3>Crime Threshold Slider</h3>
              <Range 
              allowCross={false} 
              marks={{1: "1 Day", 60 : "60 Days"}}
              defaultValue={this.state.rangeValue} 
              min={this.state.rangeMin} 
              max = {this.state.rangeMax}
              tipFormatter={value => `${value} days`}
              trackStyle={[ { backgroundColor: 'red' }, { backgroundColor: '#DADD2D' }]}
              railStyle={{ backgroundColor: 'green' }}
              onAfterChange = {this.onSliderChange}
              /> 
            </div>
      
        <div className="map">
        <CrimeMap 
        crimeData={this.state.crimesToDisplay} 
        location={location}
        date = {this.state.date}
        thresholds = {this.state.thresholds}>
        </CrimeMap>

        </div>
        </div> }/>

                <Route path="/about" component={About} />
                <Route path="/team" component={team} />
              </Switch>
            </main>
          </Router>
      </div>
        );
    }
  }
  
  export default App;
  
  
  

