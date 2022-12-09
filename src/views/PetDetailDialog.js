import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Image } from 'primereact/image';

const DialogDemo = ({petToEdit, hideDialog}) => {
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
    hideDialog(0)
  };

  const renderFooter = (name) => {
    return (
      <div>
     {/*    <Button
          label="No"
          icon="pi pi-times"
          onClick={() => onHide(name)}
          className="p-button-text"
        /> */}
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
          header="Detalles de la mascota"
          visible={displayResponsive}
          onHide={() => onHide("displayResponsive")}
          breakpoints={{ "300px": "75vw" }}
          style={{ width: "90vw" }}
          footer={renderFooter("displayResponsive")}
          className="detailMascotaDialog"
          contentClassName="editarMascotaContentDialog"
        >
        <div className="contentCardPetDetail">
            <h4 className="mb-1 detailPetName"> {petToEdit.nombre}</h4>
            <p className="mt-0 mb-3 petDescriptionCard">{petToEdit.descripcion}</p>

            <div className="detailsCardDivColors">
              <div>
                  Color primario: {petToEdit.colorPrimario}
              </div>
              <div>
                  Color secundario: {petToEdit.colorSecundario}
              </div>
              <div>
                  Peso aproximado: {petToEdit.pesoAproximado}
              </div>
            </div>
          </div>
          <Image
            alt="myPetImg"
            src={`data:image/jpeg;base64,${petToEdit.fotoMascota}`}
            preview
            width="250"
            height="250"
            imageClassName="imgPetEditDialog"
            
          />
        </Dialog>
      </div>
    </div>
  );
};
export default DialogDemo;
