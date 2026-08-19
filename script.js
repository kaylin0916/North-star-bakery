document.addEventListener("DOMContentLoaded", function () {
  const storageKey = "bakeryRequest";

  const fieldIds = [
    "name",
    "email",
    "item-details",
    "allergy-notes"
  ];

  function getSavedData() {
    try {
      return JSON.parse(localStorage.getItem(storageKey)) || {};
    } catch (error) {
      return {};
    }
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
    const savedData = getSavedData();

    fieldIds.forEach(function (id) {
      const field = document.getElementById(id);

      if (field && savedData[id] !== undefined) {
        field.value = savedData[id];
      }
    });
  }

  const form = document.querySelector("form");

  if (form) {
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

      const name = document.getElementById("name");
      const email = document.getElementById("email");

      if (!name || !name.value.trim()) {
        alert("Please enter your name.");
        if (name) {
          name.focus();
        }
        return;
      }

      if (
        !email ||
        !email.value.includes("@") ||
        !email.value.includes(".")
      ) {
        alert("Please enter a valid email address.");
        if (email) {
          email.focus();
        }
        return;
      }

      saveFormData();

      alert("Thank you! Your bakery request has been saved.");
    });
  }

  const favoriteButton = document.getElementById("favorite-btn");

  if (favoriteButton) {
    const savedFavorite = localStorage.getItem("favoriteProduct");

    if (savedFavorite === "Signature Loaf") {
      favoriteButton.textContent = "Saved as Favorite ❤️";
    }

    favoriteButton.addEventListener("click", function () {
      localStorage.setItem("favoriteProduct", "Signature Loaf");
      favoriteButton.textContent = "Saved as Favorite ❤️";
    });
  }
});
