import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  Paper,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React, { useEffect, useRef, useState } from "react";
import ReactMapGL, {
  GeolocateControl,
  MapRef,
  NavigationControl,
  Popup,
} from "react-map-gl";
import { CrimeEvent } from "../../App";
import { clusterLayer } from "./layers";
import classes from "./Map.module.scss";
import Pins from "./Pins";




const lightTransformRequest = (url: string, resourceType: string) => {
  // console.log(url,resourceType)
  if (resourceType === "Style") {
    return {
      url: 'https://api.maptiler.com/maps/positron/style.json?key=ZN4HZne3siYkMhBLqToY',
    };
  }
  if (url.match("api.mapbox.com")) {
    return { url: "" };
  }
  return {
    url: url,
  };
};

const darkTransformRequest = (url: string, resourceType: string) => {
  // console.log(url,resourceType)
  if (resourceType === "Style") {
    return {
      url: 'https://api.maptiler.com/maps/darkmatter/style.json?key=ZN4HZne3siYkMhBLqToY',
    };
  }
  if (url.match("api.mapbox.com")) {
    return { url: "" };
  }
  return {
    url: url,
  };
};


// if statement in main program and reload props

const Map: React.FC<{
  crimeData: CrimeEvent[];
  location: any;
  showNav?: boolean;
  mode: string | null;
}> = (properties) => {
  const { crimeData, location, showNav = true, mode } = properties;
  // public state: State = initialState;
  const [viewport, setViewport] = useState({
    height: "100%",
    latitude: 37.776021,
    longitude: -122.4171949,
    width: "100%",
    zoom: 14,
  });

  const [dcrime, setDcrime] = useState<CrimeEvent[]>([]);
  const mapRef = useRef<MapRef>(null);

  useEffect(() => {
    const onResize = () => {
      setViewport((prevState) => ({
        ...prevState,
        width: "100%",
        height: "100%",
      }));
    };
    window.addEventListener("resize", onResize);
    const handle = window.setInterval(onResize, 1000);
    return () => {
      window.removeEventListener("resize", onResize);
      window.clearInterval(handle);
    };
  }, []);
  // public componentDidMount() {
  //     window.addEventListener('resize', this.resize);
  //     this.resize();
  // }

  // public componentWillUnmount() {
  //     window.removeEventListener('resize', this.resize);
  // }

  const updateViewport = (viewport: any) => {
    setViewport((prevState) => ({ ...prevState, ...viewport }));
  };
  useEffect(() => {
    updateViewport({ longitude: location.lng, latitude: location.lat });
  }, [location]);

  const geolocateStyle = {
    bottom: 0,
    left: 0,
    margin: 10,
  };
  if (mode === "light") {
    return (

      <ReactMapGL
        {...viewport}
        transformRequest={lightTransformRequest}
        disableTokenWarning
        interactiveLayerIds={[clusterLayer.id as string]}
        ref={mapRef}
        onViewportChange={(v: any) => updateViewport(v)}
      // onClick={onClick}
      >
        {/* <Source
                    id="earthquakes"
                    type="geojson"
                    //   type="geojson"
                    //   data="https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson"
                    cluster={false}
                    clusterMaxZoom={14}
                    clusterRadius={50}
                    data={data}
                >
                    <Layer {...clusterLayer} />
                    <Layer {...clusterCountLayer} /> 
                    <Layer {...unclusteredPointLayer} />
                    
                </Source> */}
        <Pins
          data={crimeData}
          onClick={(cv: CrimeEvent) =>
            setDcrime(
              crimeData.filter(
                (crime) =>
                  crime.Longitude === cv.Longitude &&
                  crime.Latitude === cv.Latitude
              )
            )
          }
        />
        {showNav ? (
          <div style={{ position: "absolute", left: 30, top: 30 }}>
            <NavigationControl onViewportChange={updateViewport} />
          </div>
        ) : undefined}
        {dcrime.length > 0 && (
          <Popup
            tipSize={5}
            anchor="top"
            longitude={dcrime[0].Longitude}
            latitude={dcrime[0].Latitude}
            closeOnClick={false}
            closeButton={false}
            onClose={() => setDcrime([])}
            className={classes.mapPopup}
          >
            <div
              style={{ maxWidth: "50vw", overflow: "auto", position: "relative" }}
            >
              <Paper
                style={{
                  display: "flex",
                  alignItems: "center",
                  background: "#fff",
                  padding: "0px 16px",
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                }}
              >
                <Typography style={{ flex: 1 }}>
                  {dcrime[0].StreetAddress}
                </Typography>
                <IconButton edge={"end"} onClick={() => setDcrime([])}>
                  <CloseIcon />
                </IconButton>
              </Paper>

              {dcrime.map((crime) => {
                return (
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>{crime.Description}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        <div style={{ fontSize: "0.9em" }}>
                          Date: {
                            new Date(crime.DateOccurred).getFullYear() > 2020
                              ? new Date(crime.DateOccurred).toDateString()
                              : new Date(crime.DateReported).toDateString()
                          }
                        </div>
                        <div style={{ fontSize: "0.9em" }}>
                          Time: {crime.TimeOccurred}
                        </div>
                        <div style={{ fontSize: "0.9em" }}>
                          Disposition: {crime.Disposition}
                        </div>
                        <div style={{ fontSize: "0.7em" }}>
                          ID: {crime.CaseID}
                        </div>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                );
              })}
            </div>
          </Popup>
        )}
        <GeolocateControl
          style={geolocateStyle}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation
          showAccuracyCircle={false}
        />
      </ReactMapGL>
    );
  } else if (mode === "dark") {
    return (

      <ReactMapGL
        {...viewport}
        transformRequest={darkTransformRequest}
        disableTokenWarning
        interactiveLayerIds={[clusterLayer.id as string]}
        ref={mapRef}
        onViewportChange={(v: any) => updateViewport(v)}
      // onClick={onClick}
      >
        {/* <Source
                    id="earthquakes"
                    type="geojson"
                    //   type="geojson"
                    //   data="https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson"
                    cluster={false}
                    clusterMaxZoom={14}
                    clusterRadius={50}
                    data={data}
                >
                    <Layer {...clusterLayer} />
                    <Layer {...clusterCountLayer} /> 
                    <Layer {...unclusteredPointLayer} />
                    
                </Source> */}
        <Pins
          data={crimeData}
          onClick={(cv: CrimeEvent) =>
            setDcrime(
              crimeData.filter(
                (crime) =>
                  crime.Longitude === cv.Longitude &&
                  crime.Latitude === cv.Latitude
              )
            )
          }
        />
        {showNav ? (
          <div style={{ position: "absolute", left: 30, top: 30 }}>
            <NavigationControl onViewportChange={updateViewport} />
          </div>
        ) : undefined}
        {dcrime.length > 0 && (
          <Popup
            tipSize={5}
            anchor="top"
            longitude={dcrime[0].Longitude}
            latitude={dcrime[0].Latitude}
            closeOnClick={false}
            closeButton={false}
            onClose={() => setDcrime([])}
            className={classes.mapPopup}
          >
            <div
              style={{ maxWidth: "50vw", overflow: "auto", position: "relative" }}
            >
              <Paper
                style={{
                  display: "flex",
                  alignItems: "center",
                  background: "#fff",
                  padding: "0px 16px",
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                }}
              >
                <Typography style={{ flex: 1 }}>
                  {dcrime[0].StreetAddress}
                </Typography>
                <IconButton edge={"end"} onClick={() => setDcrime([])}>
                  <CloseIcon />
                </IconButton>
              </Paper>

              {dcrime.map((crime) => {
                return (
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>{crime.Description}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        <div style={{ fontSize: "0.9em" }}>
                          Date: {crime.DateOccurred.toLocaleDateString()}
                        </div>
                        <div style={{ fontSize: "0.9em" }}>
                          Time: {crime.TimeOccurred}
                        </div>
                        <div style={{ fontSize: "0.9em" }}>
                          Disposition: {crime.Disposition}
                        </div>
                        <div style={{ fontSize: "0.7em" }}>
                          ID: {crime.CaseID}
                        </div>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                );
              })}
            </div>
          </Popup>
        )}
        <GeolocateControl
          style={geolocateStyle}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation
          showAccuracyCircle={false}
        />
      </ReactMapGL>
    );
  }
  return (

    <ReactMapGL
      {...viewport}
      transformRequest={lightTransformRequest}
      disableTokenWarning
      interactiveLayerIds={[clusterLayer.id as string]}
      ref={mapRef}
      onViewportChange={(v: any) => updateViewport(v)}
    // onClick={onClick}
    >
      {/* <Source
                  id="earthquakes"
                  type="geojson"
                  //   type="geojson"
                  //   data="https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson"
                  cluster={false}
                  clusterMaxZoom={14}
                  clusterRadius={50}
                  data={data}
              >
                  <Layer {...clusterLayer} />
                  <Layer {...clusterCountLayer} /> 
                  <Layer {...unclusteredPointLayer} />
                  
              </Source> */}
      <Pins
        data={crimeData}
        onClick={(cv: CrimeEvent) =>
          setDcrime(
            crimeData.filter(
              (crime) =>
                crime.Longitude === cv.Longitude &&
                crime.Latitude === cv.Latitude
            )
          )
        }
      />
      {showNav ? (
        <div style={{ position: "absolute", left: 30, top: 30 }}>
          <NavigationControl onViewportChange={updateViewport} />
        </div>
      ) : undefined}
      {dcrime.length > 0 && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={dcrime[0].Longitude}
          latitude={dcrime[0].Latitude}
          closeOnClick={false}
          closeButton={false}
          onClose={() => setDcrime([])}
          className={classes.mapPopup}
        >
          <div
            style={{ maxWidth: "50vw", overflow: "auto", position: "relative" }}
          >
            <Paper
              style={{
                display: "flex",
                alignItems: "center",
                background: "#fff",
                padding: "0px 16px",
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              }}
            >
              <Typography style={{ flex: 1 }}>
                {dcrime[0].StreetAddress}
              </Typography>
              <IconButton edge={"end"} onClick={() => setDcrime([])}>
                <CloseIcon />
              </IconButton>
            </Paper>

            {dcrime.map((crime) => {
              return (
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>{crime.Description}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      <div style={{ fontSize: "0.9em" }}>
                        Date: {crime.DateOccurred}
                      </div>
                      <div style={{ fontSize: "0.9em" }}>
                        Time: {crime.TimeOccurred}
                      </div>
                      <div style={{ fontSize: "0.9em" }}>
                        Disposition: {crime.Disposition}
                      </div>
                      <div style={{ fontSize: "0.7em" }}>
                        ID: {crime.CaseID}
                      </div>
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </div>
        </Popup>
      )}
      <GeolocateControl
        style={geolocateStyle}
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation
        showAccuracyCircle={false}
      />
    </ReactMapGL>
  );
};
export default Map;
