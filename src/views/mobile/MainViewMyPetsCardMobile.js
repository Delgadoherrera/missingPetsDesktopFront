import { useEffect, useState } from "react";
import { MascotasService } from "../../services/MascotasService";
import SwitchPetLost from "../../components/SwitchPetLost";
import { Button } from "primereact/button";
import AddPetDialog from "../AddPetDialog";

import ButtonToolMyCardPet from "../../components/ButtonToolMyCardPet";
const MainViewMyPetCards = ({
  user,
  setRefreshPets,
  refreshPets,
  printToast,
}) => {
  const [pet, setPet] = useState([]);
  const [refreshPet, setRefreshPet] = useState(false);
  const [addPetMsg, setaddPetMsg] = useState(false);

  const [coordenadas, setCoordenadas] = useState({
    longitude: 0,
    latitude: 0,
  });
  const getAllPets = new MascotasService();

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
  useEffect(() => {
    getAllPets.getMyPets(user.email).then((data) => {
      console.log(data);
      setPet(data);
    });
  }, [refreshPets]);

  return (
    <>
      {/*     <p className="tittleContentDataDisplayPetLost">
        Mascotas perdidas en tu zona
      </p> */}
      <div className="addPetButtonMyPetsContainer">
        {" "}
        <Button
          onClick={() => setaddPetMsg(true)}
          label="Agregar mascota"
          className="addPetButtonMyPetsMobile"
        />
      </div>

      {/*       <div className="MainViewMyPetCards_controlPanel"></div>
       */}
      {/*       {pet.length > 0 ? (
        <div className="tittleMascotasPerdidas"> Mis mascotas</div>
      ) : (
        <p></p>
      )}
 */}
      {pet.length >= 0 ? (
        <div className="contentPetThumbailsMobile">
          {pet.map((one, key) => {
            return (
              <div className="petCardContentThumbailMobile">
                <div className="divPetImagePetLostThumbailMobile">
                  <img
                    className="petImageThumbailMobile"
                    src={`data:image/jpeg;base64,${one.fotoMascota}`}
                    alt="myPet"
                  />
                </div>
                <div className="cardLostPetContentDataMobile">
                  <div>
                    <p className="petCardContentThumbailNameMobile"> {one.nombre}</p>
                  </div>

                  {/*   <p className="petCardDetails">
                    Color principal: {one.colorPrimario}
                  </p>
                  <p className="petCardDetails">
                  
                    Color secundario: {one.colorSecundario}  
                  </p>
                  <p className="petCardDetails">
                    Peso aproximado: {one.pesoAproximado}
                  </p> */}
                  {/*    <p className="petCardDetailsDescription">
                      {one.descripcion}
                    </p> */}
                  <div className="divGeoAdress">
                    <SwitchPetLost
                      user={user}
                      state={coordenadas}
                      idMascotaPerdida={one}
                      petToSwitch={one}
                      setRefreshPets={setRefreshPets}
                      printToast={printToast}
                    />
                  </div>
                </div>
                <ButtonToolMyCardPet
                  petToEdit={one}
                  setRefreshPets={setRefreshPets}
                  printToast={printToast}
                />
              </div>
            );
          })}
          {addPetMsg === true ? (
            <AddPetDialog
              setRefreshPets={setRefreshPets}
              closeDialog={setaddPetMsg}
            />
          ) : (
            <p></p>
          )}
        </div>
      ) : (
        <p> Cargando...</p>
      )}
    </>
  );
};
export default MainViewMyPetCards;
