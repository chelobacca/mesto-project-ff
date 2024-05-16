export { createCard, deleteCard, likeCard };

import { cardTemplate } from './index.js';
import { openModal, closeModal } from './modal.js'; //позже: нужен ли здесь closeModal?


// СОЗДАНИЕ КАРТОЧКИ
function createCard(cardData, removeHandler, likeHandler) {
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

    // попап карточки
    const imgPopup = document.querySelector(".popup_type_image");
    imgSelector.addEventListener('click', function () {
      openModal(imgPopup);
      document.querySelector(".popup__image").src = cardData.link;
      document.querySelector(".popup__caption").textContent = cardData.name;
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






  