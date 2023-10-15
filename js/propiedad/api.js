import renderCall from "./render.js";

export default async function apiCall() {
  // console.log('%c==================','color:yellow');
  // console.log('%cApi.js Api.js Api.js','color:yellow');
  let globalQuery;
  let storedGlobalQuery = localStorage.getItem('globalQuery');
  if (storedGlobalQuery) {
    globalQuery = JSON.parse(storedGlobalQuery);
    // console.log('api :',globalQuery)
  }
  // console.log('%c==================','color:yellow');
  renderCall(globalQuery);
}