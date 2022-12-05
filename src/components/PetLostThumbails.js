import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import React, { useState, useEffect, useRef } from "react";
import { DataScroller } from "primereact/datascroller";
import { Button } from "primereact/button";
import "../assets/DataScrollerDemo.css";
import axios from "axios";
import ContactoMascotaEncontrada from "../views/ContactoMascotaEncontrada";
import "../assets/PetLostThumbails.css";
const DataScrollerLoaderDemo = ({ petDistance }) => {
  const [pets, setPets] = useState([]);
  const [state, setState] = useState({
    longitude: 0,
    latitude: 0,
  });
  const [dialogFounded, setDialogFounded] = useState(false);
  const [petDetail, setpetFoundDetail] = useState({});

  const ds = useRef(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async function (position) {
        await axios
          .get("https://backend.missingpets.art/mascotas/mascotasPerdidas", {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              longitude: position.coords.longitude,
              latitude: position.coords.latitude,
              distanceSlider: petDistance,
            },
            distanceSlider: petDistance,
          })
          .then((res) => {
            /*       res.json() */
            setPets(res.data.data);
          });

        setState({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });
      },
      function (error) {
        console.error("Error Code = " + error.code + " - " + error.message);
      },
      {
        enableHighAccuracy: true,
      }
    );
  }, [petDistance]);
  const petFounded = (data) => {
    setDialogFounded(true);
    setpetFoundDetail(data.e);
  };

  return (
    <>
      {/*     <p className="tittleContentDataDisplayPetLost">
        Mascotas perdidas en tu zona
      </p> */}

      {pets.length > 0 ? (
        <div className="contentPetThumbails">
          {pets.map((one, key) => {
            return (
              <div className="petCardContentThumbail">
                <div className="divPetImagePetLostThumbail">
                  <img
                    className="petImageThumbail"
                    src={`data:image/jpeg;base64,${one.fotoMascota}`}
                    alt="myPet"
                  />
                </div>
                <div>
                  <p className="petCardContentThumbailName"> {one.nombre}</p>
                </div>
                <p className="petCardDetails">
                  Color principal: {one.colorPrimario}
                </p>
                <p className="petCardDetails">
                  {" "}
                  Color secundario: {one.colorSecundario}
                </p>
                <p className="petCardDetails">
                  Peso aproximado: {one.pesoAproximado}
                </p>
                <div>
                  <p className="petCardDetailsDescription">{one.descripcion}</p>
                </div>
                <div className="divGeoAdress">
                  {one.geoAdress === "No está perdida" ? (
                    <p className="geoAdress">Perdida en: {one.geoAdress} </p>
                  ) : (
                    <p className="geoAdress">Encontrada en: {one.geoAdress} </p>
                  )}{" "}
                </div>

                <div className="car-buttons mt-5">
                  {one.status === 3 ? (
                    <Button
                      onClick={() => petFounded({ e: one })}
                      className="p-button p-button-rounded mr-2 buttonCardPetThumbail"
                      label="Es mi mascota"
                    />
                  ) : (
                    <Button
                      onClick={() => petFounded({ e: one })}
                      className="p-button p-button-rounded mr-2 buttonCardPetThumbail"
                      label={`Encontré ${one.nombre}`}
                    />
                  )}
                  {dialogFounded === true ? (
                    <ContactoMascotaEncontrada
                      idMascotaPerdida={petDetail}
                      setDialog={setDialogFounded}
                    />
                  ) : (
                    <p></p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p> Cargando...</p>
      )}
    </>
  );
};
export default DataScrollerLoaderDemo;
