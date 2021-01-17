const groceryList = document.querySelector(".list");
const listForm = document.querySelector("#list-form");
const listInput = document.querySelector("#list-input");
const removeCheckedBtn = document.querySelector("#clear-checked");
const clearListBtn = document.querySelector("#clear-list");
let items = JSON.parse(localStorage.getItem("items")) || [];

// Renders the list in HTML
function updateDisplay(list, items = []) {
  list.innerHTML = items.reduce((acc, item, index) => {
    return acc + `
      <li class="list-item">
        <input id="item${index}" type="checkbox" data-index="${index}" ${item.checked ? "checked" : "" }>
        <label for="item${index}">${item.name}</label>
      </li>
    `;
  }, ``);
}

// Form handler: adds the input value to the list of items
function addItem(e) {
  e.preventDefault(); // Preventing page refresh on submit
  const name = this.querySelector('input[type="text"]').value;
  const item = { name, checked: false }
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
  localStorage.setItem("items", JSON.stringify(items))
  updateDisplay(groceryList, items);
}

// Clears entire list
function clearList() {
  items.length = 0;
  localStorage.removeItem("items");
  updateDisplay(groceryList);
}

listForm.addEventListener("submit", addItem);
groceryList.addEventListener("click", toggleCheck);
clearListBtn.addEventListener("click", clearList);
removeCheckedBtn.addEventListener("click", removeChecked);