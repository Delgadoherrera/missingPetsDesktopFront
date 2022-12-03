import "../assets/ViewDataDisplay.css";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import "../assets/ControlPanelDataDisplay1.css";
import ControlPanelDataDisplay1 from "./ControlPanelDataDisplay1";
import PetLostThumbails from "./PetLostThumbails";
import KnobDistanceLostPet from "./KnobDistanceLostPet";
import Mensajes from '../components/Mensajes'

const ViewPetsDisplay = () => {
  const [screenDataDisplay, setScreenDataDisplay] = useState("");
  const [petDistance, setPetDistance]= useState(4)

  return (
    <div className="ViewDataDisplay">
      <div className="sideBarDataDisplay">
        <div className="buttonsContainerSideBarDataDisplay">
          <Button
            className="buttonsSideBarDataDisplay"
            onClick={() => setScreenDataDisplay("PetLostThumbails")}
          >
            Mascotas perdidas
          </Button>
          <Button className="buttonsSideBarDataDisplay" onClick={()=>setScreenDataDisplay('mascotasEnAdopcion')}>
            Mascotas en adopción
          </Button>
          <Button className="buttonsSideBarDataDisplay" onClick={()=>setScreenDataDisplay('messages')}> Mensajes</Button>
        </div>
        <div className="controlPanelDataDisplay">
        {screenDataDisplay === "PetLostThumbails" ? (
          <KnobDistanceLostPet setPetDistance={setPetDistance} />
        ) : (
          <p> </p>
        )}
        </div>
        <div className="controlPanelDataDisplay2">

        </div>
        <div className="controlBottomPanelDataDisplay"> </div>
      </div>
      <div className="screenDataDisplay">
        {screenDataDisplay === "PetLostThumbails" ? (
          <PetLostThumbails petDistance={petDistance} />
        ) : (
          <p> </p>
        )}

        {screenDataDisplay === "messages" ? (
          <Mensajes />
        ) : (
          <p> </p>
        )}


        {screenDataDisplay === 'mascotasEnAdopcion' ? <p> Mascotas en adopcion:</p> :<p></p>}
      </div>
    </div>
  );
};
export default ViewPetsDisplay;
