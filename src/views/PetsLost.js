import { MascotasService } from "../services/MascotasService";
import { useState, useEffect } from "react";
import React from "react";
import { Carousel } from "primereact/carousel";
import { Button } from "primereact/button";
import ContactoMascotaEncontrada from "./ContactoMascotaEncontrada";
import axios from "axios";
import "../assets/PetsLost.css";
import PetDetailDialog from "./PetDetailDialog";

export default function MascotasPerdidas() {
  const [mascotas, setMascotas] = useState([]);
  const [dialogFounded, setDialogFounded] = useState(false);
  const missingPets = new MascotasService();
  const [petDetail, setpetFoundDetail] = useState({});
  const [nearPets, setNearPets] = useState([]);
  const [detailPetDialog, setDetailPetDialog] = useState(0);
  const [state, setState] = useState({
    longitude: 0,
    latitude: 0,
  });
  const [files, setFiles] = useState([]);
  const reader = new FileReader();

  const responsiveOptions = [
    {
      breakpoint: "1024px",
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: "600px",
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: "480px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        axios
          .get("https://backend.missingpets.art/mascotas/mascotasPerdidas", {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              longitude: position.coords.longitude,
              latitude: position.coords.latitude,
            },
          })
          .then((res) => {
            /*       res.json() */
            setMascotas(res.data.data);
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
  }, []);

  useEffect(() => {
    setNearPets(nearPets);
  }, [mascotas]);

  const petFounded = (data) => {
    setDialogFounded(true);
    setpetFoundDetail(data.e);
  };

  const dataTemplate = (data) => {
    return (
      <div className="data-item">
        <div className="itemsCarousel">
          <div className="mb-3">
            <img
              src={`data:image/jpeg;base64,${data.fotoMascota}`}
              onError={(e) =>
                (e.target.src =
                  "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
              }
              alt={data.name}
              className="carouselImage"
              
              onClick={(e) => {
                petFounded({ e: data });

                setDetailPetDialog(petDetail.idMascota);
              }}
              
            />
            {detailPetDialog !== 0 ? (
              <PetDetailDialog
                petToEdit={petDetail}
                hideDialog={setDetailPetDialog}
              />
            ) : (
              <p></p>
            )}
          </div>    
        </div>
      </div>
    );
  };

  return mascotas ? (
    <>
      {mascotas.length > 0 ? (
        <div className="carousel-demo carouselPets">
          <div className="card">
            <Carousel
              value={mascotas}
              numVisible={3}
              numScroll={3}
              responsiveOptions={responsiveOptions}
              className="bodyCarousel"
              circular
              autoplayInterval={4000}
              itemTemplate={dataTemplate}
            />
          </div>
          <div className="divImageBack"></div>
        </div>
      ) : (
        <p>
          No registramos ninguna mascota perdida en tu zona, puedes comenzar
          cargando las mascotas que encuentres ;)
        </p>
      )}
    </>
  ) : (
    <p> </p>
  );
}
