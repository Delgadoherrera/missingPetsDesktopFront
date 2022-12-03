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

  console.log({ user });

  return (
    <div className="homeBody">
      <Toast ref={toast}></Toast>
      {user ? (
        <>
          <PrivateNavbar />
          {/*        <PetsLost /> */}
          <SideBar printToast={printToast} />
          <ViewDataDisplay />
{/*           <PetLostImageList />
 */}        </>
      ) : (
        <NavBar />
      )}
{/*       <img className="portadaPicture" src={Portada} alt="portadaPicture" />
 */}    </div>
  );
}
