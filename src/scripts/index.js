import '../pages/index.css'; // импорт главного файла стилей 
import { initialCards } from './cards.js';
import { createCard, deleteCard, likeCard, openCardPopup } from './card.js';

export { cardTemplate };

const placesList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

// ВЫВОД КАРТОЧЕК
initialCards.forEach(function (item) {
  placesList.append(createCard(item, deleteCard, likeCard, openCardPopup));
});






