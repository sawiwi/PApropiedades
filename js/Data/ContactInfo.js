import {ContactInformation} from "../Data/userId.js";

const loadInformation = () => {

    let footerAddress = document.getElementById('footer-address');
    if (footerAddress !== null) {
        footerAddress.innerHTML = `
        <p class="text-white">
            <i class="fa fa-map-marker fa-lg text-white p-1"></i>
            ${ContactInformation.footerAddress}
        </p>`;
    }    

    let footerPhone = document.getElementById('footer-phone');
    if (footerPhone !== null) {
        footerPhone.innerHTML = `
        <p class="text-white">
            <i class="fa fa-phone fa-lg text-white p-1"></i>
            ${ContactInformation.footerPhone}
        </p>`;
    }

    let footerEmail = document.getElementById('footer-email');
    if (footerEmail !== null) {
        footerEmail.innerHTML = `
        <p class="text-white">
            <i class="fa fa-envelope fa-lg text-white p-1"></i>
            ${ContactInformation.footerEmail}
        </p>`;
    }
    

}

loadInformation();
