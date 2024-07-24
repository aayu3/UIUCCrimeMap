import { IconButton, Paper, Slider, Typography } from "@material-ui/core";
import ChevronUpIcon from "@material-ui/icons/ExpandLess";
import ChevronDownIcon from "@material-ui/icons/ExpandMore";
import { createTheme, ThemeProvider } from '@material-ui/core/styles'

import "jspdf-autotable";
import RCSlider, { createSliderWithTooltip } from "rc-slider";
import "rc-slider/assets/index.css";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import { Link, Route, Switch } from "react-router-dom";
import "./App.css";
import About from "./components/About/About";
import Map from "./components/map/Map";
import Team from "./components/Team/Team";
import { ReactComponent as Logo } from "./icons/websitelogo.svg";
import { generatePDF } from "./PDFGenerator";

// Define Center Location
const location = {
  address: "1401 West Green Street, Urbana, Illinois.",
  lat: 40.1092,
  lng: -88.2272,
  zoom: 17,
};

// Default date, if something has this as the date, means that something got fucked up
const defaultDate = new Date(1868, 2, 1);
const currentDate = new Date();
let mode = localStorage.getItem("theme");
var modeLabel = "";
var buttonMode = "";

if (mode === null) {
  modeLabel = 'dark';
  buttonMode = 'light';
} else if (mode === 'light') {
  modeLabel = 'dark';
  buttonMode = 'light';
} else if (mode === 'dark') {
  modeLabel = 'light';
  buttonMode = 'dark';
}

export type CrimeEvent = {
  CaseID: string;
  DateReported: Date;
  TimeReported: string;
  DateOccurred: Date;
  TimeOccurred: string;
  Latitude: number;
  Longitude: number;
  StreetAddress: string;
  Description: string;
  Disposition: string;
};
const Range = createSliderWithTooltip(RCSlider.Range);
const routes = [
  { name: "Map", path: "/" },
  { name: "About", path: "/about" },
  { name: "UIUC Police", path: "https://police.illinois.edu/", external: true },
  { name: "Team", path: "/team" },
];
const defaultRangeValue = [60] as [number];
const defaultTimeRange = [0, 24] as [number, number];

const App: React.FC = (props) => {
  const inIFrame = useMemo(() => {
    try {
      return window.self !== window.top;
    } catch (e) {
      return true;
    }
  }, []);
  const [crimesToDisplay, setCrimesToDisplay] = useState<CrimeEvent[]>([]);
  const [rangeValue, setRangeValue] = useState<[number]>(defaultRangeValue);
  const [timeRange, setTimeRange] =
    useState<[number, number]>(defaultTimeRange);
  const [sixtyDayCrimes, setSixtyDayCrimes] = useState<CrimeEvent[]>([]);
  const [showLegend, setShowLegend] = useState(false);
  const [toggle, setToggle] = useState<string | null>(localStorage.getItem('theme'));

  const resetMap = useCallback(() => {
    setRangeValue(defaultRangeValue);
    setTimeRange(defaultTimeRange);
  }, [setRangeValue, setTimeRange]);

  const changeMode = useCallback(() => {
    if (toggle === 'light') {
      setToggle('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      setToggle('light');
      localStorage.setItem('theme', 'light');
    }
    window.location.reload();
  }, [toggle]);


  const savePDF = useCallback(() => {
    const doc = generatePDF(sixtyDayCrimes);
    doc.save("Daily_Crime_Log.pdf");
  }, [sixtyDayCrimes]);

  useEffect(() => {
    let mode = localStorage.getItem("theme");
    if (mode === null) {
      setToggle("light");
      localStorage.setItem('theme', 'light');
    } else {
      setToggle(mode);
    }
  }, []);

  useEffect(() => {
    (async () => {
      const r = await fetch(
        process.env.NODE_ENV === "development"
          ? "http://localhost:5000/api/crimes?days=60"
          : "/api/crimes?days=60"
      );
      const json = await r.json();
      const crimes = (Array.from(json) as CrimeEvent[]).map((x) => { return {...x, DateOccurred: new Date(x.DateOccurred), DateReported: new Date(x.DateReported)};
      });
      setSixtyDayCrimes(crimes);
    })();
  }, []);

  const filterTime = (crimes: CrimeEvent[], timeRange: [number, number]) => {
    var filtered = [];
    for (var i = 0; i < crimes.length; i++) {
      let crime = crimes[i];
      var rawTime = ["N/A"];
      if (crime.TimeOccurred.includes(":")) {
        rawTime = crime.TimeOccurred.split(":");
      } else if (crime.TimeReported.includes(":")) {
        rawTime = crime.TimeReported.split(":");
      }
      var timeOccurred = parseInt(rawTime[0]);
      if (Number.isNaN(timeOccurred)) {
        filtered.push(crime);
        // <= to account for 23-23:59 case i.e. when the time filter circles are on eachother
      } else if (timeOccurred >= timeRange[0] && timeOccurred <= timeRange[1]) {
        filtered.push(crime);
      }
    }
    return filtered;
  };
  const filterRange = (crimes: CrimeEvent[], range: number) => {
    var filtered = [];
    for (let i = 0; i < crimes.length; i++) {
      let crime = crimes[i];
      let daysBetween = 61;
      if (!(crime.DateOccurred === defaultDate)) {
        
        daysBetween =
        (currentDate.getTime() - crime.DateOccurred.getTime()) / 1000 / 60 / 60 / 24;
      } else if (!(crime.DateReported === defaultDate)) {
        daysBetween =
        (currentDate.getTime() - crime.DateReported.getTime()) / 1000 / 60 / 60 / 24;
      }
      if (0 <= daysBetween && daysBetween <= range) {
        filtered.push(crime);
      }
    }
    return filtered;
  };

  useEffect(() => {
    let filtered = filterRange(sixtyDayCrimes, rangeValue[0]);
    filtered = filterTime(filtered, timeRange);

    setCrimesToDisplay(filtered);
  }, [sixtyDayCrimes, rangeValue, timeRange, setCrimesToDisplay]);

  const onSliderChange = (value: number[]) => {
    setRangeValue(value as [number]);
  };

  const onTimerChange = (value: number[]) => {
    setTimeRange(value as [number, number]);
  };
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  const darkTheme = createTheme({ palette: { type: 'dark' } });
  const lightTheme = createTheme({ palette: { type: 'light' } });

  return (
    <div>
      <main
        style={{
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          flexWrap: "nowrap",
        }}
      >
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
                    <Nav.Link
                      href={"https://github.com/aayu3/UIUCCrimeMap"}
                      target="_blank"
                    >
                      GitHub
                    </Nav.Link>
                    <Nav.Link
                      href={"https://youtu.be/1rHvtO1x0PI"}
                      target="_blank"
                    >
                      YouTube
                    </Nav.Link>
                  </>
                ) : (
                  <></>
                )}
                <Nav.Item>
                  <Button onClick={savePDF} variant={buttonMode}>
                    Generate PDF
                  </Button>
                </Nav.Item>
                <Nav.Item>
                  <Button onClick={changeMode} variant={buttonMode}>
                    {modeLabel} Mode
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
              <div
                className="map-legend-outerContainer"
                style={{
                  minHeight: "1px",
                  flex: 1,
                  flexWrap: "nowrap",
                  flexDirection: "column",
                }}
              >
                <div className="map" style={{ flex: 1, overflow: "hidden" }}>
                  <Map crimeData={crimesToDisplay} location={location} mode={toggle} />CC
                </div>
                {/* <Fab color="primary" aria-label="open-legend" className={styles.fab} onClick={()=>setShowLegend((cv)=>!cv)}>
                  <ExploreIcon/>
                </Fab> */}
                <ThemeProvider theme={(buttonMode as string === "dark") ? darkTheme : lightTheme}>

                  <Paper
                    className="iconlegend"
                    style={
                      !isTabletOrMobile
                        ? {
                          padding: showLegend ? 32 : "0 16px",
                          position: "absolute",
                          top: "50%",
                          transform: "translate(0,-50%)",
                          right: 16,
                        }
                        : {
                          left: 0,
                          bottom: 0,
                          right: 0,
                          padding: showLegend ? 24 : "0 16px",
                          fontSize: 16,
                          flexShrink: 0,
                        }
                    }
                  >
                    {showLegend && false ? undefined : (
                      <>
                        {isTabletOrMobile ? (
                          <>
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <IconButton
                                onClick={() => setShowLegend((cv) => !cv)}
                                edge={"start"}
                              >
                                {showLegend ? (
                                  <ChevronDownIcon />
                                ) : (
                                  <ChevronUpIcon />
                                )}
                              </IconButton>
                              <Typography>Legend & Filters</Typography>
                            </div>
                          </>
                        ) : (
                          <>
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <IconButton
                                onClick={() => setShowLegend((cv) => !cv)}
                                edge={"start"}
                              >
                                {showLegend ? (
                                  <ChevronUpIcon />
                                ) : (
                                  <ChevronDownIcon />
                                )}
                              </IconButton>
                              <Typography>Legend & Filters</Typography>
                            </div>
                          </>
                        )}
                      </>
                    )}
                    {showLegend ? (
                      <>
                        <Typography id="time-of-day-slider" gutterBottom>
                          Time of Day
                        </Typography>
                        <Slider
                          value={timeRange as any as number}
                          onChange={(event: any, newValue: number | number[]) =>
                            onTimerChange(newValue as any as [number, number])
                          }
                          valueLabelDisplay="auto"
                          aria-labelledby="time-of-day-slider"
                          valueLabelFormat={(value: number, index: number) =>
                            `${value}:${index > 0 ? "59" : "00"}`
                          }
                          getAriaValueText={(value: number, index: number) =>
                            `${value}:${index > 0 ? "59" : "00"}`
                          }
                          min={0}
                          max={23}
                        />
                        <br></br>
                        <br></br>
                        <h3 style={{ fontSize: "1em", color: (modeLabel as string === 'dark') ? 'black' : 'white' }}>Recency</h3>
                        <Range
                          allowCross={false}
                          marks={{ 1: "1 Day", 60: "60 Days" }}
                          value={rangeValue}
                          min={1}
                          max={60}
                          draggableTrack={true}
                          tipFormatter={(value: any) => `${value} days`}
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
                        <br></br>
                        <br></br>
                        <h4 style={{ fontSize: "1em", color: (modeLabel as string === 'dark') ? 'black' : 'white' }}>
                          {crimesToDisplay.length}/{sixtyDayCrimes.length} Crimes
                        </h4>
                      </>
                    ) : undefined}
                  </Paper>
                </ThemeProvider>
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
