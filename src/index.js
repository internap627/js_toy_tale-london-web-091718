const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const addToyForm = document.querySelector('.add-toy-form')
let addToy = false

// YOUR CODE HERE
let allToysG = []
let toyCollection = document.querySelector('#toy-collection')

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!

//API call
function fetchIt(){
  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(data => {
    allToysG = data
    showAll(data)
  })

}

//Display one card
function showOne(toy){
  let card = document.createElement('div')
  card.className = 'card'
  card.innerHTML = `
  <h2>${toy.name}</h2>
    <img src='${toy.image}' class="toy-avatar" />
    <p>${toy.likes} Likes </p>
    <button class="like-btn">Like <3</button>
  `
  toyCollection.appendChild(card)
}

//Display all cards
function showAll(toys){
  toys.forEach(toy => showOne(toy))
}

//Form listener
addToyForm.addEventListener('submit', event => {
  event.preventDefault()
  let vals = addToyForm.querySelectorAll('.input-text')
  let toy = {}
  toy.name = vals[0].value
  toy.image = vals[1].value
  toy.likes = 0
  createNew(toy)
  showOne(toy)
})

//Create new toys
function createNew(toy){
  fetch('http://localhost:3000/toys', {
    headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json'
   },
   method: "POST",
   body: JSON.stringify(toy)
  })
}

//Like function


fetchIt()
