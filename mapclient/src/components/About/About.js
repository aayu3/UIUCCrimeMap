import React from 'react';
import './About.css';

const About = () => {
    return (
        <div className="about">
            <h1>About UIUC Crime Map</h1>
            <p id="description">
            UIUC Crime Map is a website that tracks data about crimes in the University Illinois Campustown
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
    )
};

export default About;
