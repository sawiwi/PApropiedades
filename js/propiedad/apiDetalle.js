import { getPropertiesForId } from "../services/PropertiesServices.js";
import ExchangeRateServices from "../services/ExchangeRateServices.js";
import { parseToCLPCurrency, clpToUf, validationUF,validationCLP, ufToClp } from '../utils/getExchangeRate.js';

export default async function apiDetalleCall(id, statusId = 1, companyId) {
    let { data } = await getPropertiesForId(id, statusId, companyId);
    const response = await ExchangeRateServices.getExchangeRateUF();
    const ufValue = response?.UFs[0]?.Valor
    const ufValueAsNumber = parseFloat(ufValue.replace(',', '.'));

    let realtorInfo = data.realtor;

    let updatedImages = data.images.map(function (image) {
        return image.replace(/\\/g, "//");
    });

    
    //! transformar valor del uf a int
    const cleanedValue = ufValue.replace(/\./g, '').replace(',', '.');
    const ufValueAsInt = parseFloat(cleanedValue).toFixed(0);
    //!--

   
    // console.log(updatedImages);
    //* INFORMACION
    //! Informacion principal
    let mainInfo = document.getElementById('main-info-prop');
    if (mainInfo !== null) {

        //! Title and direction */
        document.getElementById('main-info-prop').innerHTML = `
            <h1 class="heading " style="font-weight: bold; color: #4D4D4D;">${data?.title}</h1>
            <p>REF:${data.id}</p>
            <p >
                <i class="fa fa-map-marker "  aria-hidden="true"></i>
                ${data.commune != null && data.commune != undefined && data.commune != "" ? data.commune : "No registra comuna"}, ${data.city != null && data.city != undefined && data.city != "" ? data.city : "No registra ciudad"}, Chile
            </p>
        `;

        //! Price */
        document.getElementById('price-info-prop').innerHTML = `
            <div class="col-12" style="display: flex;justify-content: right;">
                <b>
                    <h2 style="font-weight: bold; color: #4D4D4D;">${data?.operation}</h2>
                    <h1 class="heading " style="font-weight: bold; color: #4D4D4D;">UF ${validationUF(data?.currency.isoCode) ? data?.price : clpToUf(data.price, ufValueAsNumber)}</h1>
                </b>
            </div>
            <div class="col-12" style="display: flex;justify-content: right;color:#ffb649">
                <h5 class="heading"style="color:#ffb649"> CLP   ${validationCLP(data?.currency.isoCode) ? parseToCLPCurrency(data?.price): parseToCLPCurrency(ufToClp(data.price, ufValueAsInt))}</h5>
            </div>
        `;


        let imagenes = "";
        let imgcaroucel = "";

        
	// CAROUCEL
	data.images.forEach((images, index) => {
		imagenes +=
		`<div class="carousel-item ${index === 0 ? "active" : ""}" style="padding-top: 8px">
		<img src="${images.replace(/\\/g, "//") != undefined ? images.replace(/\\/g, "//") : 'Ir a'}" class="img img-carroucel"/>
	</div>`

	});

	document.getElementById('carousel-img-prop').innerHTML = `
				<div id="carouselExampleControlsNoTouching" class="carousel slide" data-bs-touch="false" data-bs-interval="false">
				<div class="carousel-inner">
				 	${imagenes}
				</div>
				<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="prev">
				<span class="carousel-control-prev-icon" aria-hidden="true"></span>
				<span class="visually-hidden">Previous</span>
				</button>
				<button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="next">
					<span class="carousel-control-next-icon" aria-hidden="true"></span>
					<span class="visually-hidden">Next</span>
				</button>
				</div>`;
	//FIN CAROUCEL

// CAROUCEL MODAL
    document.getElementById('format-carousel-prop').innerHTML = `
    <div class="col-6  p-3 " style="border-right: 1px #ffb649 solid;">						
                <a type="button" class="" data-bs-toggle="modal"
                    data-bs-target="#modalImgCarrousel">
                    IMÁGENES
                </a>			
    </div>
    <div class="col-6  p-3">
                <a href="">VISTA 360°</a>		
    </div>`;

    data.images.forEach((images, index) => {
		imgcaroucel +=
		`<div class="carousel-item ${index === 0 ? "active" : ""}">
			<img src="${images.replace(/\\/g, "//") != undefined ? images.replace(/\\/g, "//") : 'Ir a'}" class="img-carroucel-modal" />
		</div>`
	})

	document.getElementById('modal-carroucel-img').innerHTML = `
											<div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel" data-bs-touch="true">							
												<div class="carousel-inner">
													${imgcaroucel}
												</div>
												<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
												  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
												  <span class="visually-hidden">Previous</span>
												</button>
												<button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
												  <span class="carousel-control-next-icon" aria-hidden="true"></span>
												  <span class="visually-hidden">Next</span>
												</button>
											</div>`;

// FIN CAROUCEL MODAL



        //! Description */
        document.getElementById('description-info-prop').innerHTML = `
            <p>${data.description}</p>
            <h3>Caracteristicas generales</h3>
            <ul class="list-caract-gral">
                <li>
                    <span><b>Tipo operación: </b></span><span>${data.operation}</span>
                </li>
                <li>	
                    <span><b>Tipo propiedad: </b></span><span>${data.types}</span>
                </li>
                <li>	
                    <span><b>Código de propiedad: </b></span><span>${data.id}</span>
                </li>
            </ul>
        `;



        document.getElementById('caract-prop').innerHTML = `
        <ul class="list-caract-prop">
            <li style="font-size: 30px;">
                <i class="fa fa-bed"  aria-hidden="true"></i>
                <span>${data.bedrooms || "0"}</span>
            </li>
            <li style="font-size: 30px;">		
                <i class="fa fa-bath  "  aria-hidden="true"></i>
                <span>${data?.bathrooms || "0"}</span>
            </li>
            <li style="font-size: 30px;">	
                <i class="fa fa-car"  aria-hidden="true"></i>
                <span>${data?.coveredParkingLots || "0"}</span>			
            </li>
            <li style="font-size: 30px;">
                    <i class="fa fa-ruler  "  aria-hidden="true"></i>					
                    <span>${data?.surface_m2 || "0"}m2</span>		
                </div>				
            </li>
        </ul>`;
        //! Contacto */
        document.getElementById('realtorImage').innerHTML = `
            <div class="img text-center">
            <img src="https://papropiedades.cl/wp-content/uploads/2022/09/Variante-PA_Gestio%CC%81n-inmobiliaria-1.png" alt="Image" class="img-fluid"
            style="width: 90%; max-width: 380px; ">
            </div>
        `;
        document.getElementById('realtorName').innerHTML = `
            <p style="font-size: 26px;"><b>${realtorInfo.name} ${realtorInfo?.lastName || ""}</b></p>
        `;
        document.getElementById('realtorEmail').innerHTML = `
            <i class="fa fa-envelope-open "aria-hidden="true"></i>
            ${realtorInfo.mail != null && realtorInfo.mail != undefined && realtorInfo.mail != "" ? realtorInfo.mail : "No registra Mail"}
        `;
        document.getElementById('realtorPhone').innerHTML = `
            <i class="fa fa-whatsapp" aria-hidden="true"></i>
            ${realtorInfo.contactPhone != null && realtorInfo.contactPhone != undefined && realtorInfo.contactPhone != "" ? realtorInfo.contactPhone : "No registra Numero"}
        `;

    };
}