import React, { Component } from "react";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import websitelogo2 from './icons/websitelogo2.png'
import 'bootstrap/dist/css/bootstrap.min.css';

import uiuclogo from './icons/uiuclogo.png';
import CrimeMap from './CrimeMap';
import { createSliderWithTooltip, SliderTooltip } from "rc-slider";

import About from './components/About/About';
import Team from './components/Team/Team';

import jsPDF from 'jspdf'
import 'jspdf-autotable'

// Define Center Location
const location = {
  address: '1401 West Green Street, Urbana, Illinois.',
  lat: 40.1092,
  lng: -88.2272,
  zoom: 17,
}

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
          thresholds : [0, redDaysThreshold, yellowDaysThreshold],
          date : [curday, curmonth, curyear],
          day : curday,
          month : curmonth,
          year : curyear,
          rangeValue : [0, redDaysThreshold, yellowDaysThreshold],
          rangeMin : 1,
          rangeMax : 60,
          pdf: false,
          timeRange : [0,23]
        };

        // bind function to use this
        this.changeToYellow = this.changeToYellow.bind(this);
        this.changeToRed = this.changeToRed.bind(this);
        this.resetMap = this.resetMap.bind(this);
        this.onSliderChange = this.onSliderChange.bind(this);
        this.onTimerChange = this.onTimerChange.bind(this);
    }

    resetMap() {
      this.setState({crimesToDisplay : this.state.allCrimes});
    }

    sanitizeCrimes(crimes) {
      var pdfBody = [];
      for (var i = 0; i < crimes.length; i++) {
        let crime = crimes[i];
        console.log(crime);
        pdfBody[i] = [crime.CaseID, crime.DateReported, crime.TimeReported, crime.DateOccurred, crime.TimeOccurred, crime.StreetAddress, crime.Description, crime.Disposition];
      }
      return pdfBody;
    }

    generatePDF(crimes) {
      const doc = new jsPDF('l');
      console.log("pdf generated");
      let pdfBody = this.sanitizeCrimes(crimes);
      // Or use javascript directly:
      doc.autoTable({
        head: [['Incident', 'Date Reported', 'Time Reported', 'Date Occurred', 'Time Occurred', 'General Location', 'Crime Description', 'Disposition']],
        body: pdfBody,
      });
      doc.save('Daily_Crime_Log.pdf');
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
        if (this.state.thresholds[1] < curDateInDays - dateOccurredInDays && curDateInDays - dateOccurredInDays <= this.state.thresholds[2]) {
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
        if (curDateInDays - dateOccurredInDays <= this.state.thresholds[1]) {
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
      let newThreshold = [value[0], value[1], value[2]];
      this.setState({thresholds : newThreshold});
    }
  
    filterTime(crimes, timeRange) {
      var filtered = [];

      for (var i = 0; i < crimes.length; i++) {
        let crime = crimes[i];
        var rawTime = crime.TimeOccurred.split(":");
        var timeOccurred = parseInt(rawTime[0]);
        if ((timeOccurred >= timeRange[0]) && (timeOccurred <= timeRange[1])) {
          filtered.push(crime);
        } 
      }
      return filtered;
    }

    onTimerChange(value) {
      let newRange = [value[0], value[1]];
      let filtered = this.filterTime(this.state.allCrimes, newRange);
      this.setState( {crimesToDisplay : filtered});
      this.setState({timeRange : newRange});
    }
    

    render() {
        return (
          <div>
          <Router basename={process.env.PUBLIC_URL}>
            <main>
              <div className="header">
                <div className="header-left">
                  <a target="_blank" href="/" className="logo">
                    {/* UIUC Crime Map */}
                    <img className="fullLogo" src ={websitelogo2} alt="logo"/>
                  </a>
                </div>

                <div class="header-right">
                  {/* 
                  <div className="youtube">
                    <a href="https://youtu.be/1rHvtO1x0PI">
                      <button href="https://youtu.be/1rHvtO1x0PI" type="button" class="btn btn-outline-light">
                        <i class="fa fa-youtube"></i> YouTube</button>
                    </a>
                  </div>
                  <div className="github">
                    <a href="https://github.com/aayu3/UIUCCrimeMap">
                      <button href="https://github.com/aayu3/UIUCCrimeMap" type="button" class="btn btn-outline-light">
                        <i class="fa fa-github"></i> GitHub</button>
                    </a>
                  </div>
                  */}
                  {/* For some reason using className="team" causes the header to break*/}
                  {/* 
                  <div id="team">
                    <a href="/team">
                      <button href=" /team" type="button" class="btn btn-outline-light">Team</button>
                    </a>
                  </div>
                 */}
                  {/* Be careful when changing about. This can break the whole header for some reason */}
                  {/* 
                    <a href="/about">
                      <button id="about" href=" /about" type="button" class="btn btn-outline-light">About</button>
                    </a>
                    */}
                  {/* 
                  <div className="uiuc police">
                    <a href="https://police.illinois.edu/">
                      <button href="https://police.illinois.edu/" type="button" class="btn btn-outline-light">
                        <img src={uiuclogo} width='5%'></img>  University Police Department</button>
                    </a>
                  </div>
                  */}
                  <div className="pdf">
                    <a>
                      <button onClick={() =>this.generatePDF(this.state.allCrimes)} type="button" class="btn btn-outline-light">Generate PDF</button>
                    </a> 
                  </div> 
                </div>

                

              </div>
              <Switch>
              <Route path="/" exact render={() =>
              <div className="map-legend-outerContainer">
            <div className="iconlegend">
              <h2><b>Legend:</b></h2>
              <h5>Crimes within...</h5>
              <button onClick={this.changeToRed} type="button" class="btn btn-danger">Filter Red Only</button> <br></br>
              {this.state.thresholds[1]} Days.  
              <br></br>
              <br></br>
              <button onClick={this.changeToYellow} type="button" class="btn btn-warning">Filter Yellow Only</button> <br></br>
              {this.state.thresholds[2]} Days.
              <br></br>
              <br></br>
              <button onClick={this.resetMap} type="button" class="btn btn-primary">Reset Map</button> 
              <br></br>
              <br></br>
              <h3>Time of Day Slider</h3>
              <h4>{this.state.crimesToDisplay.length} Crimes</h4>
              <Range 
              allowCross={false} 
              marks={{0: "12 AM", 23 : "11 PM"}}
              defaultValue={this.state.timeRange} 
              min={0} 
              max = {23}
              tipFormatter={value => `${value}:00`}
              railStyle={{ backgroundColor: 'red' }}
              onAfterChange = {this.onTimerChange}
              /> 
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

                <Route exact path="/about">
                  <About />
                </Route>
                <Route exact path="/team">
                  <Team />
                </Route>
              </Switch>
            </main>
          </Router>
      </div>
        );
    }
  }
  
export default App;