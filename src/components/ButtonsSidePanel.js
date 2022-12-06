import AddMyPet from "../views/AddMyPet";
const SidePanelButtons = ({ printToast, updatePets, user }) => {
  return (
    <div>
      <AddMyPet printToast={printToast} updatePets={updatePets} user={user} />
    </div>
  );
};
export default SidePanelButtons;
