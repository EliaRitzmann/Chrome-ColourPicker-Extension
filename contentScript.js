const h2 = document.getElementById("h2url")
const setColorButton = document.getElementById("setColorButton")
const getColorButton = document.getElementById("getColorButton")
let url

// Fetch URL from Current Chrome Tab
chrome.runtime.sendMessage({ action: "getCurrentUrl" }, (response) => {
  console.log(response);
  h2.innerHTML = response.url
  url = response.url
});

// Get Color From Chrome Storage
function getColorClick(){
  chrome.runtime.sendMessage({action: "getColor", url: url}, (response) => {
    const color = response.color
    console.log("Color: ", color)
  })
}

// Set Color in Chrome Storage
function saveColorClick() {
  console.log("Button Content", h2.innerHTML)
  chrome.runtime.sendMessage( {action: "saveColor", url: url, color: "#ffffff"})
}

setColorButton.addEventListener("click", saveColorClick)
getColorButton.addEventListener("click", getColorClick)