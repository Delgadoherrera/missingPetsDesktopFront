import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import PetFound from '../components/PetFound'
import '../assets/PetFoundDialog.css'

const PetFoundDialog = ({hideShowPettMsg,updatePets}) => {
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
    hideShowPettMsg()
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
          header="Encontré una mascota"
          visible={displayResponsive}
          onHide={() => onHide("displayResponsive")}
          breakpoints={{ "300px": "75vw" }}
          style={{ width: "90vw", textAlign:"center" }}
          footer={renderFooter("displayResponsive")}
          className='petFoundDialog'
        >
     <PetFound updatePets={updatePets}/>
        </Dialog>
      </div>
    </div>
  );
};
export default PetFoundDialog;
