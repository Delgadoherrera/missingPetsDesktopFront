import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "../assets/EditPetDialog.css";
import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import PetEdit from "../components/PetEdit";
const DialogDemo = ({
  petToEdit,
  showUpdate,
  updateEditComponent,
  printToast,
  updatePets,
  hideEditDialog
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
    updateEditComponent(0);
    hideEditDialog(false)
  };

  const renderFooter = (name) => {
    return (
      <div>
        <Button
          label="Cancelar"
          icon="pi pi-times"
          onClick={() => onHide(name)}
          className="p-button-text cancelButtonDialogEditPet"
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
          header="Editar mascota"
          visible={displayResponsive}
          onHide={() => onHide("displayResponsive")}
          breakpoints={{ "300px": "75vw" }}
          style={{ width: "90vw" }}
          footer={renderFooter("displayResponsive")}
          className="editarMascotaDialog"
          contentClassName="editarMascotaContentDialog"
        >
          <img
            alt="myPetImg"
            src={`data:image/jpeg;base64,${petToEdit.fotoMascota}`}
            className="imgPetEditDialog"
          />
          <PetEdit
            petToEdit={petToEdit}
            showUpdate={showUpdate}
            updateEditComponent={updateEditComponent}
            printToast={printToast}
            updatePets={updatePets}
            hideEditDialog={hideEditDialog}
          />
        </Dialog>
      </div>
    </div>
  );
};
export default DialogDemo;