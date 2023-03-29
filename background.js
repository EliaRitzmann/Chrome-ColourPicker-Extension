chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Console log in background.js -> addlistener")
    // Check if the message is requesting the current tab information
    if (message.action === "getCurrentUrl") {
        console.log("in if statement")
      // Get the current tab information
      getCurrentTab().then((tab) => {
        console.log("in promise")
        console.log(tab)
        // Send a response back to the content script with the current tab information
        sendResponse({ url: tab.url });
      });
  
      // Return true to indicate that the response will be sent asynchronously
      return true;
    }
  });
  
  async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }