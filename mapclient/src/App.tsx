import { IconButton, Paper, Slider, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ChevronUpIcon from "@material-ui/icons/ExpandLess";
import ChevronDownIcon from "@material-ui/icons/ExpandMore";
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
import { TablePage } from "./pages";
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
export type JSCrimeEvent = RawCrimeEvent & {
  jsDateOccured: Date;
  jsDateTimeOccurred: Date;
  jsTimeOccurred: number;
};
const Range = createSliderWithTooltip(RCSlider.Range);
const routes = [
  { name: "Map", path: "/" },
  { name: "Table", path: "/table" },
  { name: "About", path: "/about" },
  { name: "UIUC Police", path: "https://police.illinois.edu/", external: true },
  { name: "Team", path: "/team" },
];
const defaultRangeValue = [60] as [number];
const defaultTimeRange = [0, 23] as [number, number];
const useStyles = makeStyles((theme) => ({
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));
const App: React.FC = (props) => {
  const styles = useStyles();
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
  const [timeRange, setTimeRange] =
    useState<[number, number]>(defaultTimeRange);
  const [sixtyDayCrimes, setSixtyDayCrimes] = useState<JSCrimeEvent[]>([]);
  const [showLegend, setShowLegend] = useState(false);

  const resetMap = useCallback(() => {
    setRangeValue(defaultRangeValue);
    setTimeRange(defaultTimeRange);
  }, [setRangeValue, setTimeRange]);

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
        let dateO = x.DateOccurred.split("/");
        let timeO = x.TimeOccurred;
        let dateR = x.DateReported.split("/");
        let timeR = x.TimeReported;
        const jsDateOccured = new Date(
          `${[dateO[2], dateO[0], dateO[1]].join("/")} ${"00:00"}`
        );
        const jsDateReported = new Date(
          `${[dateR[2], dateR[0], dateR[1]].join("/")} ${"00:00"}`
        );
        return {
          ...x,
          jsDateOccured,
          jsDateReported,
          jsDateTimeOccurred: new Date(
            `${[dateO[2], dateO[0], dateO[1]].join("/")} ${timeO}`
          ),
          jsDateTimeReported: new Date(
            `${[dateR[2], dateR[0], dateR[1]].join("/")} ${timeR}`
          ),
          jsTimeOccurred:
            +new Date(`${[dateO[2], dateO[0], dateO[1]].join("/")} ${timeO}`) -
            +new Date(`${[dateO[2], dateO[0], dateO[1]].join("/")} ${"00:00"}`),
          jsTimeReported:
            +new Date(`${[dateR[2], dateR[0], dateR[1]].join("/")} ${timeR}`) -
            +new Date(`${[dateR[2], dateR[0], dateR[1]].join("/")} ${"00:00"}`),
        };
      });
      setAllCrimes(crimes);
    })();
  }, []);

  useEffect(() => {
    // Sixty Day Filter
    let sixtyDayCrimesA = [];
    for (let i = 0; i < allCrimes.length; i++) {
      let crime = allCrimes[i];
      let daysBetween =
        (+new Date() - +crime.jsDateOccured) / 1000 / 60 / 60 / 24;
      if (daysBetween <= 60) {
        sixtyDayCrimesA.push(crime);
      }
    }
    setSixtyDayCrimes(sixtyDayCrimesA);
  }, [allCrimes]);

  const filterTime = (crimes: JSCrimeEvent[], timeRange: [number, number]) => {
    var filtered = [];
    for (var i = 0; i < crimes.length; i++) {
      let crime = crimes[i];
      var rawTime = crime.TimeOccurred.split(":");
      var timeOccurred = parseInt(rawTime[0]);
      if (Number.isNaN(timeOccurred)) {
        filtered.push(crime);
      } else if (timeOccurred >= timeRange[0] && timeOccurred <= timeRange[1]) {
        filtered.push(crime);
      }
    }
    return filtered;
  };
  const filterRange = (crimes: JSCrimeEvent[], range: number) => {
    var filtered = [];
    for (let i = 0; i < crimes.length; i++) {
      let crime = crimes[i];
      let daysBetween =
        (+new Date() - +crime.jsDateOccured) / 1000 / 60 / 60 / 24;
      if (daysBetween <= range) {
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
                  <Map crimeData={crimesToDisplay} location={location} />
                  {/* <CrimeMap
                    crimeData={crimesToDisplay}
                    location={location}
                  ></CrimeMap> */}
                </div>
                {/* <Fab color="primary" aria-label="open-legend" className={styles.fab} onClick={()=>setShowLegend((cv)=>!cv)}>
                  <ExploreIcon/>
                </Fab> */}
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
                      <h3 style={{ fontSize: "1em" }}>Recency</h3>
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
                      <h4 style={{ fontSize: "1em" }}>
                        {crimesToDisplay.length}/{sixtyDayCrimes.length} Crimes
                      </h4>
                    </>
                  ) : undefined}
                </Paper>
              </div>
            )}
          />

          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/team">
            <Team />
          </Route>
          <Route
            exact
            path="/table"
            render={() => <TablePage crimes={sixtyDayCrimes} />}
          />
        </Switch>
      </main>
    </div>
  );
};

export default App;
