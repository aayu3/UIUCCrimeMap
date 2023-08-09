import React from "react";
import { Marker } from "react-map-gl";
import { JSCrimeEvent } from "../../App";

/*
const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;
*/

const SIZE = 32;
function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
) {
  var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

function describeArc(
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number
) {
  var start = polarToCartesian(x, y, radius, endAngle);
  var end = polarToCartesian(x, y, radius, startAngle);

  var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  var d = [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(" ");

  return d;
}

// Important for perf: the markers never change, avoid rerender when the map viewport changes
function Pins(props: any) {
  const { data, onClick } = props;
  let posMap: { count: number; lng: number; lat: number }[] = [];
  (data ?? []).map((crime: JSCrimeEvent, index: number) => {
    let posMapIndex = posMap.findIndex(
      (x) => crime.Longitude === x.lng && crime.Latitude === x.lat
    );
    if (posMapIndex < 0) {
      posMap.push({ lng: crime.Longitude, lat: crime.Latitude, count: 0 });
      posMapIndex = posMap.length - 1;
    }
    posMap[posMapIndex].count += 1;
  });
  let oldPosMap = posMap.slice();
  posMap = [];
  return (data ?? []).map((crime: JSCrimeEvent, index: number) => {
    let diff = (+new Date() - +crime.jsDateOccured) / 1000 / 60 / 60 / 24;
    let posMapIndex = posMap.findIndex(
      (x) => crime.Longitude === x.lng && crime.Latitude === x.lat
    );
    if (posMapIndex < 0) {
      posMap.push({ lng: crime.Longitude, lat: crime.Latitude, count: 0 });
      posMapIndex = posMap.length - 1;
    }
    posMap[posMapIndex].count += 1;
    const tCount =
      oldPosMap.find(
        (x) => crime.Longitude === x.lng && crime.Latitude === x.lat
      )?.count ?? 1;
    const portion = (posMap[posMapIndex].count - 1) / tCount;
    const portionEnd = posMap[posMapIndex].count / tCount;
    return (
      <Marker
        key={`marker-${index}`}
        longitude={crime.Longitude}
        latitude={crime.Latitude}
      >
        <svg
          height={SIZE}
          viewBox="0 0 24 24"
          style={{
            cursor: "pointer",
            // fill: `hsl(${(diff * 180) / 60},100%,50%)`,
            stroke: "none",
            transform: `translate(${-SIZE / 2}px,${-SIZE / 2}px)`,
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
          {tCount > 1 ? (
            <>
              <path
                d={describeArc(12, 12, 6, portion * 360, portionEnd * 360)}
                strokeWidth={2}
                stroke={`hsl(${(diff * 180) / 60},100%,50%)`}
                fill={`hsl(${(diff * 180) / 60},100%,50%)`}
                fillOpacity={0}
              />
              <path
                d={
                  describeArc(12, 12, 2, portion * 360, portionEnd * 360) +
                  " L 12 12"
                }
                strokeWidth={0}
                stroke={`hsl(${(diff * 180) / 60},100%,50%)`}
                fill={`hsl(${(diff * 180) / 60},100%,50%)`}
                fillOpacity={1}
              />
            </>
          ) : (
            <>
              <circle
                cx={12}
                cy={12}
                r={2}
                strokeWidth={0}
                fill={`hsl(${(diff * 180) / 60},100%,50%)`}
                fillOpacity={1}
              >
                {" "}
              </circle>
              <circle
                cx={12}
                cy={12}
                r={6}
                strokeWidth={2}
                stroke={`hsl(${(diff * 180) / 60},100%,50%)`}
                fillOpacity={0}
              >
                {" "}
              </circle>
            </>
          )}
        </svg>
      </Marker>
    );
  });
}

export default React.memo(Pins);
