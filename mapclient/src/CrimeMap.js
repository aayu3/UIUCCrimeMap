import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import {  greenIcon  } from './icons/greenIcon';
import {  yellowIcon  } from './icons/yellowIcon';
import {  redIcon  } from './icons/redIcon';
import {  noIcon  } from './icons/noIcon';

function crimeDate(props, curDate, thresholds) {
    const crime = props;

    // Date parsing
    let curday = parseInt(curDate.getDate());
    let curmonth = parseInt(curDate.getMonth() + 1);
    let curyear = parseInt(curDate.getFullYear());
    
    // get color thresholds
    let redDaysThreshold = thresholds[0];
    let yellowMonthThreshold = thresholds[1];

    var dateOccurred = crime.DateOccurred.split("/");
    var monthOccurred = parseInt(dateOccurred[0]);
    var dayOccurred = parseInt(dateOccurred[1]);      
    if ((Math.abs(dayOccurred - curday) <= redDaysThreshold && monthOccurred === curmonth) || 
    // Check if previous month date is within the  7 day threshold
    ((dayOccurred + redDaysThreshold > 30) && ((dayOccurred + redDaysThreshold) % 30) >=curday && monthOccurred + 1 === curmonth)) {
      return redIcon;
    } else if (Math.abs(monthOccurred - curmonth) <= yellowMonthThreshold) {
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
        <h3>Address: {crime.StreetAddress}</h3>
        <p>Incident: {crime.CaseID}</p>
      </div>
    </Popup>
    
  </Marker>)}
</MapContainer> 
  );
}

export default CrimeMap