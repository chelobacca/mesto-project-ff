export { openModal, closeModal };

//ЗАКРЫТИЕ ПО ESC
function handleEscapeKeydown(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
}

function openModal(popupElement) {
  popupElement.classList.toggle("popup_is-opened");
  document.addEventListener("keydown", handleEscapeKeydown);
}

function closeModal(popupElement) {
  popupElement.classList.toggle("popup_is-opened");
  document.removeEventListener("keydown", handleEscapeKeydown);
}

