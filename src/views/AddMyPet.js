import React from "react";
import AddPetForm from "../components/AddPetForm";
import { Button } from "primereact/button";
import AddPetDialog from "./AddPetDialog";
import { useState, useEffect } from "react";
import PetFound from "../components/PetFound";
import PetFoundDialog from "./PetFoundDialog";

const AddMyPet = ({
  printToast,
  updatePets,
  setManageViews,
  manageViews,
  setRefreshPets,
}) => {
  const [addPetMsg, setaddPetMsg] = useState(false);
  const [petFoundMessage, setPetFoundMessage] = useState(false);

  const showPetFoundedMsg = () => {
    setPetFoundMessage(true);
  };
  const hideShowPettMsg = () => {
    setaddPetMsg(false);
    setPetFoundMessage(false);
  };

  return (
    <div className="addMyPet_containerButtonsSidePanel">
      <Button
        onClick={() => setManageViews("Mascotas perdidas")}
        label="Mascotas perdidas"
        className="button-containerSidePanel"
      />
      <Button
        onClick={() => showPetFoundedMsg()}
        label="Encontré una mascota"
        className="button-containerSidePanel"
      />

      <Button
        onClick={() => setManageViews("Adopta una mascota")}
        label="Adopta una mascota"
        className="button-containerSidePanel"
      />
      <Button
        onClick={() => setManageViews("Mis mascotas")}
        label="Mis mascotas"
        className="button-containerSidePanel"
      />
      {manageViews === "Mis mascotas" ? (
        <Button
          onClick={() => setaddPetMsg(true)}
          label="Agregar mascota"
          className="button-containerSidePanel subMenuItem"
        />
      ) : (
        <p></p>
      )}
      {addPetMsg === true ? (
        <AddPetDialog
          setRefreshPets={setRefreshPets}
          closeDialog={setaddPetMsg}
        />
      ) : (
        <p></p>
      )}
      {petFoundMessage === true ? (
        <PetFoundDialog
          hideShowPettMsg={hideShowPettMsg}
          updatePets={updatePets}
          printToast={printToast}
          setRefreshPets={setRefreshPets}
          closeDialog={setPetFoundMessage}
        />
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default AddMyPet;
