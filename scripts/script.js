'use strict';

const dataBase = [];

const modalAdd = document.querySelector('.modal__add'), 
addAd = document.querySelector('.add__ad'), 
modalBtnSubmit = document.querySelector('.modal__btn-submit'),
modalSubmit = document.querySelector('.modal__submit'),
catalog = document.querySelector('.catalog'),
modalItem = document.querySelector('.modal__item'),
modalBtnWarning = document.querySelector('.modal__btn-warning');

const elementsModalSubmit = [...modalSubmit.elements]
                            .filter(elem => elem.tagName !== 'BUTTON' && elem.type !== 'submit');

const closeModal = function(event) {
  if (event.type === 'click'){
    const target = event.target;
    //если тот элемент, куда кликнули, содержит кнопку закрытия(т.е. на кнопку нажали) или кликнули мимо окна, то обратно включаем свойство hide
    if (target.classList.contains('modal__close') || target === this ||
        (target.classList.contains('modal__btn-submit') && !modalBtnSubmit.disabled)){
      if (this === modalAdd){
        modalSubmit.reset();
        modalBtnSubmit.disabled = true;
        modalBtnWarning.style.display = '';
      }

      this.classList.add('hide');
    }

    if (target.classList.contains('modal__btn-submit') && !modalBtnSubmit.disabled){
      if (this === modalAdd){
        modalSubmit.reset();
      }

      this.classList.add('hide');
    }
  
    document.removeEventListener('click', closeModal);
  }
  else if (event.type === 'keydown'){
    if (event.code == 'Escape'){
      modalAdd.classList.add('hide');
      modalItem.classList.add('hide');
      
      if (this === modalAdd){
      modalSubmit.reset();
      }

      document.removeEventListener('keydown', closeModal);
    }
  }
};

//добавляем событие "слушатель", указываем событие "клик"
addAd.addEventListener('click', () => {
  //в модуле объявления убираем свойство, отвечающее за то, чтобы окно было спрятано
  modalAdd.classList.remove('hide');
  modalBtnSubmit.disabled = true;

  document.addEventListener('keydown', closeModal);
  modalAdd.addEventListener('click', closeModal);
});

catalog.addEventListener('click', (event) => {
  const target = event.target;

  if (target.closest('.card')){
    modalItem.classList.remove('hide');

    document.addEventListener('keydown', closeModal);
    modalItem.addEventListener('click', closeModal);
  }
});

modalSubmit.addEventListener('input', () => {
  const validForm = elementsModalSubmit.every(elem => elem.value);
  modalBtnSubmit.disabled = !validForm;
  modalBtnWarning.style.display = validForm ? 'none' : '';
});

modalSubmit.addEventListener('submit', event => {
  event.preventDefault();
  const itemObj = {};
  
  for (const elem of elementsModalSubmit){
    itemObj[elem.name] = elem.value;
  }

  dataBase.push(itemObj);
  console.log(dataBase);
});