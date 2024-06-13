export { createCard, deleteCard, likeCard };

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
  ImgPopupOpener
) {
  const cardElement = template.querySelector(".places__item").cloneNode(true);

  // наполнение карточки
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;

  // удаление карточки
  const deleteButton = cardElement.querySelector(".card__delete-button");

  if (cardData.owner._id === "925dd18e3bbcc7e05265d9dc") {
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

  if (cardData.likes.find((like) => like._id === "925dd18e3bbcc7e05265d9dc")) {
    console.log(cardData.likes.find((like) => like._id === "925dd18e3bbcc7e05265d9dc"));
    likeButton.classList.add("card__like-button_is-active");
  }

  likeButton.addEventListener("click", function () {
    likeHandler(likeButton, cardData._id, likeCounter);
  });

  // слушатель на превью картинки
  cardImage.addEventListener("click", () => ImgPopupOpener(cardData));

  // возврат элемента карточки
  return cardElement;
}

// ХЭНДЛЕР УДАЛЕНИЯ
function deleteCard(card, cardId) {
  card.remove();
  deleteCardQuery(cardId);
}

const deleteCardQuery = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  });
};

// ХЭНДЛЕР ЛАЙКА
function likeCard(like, card, counter) {
  if (like.classList.contains("card__like-button_is-active")) {
    decreaseLikeCounter(card).then((res) => {
      console.log(res.likes.length);
      counter.textContent = res.likes.length;
      like.classList.remove("card__like-button_is-active");
    });
  } else {
    increaseLikeCounter(card).then((res) => {
      console.log(res.likes.length);
      counter.textContent = res.likes.length;
      like.classList.add("card__like-button_is-active");
    });
  }
}

const increaseLikeCounter = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

const decreaseLikeCounter = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};
