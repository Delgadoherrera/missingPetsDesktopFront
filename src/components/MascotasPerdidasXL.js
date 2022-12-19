import Fade from "react-reveal/Fade";

import PetLostThumbails from "../components/PetLostThumbails";
const MascotasPerdidas = () => {
  return (
    <Fade ssrFadeout>
      <div className="mascotasPerdidasXl">
        <PetLostThumbails />
      </div>
    </Fade>
  );
};

export default MascotasPerdidas;
