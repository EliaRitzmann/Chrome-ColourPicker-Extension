const h2 = document.getElementById("h2url")
const button = document.getElementById("button")
let url = null

chrome.runtime.sendMessage({ action: "getCurrentUrl" }, (response) => {
    // Handle the response from the background page
    console.log(response);
    h2.innerHTML = response.url
  });

function setBackgroundColor(){
    console.log(h2 ?? null)
    console.log(url)
    h2.innerHTML = url
}


button.addEventListener("click", setBackgroundColor)
