import { Slider } from "primereact/slider";
import { useState, useEffect } from "react";
import { Button } from "primereact/button";
import "../assets/KnobDistanceLostPet.css";

const KnobDistanceLostPet = ({ setPetDistance }) => {
  const [value, setValue] = useState(4);

  return (
    <div>
      <h5>Kilometros: {value}</h5>
      <Slider
      max={100}
      min={1}
        value={value}
        onChange={(e) => {
          setValue(e.value);
          
        }}
      />
      <div>
      <Button
        label="Buscar"
        className="searchButtonPetLost"
        onClick={() => {
          setPetDistance(value);
        }}
      />
      </div>

    </div>
  );
};

export default KnobDistanceLostPet;
