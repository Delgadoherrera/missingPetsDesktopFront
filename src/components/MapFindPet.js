import React, { useState, useEffect } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
const GoogleMapComponent = (props) => {
  const [state, setState] = useState({
    longitude: 0,
    latitude: 0,
  });
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        setState({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });
      },
      function (error) {
        console.error("Error Code = " + error.code + " - " + error.message);
      },
      {
        enableHighAccuracy: true,
      }
    );
  }, []);
  let markersList = [
    { lat: state.latitude, lng: state.longitude },
    /*   { lat: state.latitude, lng: state.asdasdlongitude} */
  ];
  let [markers, setMarkers] = useState(markersList);
  const mapStyles = {
    width: "400px",
    height: "400px",
    borderRadius: "70px",
    position: "relative",
  };
  const mapStylesMobile = {
    width: "300px",
    height: "200px",
    borderRadius: "20px",
    position: "relative",
  };
  let onMarkerDragEnd = (coord, index, markers) => {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();
    markers[index] = { lat, lng };
    setMarkers(markers);
    let finalPosition = {
      lat: lat,
      lng: lng,
    };
    props.newLocation(finalPosition);
  };

  let myMarkers =
    markers &&
    Object.entries(markers).map(([key, val]) => (
      <Marker
        key={key}
        id={key}
        position={{
          lat: state.latitude,
          lng: state.longitude,
        }}
        draggable={true}
        onDragend={(t, map, coord) => onMarkerDragEnd(coord, key, markers)}
      />
    ));
  return (
    <Map
      className={
        window.screen.width < 800
          ? "googleMapContentMobile"
          : "googleMapContent"
      }
      google={props.google}
      zoom={13}
      style={window.screen.width < 800 ? mapStylesMobile : mapStyles}
      center={{
        lat: state.latitude,
        lng: state.longitude,
      }}
    >
      {myMarkers}
    </Map>
  );
};
export default GoogleApiWrapper({
  apiKey: "AIzaSyAWhXxfT0fS3H6QYCOLGSE-QHzeKVWG1Y0",
})(GoogleMapComponent);
