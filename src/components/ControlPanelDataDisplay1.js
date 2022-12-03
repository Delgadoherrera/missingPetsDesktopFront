import "primeicons/primeicons.css";
import React, { useState } from "react";

const ControlPanel = () => {
  const [leftHover, isleftHover] = useState(false);
  const [rigthHover, isrightHover] = useState(false);
  const leftArrow =
    leftHover === true
      ? "pi pi-step-backward  pulse-animated-leftArrowDataDisplay"
      : "pi pi-step-backward arrowIcon leftArrowDataDisplay";
  const rightArrow =
    rigthHover === true
      ? "pi pi-step-forward  pulse-animated-rightArrowDataDisplay"
      : "pi pi-step-forward arrowIcon rightArrowDataDisplay";

  return (
    <div className="ControlPanel1Arrows">
      <i
        className={leftArrow}
        onMouseDown={() => isleftHover(!leftHover)}
        onMouseUp={() => isleftHover(!leftHover)}
      ></i>
      <i
        className={rightArrow}
        onMouseDown={() => isrightHover(!rigthHover)}
        onMouseUp={() => isrightHover(!rigthHover)}
      ></i>
    </div>
  );
};

export default ControlPanel;
