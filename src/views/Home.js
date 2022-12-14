import NavBar from "./PublicNavbar";
import { useAuth0 } from "@auth0/auth0-react";
import PrivateNavbar from "./PrivateNavbar";
import PetsLost from "./PetsLost";
import SideBar from "./SideBar";
import { useEffect, useState, useRef } from "react";
import { Toast } from "primereact/toast";
import MainDisplay from "./MainDisplay";
import TabMenu from "../views/mobile/TabsMenu";
import MainDisplayMobile from '../views/mobile/MainDisplayMobile'

export default function Home() {
  const [manageViews, setManageViews] = useState("Mascotas perdidas");
  const [navBarSelector, setNavbarSelector] = useState("");
  const [refreshPets, setUpdatePets] = useState(false);
  const [viewPort, setViewPort] = useState(0);
  const { user } = useAuth0();
  const toast = useRef(null);
  const width = window.screen.width;

  const setSelector = (j) => {
    setNavbarSelector(j);
    console.log(j);
  };
  const setRefreshPets = () => {
    setUpdatePets(!refreshPets);
  };

  const printToast = (data) => {
    toast.current.show(data);
  };

  useEffect(() => {
    setViewPort(width);
  }, [width]);
  console.log('manageviews',manageViews)

  console.log(viewPort);
  return (
    <div className="home_masterDiv">
      <div className="divTopNavBar">
        {user ? (
          <>
            <PrivateNavbar setSelector={setManageViews} />
          </>
        ) : (
          <NavBar />
        )}
      </div>

      {/*       {window.screen.width < 1200 ? <p> nuevo design</p> : <p></p>} */}

      {viewPort > 800 ? (
        <div className="home_container">
          <Toast ref={toast}></Toast>
          {user ? (
            <div className="containerSideBar">
              <SideBar
                user={user}
                printToast={printToast}
                setManageViews={setManageViews}
                manageViews={manageViews}
                setRefreshPets={setRefreshPets}
              />
            </div>
          ) : (
            <p></p>
          )}
          <MainDisplay
            manageViews={manageViews}
            user={user}
            setRefreshPets={setRefreshPets}
            refreshPets={refreshPets}
            printToast={printToast}
            navBarSelector={navBarSelector}
          />
        </div>
      ) : (
        <p></p>
      )}

      {viewPort < 800 ? (
        <TabMenu
          user={user}
          printToast={printToast}
          setManageViews={setManageViews}
          manageViews={manageViews}
          setRefreshPets={setRefreshPets}
        />
      ) : (
        <p></p>
      )}
    </div>
  );
}
