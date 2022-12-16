import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import PetFound from "../components/PetFound";

const PetFoundDialog = ({
  hideShowPettMsg,
  updatePets,
  printToast,
  setRefreshPets,
  closeDialog,
}) => {
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
          label="No"
          icon="pi pi-times"
          onClick={() => onHide(name)}
          className="p-button-text petFoundDialogButtons"
        />
      </div>
    );
  };

  return (
    <div className="dialog-demo">
      <div className="card">
        <Dialog
          header="¿Donde encontraste la mascota?"
          visible={displayResponsive}
          onHide={() => {
            onHide("displayResponsive");
            closeDialog();
          }}
          breakpoints={{ "300px": "75vw" }}
          footer={renderFooter("displayResponsive")}
          className="petFoundDialog"
          contentClassName="PetFoundDialogContent"
        >
          <PetFound
            updatePets={updatePets}
            printToast={printToast}
            setRefreshPets={setRefreshPets}
            closeDialog={closeDialog}
          />
        </Dialog>
      </div>
    </div>
  );
};
export default PetFoundDialog;
