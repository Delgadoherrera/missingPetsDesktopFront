import React, { useState, useEffect } from "react";
import { Map, Marker } from "google-maps-react";
export default function GoogleMapComponent(props) {
  const [state, setState] = useState({
    longitude: 0,
    latitude: 0,
  });

  let markersList = [
    {
      lat: state.latitude,
      lng: state.longitude,
    },
  ];

  let [markers, setMarkers] = useState(markersList);

  const mapStyles = {
    width: "96%",
    height: "50%",
    borderRadius: "70px",
    position: "relative",
    margin: 0,
  };

  const mapStylesMobile = {
    width: "80%",
    height: "50%",
    borderRadius: "20px",
    position: "relative",
    margin:'auto',
    
  };

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

  let onMarkerDragEnd = (coord, index, markers) => {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();
    console.log("coord", coord, "index", index, "markers", markers);

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

  /*    sendLocations(myMarkers[0].props.position)  */
  return (
    <>
      <div className="row d-flex justify-content-center text-center containerGoogleMapsMascotaPerdida">
        <Map
          className={
            window.screen.width < 800
              ? "googleMapContentMobileMascotaPerdida"
              : "googleMapMascotaPerdida"
          }
          google={window.google}
          zoom={14}
          style={window.screen.width < 800 ? mapStylesMobile : mapStyles}
          center={{
            lat: state.latitude,
            lng: state.longitude,
          }}
        >
          {myMarkers}
        </Map>
      </div>
    </>
  );
}
