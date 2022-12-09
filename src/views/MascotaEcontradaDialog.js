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
  printToast,
  setRefreshPets,
}) {
  const [displayPosition, setDisplayPosition] = useState(true);
  const [position, setPosition] = useState("center");

  const dialogFuncMap = {

    displayPosition: setDisplayPosition,
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
        setRefreshPets();
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
        <Dialog
          contentClassName="contentDialogMascotaEncontrada"
          className="dialogMascotasEncontrada"
          headerClassName="headerDialogMascotaEncontrada"
          header={
            <div>
              <p className="">
                {idMascotaPerdida.nombre} se quitará de la lista de mascotas
                perdidas. Felicidades!
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
