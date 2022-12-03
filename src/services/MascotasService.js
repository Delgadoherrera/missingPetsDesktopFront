
export class MascotasService {

    getMyPets(mail) {
        return fetch(`https://backend.missingpets.art/mascotas/getMyPets/${mail}`, {
            method: "GET",
            withCredentials: true,
            headers: {
                "x-access-token": localStorage.authKey,
                "Content-Type": "application/json"
              }
        }).then(res => res.json()).then(d => d.data);
    }

    getAllMissingPets() {
        return fetch('https://backend.missingpets.art/mascotas/mascotasPerdidas').then(res => res.json()).then(d => d.data);
    }

    getPetsByZone() {
        return fetch('https://backend.missingpets.art/mascotas/mascotaEncontrada').then(res => res.json()).then(d => d.data);
    }
}
