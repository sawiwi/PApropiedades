import renderCall from "../propiedad/render.js";

let maxPage = 1;
let currentPage = 1;

export default async function paginationCall(resetNumber) {

  let storedMaxPage = localStorage.getItem('maxPage');
  if (storedMaxPage) {
    maxPage = storedMaxPage;
  }

  if(resetNumber == 1){
    currentPage = 1;
  }

  let storedFiltersUrl = localStorage.getItem('globalFiltersUrl');
  // console.log('storedFiltersUrl: ',storedFiltersUrl);

  async function handleNextPage() {
    disabledButton();
    if(maxPage == 1){
      // console.log('no se puede avanzar, si hay 1 pag')
      activeButton(currentPage,maxPage)
      return;
    }
    else if(currentPage == maxPage) {
      currentPage = 1;
    }else{
      currentPage += 1;
    }

    await renderCall(undefined,currentPage,storedFiltersUrl);
    activeButton(currentPage,maxPage)
  }
  async function handlePrevPage() {
    disabledButton();
    if(maxPage == 1){
      // console.log('no se puede retroceder, si hay 1 pag')
      activeButton(currentPage,maxPage)
      return;
    }
    else if(currentPage == 1) {
      currentPage = maxPage;
    }else{
      currentPage -= 1;
    }
    
    await renderCall(undefined,currentPage,storedFiltersUrl);
    activeButton(currentPage,maxPage)
  }

  //* Paginado Style
  let pagination = document.getElementById('pagination-col');
  if (pagination !== null) {
    pagination.innerHTML = `
    <nav aria-label="Page navigation">
      <ul class="pagination justify-content-center pagination-style">
        <li class="page-item" id="prevPageId">
          <button id='prevButton' class="page-link" href="#">⮜</button>
        </li>
        <li class="page-item disabled">
          <a id='current-pagination' class="page-link" href="#">
            1 / 1
          </a>
        </li>
        <li class="page-item" id="nextPageId">
          <button id='nextButton' class="page-link" href="#">⮞</button>
        </li>
      </ul>
    </nav>`
  };
  document.getElementById("current-pagination").innerHTML = currentPage+' / '+maxPage;

  //* Rescatar BUTTON del Paginado y asignar funcion CLICK
  const nextButton = document.getElementById('nextButton');
  if(nextButton !== null){
    nextButton.addEventListener('click', handleNextPage);
  }
  const prevButton = document.getElementById('prevButton');
  if(prevButton !== null){
    prevButton.addEventListener('click', handlePrevPage);
  }

  //* Creacion de funciones para activar y desactivar BUTTONS
  function disabledButton(){
    let nextButton = document.getElementById('nextButton');
    nextButton.disabled = true;
    let prevButton = document.getElementById('prevButton');
    prevButton.disabled = true;
    document.getElementById("current-pagination").innerHTML = `<div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div>`;
  }
  function activeButton(currentPage,maxPage){
    let nextButton = document.getElementById('nextButton');
    nextButton.disabled = false;
    let prevButton = document.getElementById('prevButton');
    prevButton.disabled = false;
    document.getElementById("current-pagination").innerHTML = currentPage+' / '+maxPage;
  }
}