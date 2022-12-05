import "../assets/SideBar.css";
import MyPets from "./MyPets";
import ButtonSidePanel from "../components/ButtonsSidePanel";
import { useEffect, useState } from "react";
import { MascotasService } from "../services/MascotasService";
import { useAuth0 } from "@auth0/auth0-react";

const SideBar = ({ printToast,user }) => {
  const [pet, setPet] = useState([]);
  const [refreshPet, setRefreshPet] = useState(false);
  const getAllPets = new MascotasService();

  useEffect(() => {
    getAllPets.getMyPets(user.email).then((data) => {
      setPet(data);
    });
  }, [refreshPet]);
  const updatePets = () => {
    setRefreshPet(!refreshPet);
  };
  return (
    <div className="sideBar">
      <ButtonSidePanel
        printToast={printToast}
        updatePets={updatePets}
        user={user}
      />
      <MyPets
        printToast={printToast}
        pet={pet}
        updatePets={updatePets}
        user={user}
      />
    </div>
  );
};
export default SideBar;
