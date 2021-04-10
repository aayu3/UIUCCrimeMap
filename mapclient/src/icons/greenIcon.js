import L from 'leaflet';
import greenMarker from "./greenMarker.svg";

const greenIcon = new L.Icon({
    iconUrl: greenMarker,
    iconRetinaUrl: greenMarker,
    iconAnchor: [0,0],
    popupAnchor:  [15.5,10],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(30, 30),
    className: 'greenIcon'
});

export { greenIcon };