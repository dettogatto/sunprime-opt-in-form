import React, { useState, useRef, useEffect } from 'react';
import { GoogleMap, LoadScript, Polygon, Marker, Autocomplete } from '@react-google-maps/api';
import MapTips from './MapTips';

const stylesNoLabels = {
  disableDefaultUI: true,
  zoomControl: false,
  styles: [
    {
      featureType: "all",
      elementType: "labels",
      stylers: [
        { visibility: "off" }
      ]
    }
  ]
};

const stylesSomeLabels = {
  zoomControl: true,
  zoomControlOptions: {
    position: 8
  },
  draggableCursor: 'crosshair',
  styles: [
    {
      featureType: "poi",
      stylers: [
        { visibility: "off" }
      ]
    },
    {
      featureType: "transit",
      stylers: [
        { visibility: "off" }
      ]
    }
  ]
};

const earthRadiusMeters=6367460.0;
const metersPerDegree=2.0*Math.PI*earthRadiusMeters/360.0;
const radiansPerDegree=Math.PI/180.0;
const googleLibraries = ["places"];

export function MapContainer(props) {

  // const [points, setPoints] = useState([[]]);
  const [theCenterMarker, setTheCenterMarker] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 42.346355, lng: 12.752622 });
  const [mapZoom, setMapZoom] = useState(6);
  const [mapAddress, setMapAddress] = useState("");
  const [tipStep, setTipStep] = useState(0);
  const autocompleteRef = useRef(null);
  const polygonsCollectionRef = useRef({});
  const mapRef = useRef(null);

  function getPoints(){
    let points = props.getFormField('coordinate');
    if(!Array.isArray(points) || !Array.isArray(points[0])){
      return [[]];
    }
    return points;
  }

  function setPoints(points){
    props.setFormField('coordinate', [...points]);
  }

  function handleMapClick(event){
    let tmpPoints = getPoints();
    // console.log("MAP CLICK DEBUG");
    // console.log(points);
    tmpPoints[tmpPoints.length - 1].push({
      lat: event.latLng.lat(),
      lng: event.latLng.lng()}
    );
    // console.log("PUNTI MAPPA:");
    // console.log(tmpPoints);
    setPoints(tmpPoints);
    setTipStep((p) => (p >= 1 && p <= 2 ? p+1 : p));
  }

  function clearLastArea(){
    let points = getPoints();
    points.pop();
    if(points.length <= 0){
      points = [[]];
    }
    setPoints([...points]);
  }

  function addNewArea(){
    let points = getPoints();
    if(points[points.length - 1].length > 0){
      points = [...points, []];
    }
    setPoints(points);
  }

  function getControlsDistance(){
    return props.active ? "10px" : "-200px";
  }

  function onPlaceChange(){
    setTipStep(1);
    let place = autocompleteRef.current.getPlace();
    if(typeof place.geometry == 'undefined'){
      // User pressed enter
      // console.log("The input value is: " + place.name);

      var request = {
        query: place.name,
        fields: ['name', 'geometry']
      };
      var service = new window.google.maps.places.PlacesService(mapRef.current);
      service.findPlaceFromQuery(request, function(results, status) {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          if(results && results[0]){
            setMapCenter(results[0].geometry.location);
            setTheCenterMarker(results[0].geometry.location);
            setMapAddress(results[0].formatted_address);
            setMapZoom(19);
          }
        }
      });


      return;
    }

    setMapCenter(place.geometry.location);
    setTheCenterMarker(place.geometry.location);
    setMapAddress(place.formatted_address);
    setMapZoom(19);
  }

  function getTheCenterMarker(){
    if(!theCenterMarker){ return null; }
    return ( <Marker position={theCenterMarker} /> );
  }

  function handlePolygonChangeWrapper(index){
    return (() => {
      let newArray = polygonsCollectionRef.current[index].getPath().getArray();
      let tmpPoints = getPoints();
      tmpPoints[index] = newArray.map((p) => {
        return {
          lat: p.lat(),
          lng: p.lng()
        };
      });
      setPoints(tmpPoints);
    });
  }

  function getThePolygons(){
    let counter = -1;
    let points = getPoints();
    return (
      points.map((x) => {
        counter += 1;
        if( !x || x.length < 1 ){ return null; }
        return (
          <Polygon
            key = {counter}
            paths = {[...x]}
            editable = {true}
            options = {{
              suppressUndo: true,
              fillColor: "#F28A0C",
              fillOpacity: 0.5,
              strokeColor: "#F28A0C"
            }}
            onMouseUp = {handlePolygonChangeWrapper(counter)}
            onLoad = { p => polygonsCollectionRef.current[counter] = p }
            />
        )
      })
    );
  }

  function getTotalArea(){
    let tot = 0.0;
    let points = getPoints();
    for(let p of points){
      let semitot = 0;
      for(var i = 0; i < p.length; i++){
        var j= (i+1) % p.length;
        var xi = p[i].lng * metersPerDegree * Math.cos(p[i].lat * radiansPerDegree);
        var yi = p[i].lat * metersPerDegree;
        var xj = p[j].lng * metersPerDegree * Math.cos(p[j].lat * radiansPerDegree);
        var yj = p[j].lat * metersPerDegree;
        semitot += xi * yj - xj * yi;
      }
      tot += Math.abs(semitot/2.0);
    }
    return Math.round(tot);
  }

  function onInputLoad(ref){
    autocompleteRef.current = ref;
  }

  function getDoneButton(){
    if(getTotalArea() > 0){
      return <div onClick={() => props.setter(getTotalArea(), mapAddress)}>Fatto!</div>
    }
    return <div onClick={() => props.setter(getTotalArea(), mapAddress)}>Indietro</div>
  }

  // function getAddress(){
  //   var theRes = "";
  //   if(points && points[0] && points[0][0]){
  //     var str = (points[0][0].lat() + ", " + points[0][0].lng());
  //     var service = new window.google.maps.places.PlacesService(mapRef.current);
  //     // service.findPlaceFromQuery(str, function(dresults) {
  //     //
  //     // });
  //   }
  //   return theRes;
  // }

  return (
    <div className="map-container" style={props.style}>
      <LoadScript googleMapsApiKey = "AIzaSyAwXWdsDmWAYYoKwgtYzXtQ1RAkDgo_cIE" libraries = {googleLibraries}>
        <GoogleMap
          mapContainerClassName = "gmaps-container"
          zoom = {mapZoom}
          center = {mapCenter}
          mapTypeId = {props.active ? "hybrid" : "roadmap"}
          tilt = {0}
          options = {props.active ? stylesSomeLabels : stylesNoLabels}
          onClick = {handleMapClick}
          onLoad = { ref => mapRef.current = ref }
          >
          <div className="input-container" style={{top: getControlsDistance()}}>
            <Autocomplete
              onLoad = {onInputLoad}
              onPlaceChanged = { onPlaceChange }
              >
              <input type="text" style={{cursor: "auto"}}
                placeholder="Inserisci una località" />
            </Autocomplete>
            <MapTips step={tipStep} />
          </div>
          { getThePolygons() }
          { getTheCenterMarker() }
        </GoogleMap>
      </LoadScript>
      <div className="controls-container" style={{bottom: getControlsDistance()}}>
        <div onClick={clearLastArea}>Cancella</div>
        <div onClick={addNewArea}>Aggiungi</div>
        { getDoneButton() }
      </div>
    </div>
  );

}

export default props => <MapContainer {...props} />;
