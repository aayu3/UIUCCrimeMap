import L from "leaflet";

const markerHtmlStyles = (myCustomColour: string) => `
  color: ${myCustomColour};
  width: 48px;
  height: 48px;
  display: block;
  left: -24px;
  top: -24px;
  position: relative;`;

const icon = (color: string) =>
  L.divIcon({
    className: "",
    iconAnchor: [0, 24],
    popupAnchor: [0.5, -21],
    html: `<span style="${markerHtmlStyles(
      color
    )}" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title"
  aria-describedby="desc" role="img" xmlns:xlink="http://www.w3.org/1999/xlink" style="height:100%;">
    <rect
    x="24"
    y="24"
    width="16"
    height="48"
    fill="currentColor"/>
    <rect
    x="24"
    y="24"
    width="16"
    height="16"
    fill="white" fill-opacity="0.5"/>
    <rect
    x="24"
    y="40"
    width="16"
    height="24"
    fill="#888" fill-opacity="0.5"/>
  </svg></span>`,
  });

export const colorPin = icon;
