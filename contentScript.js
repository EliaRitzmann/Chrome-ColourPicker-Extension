chrome.runtime.sendMessage({ action: "getColor", url: url }, (response) => {
  if (response.color) {
    document.body.style.backgroundColor = response.color;
    console.log("in content script -> hintergrundfarbe: ", response.color)
  }
});