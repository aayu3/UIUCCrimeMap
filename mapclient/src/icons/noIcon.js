import L from 'leaflet';
import redMarker from "./redMarker.svg";


const noIcon = new L.Icon({
    iconUrl: redMarker,
    iconRetinaUrl: redMarker,
    iconAnchor: null,
    popupAnchor:  null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: null,
    className: 'noIcon'
});

export { noIcon };