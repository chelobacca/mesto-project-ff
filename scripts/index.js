
const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки

function addCard(element) {
const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true); 

cardElement.querySelector('.card__image').src = element.link;
cardElement.querySelector('.card__title').textContent = element.name;

const deleteButton = cardElement.querySelector('.card__delete-button');
deleteButton.addEventListener('click', function () {
    const listItem = deleteButton.closest('.places__item');
    listItem.remove();
  }); 
return cardElement;
};

// @todo: Вывести карточки на страницу

initialCards.forEach(function (item) {
placesList.append(addCard(item));
});





  

  




