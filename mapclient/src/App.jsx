import React, { Component } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./App.css";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import {
  Button,
  Container,
  Nav,
  NavDropdown,
  NavbarBrand,
  Navbar,
} from "react-bootstrap";
import websitelogo2 from "./icons/websitelogo2.png";
import Ilogo2 from "./icons/illinois_logo.svg";

import uiuclogo from "./icons/uiuclogo.png";
import { ReactComponent as Logo } from "./icons/websitelogo.svg";
import CrimeMap from "./CrimeMap";
import { createSliderWithTooltip, SliderTooltip } from "rc-slider";

import About from "./components/About/About";
import Team from "./components/Team/Team";

import jsPDF from "jspdf";
import "jspdf-autotable";

// Define Center Location
const location = {
  address: "1401 West Green Street, Urbana, Illinois.",
  lat: 40.1092,
  lng: -88.2272,
  zoom: 17,
};

const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const Range = createSliderWithTooltip(Slider.Range);
const routes = [
  { name: "Map", path: "/" },
  { name: "About", path: "/about" },
  { name: "UIUC Police", path: "https://police.illinois.edu/", external: true },
  { name: "Team", path: "/team" },
];
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
      allCrimes: [],
      crimesToDisplay: [],
      thresholds: [0, redDaysThreshold, yellowDaysThreshold],
      date: [curday, curmonth, curyear],
      day: curday,
      month: curmonth,
      year: curyear,
      rangeValue: [0, redDaysThreshold, yellowDaysThreshold],
      rangeMin: 1,
      rangeMax: 60,
      timeRange: [0, 23],
      divstyle: {},
      sixtyDayCrimes: [],
    };

    // bind function to use this
    this.changeToYellow = this.changeToYellow.bind(this);
    this.changeToRed = this.changeToRed.bind(this);
    this.resetMap = this.resetMap.bind(this);
    this.onSliderChange = this.onSliderChange.bind(this);
    this.onTimerChange = this.onTimerChange.bind(this);
    this.setSixtyDays = this.setSixtyDays.bind(this);
  }

  resetMap() {
    this.setState({ crimesToDisplay: this.state.sixtyDayCrimes });
  }

  sanitizeCrimes(crimes) {
    var pdfBody = [];
    for (var i = 0; i < crimes.length; i++) {
      let crime = crimes[i];
      console.log(crime.Description);
      pdfBody[i] = [
        crime.CaseID,
        crime.DateReported,
        crime.TimeReported,
        crime.DateOccurred,
        crime.TimeOccurred,
        crime.StreetAddress,
        crime.Description,
        crime.Disposition,
      ];
    }
    return pdfBody;
  }

  generatePDF(crimes) {
    const doc = new jsPDF("l");
    let pdfBody = this.sanitizeCrimes(crimes);
    // Or use javascript directly:
    doc.autoTable({
      head: [
        [
          "Incident",
          "Date Reported",
          "Time Reported",
          "Date Occurred",
          "Time Occurred",
          "General Location",
          "Crime Description",
          "Disposition",
        ],
      ],
      body: pdfBody,
    });
    doc.save("Daily_Crime_Log.pdf");
  }

  changeToYellow() {
    let filtered = this.filterYellow(this.state.sixtyDayCrimes);
    this.setState({ crimesToDisplay: filtered });
  }

  filterYellow(crimes) {
    var filtered = [];

    for (var i = 0; i < crimes.length; i++) {
      let crime = crimes[i];
      var dateOccurred = crime.DateOccurred.split("/");
      var monthOccurred = parseInt(dateOccurred[0]);
      var dayOccurred = parseInt(dateOccurred[1]);
      var yearOccurred = parseInt(dateOccurred[2]);

      var curDateInDays =
        this.state.day +
        (this.state.month - 1) * 30 +
        (this.state.year - 2000) * 365;
      var dateOccurredInDays =
        dayOccurred + (monthOccurred - 1) * 30 + (yearOccurred - 2000) * 365;
      if (
        this.state.thresholds[1] < curDateInDays - dateOccurredInDays &&
        curDateInDays - dateOccurredInDays <= this.state.thresholds[2]
      ) {
        filtered.push(crime);
      }
    }
    return filtered;
  }

  changeToRed() {
    let filtered = this.filterRed(this.state.sixtyDayCrimes);
    this.setState({ crimesToDisplay: filtered });
  }

  filterRed(crimes) {
    var filtered = [];

    for (var i = 0; i < crimes.length; i++) {
      let crime = crimes[i];
      var dateOccurred = crime.DateOccurred.split("/");
      var monthOccurred = parseInt(dateOccurred[0]);
      var dayOccurred = parseInt(dateOccurred[1]);
      var yearOccurred = parseInt(dateOccurred[2]);

      var curDateInDays =
        this.state.day +
        (this.state.month - 1) * 30 +
        (this.state.year - 2000) * 365;
      var dateOccurredInDays =
        dayOccurred + (monthOccurred - 1) * 30 + (yearOccurred - 2000) * 365;
      if (curDateInDays - dateOccurredInDays <= this.state.thresholds[1]) {
        filtered.push(crime);
      }
    }
    return filtered;
  }

  getCrimes = () => {
    fetch("/api/crimes")
      .then((res) => res.json())
      .then((res) => this.setState({ allCrimes: Array.from(res) }))
      .then((res) => this.setSixtyDays())
      .catch((err) => console.log(err));
  };

  inIframe() {
    try {
      return window.self !== window.top;
    } catch (e) {
      return true;
    }
  }

  setSixtyDays() {
    // Sixty Day Filter
    let crimes = [];
    for (let i = 0; i < this.state.allCrimes.length; i++) {
      let crime = this.state.allCrimes[i];
      let date = crime.DateOccurred.split("/").map((date) => parseInt(date));
      if (date[0] === this.state.month && date[2] === this.state.year) {
        crimes.push(crime);
      } else if (
        date[0] + 1 === this.state.month &&
        date[2] === this.state.year
      ) {
        let daysBefore = months[date[0] - 1] - date[1] + this.state.day;
        if (daysBefore <= 60) {
          crimes.push(crime);
        }
      } else if (
        date[0] + 2 === this.state.month &&
        date[2] === this.state.year
      ) {
        let daysBefore =
          months[date[0] - 1] - date[1] + months[date[0]] + this.state.day;
        if (daysBefore <= 60) {
          crimes.push(crime);
        }
      }
    }
    this.setState({ sixtyDayCrimes: crimes });
    this.setState({ crimesToDisplay: crimes });
  }

  componentDidMount() {
    this.getCrimes();

    if (this.inIframe()) {
      this.setState({ divstyle: { display: "none" } });
    }
  }

  onSliderChange(value) {
    let newThreshold = [value[0], value[1], value[2]];
    this.setState({ thresholds: newThreshold });
  }

  filterTime(crimes, timeRange) {
    var filtered = [];

    for (var i = 0; i < crimes.length; i++) {
      let crime = crimes[i];
      var rawTime = crime.TimeOccurred.split(":");
      var timeOccurred = parseInt(rawTime[0]);
      if (timeOccurred >= timeRange[0] && timeOccurred <= timeRange[1]) {
        filtered.push(crime);
      }
    }
    return filtered;
  }

  onTimerChange(value) {
    let newRange = [value[0], value[1]];
    let filtered = this.filterTime(this.state.sixtyDayCrimes, newRange);
    this.setState({ crimesToDisplay: filtered });
    this.setState({ timeRange: newRange });
  }

  render() {
    return (
      <div>
        <main>
          <Navbar bg="primary" variant="dark" expand="lg">
            <Container>
              <Navbar.Brand href="/">
                <Logo
                  style={{ height: "1.5em", display: "inline", flex: 0 }}
                ></Logo>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                  {routes.map((r) => {
                    if (r.external) {
                      return (
                        <Nav.Link key={r.name} href={r.path}>
                          {r.name}
                        </Nav.Link>
                      );
                    }
                    return (
                      <Switch key={r.name}>
                        <Route path={r.path} exact>
                          <Nav.Link key={r.name} active to={r.path} as={Link}>
                            {r.name}
                          </Nav.Link>
                        </Route>
                        <Route>
                          <Nav.Link key={r.name} to={r.path} as={Link}>
                            {r.name}
                          </Nav.Link>
                        </Route>
                      </Switch>
                    );
                  })}
                  <Nav.Link href={"https://github.com/aayu3/UIUCCrimeMap"}>
                    GitHub
                  </Nav.Link>
                  <Nav.Link href={"https://youtu.be/1rHvtO1x0PI"}>
                    YouTube
                  </Nav.Link>
                  <Nav.Item>
                    <Button
                      onClick={() =>
                        this.generatePDF(this.state.sixtyDayCrimes)
                      }
                      variant="light"
                    >
                      Generate PDF
                    </Button>
                  </Nav.Item>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <Switch>
            <Route
              path="/"
              exact
              render={() => (
                <div className="map-legend-outerContainer">
                  <div className="iconlegend">
                    <h2>
                      <b>Legend:</b>
                    </h2>
                    <h5>Crimes within...</h5>
                    <button
                      onClick={this.changeToRed}
                      type="button"
                      class="btn btn-danger"
                    >
                      Filter Red Only
                    </button>{" "}
                    <br></br>
                    {this.state.thresholds[1]} Days.
                    <br></br>
                    <br></br>
                    <button
                      onClick={this.changeToYellow}
                      type="button"
                      class="btn btn-warning"
                    >
                      Filter Yellow Only
                    </button>{" "}
                    <br></br>
                    {this.state.thresholds[2]} Days.
                    <br></br>
                    <br></br>
                    <button
                      onClick={this.resetMap}
                      type="button"
                      class="btn btn-primary"
                    >
                      Reset Map
                    </button>
                    <br></br>
                    <br></br>
                    <h3>Time of Day Slider</h3>
                    <h4>{this.state.crimesToDisplay.length} Crimes</h4>
                    <Range
                      allowCross={false}
                      marks={{ 0: "12 AM", 23: "11 PM" }}
                      defaultValue={this.state.timeRange}
                      min={0}
                      max={23}
                      tipFormatter={(value) => `${value}:00`}
                      railStyle={{ backgroundColor: "red" }}
                      onAfterChange={this.onTimerChange}
                    />
                    <br></br>
                    <br></br>
                    <h3>Crime Threshold Slider</h3>
                    <Range
                      allowCross={false}
                      marks={{ 1: "1 Day", 60: "60 Days" }}
                      defaultValue={this.state.rangeValue}
                      min={this.state.rangeMin}
                      max={this.state.rangeMax}
                      tipFormatter={(value) => `${value} days`}
                      trackStyle={[
                        { backgroundColor: "red" },
                        { backgroundColor: "#DADD2D" },
                      ]}
                      railStyle={{ backgroundColor: "green" }}
                      onAfterChange={this.onSliderChange}
                    />
                  </div>

                  <div className="map">
                    <CrimeMap
                      crimeData={this.state.crimesToDisplay}
                      location={location}
                      date={this.state.date}
                      thresholds={this.state.thresholds}
                    ></CrimeMap>
                  </div>
                </div>
              )}
            />

            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/team">
              <Team />
            </Route>
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
