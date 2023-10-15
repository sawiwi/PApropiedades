import { AboutInformation } from "./userId.js";

const AboutInfo = () => {
    localStorage.removeItem('globalQuery');
    /* LLENAR INFORMACION DE DESCRIPCION */
    let desc = document.getElementById('description-about');
    if (desc !== null) {
        desc.innerHTML = `${AboutInformation.desc}`;
    }
    /* LLENAR INFORMACION DE MISION */
    let mision = document.getElementById('mision-about');
    if (mision !== null) {
        mision.innerHTML = `${AboutInformation.mision}`;
    }
    /* LLENAR INFORMACION DE VISION */
    let vision = document.getElementById('vision-about');
    if (vision !== null) {
        vision.innerHTML = `${AboutInformation.vision}`;
    }
}

AboutInfo();