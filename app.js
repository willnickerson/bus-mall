'use strict';

var pathArray = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];

var items = [];

//constructor for item objects
function Item(path){
  this.name = path.substring(0,path.length - 4);
  this.path = path;
  this.views = 0;
  this.clicks = 0;
  items.push(this);
}

//loads items array with item objects
function loadItems(){
  for(var i = 0; i < pathArray.length; i++){
    new Item(pathArray[i]);
  }
}

loadItems();

var imageList = document.getElementById('images');
var oldGroup = [];

//generates 3 distinct items and loads them to page
function generateItems() {
  for(var i = 0; i < 3; i++){
    var index = randomIndex();
    drawImage(index);
    oldGroup.push(index);
    items.splice(index, 1);
  }
}

generateItems();

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
