import "../assets/SideBar.css";
import MyPets from "./MyPets";
import ButtonSidePanel from "../components/ButtonsSidePanel";
import { useEffect, useState } from "react";
import { MascotasService } from "../services/MascotasService";
import { useAuth0 } from "@auth0/auth0-react";

const SideBar = ({ printToast }) => {
  const [pet, setPet] = useState([]);
  const [refreshPet, setRefreshPet] = useState(false);

  const getAllPets = new MascotasService();
  const { user } = useAuth0();
  const updatePets = () => {
    setRefreshPet(!refreshPet);
  };
  useEffect(() => {
    getAllPets.getMyPets(user.email).then((data) => {
      setPet(data);
    });
  }, [refreshPet]);

  return (
    <div className="sideBar">
      <ButtonSidePanel printToast={printToast} updatePets={updatePets} />
      <MyPets printToast={printToast} pet={pet} updatePets={updatePets} />
    </div>
  );
};
export default SideBar;
