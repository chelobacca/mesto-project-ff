import "../pages/index.css"; // импорт главного файла стилей

import { initialCards } from "./cards.js";
import { createCard, deleteCard, likeCard } from "./card.js";
import { openModal, closeModal } from "./modal.js";
import { enableValidation } from "./validation.js";

const placesList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

const editButton = document.querySelector(".profile__edit-button");
const editProfileFormElement = document.querySelector(".popup_type_edit");
const nameInput = editProfileFormElement.querySelector(
  ".popup__input_type_name"
);
const jobInput = editProfileFormElement.querySelector(
  ".popup__input_type_description"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const newCardButton = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector(".popup_type_new-card");

const imgPopup = document.querySelector(".popup_type_image");
const popupFullImg = imgPopup.querySelector(".popup__image");
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
  openModal(editProfileFormElement);
});

// ПОПАП ДОБАВЛЕНИЯ КАРТОЧКИ
newCardButton.addEventListener("click", function () {
  openModal(newCardPopup);
});

function openImgPopup(cardDataObj) {
  openModal(imgPopup);
  popupFullImg.src = cardDataObj.link;
  popupFullImg.alt = cardDataObj.name;
  popupImgCaption.textContent = cardDataObj.name;
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
  closeModal(editProfileFormElement);
}

editProfileFormElement.addEventListener("submit", handleProfileFormSubmit);

// ДОБАВЛЕНИЕ КАРТОЧКИ
const cardNameInput = newCardPopup.querySelector(
  ".popup__input_type_card-name"
);
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

// VALIDATION
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(validationConfig);

