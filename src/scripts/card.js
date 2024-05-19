export { createCard, deleteCard, likeCard };

// СОЗДАНИЕ КАРТОЧКИ
function createCard(template, cardData, removeHandler, likeHandler, ImgPopupOpener) {
  const cardElement = template.querySelector(".places__item").cloneNode(true);

  // наполнение карточки
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;

  // удаление карточки
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", function () {
    removeHandler(cardElement);
  });

  // like
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", function () {
    likeHandler(likeButton);
  });

  // слушатель на превью картинки
  cardImage.addEventListener('click', () => ImgPopupOpener(cardData));

  // возврат элемента карточки
  return cardElement;
}

// ХЭНДЛЕР УДАЛЕНИЯ
function deleteCard(card) {
  card.remove();
}

// ХЭНДЛЕР ЛАЙКА
function likeCard(like) {
  like.classList.toggle("card__like-button_is-active");
}

