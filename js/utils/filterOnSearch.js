import renderCall from "../propiedad/render.js";

//*Inicializar variables

let region;

let query = {
    operationType: null,
    typeOfProperty: null,
    region: null,
    commune: null,
    min_price: null,
    max_price: null,
    bathrooms: null,
    bedrooms: null,
    covered_parking_lots: null,
    typePrice: null,
    // surface_m2:null
}

let globalQuery;
//* Actualizar variables si vienen del index
let storedGlobalQuery = localStorage.getItem('globalQuery');
if (storedGlobalQuery) {
    globalQuery = JSON.parse(storedGlobalQuery);
    // console.log('globalQuery: ',globalQuery);

    if(globalQuery.bathrooms != null){
        document.getElementById("bathrooms").value = globalQuery.bathrooms;
        query.bathrooms = globalQuery.bathrooms;
    }
    if(globalQuery.bedrooms != null){
        document.getElementById("bedrooms").value = globalQuery.bedrooms;
        query.bedrooms = globalQuery.bedrooms;
    }

    if(globalQuery.covered_parking_lots != null){
        document.getElementById("covered_parking_lots").value = globalQuery.covered_parking_lots;
        query.covered_parking_lots = globalQuery.covered_parking_lots;
    }
    if(globalQuery.max_price != null){
        document.getElementById("max_price").value = globalQuery.max_price;
        query.max_price = globalQuery.max_price;
    }
    if(globalQuery.min_price != null){
        document.getElementById("min_price").value = globalQuery.min_price;
        query.min_price = globalQuery.min_price;
    }
    // if(globalQuery.surface_m2 != null){
    //     document.getElementById("Superficie_m2").value = globalQuery.surface_m2;
    //     query.surface_m2 = globalQuery.surface_m2;
    // }
    if(globalQuery.operationType != null){
        query.operationType = globalQuery.operationType;
        if(globalQuery.operationType == 'venta'){document.getElementById('flexRadioDefault1').checked = true}
        if(globalQuery.operationType == 'arriendo'){document.getElementById('flexRadioDefault2').checked = true}
        if(globalQuery.operationType == 'arriendo_temporal'){document.getElementById('flexRadioDefault3').checked = true}
        
    }
    if(globalQuery.typePrice != null){
        /* document.getElementById("operationType").value = globalQuery.operationType; */
        if(globalQuery.typePrice == 'uf'){document.getElementById('inlineRadio1').checked = true}
        if(globalQuery.typePrice == 'clp'){document.getElementById('inlineRadio2').checked = true}
    }
    //* Actualizar variable segun el globalQuery
    if(globalQuery.region != null){
        //globalQuery.region = 2 Antofagasta
        //region = Antofagasta
        region = globalQuery.region.replace(/\d+/, '').trim();

    }
    //* Actualizar variable segun el globalQuery
    if(globalQuery.commune != null){
        //globalQuery.commune = Calama
        query.commune = globalQuery.commune;

    }
    //* Actualizar variable segun el globalQuery
    if(globalQuery.typeOfProperty != null){
        query.typeOfProperty = globalQuery.typeOfProperty;
    }
} 


//* Actualizar variables
//! Operacion
document.getElementById('flexRadioDefault1').addEventListener('change', mostrarValor);
document.getElementById('flexRadioDefault2').addEventListener('change', mostrarValor);
document.getElementById('flexRadioDefault3').addEventListener('change', mostrarValor);
function mostrarValor(event) {
    query.operationType = event.target.value;
}


//!Tipo de propiedad
document.getElementById('typeOfProperty').addEventListener('change' ,(element) => {
    query.typeOfProperty =  element.target.value;
    // console.log(element.target.value);
})

//! Region
document.getElementById("regionTextId").addEventListener( "change", (element) => {
    region = element.target.value;
    // console.log('id region: ',region);
    if(element.target.value === 0 || element.target.value === '0'){
        region = '';
        query.commune = '';
    }
    // console.log(element.target.value);
})

//! Comuna
document.getElementById("communeTextId").addEventListener( "change", (element) => {
    query.commune = element.target.value;  
    // console.log(element.target.value);
})

//! Habitaciones
document.getElementById("bedrooms").addEventListener( "change", (element) => { 
    query.bedrooms =  element.target.value;
})

//! Estacionamientos
document.getElementById("covered_parking_lots").addEventListener( "change", (element) => {
    query.covered_parking_lots = element.target.value;  
})

//! Baños
document.getElementById("bathrooms").addEventListener( "change", (element) => {
    query.bathrooms= element.target.value; 
})

//! precio- UF or CLP
document.getElementById('inlineRadio1').addEventListener('change', saveTypePrice);
document.getElementById('inlineRadio2').addEventListener('change', saveTypePrice);
function saveTypePrice(event) {
    query.typePrice = event.target.value;
}
//! Precio Minimo
document.getElementById("min_price").addEventListener( "change", (element) => {
    // return element.target.value;
    query.min_price = element.target.value;
})

//! Precio Maximo
document.getElementById("max_price").addEventListener( "change", (element) => {
    query.max_price= element.target.value;
})

//! Superficie
// document.getElementById("Superficie_m2").addEventListener( "change", (element) => {
//     query.surface_m2= element.target.value;
// })


function disabledButton(){
    let buttonSearch = document.getElementById('buscar2');
    buttonSearch.disabled = true;
}
function activeButton(){
    let buttonSearch = document.getElementById('buscar2');
    buttonSearch.disabled = false;
}
  


//TODO: Al hacer click en buscar, Mostrara todos los valores guardados
document.getElementById('buscar2')?.addEventListener('click', async() => {
    // console.log('%c==================','color:yellow');
    // console.log('%cFilterOnSearch','color:yellow');
    //* mostrar spinner loading
    document.getElementById("buscar2").innerHTML = `<div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div>`;
    disabledButton();

    //todo: RESCATAR Y SEPARAR EL ID Y NAME DE REGION
    /* let idRegion = parseInt(region.match(/\d+/)[0]);
    console.log(idRegion); */
    let nameRegion = (region !== undefined && region !== null && region !== '' && region !== '0') ? region.replace(/\d+/, '').trim() : '';

    //* Guardar el nombre de la region en la query
    query.region = nameRegion;

    // console.log('query ',query)

    // console.log('%c==================','color:yellow');
    await renderCall(query);
    /* paginationCall(); */

    //* quitar spinner loading
    document.getElementById("buscar2").innerHTML = `Buscar`;
    activeButton();
    
});