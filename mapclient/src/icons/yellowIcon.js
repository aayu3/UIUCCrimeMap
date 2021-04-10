import L from 'leaflet';
import yellowMarker from "./yellowMarker.svg";

const yellowIcon = new L.Icon({
    iconUrl: yellowMarker,
    iconRetinaUrl: yellowMarker,
    iconAnchor: [0,0],
    popupAnchor:  [15.5,10],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(30, 30),
    className: 'yellowIcon'
});

export { yellowIcon };