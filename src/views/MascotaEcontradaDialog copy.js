import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import axios from "axios";

export default function MascotaPerdida({
  idMascotaPerdida,
  state,
  updatePets,
  printToast
 
}) {
  const [displayBasic, setDisplayBasic] = useState(false);
  const [displayBasic2, setDisplayBasic2] = useState(false);
  const [displayModal, setDisplayModal] = useState(false);
  const [displayMaximizable, setDisplayMaximizable] = useState(false);
  const [displayPosition, setDisplayPosition] = useState(false);
  const [displayResponsive, setDisplayResponsive] = useState(false);
  const [position, setPosition] = useState("center");

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
    let id = e.currentTarget.value;
    axios
      .post(
        `https://backend.missingpets.art/mascotas/mascotaEncontrada/${id}`,
        state
      )
      .then((response) => {
        updatePets();

        printToast({
          severity: "success",
          summary: "Mascota",
          detail: "Mascota encontrada",
          life: 3000,
        });
       
      });
    dialogFuncMap[`${name}`](false);
  };

  const renderFooter = (name) => {
    return (
      <div className="encontradasDialogFooter">
        <Button
          value={idMascotaPerdida.idMascota}
          label="Aceptar"
          /* icon="pi pi-check" */ onClick={(e) => enviarCoordenadas(name, e)}
          autoFocus
          className="mascotaEncontradaDialogButtons"
        />
        <Button
          label="Cancelar"
          /* icon="pi pi-times" */ onClick={() => onHide(name)}
          className="p-button-text mascotaEncontradaDialogButtonCancel"
        />
      </div>
    );
  };

  return (
    <div className="dialog-demo">
      <div className="card containerMascotaEncontradaCardButton">


            {idMascotaPerdida.status === 1 ? (
              <Button
                label={'Mascota Encontrada'.toUpperCase()}
                /* icon="pi pi-arrow-down" */ onClick={() =>
                  onClick("displayPosition", "top")
                }
                className="buttonFoundPet"
              />
            ) : (
              <p></p>
            )}
        <Dialog
          contentClassName="contentDialogMascotaEncontrada"
          className="dialogMascotasEncontrada"
          headerClassName="headerDialogMascotaEncontrada"
          header={
            <div>
              <p className="">
                {" "}
                {idMascotaPerdida.nombre} se quitará de la lista de mascotas
                perdidas. Felicidades!{" "}
              </p>
              <div className="mascotaNombreEncontrada">
                {/*   {idMascotaPerdida.nombre} */}
              </div>
            </div>
          }
          visible={displayPosition}
          position={position}
          modal
          footer={renderFooter("displayPosition")}
          onHide={() => onHide("displayPosition")}
          draggable={false}
          resizable={false}
        >
          {/*      <Index state={state} /> */}

          {/*        <img
            alt="picturePets"
            className="imgEncontradaDialog"
            src={`data:image/jpeg;base64,${idMascotaPerdida.fotoMascota}`}
          /> */}
        </Dialog>
      </div>
    </div>
  );
}
