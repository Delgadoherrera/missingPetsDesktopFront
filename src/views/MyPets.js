import React from "react";
import MyPetsCard from "./MyPetsCard";
import "../assets/MyPets.css";

const MyPets = ({ printToast,updatePets,pet }) => {


  return (
    <div className="divMyPetsContent">
      <MyPetsCard pets={pet} updatePets={updatePets} printToast={printToast} />
    </div>
  );
};

export default MyPets;
