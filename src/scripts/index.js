import '../pages/index.css'; // импорт главного файла стилей 
import { initialCards } from './cards.js';
import { createCard, deleteCard, likeCard } from './card.js';
import { openModal, closeModal } from './modal.js';

export { cardTemplate };

const placesList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

const editButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".popup_type_edit");

const newCardButton = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector(".popup_type_new-card");


// ВЫВОД КАРТОЧЕК
initialCards.forEach(function (item) {
  placesList.append(createCard(item, deleteCard, likeCard));
});

// ПОПАП ПРОФИЛЯ
editButton.addEventListener('click', function () {
  openModal(editPopup);
});

// ПОПАП ДОБАВЛЕНИЯ КАРТОЧКИ
newCardButton.addEventListener('click', function () {
  openModal(newCardPopup);
});

//ЗАКРЫТИЕ ПО КЛИКУ НА ОВЕРЛЕЙ И КРЕСТИК
document.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('popup_is-opened')) {
    closeModal(evt.target);
  }
  if (evt.target.classList.contains('popup__close')) {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
});

//ЗАКРЫТИЕ ПО ESC
document.addEventListener('keydown', function(evt){
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
});

// РЕДАКТИРОВАНИЕ ПРОФИЛЯ
const formElement = document.querySelector(".popup_type_edit");
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");

function handleFormSubmit(evt) {
  evt.preventDefault(); 
  document.querySelector(".profile__title").textContent = nameInput.value;
  document.querySelector(".profile__description").textContent = jobInput.value;
}

formElement.addEventListener('submit', handleFormSubmit); 

// ДОБАВЛЕНИЕ КАРТОЧКИ 
const addCardFormElement = document.querySelector(".popup_type_new-card");
const cardNameInput = addCardFormElement.querySelector(".popup__input_type_card-name");
const cardLinkInput = addCardFormElement.querySelector(".popup__input_type_url");

function handleCardFormSubmit(evt) {
  evt.preventDefault(); 
  let obj = {};
  obj['name'] = cardNameInput.value;
  obj['link'] = cardLinkInput.value;
  placesList.prepend(createCard(obj, deleteCard, likeCard));
}

addCardFormElement.addEventListener('submit', handleCardFormSubmit); 






// console.log(openedPopup);
