'use strict';

const modalAdd = document.querySelector('.modal__add'), 
addAd = document.querySelector('.add__ad'), 
modalBtnSubmit = document.querySelector('.modal__btn-submit'),
modalSubmit = document.querySelector('.modal__submit'),
catalog = document.querySelector('.catalog'),
modalItem = document.querySelector('.modal__item');

//добавляем событие "слушатель", указываем событие "клик"
addAd.addEventListener('click', () => {
  //в модуле объявления убираем свойство, отвечающее за то, чтобы окно было спрятано
  modalAdd.classList.remove('hide');
  modalBtnSubmit.disabled = true;
});

addEventListener('keydown', (event) => {
  if (event.keyCode == 27){
    modalAdd.classList.add('hide');
    modalItem.classList.add('hide');
    modalSubmit.reset();
  }
});

//получаем событие при клике, которое будет содержать данные о том, что, где и как было кликнуто
modalAdd.addEventListener('click', (event) => {
  //здесь получаем тот элемент, куда кликнули
  const target = event.target;

  //если тот элемент, куда кликнули, содержит кнопку закрытия(т.е. на кнопку нажали) или кликнули мимо окна, то обратно включаем свойство hide
  if (target.classList.contains('modal__close') || target === modalAdd){
    modalAdd.classList.add('hide');
    modalSubmit.reset();
  }
});

catalog.addEventListener('click', (event) => {
  const target = event.target;

  if (target.closest('.card')){
    modalItem.classList.remove('hide');
  }
});

modalItem.addEventListener('click', (event) => {
  const target = event.target;

  if (target.classList.contains('modal__close') || target === modalItem){
    modalItem.classList.add('hide');
  }
});

