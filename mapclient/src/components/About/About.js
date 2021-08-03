import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about" style={{overflowY:"auto"}}>
      <h1>About UIUC Crime Map</h1>
      <p id="description">
        UIUC Crime Map is a website that tracks data about crimes in the
        University Illinois Campustown area and displays detailed information
        about each crime incident. The map contains the type, date, time, address,
        and incident code of every crime in the{" "}
        <a href="https://police.illinois.edu/crime-reporting/daily-crime-log/">
          University Police Daily Crime Log
        </a>
        .
      </p>

      <br></br>

      <h3>How to use the map</h3>
      <p id="description">
        By clicking on the points on the map, you can find information about the
        crime for every crime occured on campus. The color of the markers indicate
        when the crime happend. Red markers are recent crimes, and blue markers are
        old crimes. By using the crime threshold slider, you can see how old each crime is,
        and also filter out crimes that happened in the past. To see crimes that happened at a
        specific time range, use the time of day slider to set a time range to
        view.
      </p>

      <br></br>

      <h3>How the map works</h3>
      <p id="description">
        We are using <code>React.js</code> for the frontend with{" "}
        <code>react-leaflet.js</code> to display the map. The data for the map
        is scraped from the{" "}
        <a href="https://police.illinois.edu/crime-reporting/daily-crime-log/">
          University Police Daily Crime Log
        </a>
        , which is updated daily. It is then pushed to a MongoDB Atlas database
        which this website interacts with through the <code>Express.js</code>{" "}
        backend.
      </p>

      <br></br>

      <p id="description">
        Interested in learning more about UIUC Crime Map? Visit our{" "}
        <a href="https://github.com/aayu3/UIUCCrimeMap">GitHub</a>!
      </p>
    </div>
  );
};

export default About;
