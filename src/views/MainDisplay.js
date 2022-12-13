import PetLostThumbails from "../components/PetLostThumbails";
import { useEffect, useState } from "react";
import MainViewMyPetsCard from "./MainViewMyPetsCard";
import Mensajes from "../components/Mensajes";

const MainDisplay = ({
  manageViews,
  user,
  setRefreshPets,
  refreshPets,
  printToast,
  navBarSelector,
}) => {
  const [petDistance, setPetDistance] = useState(100);
  const [view, setView] = useState("");

  const getView = (data) => {
    setView(data);
  };
  /*   useEffect(()=>{
    if (manageViews === 'Mis Mascotas'){

    }
  },[]) */

  return (
    <div className="MainDisplay_content">
      <div className="MainDisplay_view">
        {manageViews === "Mis mascotas" ? (
          <MainViewMyPetsCard
            petDistance={petDistance}
            manageViews={manageViews}
            user={user}
            setRefreshPets={setRefreshPets}
            refreshPets={refreshPets}
            printToast={printToast}
          />
        ) : (
          <p></p>
        )}
        {manageViews === "Mascotas perdidas" ? (
          <PetLostThumbails
            petDistance={petDistance}
            manageViews={manageViews}
            refreshPets={refreshPets}
            printToast={printToast}
          />
        ) : (
          <p></p>
        )}

        {manageViews === "Mensajes" ? <Mensajes /> : <p></p>}
      </div>
    </div>
  );
};
export default MainDisplay;
