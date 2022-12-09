import NavBar from "./PublicNavbar";
import { useAuth0 } from "@auth0/auth0-react";
import PrivateNavbar from "./PrivateNavbar";
import PetsLost from "./PetsLost";
import SideBar from "./SideBar";
import { useEffect, useState, useRef } from "react";
import { Toast } from "primereact/toast";
import MainDisplay from "./MainDisplay";

export default function Home() {
  const [manageViews, setManageViews] = useState("");
  const [refreshPets, setUpdatePets]=useState(false)
  const { user } = useAuth0();
  const toast = useRef(null);

  console.log(refreshPets)

  const setRefreshPets=()=>{
    setUpdatePets(!refreshPets)
  }

  const printToast = (data) => {
    toast.current.show(data);
  };

  return (
    <div className="home_masterDiv">
      <div className="divTopNavBar">
        {user ? (
          <>
            <PrivateNavbar />
          </>
        ) : (
          <NavBar />
        )}
      </div>
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
        <MainDisplay manageViews={manageViews} user={user} setRefreshPets={setRefreshPets} refreshPets={refreshPets}/>
      </div>
    </div>
  );
}
