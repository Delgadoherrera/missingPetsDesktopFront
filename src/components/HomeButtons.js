import Zoom from "react-reveal/Zoom";
import MascotasPerdidasXL from "./MascotasPerdidasXL";
import { useState } from "react";
import { fontWeight } from "@mui/system";
import Button from "@mui/material/Button";
import MascotasEnAdopcion from "./MascotasEnAdopcion";
import PleaseLogin from "./PleaseLogin";
const HomeButtons = () => {
  const [homeView, setHomeView] = useState("");

  const handleCloseView = () => {
    setHomeView("");
  };

  return (
    <div className="bannerHome homeButtons">
      <div className="bannerDiv bannerDiv_homeButtons">
        <Zoom right>
          <div>
            <div className="bannerText bannerText_homeButtons ">
              <button
                onClick={() => setHomeView("Mascotas Perdidas")}
                style={buttonStyle}
              >
                Mascotas perdidas
              </button>
              <button
                onClick={() => setHomeView("Mis mascotas")}
                style={buttonStyle}
              >
                Mis mascotas
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
      {homeView === "Mascotas en adopcion" ? (
        <MascotasEnAdopcion handleCloseView={handleCloseView} />
      ) : (
        <p></p>
      )}
      {homeView === "Mis mascotas" ? (
        <PleaseLogin handleCloseView={handleCloseView} />
      ) : (
        <p></p>
      )}
    </div>
  );
};
export default HomeButtons;

const buttonStyle = {
  borderColor: "white",
  borderRadius: "15px",
  border: "1px solid white",
  fontSize: "0.8rem",
  fontWeight: 100,
  padding: "0.5%",
};
