import L from "leaflet";


const markerHtmlStyles=(myCustomColour:string) => `
  color: ${myCustomColour};
  width: 3rem;
  height: 3rem;
  display: block;
  left: -1.5rem;
  top: -1.5rem;
  position: relative;`

const icon = (color:string)=>L.divIcon({
  className: "",
  iconAnchor: [0, 24],
  html: `<span style="${markerHtmlStyles(color)}" ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title"
  aria-describedby="desc" role="img" xmlns:xlink="http://www.w3.org/1999/xlink" style="height:100%;">
    <path data-name="layer1"
    d="M32 2a20 20 0 0 0-20 20c0 18 20 40 20 40s20-22 20-40A20 20 0 0 0 32 2zm0 28a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"
    fill="currentColor"></path>
  </svg></span>`
})

export const colorPin=icon;