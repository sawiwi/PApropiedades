import {RedesContact} from "../Data/userId.js";

const loadInformation = () => {

    let redesContact = document.getElementById('redes-contact');

    if(redesContact !== null){
        redesContact.innerHTML =   
        `<h4 class="text-white">Descubre</h4>
        <li class="ico-sty"><a href="${RedesContact.facebook}" target="_blank"><span class="icon-facebook"></span></a></li>
        <li class="ico-sty"><a href="${RedesContact.instagram}" target="_blank"><span class="icon-instagram"></span></a></li>
        <li class="ico-sty"><a href="${RedesContact.linkedin}" target="_blank"><span class="icon-linkedin" target="_blank"></span></a></li>`
    }
}

loadInformation();