import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import React, { useState, useEffect } from "react";
import { TabMenu } from "primereact/tabmenu";
import { Button } from "primereact/button";

import MainDisplayMobile from "../../views/mobile/MainDisplayMobile";
const TabMenuDemo = ({
  setManageViews,
  user,
  printToast,
  manageViews,
  setRefreshPets,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [view, setView] = useState("");

  const itemsNoUser = [{ label: "Mascotas perdidas" }];

  const items = [
    { label: "Mascotas perdidas" },
    { label: "Encontre una mascota" },
    { label: "Adopta una mascota" },
    { label: "Mis mascotas" },
  ];

  useEffect(() => {
    if (activeIndex === 0) {
      setManageViews("Mascotas perdidas");
    } else if (activeIndex === 1) {
      setManageViews("Encontre una mascota");
    } else if (activeIndex === 2) {
      setManageViews("Adopta una mascota");
    } else if (activeIndex === 3) {
      setManageViews("Mis mascotas");
    }
  }, [activeIndex]);

  return (
    <div className="tabMenuMobileContainer">
      <div className="card">
        {user ? (
          <TabMenu
            model={items}
            activeIndex={activeIndex}
            onTabChange={(e) => {
              setActiveIndex(e.index);
            }}
            className="tabMenuMobile"
          />
        ) : (
          <TabMenu
            model={itemsNoUser}
            activeIndex={activeIndex}
            onTabChange={(e) => {
              setActiveIndex(e.index);
            }}
            className="tabMenuMobile"
          />
        )}
      </div>

      <MainDisplayMobile
        user={user}
        printToast={printToast}
        setManageViews={setManageViews}
        manageViews={manageViews}
        setRefreshPets={setRefreshPets}
      />
    </div>
  );
};
export default TabMenuDemo;
