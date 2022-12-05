import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";

import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import AddPetForm from "../components/AddPetForm";
import "../assets/AddPetDialog.css";
const DialogDemo = ({ showAddPetMsg, hideShowPettMsg,printToast,updatePets, user }) => {
  const [displayResponsive, setDisplayResponsive] = useState(true);
  const [position, setPosition] = useState("center");

  const dialogFuncMap = {
    displayResponsive: setDisplayResponsive,
  };


  const onClick = (name, position) => {
    dialogFuncMap[`${name}`](true);

    if (position) {
      setPosition(position);
    }
  };

  const onHide = (name) => {
    dialogFuncMap[`${name}`](false);
    hideShowPettMsg();
  };

  const renderFooter = (name) => {
    return (
      <div>
        <Button
          label="Cancelar"
          icon="pi pi-times"
          onClick={() => onHide(name)}
          className="p-button-text addPetButtons"
        />
        {/*    <Button
          label="Yes"
          icon="pi pi-check"
          onClick={() => onHide(name)}
          autoFocus
        /> */}
      </div>
    );
  };

  return (
    <div className="dialog-demo">
      <div className="card">
        <Dialog
          header="Agregar a tu mascota"
          visible={displayResponsive}
          onHide={() => onHide("displayResponsive")}
          breakpoints={{ "300px": "75vw" }}
          style={{ width: "90vw" }}
          footer={renderFooter("displayResponsive")}
          className="addPetDialog"
          contentClassName='addPetDialogContent'
        >
          <AddPetForm
            showAddPetMsg={showAddPetMsg}
            hideShowPettMsg={hideShowPettMsg}
            printToast={printToast}
            updatePets={updatePets}
          />
        </Dialog>
      </div>
    </div>
  );
};
export default DialogDemo;
