import L from 'leaflet';
import greenMarker from "./greenMarker.svg";
import shadowMarker from "./shadowMarker.svg";

const greenIcon = new L.Icon({
    iconUrl: greenMarker,
    iconRetinaUrl: greenMarker,
    iconAnchor: [0,0],
    popupAnchor:  [15.5,10],
    shadowUrl: shadowMarker,
    shadowSize: [36, 36],
    shadowAnchor: [2.5,2],
    iconSize: [30, 30],
    className: 'greenIcon'
});

export { greenIcon };