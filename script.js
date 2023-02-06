var ulEl = document.getElementById('ul')
const h1El = document.createElement("h1")

const titleEl = document.getElementById("title")
const recipes = document.getElementById('recipes')
const images = document.getElementById('img')

let reader;
const fileInput = document.getElementById("fileInput");

fileInput.addEventListener("change", function () {
  const file = fileInput.files[0];
  reader = new FileReader();
  reader.readAsDataURL(file);
});

function addItem(listElem, text) {
  var recipeCardEl = document.createElement("div")
  recipeCardEl.className = "recipes"

  var li = document.createElement('h1');
  var textNode = document.createTextNode(titleEl.value);
  li.appendChild(textNode)

  var recipeText = document.createElement('p')
  var recipeNode = document.createTextNode(recipes.value)
  recipeText.appendChild(recipeNode)

 
  if (reader && reader.result) { 
    var recipeImg = document.createElement("img")
    var recipeSrc = reader.result;
    recipeImg.src = recipeSrc;
  }

  var deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "Delete";
  deleteBtn.className = "delete-btn";

  deleteBtn.addEventListener("click", function() {
  recipeCardEl.remove();
  });
  listElem.appendChild(recipeCardEl).append(li, recipeText, reader.result?recipeImg:null, deleteBtn);
}

const recipeBtnEl = document.getElementById('recipeBtn')

function showAlert() {
  if(titleEl.value.trim().length<=0 || recipes.value.trim().length<=0) {
    alert("Fill up all form")
  }
}

recipeBtnEl.addEventListener('click', function(event) {
  showAlert();
  if(titleEl.value.trim().length> 0 && recipes.value.trim().length> 0 ) {
  addItem(ulEl)
  fileInput.value = ""
  titleEl.value = ""
  recipes.value = ""
  reader = null
  }
})

const searchBar = document.getElementById('searchbar');

searchBar.addEventListener('input', function() {
  const filterValue = this.value.toLowerCase();
  const recipeCards = ulEl.getElementsByClassName('recipes');
  for (let i = 0; i < recipeCards.length; i++) {
    const recipeTitle = recipeCards[i].getElementsByTagName('h1')[0].textContent.toLowerCase();
    if (recipeTitle.indexOf(filterValue) === -1) {
      recipeCards[i].style.display = 'none';
    } else {
      recipeCards[i].style.display = '';
    }
  }
});
