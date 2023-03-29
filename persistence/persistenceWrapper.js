const fs = require("fs");

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

const filePath = "./persistence/colorData.json";

function saveColor(URL, color) {
  return new Promise((resolve, reject) => {
    const data = { URL: URL, color: color };

    if (fs.existsSync(filePath)) {
      fs.readFile(filePath, (err, fileData) => {
        if (err) reject(err);

        const obj = JSON.parse(fileData);
        if (isAlreadySaved(URL, obj)) {
          const index = getIndexOfURL(URL, obj);
          obj[index].color = color;
        } else {
          obj.push(data);
        }
        const json = JSON.stringify(obj);
        fs.writeFile(filePath, json, (err) => {
          if (err) reject(err);
          resolve();
        });
      });
    } else {
      const obj = [data];
      const json = JSON.stringify(obj);
      fs.writeFile(filePath, json, (err) => {
        if (err) reject(err);
        resolve();
      });
    }
  });
}

function getColor(URL) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(filePath)) {
      fs.readFile(filePath, (err, fileData) => {
        if (err) reject(err);
        const obj = JSON.parse(fileData);
        if (isAlreadySaved(URL, obj)) {
          const index = getIndexOfURL(URL, obj);
          resolve(obj[index].color);
        } else {
          resolve(null);
        }
      });
    } else {
      resolve(null);
    }
  });
}

module.exports = { saveColor, getColor };