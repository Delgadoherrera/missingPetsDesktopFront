import Zoom from "react-reveal/Zoom";
import MascotasPerdidasXL from "./MascotasPerdidasXL";
import { useState } from "react";

const HomeButtons = () => {
  const [homeView, setHomeView] = useState("");
  const buttonStyle = {
    borderColor: "white",
    borderRadius: "15px",
    border: "1px solid white",
    fontSize: '0.9rem'
  };
  return (
    <div className="bannerHome">
      <div className="bannerDiv">
        <Zoom right>
          <div>
            <div className="bannerText">
              <button
                onClick={() => setHomeView("Mascotas Perdidas")}
                style={buttonStyle}
              >
                Mascotas perdidas
              </button>
              <button
                onClick={() => setHomeView("Mascotas en adopcion")}
                style={buttonStyle}
              >
                Mascotas en adopción
              </button>
            </div>
          </div>
        </Zoom>
      </div>
      {homeView === "Mascotas Perdidas" ? <MascotasPerdidasXL /> : <p></p>}
    </div>
  );
};
export default HomeButtons;
