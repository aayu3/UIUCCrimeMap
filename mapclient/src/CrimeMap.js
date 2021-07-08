import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import {  greenIcon  } from './icons/greenIcon';
import {  yellowIcon  } from './icons/yellowIcon';
import {  redIcon  } from './icons/redIcon';
import {  noIcon  } from './icons/noIcon';

function crimeDate(props, curDate, thresholds) {
    const crime = props;

    // Date parsing
    let curday = curDate[0];
    let curmonth = curDate[1];
    let curyear = curDate[2];
    
    // get color thresholds
    let greenLowerThreshold = thresholds[0];
    let redDaysThreshold = thresholds[1];
    let yellowDaysThreshold = thresholds[2];

    var dateOccurred = crime.DateOccurred.split("/");
    var monthOccurred = parseInt(dateOccurred[0]);
    var dayOccurred = parseInt(dateOccurred[1]);
    var yearOccurred = parseInt(dateOccurred[2]);
    
    var curDateInDays = curday + (curmonth - 1) * 30 + (curyear-2000) * 365;
    var dateOccurredInDays = dayOccurred + (monthOccurred -1) * 30 + (yearOccurred - 2000) * 365;
    let diff = curDateInDays - dateOccurredInDays;
    if (diff <= redDaysThreshold && diff >= greenLowerThreshold) {
      return redIcon;
    } else if (diff <= yellowDaysThreshold) {
      return yellowIcon;
    }
    return greenIcon;
}

const CrimeMap = ({crimeData, location, date, thresholds}) => {
  
  return (
    
    <MapContainer center={[location.lat, location.lng]} zoom={location.zoom} >
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    />
    {crimeData.map((crime, i) => 
    <Marker
  //key={crime.CaseID}
  position={[crime.Latitude, crime.Longitude]} 
  
  icon = {crimeDate(crime, date, thresholds)}
  
  >
    
    <Popup position={[crime.Latitude, crime.Longitude]} > 
      <div>
        <h2>{crime.Description}</h2>
        <h3>Date: {crime.DateOccurred}</h3>
        <h3>Time: {crime.TimeOccurred}</h3>
        <h3>Address: {crime.StreetAddress}</h3>
        <p>Incident: {crime.CaseID}</p>
      </div>
    </Popup>
    
  </Marker>)}
</MapContainer> 
  );
}

export default CrimeMap