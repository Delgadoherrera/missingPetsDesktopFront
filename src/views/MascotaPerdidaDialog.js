import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import Index from "../components/WrapperMap";
import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import axios from "axios";
import "../assets/MascotaPerdidaDialog.css";

export default function MascotaPerdida({
  idMascotaPerdida,
  state,
  update,
  updatePets,
  printToast,
}) {
  const [displayBasic, setDisplayBasic] = useState(false);
  const [displayBasic2, setDisplayBasic2] = useState(false);
  const [displayModal, setDisplayModal] = useState(false);
  const [displayMaximizable, setDisplayMaximizable] = useState(false);
  const [displayPosition, setDisplayPosition] = useState(false);
  const [displayResponsive, setDisplayResponsive] = useState(false);
  const [position, setPosition] = useState("center");
  const [toggle, setToggle] = useState({ update: false });
  const [location, setLocation] = useState([]);

  const sendLocation = [];

  const updateLocation = (f) => {
    let newData = {
      latitude: f.lat,
      longitude: f.lng,
    };
    console.log("position:", sendLocation);

    sendLocation.push(newData);
  };
  const dialogFuncMap = {
    displayBasic: setDisplayBasic,
    displayBasic2: setDisplayBasic2,
    displayModal: setDisplayModal,
    displayMaximizable: setDisplayMaximizable,
    displayPosition: setDisplayPosition,
    displayResponsive: setDisplayResponsive,
  };

  const onClick = (name, position) => {
    dialogFuncMap[`${name}`](true);

    if (position) {
      setPosition(position);
    }
  };

  const onHide = (name, e) => {
    dialogFuncMap[`${name}`](false);
  };

  const enviarCoordenadas = (name, e) => {
    if (sendLocation.length > 0) {
      let id = e.currentTarget.value;
      axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${
            sendLocation[sendLocation.length - 1].latitude
          },${
            sendLocation[sendLocation.length - 1].longitude
          }%20&key=AIzaSyAWhXxfT0fS3H6QYCOLGSE-QHzeKVWG1Y0`
        )
        .then((data) => {
          const lugarEncontrado = [
            data.data.results[0].address_components[1].short_name,
            data.data.results[0].address_components[0].short_name,
            data.data.results[0].address_components[2].short_name,
            data.data.results[0].address_components[4].short_name,
          ];
          axios
            .post(
              `https://backend.missingpets.art/mascotas/mascotaPerdidaNewLocation/${id}`,
              sendLocation,
              lugarEncontrado
            )
            .then((response) => {
              updatePets();
            });
        });
    } else {
      let id = e.currentTarget.value;

      axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${state.latitude},${state.longitude}%20&key=AIzaSyAWhXxfT0fS3H6QYCOLGSE-QHzeKVWG1Y0`
        )
        .then((data) => {
          const lugarEncontrado = [
            data.data.results[0].address_components[1].short_name,
            data.data.results[0].address_components[0].short_name,
            data.data.results[0].address_components[2].short_name,
            data.data.results[0].address_components[4].short_name,
          ];
          axios
            .post(
              `https://backend.missingpets.art/mascotas/mascotaPerdida/${id}`,
              state,
              lugarEncontrado
            )
            .then((response) => {
              printToast({
                severity: "success",
                summary: "Mascota",
                detail: "Estamos buscando a tu mascota",
                life: 3000,
              });

              updatePets();
            });
        });
    }
    dialogFuncMap[`${name}`](false);
  };

  const renderFooter = (name) => {
    return (
      <div className="footerDiv">
        <Button
          label="Cancelar"
          /* icon="pi pi-times" */ onClick={() => onHide(name)}
          className="mascotaPerdidaButtonDialog"
        />
        <Button
          className="mascotaPerdidaButtonDialog"
          value={idMascotaPerdida.idMascota}
          label="Buscar"
          /* icon="pi pi-check" */ onClick={(e) => enviarCoordenadas(name, e)}
          autoFocus
        />
      </div>
    );
  };

  return (
    <div className="dialog-demo">
      <div className="card">
        <div className="grid flex-column">
          {idMascotaPerdida.status !== 1 ? (
            <Button
              label={`Mascota perdida`.toUpperCase()}
              /* icon="pi pi-arrow-down" */ onClick={() =>
                onClick("displayPosition", "top")
              }
              className="buttonFoundPet foundedPetColourCard"
            />
          ) : (
            <p></p>
          )}
        </div>
        <Dialog
          className="dialogMascotasPerdidas"
          contentClassName="contentMapMascotaEncontrada"
          closable={false}
          header={
            <div>
              <p className="textoBusqueda">
                {" "}
                Indica el punto donde quieres que busquemos a{" "}
                {idMascotaPerdida.nombre}{" "}
              </p>
              {/*    <div className='mascotaNombrePerdida'>
                            {idMascotaPerdida.nombre}?
                        </div> */}
            </div>
          }
          visible={displayPosition}
          position={position}
          modal
          style={{ width: "70vw" }}
          footer={renderFooter("displayPosition")}
          onHide={() => onHide("displayPosition")}
          draggable={false}
          resizable={false}
        >
          {/* <MapComponent prueba={updateLocation} /> */}
          <Index newLocation={updateLocation} />
        </Dialog>
      </div>
    </div>
  );
}
