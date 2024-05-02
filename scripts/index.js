const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

// СОЗДАНИЕ КАРТОЧКИ
function createCard(cardData, removeHandler) {
const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true); 

// наполнение карточки
const imgSelector = cardElement.querySelector('.card__image');
imgSelector.src = cardData.link;
imgSelector.alt = cardData.name;
cardElement.querySelector('.card__title').textContent = cardData.name;


// удаление карточки
const deleteButton = cardElement.querySelector('.card__delete-button');
const currentCard = deleteButton.closest('.places__item');
deleteButton.addEventListener('click', function() {
  removeHandler(currentCard)
}); 

// возврат элемента карточки
return cardElement;
};

// ВЫВОД КАРТОЧЕК
initialCards.forEach(function (item) {
placesList.append(createCard(item, deleteCard));
});

// ХЭНДЛЕР УДАЛЕНИЯ
function deleteCard(card) {
card.remove();
};
