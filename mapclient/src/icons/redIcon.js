import L from 'leaflet';
import redMarker from "./redMarker.svg";
import shadowMarker from "./shadowMarker.svg";


const redIcon = new L.Icon({
    iconUrl: redMarker,
    iconRetinaUrl: redMarker,
    iconAnchor: [0,0],
    popupAnchor:  [15.5,10],
    shadowUrl: null,
    shadowSize: [36, 36],
    shadowAnchor: [2.5,2],
    iconSize: [30, 30],
    className: 'redIcon'
});

export { redIcon };