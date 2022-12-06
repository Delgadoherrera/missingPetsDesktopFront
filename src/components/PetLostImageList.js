import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import React, { useState, useEffect, useRef } from "react";
import { DataScroller } from "primereact/datascroller";
import { Button } from "primereact/button";
import axios from "axios";
import ContactoMascotaEncontrada from "../views/ContactoMascotaEncontrada";

const DataScrollerLoaderDemo = () => {
  const [products, setProducts] = useState([]);
  const [state, setState] = useState({
    longitude: 0,
    latitude: 0,
  });
  const [dialogFounded, setDialogFounded] = useState(false);
  const [petDetail, setpetFoundDetail] = useState({});

  const ds = useRef(null);
  console.log("mascotasPerdidas", products);

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
            setProducts(res.data.data);
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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const petFounded = (data) => {
    setDialogFounded(true);
    setpetFoundDetail(data.e);
  };

  const itemTemplate = (data) => {
    return (
      <div className="product-item cardsLostPetList">
        <img
          src={`data:image/jpeg;base64,${data.fotoMascota}`}
          onError={(e) =>
            (e.target.src =
              "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
          }
          alt={data.name}
        />
        <div className="product-detail productDetailLostPetList">
          <div className="product-name">{data.nombre}</div>
          <div className="product-description dataDescriptionListPetLost">
            {data.descripcion}
          </div>

          <span className="product-category spanDataPetLostList">
            <i className="pi pi-tag product-category-icon"></i>
            {data.colorPrimario}
          </span>
          <br />

          <span className="product-category spanDataPetLostList">
            <i className="pi pi-tag product-category-icon"></i>
            {data.colorSecundario}
          </span>
          <br />

          <span className="product-category spanDataPetLostList">
            <i className="pi pi-tag product-category-icon"></i>
            {data.pesoAproximado}
          </span>
          <br />
        </div>
        <div className="product-action">
          {/*           <span className="product-price">${data.price}</span>
           */}{" "}
          <div className="car-buttons mt-5">
            {data.status === 3 ? (
              <Button
                onClick={() => petFounded({ e: data })}
                className="p-button p-button-rounded mr-2 buttonCardLostPetList"
                label="Es mi mascota"
              />
            ) : (
              <Button
                onClick={() => petFounded({ e: data })}
                className="p-button p-button-rounded mr-2 buttonCardLostPetList"
                label={`Encontré a ${data.nombre}`}
              />
            )}
            {dialogFounded === true ? (
              <ContactoMascotaEncontrada idMascotaPerdida={petDetail} />
            ) : (
              <p></p>
            )}
          </div>
        </div>
      </div>
    );
  };

  const footer = (
    <Button
      type="text"
      icon="pi pi-plus"
      label="Cargar más..."
      onClick={() => ds.current.load()}
      className="loadMorePetsPetLostList"
    />
  );

  return products.length > 0 ? (
    <div className="datascroller-demo dataLostMyPetList">
      <div className="card">
        <DataScroller
          ref={ds}
          value={products}
          itemTemplate={itemTemplate}
          rows={4}
          footer={footer}
          header="Mascotas perdidas en tu zona"
        />
      </div>
    </div>
  ) : (
    <p> Cargadndo</p>
  );
};
export default DataScrollerLoaderDemo;
