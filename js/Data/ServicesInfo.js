import { servicesInformation } from "./userId.js";

const ServicesInfo = () => {
    localStorage.removeItem('globalQuery');
    const { card } = servicesInformation;

    /* LLENAR INFORMACION DE CARDS */
    let cards = document.getElementById('cards-info');
    if (cards !== null) { 
        cards.innerHTML = card.map((card)=>`
            <div class="col-xs-12 col-md-6 col-lg-6 carta-grilla  px-0 py-5 p-md-5">
                <div class="row " style="background-color: #F2F2F2;">
                    <div class="col-12 col-xl-4  p-0 text-center" >
                        <img src=${card.icon} class=" border mt-4" style="background-color: white;box-shadow: 0px 0px 13px 0px #757575;"  width="120px" height="120px" alt="">
                    </div>
                    <div class="col-12 col-xl-8  p-4">
                        <h3>${card.title}</h3>
                        <p style="font-size: 15px;">
                            ${card.desc}
                        </p>
                        ${card.href != '' ? 
                            `<div class="col-lg-12 p-1">
                                <a href="#id_formulario">
                                    <button type="submit" class="btn btn-primary p-2">COMPLETAR FORMULARIO</button>
                                </a>
                            </div>`: ''
                        }
                    </div>
                </div>
            </div>
        `).join('');
    };
}

ServicesInfo();
