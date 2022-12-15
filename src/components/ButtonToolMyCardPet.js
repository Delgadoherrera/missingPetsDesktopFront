import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import React, { useRef, useState, useEffect } from "react";
import { Menu } from "primereact/menu";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import EditPetDialog from "../views/EditPetDialog";
import CoonfirmDeletePet from "../views/ConfirmDeletePet";
import ConfirmarAdopcionDialog from "../views/ConfirmarAdopcionDialog";
import ConfirmarQuitarAdopcionDialog from "../views/ConfirmarQuitarAdopcionDialog";

const MenuDemo = ({ petToEdit, printToast, updatePets, setRefreshPets }) => {
  const menu = useRef(null);
  const toast = useRef(null);
  const [petEdit, setPetEdit] = useState(false);
  const [deletePetDialog, setdeletePetDialog] = useState(false);
  const [adoptar, setAdoptar] = useState(false);
  const [quitarAdoptar, setQuitarAdoptar] = useState(false);

  const updateEditComponent = () => {
    setPetEdit(true);
  };
  const hideDeleteDialog = () => {
    setdeletePetDialog(false);
  };
  const hideEditDialog = () => {
    setPetEdit(false);
  };

  const hideAdopcionDialog = () => {
    setAdoptar(false);
  };
  const hideQuitarAdoptarDialog = () => {
    setQuitarAdoptar(false);
  };

  const items = [
    {
      items: [
        {
          label: "Editar",
          icon: "pi pi-refresh",
          command: () => {
            setPetEdit(true);
          },
        },
        {
          label: "Eliminar",
          icon: "pi pi-times",
          command: () => {
            setdeletePetDialog(true);
          },
        },
      ],
    },

    petToEdit.status !== 4
      ? {
          items: [
            {
              label: "Dar en adopción",
              icon: "pi pi-external-link",
              command: () => {
                setAdoptar(true);
              },
            },
          ],
        }
      : {
          items: [
            {
              label: "Quitar de adopción",
              icon: "pi pi-external-link",
              command: () => {
                setQuitarAdoptar(true);
              },
            },
          ],
        },
  ];

  return (
    <div>
      <Menu model={items} popup ref={menu} id="popup_menu" />
      <Toast ref={toast}></Toast>
      <i
        onClick={(event) => menu.current.toggle(event)}
        aria-controls="popup_menu"
        aria-haspopup
        class="pi pi-cog iconEditMyPetMobile"
      ></i>
      {petEdit === true ? (
        <EditPetDialog
          petToEdit={petToEdit}
          hideEditDialog={hideEditDialog}
          updateEditComponent={updateEditComponent}
          printToast={printToast}
          updatePets={updatePets}
        />
      ) : (
        <p> </p>
      )}

      {deletePetDialog === true ? (
        <CoonfirmDeletePet
          hideDialog={hideDeleteDialog}
          petToDelete={petToEdit}
          updatePets={updatePets}
          printToast={printToast}
        />
      ) : (
        <p></p>
      )}

      {adoptar ? (
        <ConfirmarAdopcionDialog
          hideDialog={hideAdopcionDialog}
          petToDelete={petToEdit}
          updatePets={setRefreshPets}
          printToast={printToast}
        />
      ) : (
        <p></p>
      )}

      {quitarAdoptar ? (
        <ConfirmarQuitarAdopcionDialog
          hideDialog={hideQuitarAdoptarDialog}
          petToDelete={petToEdit}
          updatePets={setRefreshPets}
          printToast={printToast}
        />
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default MenuDemo;
