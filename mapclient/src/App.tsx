import "jspdf-autotable";
import Slider, { createSliderWithTooltip } from "rc-slider";
import "rc-slider/assets/index.css";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";
import {
  Button,
  Container,
  Nav, Navbar
} from "react-bootstrap";
import { Link, Route, Switch } from "react-router-dom";
import "./App.css";
import About from "./components/About/About";
import Team from "./components/Team/Team";
import CrimeMap from "./CrimeMap";
import { ReactComponent as Logo } from "./icons/websitelogo.svg";
import { generatePDF } from "./PDFGenerator";




// Define Center Location
const location = {
  address: "1401 West Green Street, Urbana, Illinois.",
  lat: 40.1092,
  lng: -88.2272,
  zoom: 17,
};

export type RawCrimeEvent = {
  CaseID: string;
  DateReported: string;
  TimeReported: string;
  DateOccurred: string;
  TimeOccurred: string;
  Latitude: number;
  Longitude: number;
  StreetAddress: string;
  Description: string;
  Disposition: string;
};
export type JSCrimeEvent = RawCrimeEvent & { jsDate: Date };
const Range = createSliderWithTooltip(Slider.Range);
const routes = [
  { name: "Map", path: "/" },
  { name: "About", path: "/about" },
  { name: "UIUC Police", path: "https://police.illinois.edu/", external: true },
  { name: "Team", path: "/team" },
];
const defaultRangeValue=[60] as [number];
const defaultTimeRange=[0,23] as [number,number];
const App: React.FC = (props) => {
  const inIFrame = useMemo(() => {
    try {
      return window.self !== window.top;
    } catch (e) {
      return true;
    }
  }, []);
  const [allCrimes, setAllCrimes] = useState<JSCrimeEvent[]>([]);
  const [crimesToDisplay, setCrimesToDisplay] = useState<JSCrimeEvent[]>([]);
  const [rangeValue, setRangeValue] = useState<[number]>(defaultRangeValue);
  const [timeRange, setTimeRange] = useState<[number, number]>(defaultTimeRange);
  const [sixtyDayCrimes, setSixtyDayCrimes] = useState<JSCrimeEvent[]>([]);

  const resetMap = useCallback(() => {
    setRangeValue(defaultRangeValue);
    setTimeRange(defaultTimeRange);
  }, [setRangeValue,setTimeRange]);

  const savePDF = useCallback(() => {
    const doc = generatePDF(sixtyDayCrimes);
    doc.save("Daily_Crime_Log.pdf");
  }, [sixtyDayCrimes]);

  useEffect(() => {
    (async () => {
      const r = await fetch(
        process.env.NODE_ENV === "development"
          ? "https://uiuccrimemap.herokuapp.com/api/crimes"
          : "/api/crimes"
      );
      const json = await r.json();
      const crimes = (Array.from(json) as RawCrimeEvent[]).map((x) => {
        let datee = x.DateOccurred.split("/");
        return {
          ...x,
          jsDate: new Date([datee[2], datee[0], datee[1]].join("/")),
        };
      });
      setAllCrimes(crimes);
    })();
  }, []);

  useEffect(()=>{
    // Sixty Day Filter
    let sixtyDayCrimesA = [];
    for (let i = 0; i < allCrimes.length; i++) {
      let crime = allCrimes[i];
      let daysBetween = (+new Date() - +crime.jsDate) / 1000 / 60 / 60 / 24;
      if (daysBetween <= 60) {
        sixtyDayCrimesA.push(crime);
      }
    }
    setSixtyDayCrimes(sixtyDayCrimesA);
  },[allCrimes]);

  const filterTime = (crimes: JSCrimeEvent[], timeRange: [number, number]) => {
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
  };
  const filterRange = (crimes: JSCrimeEvent[], range: number) => {
    var filtered = [];
    for (let i = 0; i < crimes.length; i++) {
      let crime = crimes[i];
      let daysBetween = (+new Date() - +crime.jsDate) / 1000 / 60 / 60 / 24;
      if (daysBetween <= range) {
        filtered.push(crime);
      }
    }
    return filtered;
  };
  useEffect(()=>{
    let filtered = filterRange(sixtyDayCrimes, rangeValue[0]);
    filtered = filterTime(filtered, timeRange);
    setCrimesToDisplay(filtered);
  },[sixtyDayCrimes,rangeValue,timeRange,setCrimesToDisplay])

  const onSliderChange = (value: number[]) => {
    setRangeValue(value as [number]);
  };


  const onTimerChange = (value: number[]) => {
    setTimeRange(value as [number, number]);
  };

  return (
    <div>
      <main style={{height:"100vh",overflow:"hidden",display:'flex',flexDirection:"column",flexWrap:"nowrap"}}>
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
                {!inIFrame ? (
                  <>
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
                    <Nav.Link href={"https://github.com/aayu3/UIUCCrimeMap"} target="_blank">
                      GitHub
                    </Nav.Link>
                    <Nav.Link href={"https://youtu.be/1rHvtO1x0PI"} target="_blank">
                      YouTube
                    </Nav.Link>
                  </>
                ) : (
                  <></>
                )}
                <Nav.Item>
                  <Button onClick={savePDF} variant="light">
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
              <div className="map-legend-outerContainer" style={{minHeight:"1px",flex:1}}>
                <div className="iconlegend">
                  <h2>
                    <b>Legend:</b>
                  </h2>
                  {/*
                    <h5>Crimes within...</h5>
                    
                    
                    <button
                      onClick={this.changeToRed}
                      type="button"
                      class="btn btn-danger"
                      // style={{width:"100%",background: `linear-gradient(to bottom, ${[0,1,2,3,4].map(x=>x/4).map(x=>x*this.state.thresholds[1]).map(q=>`hsl(${q*180/60},70%,50%)`).join(', ')})`}}
                    
                      style={{width:"100%",background: `hsl(${(0.5*this.state.thresholds[1])*180/60},70%,50%)`}}
                      >
                      Last 0-{this.state.thresholds[1]} Days
                    </button><br/>
                    <button
                      onClick={this.changeToYellow}
                      type="button"
                      class="btn btn-warning"
                      style={{width:"100%",background: `hsl(${(0.5*this.state.thresholds[1]+0.5*this.state.thresholds[2])*180/60},70%,50%)`}}
                    
                      // style={{width:"100%",background: `linear-gradient(to bottom, ${[0,1,2,3,4].map(x=>x/4).map(x=>(1-x)*this.state.thresholds[1]+x*this.state.thresholds[2]).map(q=>`hsl(${q*180/60},70%,50%)`).join(', ')})`}}
                    >
                      Last {this.state.thresholds[1]}-{this.state.thresholds[2]} Days
                    </button>
                    
                    <br></br>
                    <br></br>
                  */}

                  <h3>Time of Day Slider</h3>
                  <h4>{crimesToDisplay.length} Crimes</h4>
                  <Range
                    allowCross={false}
                    marks={{ 0: "12 AM", 23: "11 PM" }}
                    value={timeRange as number[]}
                    min={0}
                    max={23}
                    tipFormatter={(value) => `${value}:00`}
                    railStyle={{ backgroundColor: "black" }}
                    trackStyle={[{backgroundColor:"#FF552E"}]}
                    onChange={onTimerChange}
                    draggableTrack={true}
                  />
                  <br></br>
                  <br></br>
                  <h3>Crime Threshold Slider</h3>
                  <Range
                    allowCross={false}
                    marks={{ 1: "1 Day", 60: "60 Days" }}
                    value={rangeValue}
                    min={1}
                    max={60}
                    draggableTrack={true}
                    tipFormatter={(value) => `${value} days`}
                    trackStyle={[
                      { backgroundColor: "transparent" },
                      { backgroundColor: "transparent" },
                    ]}
                    railStyle={{
                      background:
                        "linear-gradient(to right, hsl(0,100%,50%),hsl(45,100%,50%),hsl(90,100%,50%),hsl(135,100%,50%), hsl(180,100%,50%))",
                    }}
                    onChange={onSliderChange}
                  />
                  <br></br>
                  <br></br>
                  <button
                    onClick={resetMap}
                    type="button"
                    className="btn btn-primary"
                  >
                    Reset Map
                  </button>
                </div>

                <div className="map" style={{height:"100%"}}>
                  <CrimeMap
                    crimeData={crimesToDisplay}
                    location={location}
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
};

export default App;