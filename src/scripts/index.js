import "../pages/index.css"; // импорт главного файла стилей
import { initialCards } from "./cards.js";
import { createCard, deleteCard, likeCard } from "./card.js";
import { openModal, closeModal } from "./modal.js";

const placesList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

const editButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".popup_type_edit");
const editProfileFormElement = document.querySelector(".popup_type_edit");
const nameInput = editProfileFormElement.querySelector(".popup__input_type_name");
const jobInput = editProfileFormElement.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const newCardButton = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector(".popup_type_new-card");

const imgPopup = document.querySelector(".popup_type_image");
const popupImgSelector = imgPopup.querySelector(".popup__image");
const popupImgCaption = imgPopup.querySelector(".popup__caption");

// ВЫВОД КАРТОЧЕК
initialCards.forEach(function (item) {
  placesList.append(
    createCard(cardTemplate, item, deleteCard, likeCard, openImgPopup)
  );
});

// ПОПАП ПРОФИЛЯ
editButton.addEventListener("click", function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(editPopup);
});

// ПОПАП ДОБАВЛЕНИЯ КАРТОЧКИ
newCardButton.addEventListener("click", function () {
  openModal(newCardPopup);
});

// ПОПАП КАРТОЧКИ
function openImgPopup(evt) {
  openModal(imgPopup);
  popupImgSelector.src = evt.target.src;
  popupImgSelector.alt = evt.target.alt;
  popupImgCaption.textContent = evt.target.alt;
}

//ЗАКРЫТИЕ ПО КЛИКУ НА ОВЕРЛЕЙ И КРЕСТИК
const buttonCloseList = document.querySelectorAll(".popup__close");

buttonCloseList.forEach(function (btn) {
  const popup = btn.closest(".popup");
  btn.addEventListener("click", function () {
    closeModal(popup);
  });
  popup.addEventListener("mousedown", function (evt) {
    if (evt.target.classList.contains("popup")) {
      closeModal(evt.target);
    }
  });
});

// РЕДАКТИРОВАНИЕ ПРОФИЛЯ
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(editPopup);
}

editProfileFormElement.addEventListener("submit", handleProfileFormSubmit);

// ДОБАВЛЕНИЕ КАРТОЧКИ
const cardNameInput = newCardPopup.querySelector(".popup__input_type_card-name");
const cardLinkInput = newCardPopup.querySelector(".popup__input_type_url");

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const obj = {};
  obj["name"] = cardNameInput.value;
  obj["link"] = cardLinkInput.value;
  placesList.prepend(
    createCard(cardTemplate, obj, deleteCard, likeCard, openImgPopup)
  );

  cardNameInput.value = "";
  cardLinkInput.value = "";
  closeModal(newCardPopup);
}
newCardPopup.addEventListener("submit", handleCardFormSubmit);
