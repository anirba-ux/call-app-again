


// ===============================
// DOM SELECTION
// ===============================

const addNote = document.querySelector("#add-note");
const formContainer = document.querySelector(".form-container");
const closeForm = document.querySelector(".closeForm");

const stack = document.querySelector(".stack");
const upBtn = document.querySelector("#upBtn");
const downBtn = document.querySelector("#downBtn");

const form = document.querySelector("form");

// Inputs
const imageUrlInput = document.querySelector('input[placeholder="https://example.com/photo.jpg"]');
const fullNameInput = document.querySelector('input[placeholder="Enter full name"]');
const homeTownInput = document.querySelector('input[placeholder="Enter home town"]');
const purposeInput  = document.querySelector('input[placeholder="e.g., Quick appointment note"]');

// Radio buttons
const categoryRadios = document.querySelectorAll('input[name="category"]');


// ===============================
// LOCAL STORAGE SAVE
// ===============================

function saveToLocalStorage(obj) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(obj);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


// ===============================
// OPEN / CLOSE FORM
// ===============================

addNote.addEventListener("click", () => {
  formContainer.style.display = "initial";
});

closeForm.addEventListener("click", () => {
  formContainer.style.display = "none";
});


// ===============================
// FORM SUBMIT
// ===============================

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const imageUrl = imageUrlInput.value.trim();
  const fullName = fullNameInput.value.trim();
  const homeTown = homeTownInput.value.trim();
  const purpose  = purposeInput.value.trim();

  let selectedCategory = null;
  categoryRadios.forEach(radio => {
    if (radio.checked) selectedCategory = radio.value;
  });

  // Validation
  if (!imageUrl) return alert("Please enter Image URL");
  if (!fullName) return alert("Full name is required");
  if (!homeTown) return alert("Home town is required");
  if (!purpose) return alert("Purpose is required");
  if (!selectedCategory) return alert("Please select a category");

  saveToLocalStorage({
    imageUrl,
    fullName,
    homeTown,
    purpose,
    selectedCategory
  });

  form.reset();
  formContainer.style.display = "none";
  showCards();
});


// ===============================
// SHOW CARDS
// ===============================

function showCards() {
  stack.innerHTML = "";

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach(task => {
    const card = document.createElement("div");
    card.className = "card";

    const avatar = document.createElement("img");
    avatar.src = task.imageUrl;
    avatar.className = "avatar";

    const name = document.createElement("h2");
    name.textContent = task.fullName;

    const town = document.createElement("div");
    town.className = "info";
    town.innerHTML = `<span>Home town</span><span>${task.homeTown}</span>`;

    const purpose = document.createElement("div");
    purpose.className = "info";
    purpose.innerHTML = `<span>Purpose</span><span>${task.purpose}</span>`;

    const buttons = document.createElement("div");
    buttons.className = "buttons";

    const callBtn = document.createElement("button");
    callBtn.className = "call";
    callBtn.innerHTML = `<i class="ri-phone-line"></i> Call`;

    const msgBtn = document.createElement("button");
    msgBtn.className = "msg";
    msgBtn.textContent = "Message";

    buttons.append(callBtn, msgBtn);
    card.append(avatar, name, town, purpose, buttons);
    stack.appendChild(card);
  });

  updateStack();
}


// ===============================
// STACK EFFECT
// ===============================

function updateStack() {
  const cards = document.querySelectorAll(".stack .card");
  const visible = Math.min(3, cards.length);

  cards.forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "scale(0.95)";
  });

  for (let i = 0; i < visible; i++) {
    cards[i].style.zIndex = visible - i;
    cards[i].style.opacity = 1 - i * 0.1;
    cards[i].style.transform = `translateY(${i * 12}px) scale(${1 - i * 0.03})`;
  }
}


// ===============================
// BUTTON CONTROLS
// ===============================

upBtn.addEventListener("click", () => {
  if (stack.lastElementChild) {
    stack.insertBefore(stack.lastElementChild, stack.firstElementChild);
    updateStack();
  }
});

downBtn.addEventListener("click", () => {
  if (stack.firstElementChild) {
    stack.appendChild(stack.firstElementChild);
    updateStack();
  }
});


// ===============================
// INITIAL LOAD
// ===============================

showCards();

