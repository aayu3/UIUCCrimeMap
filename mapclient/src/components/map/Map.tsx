import React, { useEffect, useMemo, useRef, useState } from 'react';
import ReactMapGL, { NavigationControl, Source, Layer, MapEvent, Popup, MapRef } from 'react-map-gl';
import { JSCrimeEvent } from '../../App';

import { clusterLayer, clusterCountLayer, unclusteredPointLayer } from './layers';
import Pins from './Pins';

const transformRequest = (url: string, resourceType: string) => {
    // console.log(url,resourceType)
    if (resourceType === "Style") {
        return { url: "https://api.maptiler.com/maps/positron/style.json?key=gbetYLSD5vR8MdtZ88AQ" }
    }
    if (url.match("api.mapbox.com")) {
        return { url: "" }
    }
    return {
        url: url,
        // headers: { 'Authorization': 'Bearer ' + yourAuthToken }
    }

}
const Map: React.FC<{
    crimeData: JSCrimeEvent[],
    location: any
    showNav?:boolean
}> = (properties) => {
    const {
        crimeData,
        location,
        showNav=false
    } = properties;
    // public state: State = initialState;
    const [viewport, setViewport] = useState({
        height: "100%",
        latitude: 37.776021,
        longitude: -122.4171949,
        width: "100%",
        zoom: 14,
    })

    const [crime, setCrime] = useState<JSCrimeEvent | null>(null);
    const mapRef = useRef<MapRef>(null);
    useEffect(() => {
        const onResize = () => {
            setViewport(prevState => (
                { ...prevState, width: "100%", height: "100%" }
            ));
        }
        window.addEventListener('resize', onResize);
        return () => {
            window.removeEventListener('resize', onResize);
        }
    }, [])
    // public componentDidMount() {
    //     window.addEventListener('resize', this.resize);
    //     this.resize();
    // }

    // public componentWillUnmount() {
    //     window.removeEventListener('resize', this.resize);
    // }

    const updateViewport = (viewport: any) => {
        setViewport(prevState => (
            { ...prevState, ...viewport }
        ));
    }
    useEffect(() => {
        updateViewport({ longitude: location.lng, latitude: location.lat })
    }, [location])

    const onClick = (event: MapEvent) => {
        if (event) {
            const feature = event.features?.[0];
            const cv=event.features?.[0]?.properties;
            if(cv&& cv.Longitude && cv.Latitude){
            setCrime(cv);
            }
            // if (feature) {

            //     const clusterId = feature.properties.cluster_id;

            //     const mapboxSource = mapRef?.current?.getMap()?.getSource('earthquakes');

            //     mapboxSource.getClusterExpansionZoom(clusterId, (err: any, zoom: number) => {
            //         if (err) {
            //             return;
            //         }

            //         setViewport({
            //             ...viewport,
            //             longitude: feature.geometry.coordinates[0],
            //             latitude: feature.geometry.coordinates[1],
            //             zoom,
            //             transitionDuration: 500
            //         } as any);
            //     });
            // }
        }
    };
    const data = useMemo<GeoJSON.Feature<GeoJSON.Geometry> | GeoJSON.FeatureCollection<GeoJSON.Geometry>>(() => {
        return {
            "type": "FeatureCollection",

            "features": crimeData.map(x => ({ "type": "Feature", "properties": x, "geometry": { "type": "Point", "coordinates": [x.Longitude, x.Latitude, 0] } }))
        }
    }, [crimeData])

    return (
        <ReactMapGL
            {...viewport}
            transformRequest={transformRequest}
            disableTokenWarning

            interactiveLayerIds={[clusterLayer.id as string]}
            ref={mapRef}
            onViewportChange={(v: any) => updateViewport(v)}
            onClick={onClick}
        >
           
            {/* <Source
                id="earthquakes"
                type="geojson"
                //   type="geojson"
                //   data="https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson"
                cluster={false}
                clusterMaxZoom={14}
                clusterRadius={50}
                data={data}
            >
                <Layer {...clusterLayer} />
                <Layer {...clusterCountLayer} /> 
                <Layer {...unclusteredPointLayer} />
                
            </Source> */}
            <Pins data={crimeData} onClick={setCrime} />
            {showNav?<div style={{ position: 'absolute', left: 30, top: 30 }}>
                <NavigationControl onViewportChange={updateViewport} />
            </div>:false}
            {crime && (
                <Popup
                    tipSize={5}
                    anchor="top"
                    longitude={crime.Longitude}
                    latitude={crime.Latitude}
                    closeOnClick={false}
                    onClose={() => setCrime(null)}
                >
                    <div>
                        <div style={{fontSize: "1.1em", fontWeight: 600, color: "black"}}>{crime.Description}</div>
                        <div style={{fontSize: "0.9em"}}>Date: {crime.DateOccurred}</div>
                        <div style={{fontSize: "0.9em"}}>Time: {crime.TimeOccurred}</div>
                        <div style={{fontSize: "0.9em"}}>Address: {crime.StreetAddress}</div>
                        <div style={{fontSize: "0.7em"}}>ID: {crime.CaseID}</div>
                    </div>
                </Popup>
            )}
            
        </ReactMapGL>
    );

}
export default Map