import { RealtorSendEmailData } from "../Data/userId.js";
const formEmail = document.getElementById('form-realtor');

formEmail.addEventListener('submit', function (e) {
    e.preventDefault();
    let realtorMail = RealtorSendEmailData.detail;

    let firstName = document.getElementById('nameDetail');
    let email = document.getElementById('emailDetail');
    let phone = document.getElementById('phoneDetail');
    let message = document.getElementById('messageDetail');

    if(firstName.value==='' || email.value==='' || phone.value==='' || message.value===''){
        /* console.log('campos vacios') */
        return;
    }

    fetch(`https://formsubmit.co/ajax/${realtorMail}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            Nombre: firstName.value,
            Correo: email.value,
            Telefono: phone.value,
            Mensaje: message.value,
        })
    })
        .then(response => response.json())
        .then((data) => {
            console.log('SendEmail: ',data)
            console.log(data.success)
            console.log('mensaje enviado');
        })
        .catch(error => console.log('SendEmailError: ',error));

})