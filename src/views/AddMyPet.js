import React from "react";
import AddPetForm from "../components/AddPetForm";
import { Button } from "primereact/button";
import AddPetDialog from "./AddPetDialog";
import { useState, useEffect } from "react";
import PetFound from "../components/PetFound";
import PetFoundDialog from "./PetFoundDialog";
import "../assets/SideBarButtons.css";

const AddMyPet = ({ printToast, updatePets, user }) => {
  const [addPetMsg, setaddPetMsg] = useState(false);
  const [petFoundMessage, setPetFoundMessage] = useState(false);

  const showAddPetMsg = () => {
    setaddPetMsg(true);
  };
  const showPetFoundedMsg = () => {
    setPetFoundMessage(true);
  };
  const hideShowPettMsg = () => {
    setaddPetMsg(false);
    setPetFoundMessage(false);
  };

  return (
    <div className="containerButtonsSidePanel">
      <div>
        <Button
          onClick={() => showAddPetMsg()}
          label="Agregar a mi mascota"
          className="button-containerSidePanel"
        />
      </div>
      <div>
        <Button
          onClick={() => showPetFoundedMsg()}
          label="Encontré una mascota"
          className="button-containerSidePanel"
        />
        {addPetMsg === true ? (
          <AddPetDialog
            showAddPetMsg={showAddPetMsg}
            hideShowPettMsg={hideShowPettMsg}
            printToast={printToast}
            updatePets={updatePets}
            user={user}
          />
        ) : (
          <p></p>
        )}
        {petFoundMessage === true ? (
          <PetFoundDialog
            hideShowPettMsg={hideShowPettMsg}
            updatePets={updatePets}
            printToast={printToast}
          />
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default AddMyPet;
