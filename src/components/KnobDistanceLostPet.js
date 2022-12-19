import { Slider } from "primereact/slider";
import { useState, useEffect } from "react";
import { Button } from "primereact/button";

const KnobDistanceLostPet = ({ setPetDistance }) => {
  const [value, setValue] = useState(4);

  return (
    <div className="petDistanceKnob">
      <h5>Radio de distancia: {value} Kilómetros</h5>
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
        onClick={(e) => {
          console.log('fetch')
          setPetDistance(value);
        }}
      />
      </div>

    </div>
  );
};

export default KnobDistanceLostPet;
