var colorBlock = document.getElementById("color-block");
var ctx1 = colorBlock.getContext("2d");
var width1 = colorBlock.width;
var height1 = colorBlock.height;

var colorStrip = document.getElementById("color-strip");
var ctx2 = colorStrip.getContext("2d");
var width2 = colorStrip.width;
var height2 = colorStrip.height;

var colorLabel = document.getElementById("color-label");

var redText = document.getElementById("redText");
var greenText = document.getElementById("greenText");
var blueText = document.getElementById("blueText");

var x = 0;
var y = 0;
var drag = false;
var rgbaColor = "rgba(255,0,0,1)";

ctx1.rect(0, 0, width1, height1);
fillGradient();

function drawStrip() {
  ctx2.rect(0, 0, width2, height2);
  var grd1 = ctx2.createLinearGradient(0, 0, 0, height1);
  grd1.addColorStop(0, "rgba(255, 0, 0, 1)");
  grd1.addColorStop(0.17, "rgba(255, 255, 0, 1)");
  grd1.addColorStop(0.34, "rgba(0, 255, 0, 1)");
  grd1.addColorStop(0.51, "rgba(0, 255, 255, 1)");
  grd1.addColorStop(0.68, "rgba(0, 0, 255, 1)");
  grd1.addColorStop(0.85, "rgba(255, 0, 255, 1)");
  grd1.addColorStop(1, "rgba(255, 0, 0, 1)");
  ctx2.fillStyle = grd1;
  ctx2.fill();
}

drawStrip();

function click(e) {
  x = e.offsetX;
  y = e.offsetY;

  ctx2.clearRect(0, 0, colorStrip.width, colorStrip.height);

  drawStrip();

  ctx2.beginPath();
  ctx2.moveTo(0, y);
  ctx2.lineTo(30, y);
  ctx2.stroke();

  var imageData = ctx2.getImageData(x, y, 1, 1).data;
  rgbaColor =
    "rgba(" + imageData[0] + "," + imageData[1] + "," + imageData[2] + ",1)";
  fillGradient();
}

function fillGradient() {
  ctx1.fillStyle = rgbaColor;
  ctx1.fillRect(0, 0, width1, height1);

  var grdWhite = ctx2.createLinearGradient(0, 0, width1, 0);
  grdWhite.addColorStop(0, "rgba(255,255,255,1)");
  grdWhite.addColorStop(1, "rgba(255,255,255,0)");
  ctx1.fillStyle = grdWhite;
  ctx1.fillRect(0, 0, width1, height1);

  var grdBlack = ctx2.createLinearGradient(0, 0, 0, height1);
  grdBlack.addColorStop(0, "rgba(0,0,0,0)");
  grdBlack.addColorStop(1, "rgba(0,0,0,1)");
  ctx1.fillStyle = grdBlack;
  ctx1.fillRect(0, 0, width1, height1);
}

function mousedown(e) {
  drag = true;
  changeColor(e);
}

function mousemove(e) {
  if (drag) {
    changeColor(e);
  }
}

function mouseup(e) {
  drag = false;
}

function changeColor(e) {
  x = e.offsetX;
  y = e.offsetY;
  var imageData = ctx1.getImageData(x, y, 1, 1).data;
  setColor(imageData[0], imageData[1], imageData[2]);
}

function setColor(red, green, blue) {
  rgbaColor = "rgba(" + red + "," + green + "," + blue + ",1)";
  colorLabel.style.backgroundColor = rgbaColor;

  redText.value = red;
  greenText.value = green;
  blueText.value = blue;

}

colorStrip.addEventListener("click", click, false);

colorBlock.addEventListener("mousedown", mousedown, false);
colorBlock.addEventListener("mouseup", mouseup, false);
colorBlock.addEventListener("mousemove", mousemove, false);

redText.addEventListener("change", () =>
  setColor(redText.value, greenText.value, blueText.value)
);
greenText.addEventListener("change", () =>
  setColor(redText.value, greenText.value, blueText.value)
);
blueText.addEventListener("change", () =>
  setColor(redText.value, greenText.value, blueText.value)
);

// Code for Color Saving, Loading etc.

// const h2 = document.getElementById("h2url");
// const setColorButton = document.getElementById("setColorButton");
// const getColorButton = document.getElementById("getColorButton");
// let url;

// // Fetch URL from Current Chrome Tab
// chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     url = tabs[0].url;
//     h2.innerHTML = url;
//     getColorClick();
// });

// // Get Color From Chrome Storage
// function getColorClick() {
//     chrome.storage.sync.get(url, function(data) {
//         const color = data[url];
//         console.log("Color: ", color);
//         setBackground(url, color);
//     });
// }

// // Set Color in Chrome Storage
// function saveColorClick() {
//     console.log("Button Content", h2.innerHTML);
//     chrome.storage.sync.set({[url]: "#ffffff"});
//     setBackground(url ,'#ffffff');
// }

// function setBackground(url, color) {

// }

// setColorButton.addEventListener("click", saveColorClick);
// getColorButton.addEventListener("click", getColorClick);

const h2 = document.getElementById("h2url");
const setColorButton = document.getElementById("setColorButton");
const getColorButton = document.getElementById("getColorButton");
let url;

// Fetch URL from Current Chrome Tab
chrome.runtime.sendMessage({ action: "getCurrentUrl" }, (response) => {
  console.log(response);
  h2.innerHTML = response.url;
  url = response.url;
});

// Get Color From Chrome Storage
function getColorClick() {
  document.body.style.backgroundColor = rgbaColor;

  chrome.runtime.sendMessage({ action: "getColor", url: url }, (response) => {
    const color = response.color;
    if (color != null) {
      console.log("in get Color function -> gui.js");
      console.log("Color: ", color);

      // setBackground(color)
    }
  });
}

// Set Color in Chrome Storage
function saveColorClick() {
  console.log("Button Content", h2.innerHTML);
  chrome.runtime.sendMessage({
    action: "saveColor",
    url: url,
    color: rgbaColor,
  });

  console.log("in save color function -> gui.js");
  console.log("Color: ", rgbaColor);

  // setBackground(rgbaColor)
}

function setBackground(color) {
  chrome.runtime.sendMessage({
    action: "setBackground",
    url: url,
    color: color,
  });
  console.log("in set background -> gui.js");
}

setColorButton.addEventListener("click", saveColorClick);
getColorButton.addEventListener("click", getColorClick);
