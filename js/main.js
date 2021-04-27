// Element selectors
const groceryList = document.querySelector("#list");
const listForm = document.querySelector("#list-form");
const listInput = document.querySelector("#list-input");
const removeCheckedBtn = document.querySelector("#remove-checked");
const checkAllBtn = document.querySelector("#check-all");
const uncheckAllBtn = document.querySelector("#uncheck-all");

let items = JSON.parse(localStorage.getItem("items")) || []; // If localStorage is empty, return an empty array, representing a new list 

// Renders the list in HTML
function updateDisplay(list, items = []) {
  list.innerHTML = items.reduce((acc, item, index) => {
    return acc + `
      <li class="list__item">
        <input id="item${index}" type="checkbox" data-index="${index}" ${item.checked ? "checked" : "" } class="list__checkbox">
        <label for="item${index}" class="list__text">${item.name}</label>
      </li>
    `;
  }, ``);
}

// Adds the user's input to the list
function addItem(e) {
  e.preventDefault(); // Preventing page refresh on submit
  const name = this.querySelector('input[type="text"]').value;
  const item = { name, checked: false };
  items.push(item);
  localStorage.setItem("items", JSON.stringify(items));
  updateDisplay(groceryList, items);
  this.reset(); // Clears form input field
}

// Updates checkbox state on click
function toggleCheck(e) {
  if (!e.target.matches("input")) return;
  const index = e.target.dataset.index;
  items[index].checked = !items[index].checked;
  localStorage.setItem("items", JSON.stringify(items));
}

// Removes all checked items from list
function removeChecked() {
  items = items.filter(i => !i.checked);
  localStorage.setItem("items", JSON.stringify(items));
  updateDisplay(groceryList, items);
}

function checkAll() {
  items = items.map((i) => {
    return {'name': i.name, 'checked': true}
  });
  localStorage.setItem("items", JSON.stringify(items));
  updateDisplay(groceryList, items);

}

function uncheckAll() {
  items = items.map((i) => {
    return {'name': i.name, 'checked': false}
  });
  localStorage.setItem("items", JSON.stringify(items));
  updateDisplay(groceryList, items);
}


if (items.length > 0) updateDisplay(groceryList, items);

listForm.addEventListener("submit", addItem);
groceryList.addEventListener("click", toggleCheck);
checkAllBtn.addEventListener('click', checkAll);
uncheckAllBtn.addEventListener('click', uncheckAll);
removeCheckedBtn.addEventListener("click", removeChecked);
