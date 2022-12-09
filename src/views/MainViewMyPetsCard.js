import { useEffect, useState } from "react";
import { MascotasService } from "../services/MascotasService";
import SwitchPetLost from "../components/SwitchPetLost";
import ButtonToolMyCardPet from "../components/ButtonToolMyCardPet";
const MainViewMyPetCards = ({ user, setRefreshPets, refreshPets }) => {
  const [pet, setPet] = useState([]);
  const [refreshPet, setRefreshPet] = useState(false);
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

/*   useEffect(() => {
    if (refreshPets === true) {
      console.log('USFX ES TRUE')
      getAllPets.getMyPets(user.email).then((data) => {
        setPet(data);
      });
      setRefreshPet(false)
    }
  }, []); */
  return (
    <>
      {/*     <p className="tittleContentDataDisplayPetLost">
        Mascotas perdidas en tu zona
      </p> */}

      <p className="tittleMascotasPerdidas"> Mis mascotas</p>
      <div className="MainViewMyPetCards_controlPanel"></div>

      {pet.length > 0 ? (
        <div className="contentPetThumbails">
          {pet.map((one, key) => {
            return (
              <div className="petCardContentThumbail">
                <div className="divPetImagePetLostThumbail">
                  <img
                    className="petImageThumbail"
                    src={`data:image/jpeg;base64,${one.fotoMascota}`}
                    alt="myPet"
                  />
                </div>
                <div className="cardLostPetContentData">
                  <div>
                    <p className="petCardContentThumbailName"> {one.nombre}</p>
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
                    />
                  </div>
                </div>
                <ButtonToolMyCardPet petToEdit={one} setRefreshPets={setRefreshPets} />
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
export default MainViewMyPetCards;
