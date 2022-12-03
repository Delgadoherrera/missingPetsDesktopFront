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
export default function MediaCard({ pets, updatePets, printToast }) {
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
          <Card className="cardMyPets" sx={{ maxWidth: 345 }}>
            {/*   <CardMedia
          component="img"
          height="200"
          image={`data:image/jpeg;base64,${one.fotoMascota}`}
          alt="myPet"
        /> */}

            <CardContent className="cardContent">
              <Avatar
                alt="myPetAvatar"
                src={`data:image/jpeg;base64,${one.fotoMascota}`}
                className="avatarMyPets"
                
              />

              <Typography
                gutterBottom
                variant="h6"
                component="p"
                className="myPetName"
              >
                <div className="divNameClass">{one.nombre} </div>
                <div className="divToolsIcon">
                  <MenuDemo
                    petToEdit={one}
                    printToast={printToast}
                    updatePets={updatePets}
                  />
                </div>
              </Typography>
            </CardContent>
            {one.status === 1 ? (
              <ButtonMascotaEncontrada idMascotaPerdida={one} updatePets={updatePets}/>
            ) : (
              <ButtonMascotaPerdida
                state={coordenadas}
                idMascotaPerdida={one}
                updatePets={updatePets}
              />
            )}
          </Card>
        );
      })}
    </div>
  );
}
