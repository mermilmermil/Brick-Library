const addBtn = document.getElementById("add-button");
const itemsList = document.getElementById("library-list");
const form = document.getElementById("form")
const clearAll = document.getElementById("clear-btn")
let items = JSON.parse(localStorage.getItem('items')) || [];

function update(array) {
  localStorage.setItem("items", JSON.stringify(array));
  console.log(array)
  itemsList.innerHTML = array.map((array, i)=>{
    if (array.collapse) {
      return `
      <li>
      <p>${array.name}</p>
      <button id="delete" onclick=deleteItem(${i})>Delete</button>
      <button id="edit" onclick=editItem(${i})>Edit</button>
      <button id="collapse-uncollapse" onclick=collUncoll(${i})>Collapse</button>
      </li>`
    }
    return `<li>
      <p>name: ${array.name}</p>
      <p>year: ${array.year}</p>
      <p>decoration: ${array.decor}</p>
      <button id="delete" onclick=deleteItem(${i})>Delete</button>
      <button id="edit" onclick=editItem(${i})>Edit</button>
      <button id="collapse-uncollapse" onclick=collUncoll(${i})>Collapse</button>
    </li>`
  }).join("")
}

function addItemToList(e) {
  e.preventDefault();
  console.log("hi");
  const name = document.getElementById("name-input").value;
  const year = document.getElementById("when-got-input").value;
  const decor = document.getElementById("decor-input").value;
  console.log(name, year, decor); 

  items.push({name, year, decor, collapse: false})
  update(items)

  document.getElementById("name-input").value = "";
  document.getElementById("when-got-input").value = "";
  document.getElementById("decor-input").value = "";
  addBtn.innerHTML = "Add Brick"
}

function deleteItem(li) {
  items.splice(li, 1)
  update(items)
}

function deleteAll() {
  items = []
  update(items)
}

function editItem(li) {
  const entire = items[li]
  document.getElementById("name-input").value = entire.name
  document.getElementById("when-got-input").value = entire.year
  document.getElementById("decor-input").value = entire.decor
  addBtn.innerText = "Update Brick"
  deleteItem(li)
}

function collUncoll(li) {
  const entire = items[li]
  entire.collapse = entire.collapse === true ? false : true
  update(items)
}


update(items)


form.addEventListener("submit", addItemToList);
clearAll.addEventListener("click", deleteAll)