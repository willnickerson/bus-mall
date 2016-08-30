'use strict';

//array of all paths for image files of the items
var pathArray = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];

//this array will be used to store our item objects
var items = [];

//creating variable for the list of item images
var imageList = document.getElementById('images');

//this array will be used to keep track of the previous 3 images to avoid repeats
var oldGroup = [];

var labelsArray = [];
var clicksArray = [];
var viewsArray = [];


//creating and loading our item objects into an array
loadItems();

//randomly selecting three items to display when page loads
generateItems();

for(var i = 0; i < items.length; i++){
  labelsArray.push(items[i].name);
  clicksArray.push(items[i].clicks);
  viewsArray.push(items[i].views);
}

//event listener for clicking on item pictures
imageList.addEventListener('click', clickHandler);

//logs which image has been clicked and icrements click atrribute, loads three new items
function clickHandler(e) {
  //getting event target and coercing into string then finding coresponding position in item array.
  var click = e.target.getAttribute('src');
  var clickedImage = click.toString().split('/')[1];
  var arrayPosition = pathArray.indexOf(clickedImage);
  console.log(arrayPosition);

  //incrimenting click value
  items[arrayPosition].clicks += 1;

  //emptying ul and generating 3 new images
  imageList.textContent = '';
  generateItems();

  //removing the first 3 elements of the array that keeps track of the images from previous group
  for(var i = 0; i < 3; i++) {
    // oldGroup.splice(i, 1);
    oldGroup.shift();
  }
}

//constructor for item objects
function Item(path){
  this.name = path.substring(0,path.length - 4);
  this.path = path;
  this.views = 0;
  this.clicks = 0;
  items.push(this);
}

//generates 3 distinct items and loads them to page
function generateItems() {
  for(var i = 0; i < 3; i++){
    var index = randomIndex();
    while(oldGroup.indexOf(index) !== -1) {
      index = randomIndex();
    }
    drawImage(index);
    oldGroup.push(index);
    items[index].views += 1;
  }
  console.log(oldGroup);
}

//loads items array with item objects
function loadItems(){
  for(var i = 0; i < pathArray.length; i++){
    new Item(pathArray[i]);
  }
}

//draws image on page based off of item index
function drawImage(index) {
  var li = document.createElement('li');
  var img = document.createElement('img');
  //append an image to page via path
  img.setAttribute('src','img/' + items[index].path);
  li.appendChild(img);
  imageList.appendChild(li);
}

//generates a random item index
function randomIndex() {
  var index = Math.floor(Math.random() * items.length);
  return index;
}

//creating chart on page
var ctx = document.getElementById('my_chart');

var data = {
  labels: labelsArray,
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1,
      data: clicksArray,
    }
  ]
};

var myBarChart = new Chart(ctx, {
  type: 'bar',
  data: data,
  // options: options
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero:true
        }
      }]
    }
  }
});
