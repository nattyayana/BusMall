'use strict';

// array to store instances of the Goat constructor
Products.allProducts = [];

// array to keep track of the previously dispalyed images
Products.lastDisplayed = [];

// goat names for bar chart labels
var productsNames = [];

// goat votes for bar chart data
var productsVotes = [];

// click tracker
Products.totalClicks = 0;

// access the img elements from the DOM
var rightImg = document.getElementById('right');
var middleImg = document.getElementById('middle');
var leftImg = document.getElementById('left');

// access the section element from the DOM
var sectionElement = document.getElementById('products-section');

// access the unordered list element from the DOM
var unorderedListElement = document.getElementById('results');

// constructor function
function Products(name, filepath) {
  this.name = name;
  this.filepath = filepath;
  this.timesDisplayed = 0;
  this.votes = 0;
  Products.allProducts.push(this);
  productsNames.push(this.name);
}

// make new Goat instances
new Products('bag', 'bag.jpg');
new Products('banana', 'banana.jpg');
new Products('bathroom', 'bathroom.jpg');
new Products('boots', 'boots.jpg');
new Products('breakfast', 'breakfast.jpg');
new Products('bubblegum', 'bubblegum.jpg');
new Products('chair', 'chair.jpg');
new Products('cthulhu', 'cthulhu.jpg');
new Products('dog-duck', 'dog-duck.jpg');
new Products('dragon', 'dragon.jpg');
new Products('pen', 'pen.jpg');
new Products('pet-sweep', 'pet-sweep.jpg');
new Products('scissors', 'scissors.jpg');
new Products('shark', 'shark.jpg');
new Products('sweep', 'sweep.jpg');
new Products('tauntaun', 'tauntaun.jpg');
new Products('unicorn', 'unicorn.jpg');
new Products('usb', 'usb.jpg');
new Products('water-can', 'water-can.jpg');
new Products('wine-glass', 'wine-glass.jpg');



// randomly display two pictures
function randomProducts() {
  // generate two random indices
  var randomLeft = Math.floor(Math.random() * Products.allProducts.length);
  var randomMiddle = Math.floor(Math.random() * Products.allProducts.length);
  var randomRight = Math.floor(Math.random() * Products.allProducts.length);

  console.log(randomLeft);
  console.log(randomMiddle);
  console.log(randomRight);

  // check to make sure that these random numbers are unique
  // if there are duplicates, rerun both of the numbers
  // Condition 1: randomLeft and randomRight are the same number/index
  // Condition 2: randomLeft was previously displayed
  // Condition 3: randomRight was previously displayed
  while(randomLeft === randomRight || Products.lastDisplayed.includes(randomLeft) || Products.lastDisplayed.includes(randomMiddle) || Products.lastDisplayed.includes(randomLeft)) {
    console.log('Duplicate was caught!');
    randomLeft = Math.floor(Math.random() * Products.allGoats.length);
    randomMiddle = Math.floor(Math.random() * Products.allGoats.length);
    randomRight = Math.floor(Math.random() * Products.allGoats.length);
  }

  // Now that we know they are unique numbers, display the two unique images on the screen
  rightImg.src = Products.allGoats[randomRight].filepath;
  rightImg.alt = Products.allGoats[randomRight].name;

  middleImg.src = Products.allGoats[randomMiddle].filepath;
  middleImg.alt = Products.allGoats[randomMiddle].name;

  leftImg.src = Products.allGoats[randomLeft].filepath;
  leftImg.alt = Products.allGoats[randomLeft].name;

  // incremented the number of times displayed
  Products.allProducts[randomLeft].timesDisplayed++;
  Products.allProducts[randomMiddle].timesDisplayed++;
  Products.allProducts[randomRight].timesDisplayed++;

  // keep track of previously displayed images
  // APPROACH 1:
  Products.lastDisplayed = [];
  Products.lastDisplayed.push(randomLeft);
  Products.lastDisplayed.push(randomRight);
  Products.lastDisplayed.push(randomMiddle);
}

function handleClick(event) {
  // increment click counter
  Products.totalClicks++;

  // increment clicks/votes on the specific image
  console.log(event.target.alt);

  // use a for loop to determine which goat img was actually clicked on
  for(var i in Products.allProducts) {
    if(event.target.alt === Products.allProducts[i].name) {
      Products.allProducts[i].votes++;
    }
  }

  // check the click counter
  if(Products.totalClicks > 20) {
    // turn off event listener
    sectionElement.addEventListener('click', handleClick);

    // if greater than 20, display results as a list
    showResults();

    // updates the votes per goat for chart
    updateVotes();

    // display the chart
    //   renderChart();
    // } else {
    // if less than 21, display a new set of random goat images
    randomProducts();
  }
}

function showResults() {
  // console.log('You hit ten clicks');
  // create list items to display the number of times each goat was displayed and the number of votes each one received
  for(var i in Products.allProducts) {
    // 1. target/create the element (li)
    var listItemElement = document.createElement('li');
    // 2. give it content
    listItemElement.textContent = Products.allProducts[i].name + ' has ' + Products.allProducts[i].votes + ' votes and was displayed ' + Products.allProducts[i].timesDisplayed + ' times.';

    // 3. append the element to its parent
    unorderedListElement.appendChild(listItemElement);
  }
}

function updateVotes() {
  for(var i in Products.allProducts) {
    // APPROACH 1:
    productsVotes.push(Products.allProducts[i].votes);

  }
}

// add event listener to the section
sectionElement.addEventListener('click', handleClick);

// render two images on page load
randomProducts();



