import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "../assets/MyPetsCard.css";
import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import ButtonMascotaPerdida from "../views/MascotaPerdidaDialog";
import ButtonMascotaEncontrada from "../views/MascotaEcontradaDialog";
import MenuDemo from "../components/ButtonToolMyCardPet";
export default function MediaCard({ pets, updatePets, printToast, user }) {
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [idMascota, setIdMascota] = useState(0);
  const [coordenadas, setCoordenadas] = useState({
    longitude: 0,
    latitude: 0,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        setCoordenadas({
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
  }, []);

  return (
    <div className="componentMyPetsCard">
      <p className="tittleMyPets"> Mis mascotas</p>
      {pets.map((one, inex) => {
        return (
          <Card className="cardSideBarMyPets">
            <CardContent className="cardSideBarMyPetsContent">
              <p className="namePetMyPetCard">{one.nombre}</p>

              <div className="avatarAndToolContainer">
                <Avatar
                  alt="myPetAvatar"
                  src={`data:image/jpeg;base64,${one.fotoMascota}`}
                  className="avatarMyPets"
                />
                <MenuDemo
                  petToEdit={one}
                  printToast={printToast}
                  updatePets={updatePets}
                />
              </div>
              <div className="buttonContainerPetCard">
                {one.status === 1 ? (
                  <ButtonMascotaEncontrada
                    user={user}
                    idMascotaPerdida={one}
                    updatePets={updatePets}
                  />
                ) : (
                  <ButtonMascotaPerdida
                    user={user}
                    state={coordenadas}
                    idMascotaPerdida={one}
                    updatePets={updatePets}
                  />
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
