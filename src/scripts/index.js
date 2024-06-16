import "../pages/index.css"; // импорт главного файла стилей

import { createCard, likeCard } from "./card.js";
import { openModal, closeModal } from "./modal.js";
import { enableValidation, clearValidation } from "./validation.js";
import {
  getInitialCards,
  getUserProfile,
  updateUserProfile,
  postNewCard,
  updateUserpic,
} from "./api.js";
import { deleteCardQuery } from "./api.js";

const placesList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

const editButton = document.querySelector(".profile__edit-button");
const editProfileFormElement = document.querySelector(".popup_type_edit");
const nameInput = editProfileFormElement.querySelector(".popup__input_type_name");
const jobInput = editProfileFormElement.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const newCardButton = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector(".popup_type_new-card");
const cardNameInput = newCardPopup.querySelector(".popup__input_type_card-name");
const cardLinkInput = newCardPopup.querySelector(".popup__input_type_url");

const imgPopup = document.querySelector(".popup_type_image");
const popupFullImg = imgPopup.querySelector(".popup__image");
const popupImgCaption = imgPopup.querySelector(".popup__caption");

const userpicEditButton = document.querySelector(".profile__userpic-edit-button");
const userpicPopup = document.querySelector(".popup_type_userpic");
const userpicLinkInput = userpicPopup.querySelector(".popup__input_type_url");
const userpicEditorFormElement = document.querySelector(".popup_type_userpic");
const profileImage = document.querySelector(".profile__image");

// VALIDATION CONGIG
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// ПОПАП ПРОФИЛЯ
editButton.addEventListener("click", function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(editProfileFormElement);
  clearValidation(editProfileFormElement, validationConfig);
});

// ПОПАП ДОБАВЛЕНИЯ КАРТОЧКИ
newCardButton.addEventListener("click", function () {
  openModal(newCardPopup);
  cardNameInput.value = "";
  cardLinkInput.value = "";
  clearValidation(newCardPopup, validationConfig);
});

// ПОПАП КАРТИНКИ
function openImgPopup(cardDataObj) {
  openModal(imgPopup);
  popupFullImg.src = cardDataObj.link;
  popupFullImg.alt = cardDataObj.name;
  popupImgCaption.textContent = cardDataObj.name;
}

//USERPIC POPUP
userpicEditButton.addEventListener("click", function () {
  userpicLinkInput.value = "";
  openModal(userpicPopup);
  clearValidation(userpicEditorFormElement, validationConfig);
});

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

//VALIDATION
enableValidation(validationConfig);

// ХЭНДЛЕР УДАЛЕНИЯ
function deleteCard(card, cardId) {
  deleteCardQuery(cardId)
    .then((res) => {
      card.remove();
    })
    .catch((err) => console.log(err));
}

// INITIAL GET
const getUserInfoPromise = getUserProfile();
const getInitialCardsPromise = getInitialCards();
let userId;

Promise.all([getUserInfoPromise, getInitialCardsPromise])
  .then(([userInfo, initialCards]) => {
    userId = userInfo._id;
    profileImage.style.backgroundImage = "url(" + userInfo.avatar + ")";

    profileTitle.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;

    initialCards.forEach(function (item) {
      placesList.append(
        createCard(
          cardTemplate,
          item,
          deleteCard,
          likeCard,
          openImgPopup,
          userId
        )
      );
    });
  })
  .catch((error) => {
    console.log(error); // выводим ошибку в консоль
  });

//LOADING
function renderLoading(isLoading, evt) {
  const submitButton = evt.target.querySelector(".popup__button");
  submitButton.textContent = isLoading ? "Сохранение..." : "Сохранить";
}

// ДОБАВЛЕНИЕ КАРТОЧКИ
newCardPopup.addEventListener("submit", handleCardFormSubmit);

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, evt);

  const obj = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };

  postNewCard(obj.name, obj.link)
    .then((res) => {
      placesList.prepend(
        createCard(
          cardTemplate,
          res,
          deleteCard,
          likeCard,
          openImgPopup,
          userId
        )
      );
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, evt);
    });

  document.forms['new-place'].reset();
  closeModal(newCardPopup);
}

// РЕДАКТИРОВАНИЕ АВАТАРА
userpicEditorFormElement.addEventListener("submit", handleUserpicFormSubmit);

function handleUserpicFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, evt);

  updateUserpic(userpicLinkInput.value)
    .then((res) => {
      console.log(res);
      profileImage.style.backgroundImage = "url(" + res.avatar + ")";
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, evt);
    });

  closeModal(userpicEditorFormElement);
}

// РЕДАКТИРОВАНИЕ ПРОФИЛЯ
editProfileFormElement.addEventListener("submit", handleProfileFormSubmit);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, evt);

  updateUserProfile(nameInput.value, jobInput.value)
    .then((res) => {
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(false, evt);
    });

  closeModal(editProfileFormElement);
}
