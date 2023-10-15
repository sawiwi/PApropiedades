import { getRegiones, getCommune } from "../services/PropertiesServices.js";

let { data } = await getRegiones();

const filterSelects = async () => {
  //* LLENAR FILTROS DE REGION
  let regionTextId = document.getElementById('regionTextId');
  if (regionTextId !== null) {
    regionTextId.innerHTML = data.regions.map((data, i) => {
      if (i != 0) {
        return `<option value="${data.id} ${data.name}">${data.name}</option>`;
      } 
      else {
        return `
          <option value="0" selected >Región</option>
          <option value="${data.id} ${data.name}">${data.name}</option>
        `;
      }
    }).join("");
  }
  let region = document.getElementById('region');
  if (region !== null) {
    region.innerHTML = data.regions.map((data, i) => {
      if (i != 0) {
        return `<option value="${data.id} ${data.name}">${data.name}</option>`;
      } 
      else {
        return `
          <option value="0" selected >Región</option>
          <option value="${data.id} ${data.name}">${data.name}</option>
        `;
      }
    }).join("");
  }

  //* LLENAR FILTROS DE TIPO DE PROPIEDAD
  // TYPE OF PROPERTY POR VALUE DE ID
  let typeOfProperty = document.getElementById('typeOfProperty');
  if (typeOfProperty !== null) {
    typeOfProperty.innerHTML = data.typeOfProperty.map((data, i) => {
      if (i != 0) {
        return `<option value="${data.value}">${data.name}</option>`;
      } 
      else {
        return `
          <option value="" selected >Tipo de propiedad</option>
          <option value="${data.value}">${data.name}</option>
        `;
      }
    }).join("");
  }

  //* LLENAR FILTROS DE TIPO DE COMUNA CUANDO CAMBIE REGION
  // COMUNA POR VALUE DE NAME
  let communeTextId = document.getElementById('communeTextId');
  if (communeTextId !== null) {
    regionTextId.addEventListener("change", async (data) => {
      let regionValue = data.target.value;
      let idRegion = parseInt(regionValue.match(/\d+/)[0]);

      if(idRegion == 0){
        document.getElementById("communeTextId").innerHTML = `<option value="" selected>Comuna</option>`;
        return;
      }

      let aux = await getCommune(idRegion);
      document.getElementById("communeTextId").innerHTML = aux.data.map((data,i) => { 
      if (i != 0) {
        return `<option value="${data.name}">${data.name}</option>`;
      }
      else{
        return `
          <option value="" selected >Comuna</option>
          <option value="${data.name}">${data.name}</option>
        `;
      }
      });
    });
  }

  //* Llenar Selects segun el globalQuery
  let globalQuery;
  let storedGlobalQuery = localStorage.getItem('globalQuery');
  // console.log('getSelect | globalQuery: ',storedGlobalQuery);
  if (storedGlobalQuery) {
      globalQuery = JSON.parse(storedGlobalQuery);
      if(globalQuery.typeOfProperty != null){
          document.getElementById("typeOfProperty").value = globalQuery.typeOfProperty;
      }
      if(globalQuery.operationType != null){
          document.getElementById("operationType").value = globalQuery.operationType;
      }

      if(globalQuery.region != null && globalQuery.region != '0'){
        const regionIdNumber = parseInt(globalQuery.region.match(/\d+/)[0]);

        const regionData = data.regions.find(region => region.id == regionIdNumber);
        let regionQuery = `${regionData.id} ${regionData.name}`;
        document.getElementById("regionTextId").value = regionQuery;

        //* Actualizar select commune
        let aux = await getCommune(regionIdNumber);
        document.getElementById("communeTextId").innerHTML = aux.data.map((data,i) => { 
        if (i != 0) {
            return `<option value="${data.name}">${data.name}</option>`;
        }else{
            return `
                <option value="" selected >Comuna</option>
                <option value="${data.name}">${data.name}</option>
            `;
        }
        });

        //* Actualizar value de select commune
        if(globalQuery.commune != null && globalQuery.commune != ''){
          document.getElementById("communeTextId").value = globalQuery.commune;
        };
      }
  }

}

filterSelects();