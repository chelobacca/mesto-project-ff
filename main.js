(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-16",headers:{authorization:"d288fd79-bf69-473a-9161-0eba0179fde1","Content-Type":"application/json"}};function t(e,t,n,r,o,c){var a=e.querySelector(".places__item").cloneNode(!0),u=a.querySelector(".card__image");u.src=t.link,u.alt=t.name,a.querySelector(".card__title").textContent=t.name;var i=a.querySelector(".card__delete-button");t.owner._id===c?i.addEventListener("click",(function(){n(a,t._id)})):i.remove();var l=a.querySelector(".card__like-button"),s=a.querySelector(".card__like-counter");return s.textContent=t.likes.length,t.likes.some((function(e){return e._id===c}))&&l.classList.add("card__like-button_is-active"),l.addEventListener("click",(function(){r(l,t._id,s)})),u.addEventListener("click",(function(){return o(t)})),a}function n(e,t,n){(e.classList.contains("card__like-button_is-active")?o:r)(t).then((function(t){n.textContent=t.likes.length,e.classList.toggle("card__like-button_is-active")})).catch((function(e){return console.log(e)}))}var r=function(t){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(t),{method:"PUT",headers:e.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))},o=function(t){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(t),{method:"DELETE",headers:e.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))};function c(e){"Escape"===e.key&&u(document.querySelector(".popup_is-opened"))}function a(e){e.classList.toggle("popup_is-opened"),document.addEventListener("keydown",c)}function u(e){e.classList.toggle("popup_is-opened"),document.removeEventListener("keydown",c)}var i=function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove("popup__error_visible"),r.textContent=""},l=function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?i(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.classList.add("popup__error_visible"),o.textContent=n}(e,t,t.validationMessage,n)},s=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))},d=function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector));n.forEach((function(n){i(e,n,t)}));var r=e.querySelector(t.submitButtonSelector);e.querySelector(t.formSelector).reset(),s(n,r,t)},p={baseUrl:"https://nomoreparties.co/v1/wff-cohort-16",headers:{authorization:"d288fd79-bf69-473a-9161-0eba0179fde1","Content-Type":"application/json"}};function f(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}function _(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var m=document.querySelector(".places__list"),y=document.querySelector("#card-template").content,v=document.querySelector(".profile__edit-button"),h=document.querySelector(".popup_type_edit"),b=h.querySelector(".popup__input_type_name"),S=h.querySelector(".popup__input_type_description"),g=document.querySelector(".profile__title"),q=document.querySelector(".profile__description"),E=document.querySelector(".profile__add-button"),k=document.querySelector(".popup_type_new-card"),L=k.querySelector(".popup__input_type_card-name"),C=k.querySelector(".popup__input_type_url"),A=document.querySelector(".popup_type_image"),x=A.querySelector(".popup__image"),j=A.querySelector(".popup__caption"),w=document.querySelector(".profile__userpic-edit-button"),U=document.querySelector(".popup_type_userpic"),T=U.querySelector(".popup__input_type_url"),O=document.querySelector(".popup_type_userpic"),P=document.querySelector(".profile__image"),B={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function D(e){a(A),x.src=e.link,x.alt=e.name,j.textContent=e.name}function I(e,t){(function(e){return fetch("".concat(p.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:p.headers}).then((function(e){return f(e)}))})(t).then((function(t){e.remove()})).catch((function(e){return console.log(e)}))}v.addEventListener("click",(function(){b.value=g.textContent,S.value=q.textContent,a(h),d(h,B)})),E.addEventListener("click",(function(){a(k),L.value="",C.value="",d(k,B)})),w.addEventListener("click",(function(){T.value="",a(U),d(O,B)})),document.querySelectorAll(".popup__close").forEach((function(e){var t=e.closest(".popup");e.addEventListener("click",(function(){u(t)})),t.addEventListener("mousedown",(function(e){e.target.classList.contains("popup")&&u(e.target)}))})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);s(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){l(e,o,t),s(n,r,t)}))})),n.forEach((function(n){n.addEventListener("input",(function(){l(e,n,t)}))}))}(t,e)}))}(B);var M,N=fetch("".concat(p.baseUrl,"/users/me"),{headers:p.headers}).then((function(e){return f(e)})),J=fetch("".concat(p.baseUrl,"/cards"),{headers:p.headers}).then((function(e){return f(e)}));function z(e,t){t.target.querySelector(".popup__button").textContent=e?"Сохранение...":"Сохранить"}Promise.all([N,J]).then((function(e){var r,o,c=(o=2,function(e){if(Array.isArray(e))return e}(r=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,u=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(u.push(r.value),u.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return u}}(r,o)||function(e,t){if(e){if("string"==typeof e)return _(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_(e,t):void 0}}(r,o)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),a=c[0],u=c[1];M=a._id,P.style.backgroundImage="url("+a.avatar+")",g.textContent=a.name,q.textContent=a.about,u.forEach((function(e){m.append(t(y,e,I,n,D,M))}))})).catch((function(e){console.log(e)})),k.addEventListener("submit",(function(e){e.preventDefault(),z(!0,e);var r,o,c={name:L.value,link:C.value};(r=c.name,o=c.link,fetch("".concat(p.baseUrl,"/cards"),{method:"POST",headers:p.headers,body:JSON.stringify({name:r,link:o})}).then((function(e){return f(e)}))).then((function(e){m.prepend(t(y,e,I,n,D,M))})).catch((function(e){console.log(e)})).finally((function(){z(!1,e)})),document.forms["new-place"].reset(),u(k)})),O.addEventListener("submit",(function(e){var t;e.preventDefault(),z(!0,e),(t=T.value,fetch("".concat(p.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:p.headers,body:JSON.stringify({avatar:t})}).then((function(e){return f(e)}))).then((function(e){console.log(e),P.style.backgroundImage="url("+e.avatar+")"})).catch((function(e){console.log(e)})).finally((function(){z(!1,e)})),u(O)})),h.addEventListener("submit",(function(e){var t,n;e.preventDefault(),z(!0,e),(t=b.value,n=S.value,fetch("".concat(p.baseUrl,"/users/me"),{method:"PATCH",headers:p.headers,body:JSON.stringify({name:t,about:n})}).then((function(e){return f(e)}))).then((function(e){g.textContent=e.name,q.textContent=e.about})).catch((function(e){console.log("Ошибка: ".concat(e))})).finally((function(){z(!1,e)})),u(h)}))})();