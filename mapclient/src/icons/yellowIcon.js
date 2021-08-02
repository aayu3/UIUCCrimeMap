import L from "leaflet";
import yellowMarker from "./yellowMarker.svg";
import shadowMarker from "./shadowMarker.svg";

const yellowIcon = new L.Icon({
  iconUrl: yellowMarker,
  iconRetinaUrl: yellowMarker,
  iconAnchor: [0, 0],
  popupAnchor: [15.5, 10],
  shadowUrl: null,
  shadowSize: [36, 36],
  shadowAnchor: [2.5, 2],
  iconSize: [30, 30],
  className: "yellowIcon",
});

export { yellowIcon };
