import "../pages/index.css"; // импорт главного файла стилей

import { createCard, deleteCard, likeCard } from "./card.js";
import { openModal, closeModal } from "./modal.js";
import { enableValidation, clearValidation } from "./validation.js";
import {
  getInitialCards,
  getUserProfile,
  updateUserProfile,
  postNewCard,
  updateUserpic,
} from "./api.js";

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
const cardNameInput = newCardPopup.querySelector(
  ".popup__input_type_card-name"
);
const cardLinkInput = newCardPopup.querySelector(".popup__input_type_url");

const imgPopup = document.querySelector(".popup_type_image");
const popupFullImg = imgPopup.querySelector(".popup__image");
const popupImgCaption = imgPopup.querySelector(".popup__caption");

const userpicEditButton = document.querySelector(
  ".profile__userpic-edit-button"
);
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

// INITIAL GET
const promise1 = getUserProfile();
const promise2 = getInitialCards();

Promise.all([promise1, promise2])
  .then(([response1, response2]) => {
    console.log(response1.avatar);
    console.log(response2);

    profileImage.style.backgroundImage = "url(" + response1.avatar + ")";

    profileTitle.textContent = response1.name;
    profileDescription.textContent = response1.about;

    response2.forEach(function (item) {
      placesList.append(
        createCard(cardTemplate, item, deleteCard, likeCard, openImgPopup)
      );
    });
  })
  .catch((error) => {
    console.log(error); // выводим ошибку в консоль
  });

//LOADING
function renderLoading(isLoading, evt) {
  const submitButton = evt.target.querySelector(".popup__button");
  if (isLoading) {
    submitButton.textContent = "Сохранение...";
  } else {
    submitButton.textContent = "Сохранить";
  }
}

// ДОБАВЛЕНИЕ КАРТОЧКИ
newCardPopup.addEventListener("submit", handleCardFormSubmit);

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, evt);

  const obj = {};
  obj["name"] = cardNameInput.value;
  obj["link"] = cardLinkInput.value;

  postNewCard(obj.name, obj.link)
    .then((res) => {
      placesList.prepend(
        createCard(cardTemplate, res, deleteCard, likeCard, openImgPopup)
      );
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, evt);
    });

  cardNameInput.value = "";
  cardLinkInput.value = "";
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
  console.log(userpicLinkInput.value);
}

// РЕДАКТИРОВАНИЕ ПРОФИЛЯ
editProfileFormElement.addEventListener("submit", handleProfileFormSubmit);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, evt);
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  updateUserProfile(nameInput.value, jobInput.value)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(false, evt);
    });

  closeModal(editProfileFormElement);
}
