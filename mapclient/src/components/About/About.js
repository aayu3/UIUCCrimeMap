import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about" style={{ overflowY: "auto" }}>
      <h1>About UIUC Crime Map</h1>
      <p id="description">
        UIUC Crime Map is a website that tracks data about crimes in the
        University Illinois Campustown area and displays detailed information
        about each crime incident. The map contains the type, date, time,
        address, and incident code of every crime in the{" "}
        <a href="https://police.illinois.edu/crime-reporting/daily-crime-log/">
          University Police Daily Crime Log
        </a>
        .
      </p>

      <br></br>

      <h3>How to use the map</h3>
      <p id="description">
        By clicking on the points on the map, you can find information about the
        crime for every crime occured on campus. The color of the markers are
        determined by the crime's recency. Red markers are the most recent
        crimes and blue markers are the least recent crimes. By using the crime
        threshold slider, you can see how old each crime is, and also filter out
        crimes that happened in the past.
      </p>

      <br></br>

      <h3>How to use the table</h3>
      <p id="description">
        The table is a data table that contains all the data from the{" "}
        <a href="https://police.illinois.edu/crime-reporting/daily-crime-log/">
          University Police Daily Crime Log
        </a>
        . By clicking on the addresses on the Place column, you can see the
        crime's location on a small map that appears on your screen. If you move
        your cursor next to the name of each column, an arrow and three dots
        will appear. By clicking on the arrows, you can sort each section by
        ascending or descending order. If you click on the three dots, it will
        provide you with several options, including a filter. You can use this
        to filter out crimes with specific information. For instance, selecting
        Crime Description, contains, and theft will filter all crimes related to
        theft.
      </p>

      <br></br>

      <h3>How the map works</h3>
      <p id="description">
        We are using <code>React.js</code> for the frontend with{" "}
        <code>react-map-gl</code> to display the map. The data for the map is
        scraped from the{" "}
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
