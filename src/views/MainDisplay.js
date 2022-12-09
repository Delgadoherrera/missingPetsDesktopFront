import PetLostThumbails from "../components/PetLostThumbails";
import { useEffect, useState } from "react";
import MainViewMyPetsCard from './MainViewMyPetsCard'

const MainDisplay = ({manageViews, user,setRefreshPets,refreshPets}) => {
  const [petDistance, setPetDistance] = useState(100);
  const [view, setView] = useState("");

  const getView=(data)=>{
    setView(data);
  }
/*   useEffect(()=>{
    if (manageViews === 'Mis Mascotas'){

    }
  },[]) */

  return (
    <div className="MainDisplay_content">
      <div className="MainDisplay_view">
        {manageViews === "Mis mascotas" ? (
          <MainViewMyPetsCard petDistance={petDistance} manageViews={manageViews} user={user} setRefreshPets={setRefreshPets} refreshPets={refreshPets}/>
        ) : (
          <p></p>
        )}
        {manageViews === "Mascotas perdidas" ? (
          <PetLostThumbails petDistance={petDistance} manageViews={manageViews} refreshPets={refreshPets} />
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};
export default MainDisplay;
