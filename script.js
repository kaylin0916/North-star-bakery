document.addEventListener("DOMContentLoaded", function () {
  const storageKey = "bakeryRequest";

  const fieldIds = [
    "name",
    "email",
    "item-details",
    "allergy-notes"
  ];

  const favoriteProduct = {
    name: "Signature Loaf",
    storageKey: "favoriteProduct"
  };

  function getSavedFormData() {
    return JSON.parse(localStorage.getItem(storageKey)) || {};
  }

  function saveFormData() {
    const requestData = {};

    fieldIds.forEach(function (id) {
      const field = document.getElementById(id);

      if (field) {
        requestData[id] = field.value;
      }
    });

    localStorage.setItem(storageKey, JSON.stringify(requestData));
  }

  function restoreFormData() {
    const savedData = getSavedFormData();

    fieldIds.forEach(function (id) {
      const field = document.getElementById(id);

      if (field && savedData[id]) {
        field.value = savedData[id];
      }
    });
  }

  function showError(field, message) {
    let error = field.parentElement.querySelector(".validation-error");

    if (!error) {
      error = document.createElement("p");
      error.className = "validation-error";
      field.insertAdjacentElement("afterend", error);
    }

    error.textContent = message;
    error.style.color = "darkred";
    error.style.fontSize = "0.9rem";
  }

  function clearErrors() {
    document.querySelectorAll(".validation-error").forEach(function (error) {
      error.remove();
    });
  }

  function validateForm() {
    clearErrors();

    const name = document.getElementById("name");
    const email = document.getElementById("email");

    let isValid = true;

    if (!name.value.trim()) {
      showError(name, "Please enter your full name.");
      isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.value.trim() || !emailPattern.test(email.value)) {
      showError(email, "Please enter a valid email address.");
      isValid = false;
    }

    return isValid;
  }

  const form = document.querySelector("form");

  if (form) {
    form.setAttribute("novalidate", "novalidate");

    restoreFormData();

    fieldIds.forEach(function (id) {
      const field = document.getElementById(id);

      if (field) {
        field.addEventListener("input", saveFormData);
        field.addEventListener("change", saveFormData);
      }
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!validateForm()) {
        return;
      }

      saveFormData();
      alert("Thank you! Your bakery request has been saved.");
    });
  }

  const favoriteButton = document.getElementById("favorite-btn");

  if (favoriteButton) {
    const savedFavorite = localStorage.getItem(favoriteProduct.storageKey);

    if (savedFavorite === favoriteProduct.name) {
      favoriteButton.textContent = "Saved as Favorite ❤️";
    }

    favoriteButton.addEventListener("click", function () {
      localStorage.setItem(
        favoriteProduct.storageKey,
        favoriteProduct.name
      );

      favoriteButton.textContent = "Saved as Favorite ❤️";
    });
  }
});
