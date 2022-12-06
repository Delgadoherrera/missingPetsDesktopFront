import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

const DialogDemo = ({ petToDelete, updatePets, printToast, hideDialog }) => {
  const [displayResponsive, setDisplayResponsive] = useState(true);
  const [position, setPosition] = useState("center");

  const fetchDelete = (e) => {
    fetch(
      `https://backend.missingpets.art/mascotas/borrarMascota/${petToDelete.idMascota}`,
      {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then(() => {
        printToast({
          severity: "warn",
          summary: "Elimiar",
          detail: "Mascota eliminada",
          life: 3000,
        });
        updatePets();
      });
  };

  const dialogFuncMap = {
    displayResponsive: setDisplayResponsive,
  };

  const onHide = (name) => {
    dialogFuncMap[`${name}`](false);
    hideDialog()
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
          header="¿Deseas quitar a tu mascota?"
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
