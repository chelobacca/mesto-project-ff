export { createCard, deleteCard, likeCard, openCardPopup };

import { cardTemplate } from './index.js';
import { openModal, closeModal } from './modal.js'; //нужен ли closeModal?


// СОЗДАНИЕ КАРТОЧКИ
function createCard(cardData, removeHandler, likeHandler, cardPopupHandler) {
    const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);
  
    // наполнение карточки
    const imgSelector = cardElement.querySelector(".card__image");
    imgSelector.src = cardData.link;
    imgSelector.alt = cardData.name;
    cardElement.querySelector(".card__title").textContent = cardData.name;
  
    // удаление карточки
    const deleteButton = cardElement.querySelector(".card__delete-button");
    const currentCard = deleteButton.closest(".places__item");
    deleteButton.addEventListener("click", function () {
      removeHandler(currentCard);
    });
    
    // like
    const likeButton = cardElement.querySelector(".card__like-button");
    likeButton.addEventListener('click', function () {
        likeHandler(likeButton);
      });

    //popup
    const imgPopup = document.querySelector(".popup_type_image");
    imgSelector.addEventListener('click', function () {
        cardPopupHandler(imgPopup, imgSelector);
      });

      

    // возврат элемента карточки
    return cardElement;
};

// ХЭНДЛЕР УДАЛЕНИЯ
function deleteCard(card) {
  card.remove();
};

// ХЭНДЛЕР ЛАЙКА  
function likeCard(like) {
  like.classList.toggle('card__like-button_is-active')
};

//ХЭНДЛЕР ПОПАПА
function openCardPopup(popup, srce) {
    console.log(popup);
    popup.classList.toggle('popup_is-opened');
    popup.querySelector(".popup__image").src = srce.src;
    popup.querySelector(".popup__caption").textContent = srce.alt;
};





  