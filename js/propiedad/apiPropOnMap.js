import { getProperties } from "../services/PropertiesServices.js";
import ExchangeRateServices from "../services/ExchangeRateServices.js";
import { parseToCLPCurrency, clpToUf } from "../utils/getExchangeRate.js";
import { PropertyData, limitDataApi } from "../Data/userId.js";
import apiCallMap from "../propiedad/apiMapProp.js";

// import { getProps } from "../utils/pagPropiedad.js";



export default async function apiCallPropMap() {
    const { CodigoUsuarioMaestro, companyId, realtorId } = PropertyData;
    let response;
    
    let storedGlobalResponse = localStorage.getItem('globalResponse');
    if (storedGlobalResponse) {
        response = JSON.parse(storedGlobalResponse);
        let maxPage =  Math.ceil(response.meta.totalItems / response.meta.limit);
        localStorage.setItem('LimitPages', JSON.stringify(maxPage));
        /* localStorage.setItem('countPage', JSON.stringify(1)); */
    }
    else {
        //* el segundo digito es el limit
        response = await getProperties(1, limitDataApi.limit, CodigoUsuarioMaestro, 1, companyId, realtorId);
        //* Guardar el response en el localStorage
        localStorage.setItem('globalResponse', JSON.stringify(response));

        let maxPage =  Math.ceil(response.meta.totalItems / response.meta.limit);
        localStorage.setItem('LimitPages', JSON.stringify(maxPage));
        localStorage.setItem('countPage', JSON.stringify(1));
    }

let data = response.data;
const response2 = await ExchangeRateServices.getExchangeRateUF();
const ufValue = response2?.UFs[0]?.Valor
const ufValueAsNumber = parseFloat(ufValue.replace(',', '.'));


const filtroSelect = document.getElementById('FilterPrice');
filtroSelect.addEventListener('change', handleFilterChange);
showItems();

function handleFilterChange() {
  const selectedValue = filtroSelect.value;
//   console.log(selectedValue);
//   console.log(data);

  let dataOrdenada;

  if (selectedValue === 'MayorMenor') {
    /* console.log('La opción seleccionada es MayorMenor'); */
    dataOrdenada = data.sort((a, b) => b.price - a.price);
  } else {
    /* console.log('La opción seleccionada es Menor mayor'); */
    dataOrdenada = data.sort((a, b) => a.price - b.price);
  }
//   console.log(dataOrdenada);
  showItems();
}


function showItems() {
document.getElementById("total-prop").innerHTML = `<span>${response.meta.totalItems} Propiedades encontradas
	</span>`;
  // let filtrado = data.filter(data => data.city != null && data.commune != null);
  document.getElementById('container-map-prop').innerHTML = data.map(data => 
    `<li class="splide__slide">
    <div class="col-xs-12 col-md-6 col-lg-12 col-sm-12 carta-grilla">
    <div class="property-item text-center">
        <a href="/property-single.html?${data.id}&realtorId=${realtorId}&statusId=${1}&companyId=${companyId}" class="img">
        ${data.image.endsWith('.jpg') ? `<img src=${data.image} alt="Image" class="img-fluid">`: data.image.endsWith('.png') ? `<img src=${data.image} alt="Image" class="img-fluid ">` : data.image.endsWith('.jpeg') ? `<img src=${data.image} alt="Image" class="img-fluid ">`: `<img src='https://res.cloudinary.com/dbrhjc4o5/image/upload/v1681933697/unne-media/errors/not-found-img_pp5xj7.jpg' alt="Image" class="img-fluid">`}
        </a>
        <div class="property-content border">
            <p style="margin-bottom: 0;"> <i class="fa fa-map-marker fa-lg"></i>${data.commune != undefined && data.commune != "" && data.commune != null ? data.commune : "No registra comuna"}, ${data.city != null & data.city != undefined && data.city != "" ? data.city : "No registra ciudad"}, Chile</p>
            <a href="/property-single.html?${data.id}&realtor=${realtorId}&statusId=${1}&companyId=${companyId}">
                <span class="city d-block mb-3 texto-titulo" style="font-weight: bold;font-size: 25px;">${data.title != null && data.title != undefined ? data.title : "No cuenta con titulo"}</span>
            </a>
            <p style="font-size: 20px;">REF: ${data.id}</p>

            <div class="" style="border-top: 2px solid #ffb649;">
                <div class="row p-3 ">
                    <div class="col-5 hr-l">
                        <div class="row ">
                            <div class="col-12">Dormitorios</div>
                            <div class="col-12">${data.bedrooms != undefined && data.bedrooms != null && data.bedrooms != "" ? data.bedrooms : "0" }</div>
                        </div>
                    </div>
                    <div class="col-3 hr-l">
                        <div class="row ">
                            <div class="col-12">UF</div>
                            <div class="col-12">${clpToUf(data.price, ufValueAsNumber)}</div>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="row">
                            <div class="col-12">Baños</div>
                            <div class="col-12">${data.bathrooms != undefined && data.bathrooms != null && data.bathrooms != "" ? data.bathrooms : "0" }</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</li>`).join('');

let splide = new Splide(".splide", {
    type    : 'loop',
    perPage : 3,
    autoplay: 'play',
    drag:true,   
    breakpoints: {
        1200:{
         perPage:2
        },
        990:{
        perPage : 1,
        focus:'center'     
        },
       766:{
        perPage : 1
       } 
    }
});
splide.mount();

    }
}

document.addEventListener("DOMContentLoaded", function () {
	let splide = new Splide(".splide");
	splide.mount();
});

apiCallPropMap()