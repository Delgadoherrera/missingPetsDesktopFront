import { MensajesService } from "../services/MensajesService";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import MensajesArea from "../views/MensajesArea";
const getAllMsg = new MensajesService();

export default function Mensajes() {
  const [allMsg, setAllMsg] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [displayMessage, setDisplayMessage] = useState(false);
  const [emisario, setEmisario] = useState(0);
  const [inbox, setInbox] = useState({});
  const [nombreEmisario, setNombreEmisario] = useState("");

  const getAllMsg = new MensajesService();

  useEffect(() => {
    getAllMsg.getAllMyMsg(localStorage.id).then((data) => {
      setAllMsg(data[0]);
    });
  }, []);

  useEffect(() => {
    setFilteredMessages(letrasUnicas);
  }, [allMsg]);

  let letrasUnicas = [];
  let idUnicos = [];

  allMsg.forEach((elemento) => {
    if (!letrasUnicas.includes(elemento.nombre)) {
      letrasUnicas.push(elemento.nombre);
    }
  });

  allMsg.forEach((elemento) => {
    if (!idUnicos.includes(elemento.idHumano)) {
      idUnicos.push(elemento.idHumano);
    }
  });

  let hash = {};
  let filteredMsg = allMsg.filter(function (current) {
    let exists = !hash[current.nombre];
    hash[current.nombre] = false;
    return exists;
  });

  const clicOnMessages = (e) => {
    setDisplayMessage(!displayMessage);
    setEmisario(e.currentTarget.value);
    setNombreEmisario(e.currentTarget.ariaLabel);
  };
  const updateComponent = () => {
    setDisplayMessage(!displayMessage);
  };

  return (
    <div className="divMsg">
      <p className="contactoMensajesInfo">
        Si encuentran a tu mascota perdida, aqui te llegarán los mensajes cuando
        intenten contactarte.
      </p>

      {displayMessage === true ? (
        <MensajesArea
          updateComponent={updateComponent}
          idReceptor={emisario}
          nombreEmisario={nombreEmisario}
        />
      ) : (
        <p></p>
      )}
      {filteredMessages.map((one, index) => {
        return (
          <div className="mensajesDiv">
            <Button
              key={one.id}
              type="button"
              label={` Mensaje de: ${one}`}
              icon="pi pi-users"
              className="mensajesButton" /* badge="1" */
              badgeClassName="mensajesButton"
              aria-label={one}
              value={idUnicos[index]}
              onClick={(e) => {
                clicOnMessages(e);
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
