import React from "react";
import PetFoundDialog from './PetFoundDialog'
import { useState, useEffect } from "react";

const PetFoundButton = () => {
  const [menu, setMenu] = useState(false);

  const mostrarMensaje = () => {
    setMenu(!menu);
  };

  return (
    <div>
      <button onClick={() => mostrarMensaje()}> Encontre una mascota</button>
      {menu === true ? <PetFoundDialog /> : <p></p>}
    </div>
  );
};

export default PetFoundButton;
