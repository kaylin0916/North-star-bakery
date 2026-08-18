const form = document.querySelector("form");

const savedData = JSON.parse(localStorage.getItem("bakeryRequest")) || {};

const fields = [
  "name",
  "email",
  "item-details",
  "allergy-notes"
];

fields.forEach(function(id) {
  const field = document.getElementById(id);

  if (field && savedData[id]) {
    field.value = savedData[id];
  }
});

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const name = document.getElementById("name");
  const email = document.getElementById("email");

  if (!name.value.trim()) {
    alert("Please enter your name.");
    name.focus();
    return;
  }

  if (!email.value.includes("@") || !email.value.includes(".")) {
    alert("Please enter a valid email address.");
    email.focus();
    return;
  }

  const requestData = {};

  fields.forEach(function(id) {
    const field = document.getElementById(id);
    if (field) {
      requestData[id] = field.value;
    }
  });

  localStorage.setItem("bakeryRequest", JSON.stringify(requestData));

  alert("Thank you! Your bakery request has been saved.");
localStorage.removeItem("bakeryRequest");
  form.reset();
});
