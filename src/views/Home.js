import NavBar from "./PublicNavbar";
import { useAuth0 } from "@auth0/auth0-react";
import PrivateNavbar from "./PrivateNavbar";
import SideBar from "./SideBar";
import { useEffect, useState, useRef } from "react";
import { Toast } from "primereact/toast";
import MainDisplay from "./MainDisplay";
import TabMenu from "../views/mobile/TabsMenu";
import MainDisplayMobile from "../views/mobile/MainDisplayMobile";
import BannerHome from "../components/BannerHome";
import photoBanner from "../assets/images/background.jpg";
import HomeButtons from "../components/HomeButtons";

export default function Home() {
  const [manageViews, setManageViews] = useState("");
  const [navBarSelector, setNavbarSelector] = useState("");
  const [refreshPets, setUpdatePets] = useState(false);
  const [viewPort, setViewPort] = useState(0);
  const { user, isAuthenticated, getTokenSilently } = useAuth0();
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

  return (
    <div className="home_masterDiv">
      <div className="divTopNavBar">
        {user ? (
          <>
            <PrivateNavbar setSelector={setManageViews} />
          </>
        ) : (
          <NavBar setSelector={setManageViews} />
        )}
      </div>

      {/*       {window.screen.width < 1200 ? <p> nuevo design</p> : <p></p>} */}

      {viewPort > 800 ? (
        <>
        
          {user ? (
            <p></p>
          ) : (
            <div className="homeBanner_Buttons">
              <BannerHome />
              <HomeButtons />
            </div>
          )}

      
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
            {user ? (
            <MainDisplay
              manageViews={manageViews}
              user={user}
              setRefreshPets={setRefreshPets}
              refreshPets={refreshPets}
              printToast={printToast}
              navBarSelector={navBarSelector}
            />
          ) : (
            <p></p>
          )}
          </div>
        </>
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
          refreshPets={refreshPets}
          navBarSelector={navBarSelector}
        />
      ) : (
        <p></p>
      )}
    </div>
  );
}
