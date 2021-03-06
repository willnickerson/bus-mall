'use strict';

//array of all paths for image files of the items
var pathArray = ['bag.png', 'banana.png', 'bathroom.png', 'boots.png', 'breakfast.png', 'bubblegum.png', 'chair.png', 'cthulhu.png', 'dog-duck.png', 'dragon.png', 'pen.png', 'pet-sweep.png', 'scissors.png', 'shark.png', 'sweep.png', 'tauntaun.png', 'unicorn.png', 'usb.png', 'water-can.png', 'wine-glass.png'];

//this is the array of our item objects we will check later if it is empty or there is data stored
var items = localStorage.getItem('itemsString');

//this will keep track of how many clicks the user has logged.
var pageClicks = 0;

//creating variable for the list of item images
var imageList = document.getElementById('images');

//creating variable for the submit button
var chartButton = document.getElementById('get_chart');

//this array will be used to keep track of the previous 3 images to avoid repeats
var oldGroup = [];

//these arrays will hold the data and lables for chart
var labelsArray = [];
var clicksArray = [];
var viewsArray = [];
var clicksPerViewArray = [];

//this first control flow decides on whether or not to intanciate new item objects or load locally stored item objects
if(!items){
  //creating and loading new item objects into an items array
  items = [];
  loadItems();
} else {
  //retrieving locally stored item object array and pasring into array of objects
  items = JSON.parse(items);
}

//randomly selecting three items to display when page loads
generateItems();

//event listener for clicking on item pictures
imageList.addEventListener('click', clickHandler);
//event listener for generating chart
chartButton.addEventListener('click', buttonHandler);

//logs which image has been clicked and icrements click atrribute, loads three new items
function clickHandler(e) {

  //getting event target and making sure it is an image
  var click = e.target.getAttribute('src');
  if(click === null){
    alert('Make sure you are clicking on an image!');
  } else {
    //coercing  target into string then finding coresponding position in item array.
    var clickedImage = click.toString().split('/')[1];
    var arrayPosition = pathArray.indexOf(clickedImage);

    //incrimenting item click value
    items[arrayPosition].clicks += 1;

    //incrementing page clicks
    pageClicks += 1;

    if(pageClicks < 25){
      //emptying ul and generating 3 new images
      imageList.textContent = '';
      generateItems();

      //removing the first 3 elements of the array that keeps track of the images from previous group
      for(var i = 0; i < 3; i++) {
        oldGroup.shift();
      }
    } else {
      //let user know they have completed survey
      alert('Awsome! You\'ve completed the survey.');
      //this is the equivalent of them hitting submit.
      buttonHandler();
    }
  }
}

function buttonHandler() {
  //loading arrays with chart data
  loadChartArrays();
  document.getElementById('clicks_chart').textContent = '';
  //renders data to chart
  renderChart();
  //the following disables the image click and submit disapears
  imageList.removeEventListener('click', clickHandler);
  chartButton.removeEventListener('click', buttonHandler);
  imageList.setAttribute('class', 'clear');
  chartButton.setAttribute('class', 'gone');

  //saves items arrays to local storage after submit.
  var itemsString = JSON.stringify(items);
  localStorage.setItem('itemsString', itemsString);
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
}

//loads items array with item objects
function loadItems(){
  for(var i = 0; i < pathArray.length; i++){
    new Item(pathArray[i]);
  }
}

//this loads the arrays with the item data for use in the chart
function loadChartArrays() {
  labelsArray = [];
  clicksArray = [];
  viewsArray = [];
  clicksPerViewArray = [];
  for(var i = 0; i < items.length; i++){
    labelsArray.push(items[i].name);
    clicksArray.push(items[i].clicks);
    viewsArray.push(items[i].views);
    clicksPerViewArray.push(items[i].clicks / items[i].views);
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
function renderChart(){
  var ctxClicks = document.getElementById('clicks_chart');

  //generates chart for views
  var dataClicks = {
    labels: labelsArray,
    datasets: [
      {
        label: 'Clicks Data',
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 1,
        data: clicksArray,
      }
    ]
  };
  new Chart(ctxClicks, {
    type: 'bar',
    data: dataClicks,
    // options: options
    options: {
      scales: {
        yAxes: [{
          ticks: {
            stepSize: 1,
            beginAtZero:true
          }
        }]
      }
    }
  });

  //generates chart for views
  var ctxViews = document.getElementById('views_chart');

  var dataViews = {
    labels: labelsArray,
    datasets: [
      {
        label: 'Views Data',
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 1,
        data: viewsArray,
      }
    ]
  };
  new Chart(ctxViews, {
    type: 'bar',
    data: dataViews,
    // options: options
    options: {
      scales: {
        yAxes: [{
          ticks: {
            stepSize: 1,
            beginAtZero:true
          }
        }]
      }
    }
  });

  //generates chart for clicks per view
  var ctxClicksPerView = document.getElementById('clicks_per_view_chart');

  var dataClicksPerView = {
    labels: labelsArray,
    datasets: [
      {
        label: 'Clicks Per View Data',
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 1,
        data: clicksPerViewArray,
      }
    ]
  };
  new Chart(ctxClicksPerView, {
    type: 'bar',
    data: dataClicksPerView,
    // options: options
    options: {
      scales: {
        yAxes: [{
          ticks: {
            stepSize: 0.1,
            beginAtZero:true
          }
        }]
      }
    }
  });
}
