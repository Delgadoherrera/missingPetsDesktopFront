import React from "react";
import MyPetsCard from "./MyPetsCard";

const MyPets = ({ printToast,updatePets,pet,user }) => {


  return (
    <div className="divMyPetsContent">
      <MyPetsCard pets={pet} updatePets={updatePets} printToast={printToast} />
    </div>
  );
};

export default MyPets;
