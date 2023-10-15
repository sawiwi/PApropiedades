import renderCall from "../propiedad/render.js";
import { limitDataApi } from '../Data/userId.js';

//* borrar el primer limitProp por si queda guardado
localStorage.removeItem('LimitProp');

//* limite de paginas por defecto
let defaultLimit = limitDataApi.limit;

//todo: Cantidad de limite en las propiedades
const filtroLimit = document.getElementById('FilterLimit');
filtroLimit.value = defaultLimit;


async function handleLimitChange() {

  let storedFiltersUrl = localStorage.getItem('globalFiltersUrl');
  // console.log('storedFiltersUrl: ',storedFiltersUrl);
  // console.log('%c==================', 'color:cyan');
  // console.log('%cLimitProp.js LimitProp.js LimitProp.js', 'color:cyan');
  defaultLimit = filtroLimit.value;
  // console.log('filtroLimit: ',filtroLimit.value)
  localStorage.setItem('LimitProp', defaultLimit);
  await renderCall(undefined,1,storedFiltersUrl);
}

function limitProp() {
  filtroLimit.addEventListener('change', handleLimitChange);
};

limitProp();