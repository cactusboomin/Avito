'use strict';

const dataBase = JSON.parse(localStorage.getItem('Avito')) || [];

const modalAdd = document.querySelector('.modal__add'), 
addAd = document.querySelector('.add__ad'), 
modalBtnSubmit = document.querySelector('.modal__btn-submit'),
modalSubmit = document.querySelector('.modal__submit'),
catalog = document.querySelector('.catalog'),
modalItem = document.querySelector('.modal__item'),
modalBtnWarning = document.querySelector('.modal__btn-warning'),
modalFileInput = document.querySelector('.modal__file-input'),
modalFileBtn = document.querySelector('.modal__file-btn'),
modalImageAdd = document.querySelector('.modal__image-add'),
modalImageItem = document.querySelector('.modal__image-item'),
modalHeaderItem = document.querySelector('.modal__header-item'),
modalStatusItem = document.querySelector('.modal__status-item'),
modalDescriptionItem = document.querySelector('.modal__description-item'),
modalCostItem = document.querySelector('.modal__cost-item'),
searchInput = document.querySelector('.search__input'),
menuContainer = document.querySelector('.menu__container');

let validForm = false;

const textFileBtn = modalFileBtn.textContent;
const srcModalImage = modalImageAdd.src;

const elementsModalSubmit = [...modalSubmit.elements]
                            .filter(elem => elem.tagName !== 'BUTTON' && elem.type !== 'submit');

const saveDB = () => localStorage.setItem('Avito', JSON.stringify(dataBase));

const checkForm = () => {
  validForm = elementsModalSubmit.every(elem => elem.value);
  modalBtnSubmit.disabled = !validForm;
};

const renderId = () => {
  return '_' + Math.random().toString(36).substr(2, 9);
};

const infoPhoto = {};

const renderCard = (DB = dataBase) => {
  catalog.textContent = '';
  
  DB.forEach((item) => {
    catalog.insertAdjacentHTML('afterbegin', `
    <li class="card" id="${item.id}">
      <img class="card__image" src="data:image/jpeg;base64,${item.base64}" alt="test">
      <div class="card__description">
        <h3 class="card__header">${item.nameItem}</h3>
        <div class="card__price">$${item.costItem}</div>
      </div>
    </li>
    `)
  });
};

menuContainer.addEventListener('click', (event) => {
  const target = event.target;

  if (target.tagName === 'A') {
    const result = dataBase.filter(item => item.category === target.dataset.category);

    renderCard(result);
  }
});

searchInput.addEventListener('input', (event) => {
  const valueSearch = searchInput.value.trim().toLowerCase();

  if (valueSearch.length > 2){
    const result = dataBase.filter(item => item.nameItem.trim().toLowerCase().includes(valueSearch) ||
                                            item.descriptionItem.trim().toLowerCase().includes(valueSearch));
    renderCard(result);
  }
  else{
    renderCard();
  }
});

modalFileInput.addEventListener('change', (event) => {
  const target = event.target;

  const reader = new FileReader();

  const file = target.files[0];

  infoPhoto.name = file.name;
  infoPhoto.size = file.size;

  reader.readAsBinaryString(file);

  reader.addEventListener('load', (event) => {
    if (infoPhoto.size < 200000){ 
    modalFileBtn.textContent = infoPhoto.name;
    infoPhoto.base64 = btoa(event.target.result);
    modalImageAdd.src = `data:image/jpeg;base64,${infoPhoto.base64}`;
    }
    else{
      modalFileBtn.textContent = 'Файл не должен превышать 200МБ';
      modalFileInput.value ='';
      checkForm();
    }
  });
});

const closeModal = function(event) {
  const target = event.target;

  if (target.closest('.modal__close') ||
  target.classList.contains('modal') ||
  event.code === 'Escape' ||
  (target.closest('.modal__submit' && !modalBtnSubmit.disabled))){
    modalAdd.classList.add('hide');
    modalItem.classList.add('hide');
    modalSubmit.reset();
    document.removeEventListener('keydown', closeModal);
    modalImageAdd.src = srcModalImage;
    modalFileBtn.textContent = textFileBtn;
  }
};

addAd.addEventListener('click', () => {
  modalAdd.classList.remove('hide');
  modalBtnSubmit.disabled = true;

  document.addEventListener('keydown', closeModal);
  modalAdd.addEventListener('click', closeModal);
});

catalog.addEventListener('click', (event) => {
  const target = event.target;

  if (target.closest('.card')){
    modalItem.classList.remove('hide');
    
    let modalCard = target;
    do {
      modalCard = modalCard.parentNode;
    }while (modalCard.className != 'card');

    const item = dataBase.find(item => item.id == modalCard.id);
    console.log(item);
    modalImageItem.src = `data:image/jpeg;base64,${item.base64}`
    modalHeaderItem.textContent = item.nameItem;
    modalDescriptionItem.textContent = item.descriptionItem;
    modalCostItem.textContent = item.costItem;
    modalStatusItem.textContent = item.status ? 'Новый' : 'Б/у';

    document.addEventListener('keydown', closeModal);
    modalItem.addEventListener('click', closeModal);
  }
});

modalSubmit.addEventListener('input', () => {
  checkForm();
  modalBtnWarning.style.display = validForm ? 'none' : '';
});

modalSubmit.addEventListener('submit', event => {
  event.preventDefault();
  const itemObj = {};
  let counter = 0;

  for (const elem of elementsModalSubmit){
    itemObj[elem.name] = elem.value;
  }

  itemObj.id = renderId();
  itemObj.base64 = infoPhoto.base64;
  dataBase.push(itemObj);
  console.log(itemObj);
  closeModal({target: modalAdd});
  saveDB();
  renderCard();
});

renderCard();