import { motion } from "framer-motion";
import Zoom from "react-reveal/Zoom";
import Bounce from "react-reveal/Bounce";
import photoBanner from "../assets/images/background.jpg";

export default function Banner() {
  return (
    <div className="bannerHome">
      <img
        className="backgroundImage"
        src={photoBanner}
        alt="backgroundImage"
      />
      <div className="bannerDiv">
        <Bounce>
          <div className="bannerText">
            <h2> Crea un perfil para tu mascota</h2>
            <p>Si se pierde te ayudamos a buscarla</p>
          </div>
        </Bounce>
      </div>
    </div>
  );
}
