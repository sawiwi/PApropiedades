import { getProperties, getPropertiesForCustomUrl} from "../services/PropertiesServices.js";
import { PropertyData, limitDataApi } from "../Data/userId.js";
import { parseToCLPCurrency, clpToUf, validationUF, validationCLP, ufToClp } from "../utils/getExchangeRate.js";
import ExchangeRateServices from "../services/ExchangeRateServices.js";

mapboxgl.accessToken = 'pk.eyJ1Ijoic2VyZ2lvdmVyYWhlcm5hbmRlemJpZGF0YSIsImEiOiJjbDMwZHc4cmswMDdqM2NydmIzYWF0cGl4In0.hsYQFPebleAB4j6mRckMzQ';
const map = new mapboxgl.Map({
        
    container: 'map',
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-70.680628,-33.469970],
    // projection: 'globe',
    zoom: 9,
    
});

const markers = [];

function limpiarMarcadores(dataMarket) {
    dataMarket.forEach(marker => {
        marker.remove();
    });

    // Vaciar el array
    dataMarket.length = 0;
}


export default async function apiCallMap() {
    const { CodigoUsuarioMaestro, companyId, realtorId } = PropertyData;

    
    if(markers.length > 0){
        limpiarMarcadores(markers);
    }

    function validateImage(image){
        if(image){
          if(image.endsWith('.jpg') || image.endsWith('.png') || image.endsWith('.jpeg')){
            return `<img src=${image} alt="Image" class="img-fluid">`;
          }
          return `<img src='https://res.cloudinary.com/dbrhjc4o5/image/upload/v1681933697/unne-media/errors/not-found-img_pp5xj7.jpg' alt="" class="img-fluid">`;
        }
        else{
          return `<img src='https://res.cloudinary.com/dbrhjc4o5/image/upload/v1681933697/unne-media/errors/not-found-img_pp5xj7.jpg' alt="" class="img-fluid">`;
        }
      }

    let data;
    let response;
    let filtersUrl = '';

    let storedFiltersUrl = localStorage.getItem('globalFiltersUrl');
    if(storedFiltersUrl){
        filtersUrl = storedFiltersUrl;
    }

    //* el segundo digito es el limit
    response = await getPropertiesForCustomUrl(1, limitDataApi.limitMap, CodigoUsuarioMaestro, 1, companyId, realtorId, filtersUrl);
    //* Guardar el response en el localStorage
    localStorage.setItem('globalResponse', JSON.stringify(response));

    data = response.data;
    


    // console.log('data en map: ',data);
    const promiseMap = new Promise(
        (resolve)=>{
        data.map(data => {    
            
                if(data.LngLat === null )return; 

                const LngLat= data.LngLat.replace('{','').replace('}','').replace(',', '').replace('Lat', "").split(':');
            

                const propiedad = [parseFloat(LngLat[1]) , parseFloat(LngLat[2])];

                // create the popup
                const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
                <span>${data.title}</span>
                <br>
                <a href="/detalle_propiedad.html?${data.id}&realtorId=${realtorId}&statusId=${1}&companyId=${companyId}" target="_blank" name="VerDetalle"  class="more d-flex align-items-center float-start">
                <span class="label" id="getProperty">Ver Detalle</span>
                <span class="arrow"><span class="icon-keyboard_arrow_right"></span></span>
                </a>`)
                
                // create DOM element for the marker
                const el = document.createElement('div');
                el.id = 'marker';
                // el.style.backgroundImage = `${data.img != null && data.img != '' && data.img != undefined ? data.img : "images/Sin.png"}`;
                // el.style.width = `${50}px`;
                // el.style.height = `${50}px`;
                // el.style.backgroundSize = "100%";
            
                const marker = new mapboxgl.Marker({
                    color: '#000',
                    scale: .8
                })
            
                // create the marker
                // new mapboxgl.Marker(el)
                
                    
                marker.setLngLat(propiedad)
                      .setPopup(popup) // sets a popup on this marker
                      .addTo(map);

                markers.push(marker); // push de marcadores al array markers
                
            })
            resolve()
        }
    ) 
    promiseMap.then(()=>{
          
        map.on('load', function () {
            map.resize();
        });
        map.on('style.load', () => {
            map.setFog({}); // Set the default atmosphere style

        });
    })

    //* Cambio del Uf
    const response2 = await ExchangeRateServices.getExchangeRateUF();
    const ufValue = response2?.UFs[0]?.Valor;
    const ufValueAsNumber = parseFloat(ufValue.replace(",", "."));

    //! transformar valor del uf a int
    const cleanedValue = ufValue.replace(/\./g, '').replace(',', '.');
    const ufValueAsInt = parseFloat(cleanedValue).toFixed(0);

    //todo: Modificar url de image
    data = data.map(item => {
        // Reemplazar "\\" por "//" en la propiedad "image"
        if(item.image){
            item.image = item.image.replace(/\\/g, "//");
          }
          return item;

    });

    document.getElementById('container-prop-slide').innerHTML = data.map(data => `
        <li class="splide__slide">
            <div class="property-item" style="margin:0 10px">
                <a href="/property-single.html?${data.id}&statusId=${1}&companyId=${companyId}" class="img" target="_blank">
                    ${validateImage(data.image)}
                </a>
                <div class="property-content">
                    <p style="margin-bottom: 0;"> COD: ${data.id} </p>
                    <p style="margin-bottom: 0;"> <i class="fa fa-map-marker fa-lg"></i> ${data.address != null && data.address != undefined && data.address != "" ? data.address : "No registra dirección"}, ${data.commune != null & data.commune != undefined && data.commune != "" ? data.commune : "No registra comuna"}</p>
                    <a href="/property-single.html?${data.id}&statusId=${1}&companyId=${companyId}" target="_blank">
                        <span class="city d-block mb-3 text-transform-2" style="font-weight: bold;font-size: 30px;">${data.title}</span>
                    </a>
                    <div class="" style="border-top: 2px solid #ffb649";">
                        <div class="row p-3 ">
                            <div class="col-5 hr-l">
                                <div class="row ">
                                    <div class="col-12">Dormitorios</div>
                                    <div class="col-12">${data.bedrooms != undefined && data.bedrooms != "" && data.bedrooms != null ? data.bedrooms : "0"}</div>
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
                                    <div class="col-12">M2</div>
                                    <div class="col-12">${data.surface_m2 != undefined && data.surface_m2 != "" && data.surface_m2 != null ? data.surface_m2 : "0"}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    `).join('');

    let splide = new Splide(".splide", {
    type    : 'loop',
    perPage : 3,
    perMove: 1,
    // autoWidth: true,
    drag:true,
    breakpoints:{
        1399:{perPage:2},
        991:{perPage:1}
    }});

    splide.on( 'pagination:mounted', function ( data ) {
        // You can add your class to the UL element
        data.list.classList.add( 'display-hidden' );
      } );
    splide.mount();
     

}


