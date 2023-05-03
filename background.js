chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Console log in background.js -> addlistener")
    // Check if the message is requesting the current tab information
    if (message.action === "getCurrentUrl") {
        console.log("in if statement")
      // Get the current tab information
      getCurrentTab().then((tab) => {
        console.log("in promise")
        console.log(tab)
        // Send a response back to the content script with the current tab url
        sendResponse({ url: tab.url });
      });

      // Return true to indicate that the response will be sent asynchronously
      return true;
    }

    // Retreive Color Data & Set Color Data
    if (message.action === "saveColor") {
      saveColor(message.url, message.color);
    } else if (message.action === "getColor") {
      getColor(message.url, (color) => {
        sendResponse({ color: color });
      });
      return true;
    }
  });
  
  async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }

  const isAlreadySaved = (URL, obj) => {
    for (let i = 0; i < obj.length; i++) {
      if (obj[i].URL === URL) {
        return true;
      }
    }
    return false;
  }
  
  const getIndexOfURL = (URL, obj) => {
    for (let i = 0; i < obj.length; i++) {
      if (obj[i].URL === URL) {
        return i;
      }
    }
  }
  
  function saveColor(URL, color) {
    chrome.storage.local.get("colorData", (data) => {
      let obj = data.colorData || [];
      if (isAlreadySaved(URL, obj)) {
        const index = getIndexOfURL(URL, obj);
        obj[index].color = color;
      } else {
        obj.push({ URL: URL, color: color });
      }
      chrome.storage.local.set({ colorData: obj });
    });
  }
  
  function getColor(URL, callback) {
    chrome.storage.local.get("colorData", (data) => {
      let obj = data.colorData || [];
      if (isAlreadySaved(URL, obj)) {
        const index = getIndexOfURL(URL, obj);
        callback(obj[index].color);
      } else {
        callback(null);
      }
    });
  }