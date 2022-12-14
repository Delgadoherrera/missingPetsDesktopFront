import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import React, { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import axios from "axios";

const DialogDemo = ({ petToDelete, updatePets, printToast, hideDialog }) => {
  const [displayResponsive, setDisplayResponsive] = useState(true);
  const [position, setPosition] = useState("center");
  const [state, setState] = useState({
    longitude: 0,
    latitude: 0,
  });
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async function (position) {
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

  console.log(state);
  const fetchDelete = (e) => {
    axios
      .post(
        `https://backend.missingpets.art/mascotas/adopcion/${petToDelete.idMascota}`,

        { adoptar: true, latitude: state.latitude, longitude: state.longitude }
      )
      .then(() => {
        printToast({
          severity: "success",
          summary: "Mascota",
          detail: " Mascota en adopción",
          life: 3000,
        });
        updatePets();
      })
      .catch((error) => console.error("Error:", error));
  };

  const dialogFuncMap = {
    displayResponsive: setDisplayResponsive,
  };

  const onHide = (name) => {
    dialogFuncMap[`${name}`](false);
    hideDialog();
  };

  const renderFooter = (name) => {
    return (
      <div>
        <Button
          label="No"
          icon="pi pi-times"
          onClick={() => {
            onHide(name);
            hideDialog();
          }}
          className="p-button-text buttonDialogDeletePet"
          autoFocus
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          className="confirmDeletePetDialog"
          onClick={() => {
            fetchDelete();
            onHide(name);
            hideDialog();
          }}
        />
      </div>
    );
  };

  return (
    <div className="">
      <div className="">
        <Dialog
          className="confirmDeleteDialog"
          header="¿Deseas poner en adopcion a la mascota?"
          visible={displayResponsive}
          onHide={() => onHide("displayResponsive")}
          footer={renderFooter("displayResponsive")}
          headerClassName="headerDeletePetDialog"
          contentClassName="contentDeletePetDialog"
          headerStyle={{ fontSize: "44px" }}
        ></Dialog>
      </div>
    </div>
  );
};
export default DialogDemo;
