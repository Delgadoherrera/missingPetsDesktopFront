import AddMyPet from "../views/AddMyPet";
const SidePanelButtons = ({
  printToast,
  updatePets,
  user,
  setManageViews,
  manageViews,
  setRefreshPets
}) => {
  return (
    <div>
      <AddMyPet
        printToast={printToast}
        updatePets={updatePets}
        user={user}
        setManageViews={setManageViews}
        manageViews={manageViews}
        setRefreshPets={setRefreshPets}
      />
    </div>
  );
};
export default SidePanelButtons;
