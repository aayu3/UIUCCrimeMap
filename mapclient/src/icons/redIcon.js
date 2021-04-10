import L from 'leaflet';
import redMarker from "./redMarker.svg";

const redIcon = new L.Icon({
    iconUrl: redMarker,
    iconRetinaUrl: redMarker,
    iconAnchor: [0,0],
    popupAnchor:  [15.5,10],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(30, 30),
    className: 'redIcon'
});

export { redIcon };