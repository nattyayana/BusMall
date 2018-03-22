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
new Products('bag', 'img/bag.jpg');
new Products('banana', 'img/banana.jpg');
new Products('bathroom', 'img/bathroom.jpg');
new Products('boots', 'img/boots.jpg');
new Products('breakfast', 'img/breakfast.jpg');
new Products('bubblegum', 'img/bubblegum.jpg');
new Products('chair', 'img/chair.jpg');
new Products('cthulhu', 'img/cthulhu.jpg');
new Products('dog-duck', 'img/dog-duck.jpg');
new Products('dragon', 'img/dragon.jpg');
new Products('pen', 'img/pen.jpg');
new Products('pet-sweep', 'img/pet-sweep.jpg');
new Products('scissors', 'img/scissors.jpg');
new Products('shark', 'img/shark.jpg');
new Products('sweep', 'img/sweep.png');
new Products('tauntaun', 'img/tauntaun.jpg');
new Products('unicorn', 'img/unicorn.jpg');
new Products('usb', 'img/usb.gif');
new Products('water-can', 'img/water-can.jpg');
new Products('wine-glass', 'img/wine-glass.jpg');



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
  while(randomLeft === randomRight || randomLeft === randomMiddle || randomMiddle === randomRight|| Products.lastDisplayed.includes(randomRight) || Products.lastDisplayed.includes(randomMiddle) || Products.lastDisplayed.includes(randomLeft)) {
    console.log('Duplicate was caught!');
    randomLeft = Math.floor(Math.random() * Products.allProducts.length);
    randomMiddle = Math.floor(Math.random() * Products.allProducts.length);
    randomRight = Math.floor(Math.random() * Products.allProducts.length);
  }

  // Now that we know they are unique numbers, display the two unique images on the screen
  rightImg.src = Products.allProducts[randomRight].filepath;
  rightImg.alt = Products.allProducts[randomRight].name;

  middleImg.src = Products.allProducts[randomMiddle].filepath;
  middleImg.alt = Products.allProducts[randomMiddle].name;

  leftImg.src = Products.allProducts[randomLeft].filepath;
  leftImg.alt = Products.allProducts[randomLeft].name;

  // incremented the number of times displayed
  Products.allProducts[randomLeft].timesDisplayed++;
  Products.allProducts[randomMiddle].timesDisplayed++;
  Products.allProducts[randomRight].timesDisplayed++;

  // keep track of previously displayed images

  Products.lastDisplayed = [];
  Products.lastDisplayed.push(randomLeft);
  Products.lastDisplayed.push(randomRight);
  Products.lastDisplayed.push(randomMiddle);
}




function handleClick(event) {
  // increment click counter
  Products.totalClicks++;
  randomProducts();
  // increment clicks/votes on the specific image
  console.log(event.target.alt);

  // use a for loop to determine which goat img was actually clicked on
  for(var i in Products.allProducts) {
    if(event.target.alt === Products.allProducts[i].name) {
      Products.allProducts[i].votes++;
    }
  }

  if (Products.totalClicks > 24) {

  // turn off event listener
    sectionElement.removeEventListener('click', handleClick);
    // if greater than 20, display results as a list
    showResults();

    // updates the votes per goat for chart
    updateVotes();

    // display the chart
    renderChart();
  } else {

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

    productsVotes.push(Products.allProducts[i].votes);

  }
}


// add event listener to the section
sectionElement.addEventListener('click', handleClick);

// render two images on page load
randomProducts();

// use Chart.js to create a bar chart
function renderChart() {

  // access the canvas element from the DOM
  var context = document.getElementById('products-chart').getContext('2d');

  var arrayOfColors = ['#C4D4EO', '#9AABB9', '#E9C77B' , '#E2B49A' , '#193446' ,'#C4D4EO', '#9AABB9', '#E9C77B' , '#E2B49A' , '#193446' , '#C4D4EO', '#9AABB9', '#E9C77B' , '#E2B49A' , '#193446', '#C4D4EO', '#9AABB9', '#E9C77B' , '#E2B49A' , '#193446'];

  new Chart(context, {
    type: 'bar',
    data: {
      labels: productsNames, // array of the goat names, populated above
      datasets: [{
        label: 'Votes Per Item',
        data: productsVotes,
        backgroundColor: arrayOfColors,
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

