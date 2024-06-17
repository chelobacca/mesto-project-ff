export { createCard, likeCard };

const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-16",
  headers: {
    authorization: "d288fd79-bf69-473a-9161-0eba0179fde1",
    "Content-Type": "application/json",
  },
};

// СОЗДАНИЕ КАРТОЧКИ
function createCard(
  template,
  cardData,
  removeHandler,
  likeHandler,
  imgPopupOpener,
  userId, 
  increaseLikeCounter,
  decreaseLikeCounter,
) {
  const cardElement = template.querySelector(".places__item").cloneNode(true);

  // наполнение карточки
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;

  // удаление карточки
  const deleteButton = cardElement.querySelector(".card__delete-button");

  if (cardData.owner._id === userId) {
    deleteButton.addEventListener("click", function () {
      removeHandler(cardElement, cardData._id);
    });
  } else {
    deleteButton.remove();
  }

  // like
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCounter = cardElement.querySelector(".card__like-counter");
  likeCounter.textContent = cardData.likes.length;

  if (cardData.likes.some((like) => like._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  likeButton.addEventListener("click", function () {
    likeHandler(likeButton, cardData._id, likeCounter, increaseLikeCounter, decreaseLikeCounter);
  });

  // слушатель на превью картинки
  cardImage.addEventListener("click", () => imgPopupOpener(cardData));

  // возврат элемента карточки
  return cardElement;
}

// ХЭНДЛЕР ЛАЙКА
function likeCard(like, cardId, counter, increaseLikeCounter, decreaseLikeCounter) {
  const likeMethod = like.classList.contains("card__like-button_is-active")
    ? decreaseLikeCounter
    : increaseLikeCounter;
  likeMethod(cardId)
    .then((res) => {
      counter.textContent = res.likes.length;
      like.classList.toggle("card__like-button_is-active");
    })
    .catch((err) => console.log(err));
};

