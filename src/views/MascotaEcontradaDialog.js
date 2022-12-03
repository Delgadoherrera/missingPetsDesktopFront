import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import axios from "axios";
import '../assets/MascotaEncontradaDialog.css'

export default function MascotaPerdida({ idMascotaPerdida, state, update,updatePets }) {
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
        update();
        updatePets()
      });
    dialogFuncMap[`${name}`](false);
  };

  const renderFooter = (name) => {
    return (
      <div className="encontradasDialogFooter">
         <Button
          value={idMascotaPerdida.idMascota}
          label="Mascota encontrada"
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
      <div className="card">
        <div className="grid flex-column">
          <div className="col">
            {idMascotaPerdida.status === 1 ? (
              <Button
                label={`ENCONTRE A  ${idMascotaPerdida.nombre}`.toUpperCase()}
                /* icon="pi pi-arrow-down" */ onClick={() =>
                  onClick("displayPosition", "top")
                }
                className="p-button-warning buttonLost buttonFoundPet"
              />
            ) : (
              <p></p>
            )}
          </div>
        </div>
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
