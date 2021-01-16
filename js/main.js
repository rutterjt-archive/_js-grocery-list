const groceryList = document.querySelector(".list");
const listForm = document.querySelector("#list-form");
const listInput = document.querySelector("#list-input");
const listClear = document.querySelector("#list-clear");
const listUncheck = document.querySelector("#list-clear");
const listCheck = document.querySelector("#list-check");

const items = JSON.parse(localStorage.getItem("items")) || [];
console.log(items);

// Need functions to: add an item to the collection of items
// Update the list in the HTML
// Toggle check/uncheck a single item
// Check / uncheck all items
// Clear the list


function addItem(e) {
  e.preventDefault();
  const name = this.querySelector('input[type="text"]').value;
  const item = {
    name,
    checked: false
  }
  items.push(item);
  localStorage.setItem("items", JSON.stringify(items));
  updateDisplay(groceryList, items);
  this.reset();
}



function updateDisplay(list, items = []) {
  groceryList.innerHTML = items.map((item, index) => {
    return `
      <li class="list-item">
        <input id="item${index}" type="checkbox" ${item.checked ? "checked" : "" }>
        <label for="item${index}">${item.name}</label>
      </li>
    `;
  }).join("");
}

function clearList() {
  items.length = 0;
  localStorage.removeItem("items");
  updateDisplay(groceryList, items);
}

if (items.length !== 0) updateDisplay(groceryList, items);
listForm.addEventListener("submit", addItem);
listClear.addEventListener("click", clearList);