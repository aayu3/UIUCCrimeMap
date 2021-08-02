import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about">
      <h1>About UIUC Crime Map</h1>
      <p id="description">
        UIUC Crime Map is a website that tracks data about crimes in the
        University Illinois Campustown area and displays detailed information
        about each crime incident. Red markers indicate a crime that has occured
        in the last 7 days, yellow markers indicate a crime that happened in the
        last 30 days, and green markers indicate every crime in the{" "}
        <a href="https://police.illinois.edu/crime-reporting/daily-crime-log/">
          University Police Daily Crime Log
        </a>
        .
      </p>

      <br></br>

      <h2>How to use the map</h2>
      <p id="description">
        By clicking on the points on the map, you can find information about the
        crime type, date, location, and incident code for every crime occured on
        campus. To filter crimes by their date, click on the markers in the
        legend to view only the markers of those colors. To use a different
        range of dates for the markers, use the crime threshold slider to set
        the range of the colors as you wish. To see crimes that happened at a
        specific time range, use the time of day slider to set a time range to
        view.
      </p>

      <br></br>

      <h2>How the map works</h2>
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
