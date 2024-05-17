export { openModal, closeModal };
import { handleEscapeKeydown } from "./index.js";

function openModal(popupElement) {
  popupElement.classList.toggle("popup_is-opened");
  document.addEventListener("keydown", handleEscapeKeydown);
}

function closeModal(popupElement) {
  popupElement.classList.toggle("popup_is-opened");
  document.removeEventListener("keydown", handleEscapeKeydown);
}
