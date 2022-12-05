import NavBar from "./PublicNavbar";
import { useAuth0 } from "@auth0/auth0-react";
import PrivateNavbar from "./PrivateNavbar";
import PetsLost from "./PetsLost";
import SideBar from "./SideBar";
import "../assets/Home.css";
import Portada from "../assets/images/portada.jpg";
import { useEffect, useState, useRef } from "react";
import { Toast } from "primereact/toast";
import PetLostImageList from "../components/PetLostImageList";
import ViewDataDisplay from "../components/ViewDataDisplay";

export default function Home() {
  const { user } = useAuth0();
  const toast = useRef(null);

  const printToast = (data) => {
    toast.current.show(data);
  };

  return (
    <div className="containerHomeDiv">
      <Toast ref={toast}></Toast>
      <div className="divTopNavBar">
        {user ? (
          <>
            <PrivateNavbar />
          </>
        ) : (
          <NavBar />
        )}
      </div>
      {user ? (
        <div className="containerSideBar">
          <SideBar user={user} printToast={printToast} />
        </div>
      ) : (
        <p></p>
      )}
      {user ? <ViewDataDisplay /> : <p></p>}
    </div>
  );
}
