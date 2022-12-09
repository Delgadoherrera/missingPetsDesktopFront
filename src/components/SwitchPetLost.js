import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import Index from "../components/WrapperMap";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import axios from "axios";
import "primeflex/primeflex.css";
import MascotaEcontradaDialog from "../views/MascotaEcontradaDialog";
import React, { useEffect, useState } from "react";
import MascotaPerdidaDialog from "../views/MascotaPerdidaDialog";

const InputSwitchDemo = ({
  petToSwitch,
  idMascotaPerdida,
  state,
  updatePets,
  printToast,
  setRefreshPets,
}) => {
  const [displayPosition, setDisplayPosition] = useState(false);
  const [position, setPosition] = useState("center");
  const [petFound, setPetFound] = useState();
  const [petToSearch, setPetToSearch] = useState(false);

  const sendLocation = [];

  const updateLocation = (f) => {
    let newData = {
      latitude: f.lat,
      longitude: f.lng,
    };
    sendLocation.push(newData);
  };
  const dialogFuncMap = {
    displayPosition: setDisplayPosition,
  };

  const onHide = (name, e) => {
    dialogFuncMap[`${name}`](false);
    setPetFound(false);
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
              { sendLocation, lugarEncontrado }
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
              { state, lugarEncontrado }
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
      <div className="card divInputSwitch">
      {petToSearch === true ? (
          <MascotaPerdidaDialog
            idMascotaPerdida={petToSwitch}
            hideDialog={setPetToSearch}
            setRefreshPets={setRefreshPets}
          />
        ) : (
          <p></p>
        )}
        {petFound === true ? (
          <MascotaEcontradaDialog idMascotaPerdida={petToSwitch} setRefreshPets={setRefreshPets} />
        ) : (
          <p> </p>
        )}
        {petToSwitch.status === 0 ? (
          <Button
            label={` ¿${petToSwitch.nombre} se ha perdido? `}
            /* icon="pi pi-times" */ onClick={() => setPetToSearch(true)}
            className="mascotaPerdidaButtonDialog"
          />
        ) : (
          <p> </p>
        )}
        {petToSwitch.status === 1 ? (
          <Button
            label={` Encontré a ${petToSwitch.nombre} `}
            /* icon="pi pi-times" */ onClick={() => setPetFound(true)}
            className="mascotaPerdidaButtonDialog"
          />
        ) : (
          <p></p>
        )}
   
    </div>
  );
};
export default InputSwitchDemo;
