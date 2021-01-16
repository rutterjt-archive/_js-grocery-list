const groceryList = document.querySelector(".list");
const listForm = document.querySelector("#list-form");
const listInput = document.querySelector("#list-input");
const listClear = document.querySelector("#list-clear");
const defaultItems = {name: "Add items below...", checked: false};
const items = JSON.parse(localStorage.getItem("items")) || [];
console.log(items);

// Need functions to: 
// Check / uncheck single item
// Remove checked items

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

function toggleCheck(e) {
  if (!e.target.matches("input")) return;
  const index = e.target.dataset.index;
  items[index].checked = !items[index].checked

}

function updateDisplay(list, items = []) {
  groceryList.innerHTML = items.reduce((acc, item, index) => {
    return acc + `
      <li class="list-item">
        <input id="item${index}" type="checkbox" data-index="${index}" ${item.checked ? "checked" : "" }>
        <label for="item${index}">${item.name}</label>
      </li>
    `;
  }, ``);
}

function clearList() {
  items.length = 0;
  localStorage.removeItem("items");
  updateDisplay(groceryList, [defaultItems]);
}

if (items.length !== 0) updateDisplay(groceryList, items);
else updateDisplay(groceryList, [defaultItems]);
listForm.addEventListener("submit", addItem);
listClear.addEventListener("click", clearList);
groceryList.addEventListener("click", toggleCheck);