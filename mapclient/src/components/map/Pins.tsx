import React from 'react';
import {Marker} from 'react-map-gl';
import { JSCrimeEvent } from '../../App';

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

const SIZE = 32;

// Important for perf: the markers never change, avoid rerender when the map viewport changes
function Pins(props:any) {
  const {data, onClick} = props;

  return (data??[]).map((crime:JSCrimeEvent, index:number) => {
    let diff = (+new Date() - +crime.jsDate) / 1000 / 60 / 60 / 24;
  
   return  (
    <Marker key={`marker-${index}`} longitude={crime.Longitude} latitude={crime.Latitude} >
      <svg
        height={SIZE}
        viewBox="0 0 24 24"
        style={{
          cursor: 'pointer',
          // fill: `hsl(${(diff * 180) / 60},100%,50%)`,
          stroke: 'none',
          transform: `translate(${-SIZE / 2}px,${-SIZE/2 }px)`
        }}
        onClick={() => onClick(crime)}
      >
         {/* <rect
    x="8"
    y="0"
    width="48"
    height="64"
    fill={`hsl(${(diff * 180) / 60},100%,50%)`}/>
    <rect
    x="8"
    y="0"
    width="48"
    height="48"
    fill="white" fill-opacity="0.5"/>
    <rect
    x="8"
    y="48"
    width="48"
    height="16"
    fill="#888" fill-opacity="0.5"/> */}
        {/* <path d={ICON} /> */}
        {/* <circle cx={12} cy={12+1} r={2} strokeWidth={0} fill={`rgba(0,0,0,0.1)`} fillOpacity={1}> </circle>
        <circle cx={12} cy={12+1} r={6} strokeWidth={2} stroke={`rgba(0,0,0,0.1)`} fillOpacity={0}> </circle> */}
        <circle cx={12} cy={12} r={2} strokeWidth={0} fill={`hsl(${(diff * 180) / 60},100%,50%)`} fillOpacity={1}> </circle>
        <circle cx={12} cy={12} r={6} strokeWidth={2} stroke={`hsl(${(diff * 180) / 60},100%,50%)`} fillOpacity={0}> </circle>
      </svg>
    </Marker>
  )});
}

export default React.memo(Pins);