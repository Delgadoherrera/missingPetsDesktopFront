import "../assets/ButtonsSidePanel.css";
import AddMyPet from "../views/AddMyPet";
const SidePanelButtons = ({ printToast, updatePets }) => {
  return (
    <div>
      <AddMyPet printToast={printToast} updatePets={updatePets} />
    </div>
  );
};
export default SidePanelButtons;
