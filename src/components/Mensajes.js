import { MensajesService } from "../services/MensajesService";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import MensajesArea from "../components/MensajesArea";
import { useAuth0 } from "@auth0/auth0-react";

const getAllMsg = new MensajesService();

export default function Mensajes() {
  const [allMsg, setAllMsg] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [displayMessage, setDisplayMessage] = useState(false);
  const [emisario, setEmisario] = useState(0);
  const [inbox, setInbox] = useState({});
  const [nombreEmisario, setNombreEmisario] = useState("");
  const { user } = useAuth0();

  const getAllMsg = new MensajesService();

  useEffect(() => {
    getAllMsg.getAllMyMsg(user.email).then((data) => {
      setAllMsg(data);
    });
  }, []);
  let letrasUnicas = [];
  let idUnicos = [];

  if (allMsg.length > 0) {
    allMsg.forEach((elemento) => {
      if (!letrasUnicas.includes(elemento.emailReceptor)) {
        letrasUnicas.push(elemento.emailReceptor);
      }
    });
    allMsg.forEach((elemento) => {
      if (!idUnicos.includes(elemento.emailEmisor)) {
        idUnicos.push(elemento.emailEmisor);
      }
    });
    let hash = {};
    let filteredMsg = allMsg.filter(function (current) {
      let exists = !hash[current.emailReceptor];
      hash[current.emailEmisor] = false;
      return exists;
    });
  }

  useEffect(() => {
    setFilteredMessages(letrasUnicas);
  }, [allMsg]);

  /*
   */

  const clicOnMessages = (e) => {
    console.log(e.currentTarget.ariaLabel);
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
        <MensajesArea updateComponent={updateComponent} idReceptor={emisario} />
      ) : (
        <p></p>
      )}
      {filteredMessages.length > 0 ? (
        filteredMessages.map((one, index) => {
          console.log("one", one);
          return (
            <div className="mensajesDiv">
              <Button
                key={index}
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
        })
      ) : (
        <p> </p>
      )}
    </div>
  );
}
