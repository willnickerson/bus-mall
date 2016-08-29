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

function loadItems(){
  for(var i = 0; i < pathArray.length; i++){
    new Item(pathArray[i]);
  }
}

loadItems();


var imageList = document.getElementById('images');
//append an image to page via path
var li = document.createElement('li');
var img = document.createElement('img');


img.setAttribute('src','img/' + 'bag.jpg');

li.appendChild(img);
imageList.appendChild(li);
