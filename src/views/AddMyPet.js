import React from "react";
import AddPetForm from "../components/AddPetForm";
import { Button } from "primereact/button";
import AddPetDialog from "./AddPetDialog";
import { useState, useEffect } from "react";
import PetFound from '../components/PetFound'
import PetFoundDialog from "./PetFoundDialog";

const AddMyPet = ({printToast,updatePets}) => {
  const [addPetMsg, setaddPetMsg] = useState(false);
  const [petFoundMessage, setPetFoundMessage] = useState(false);


  const showAddPetMsg = () => {
    setaddPetMsg(true);
  };
  const showPetFoundedMsg = () => {
    setPetFoundMessage(true);
  };
  const hideShowPettMsg=()=>{
    setaddPetMsg(false);
    setPetFoundMessage(false);
  }


  return (
    <div>
      <Button
        onClick={() => showAddPetMsg()}
        label="Agregar a mi mascota"
        icon="pi pi-plus-circle"
        className="addPetSideButton"
      />
      <Button
        onClick={() => showPetFoundedMsg()}
        label="Encontré una mascota"
        icon="pi pi-plus-circle"
        className="PetFoundSideButton"
      />
      {addPetMsg === true ? <AddPetDialog showAddPetMsg={showAddPetMsg} hideShowPettMsg={hideShowPettMsg} printToast={printToast} updatePets={updatePets}/> : <p></p>}
      {petFoundMessage === true ? <PetFoundDialog hideShowPettMsg={hideShowPettMsg} updatePets={updatePets}/> : <p></p>}
    </div>
  );
};

export default AddMyPet;
