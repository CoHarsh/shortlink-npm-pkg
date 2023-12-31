const mongoose = require("mongoose");
const Url = require("../shortlinkServer/model/Urls");
const crypto = require("crypto");

function validateUrl(url) {
  const urlRegex = new RegExp(
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
  );
  const isValid = urlRegex.test(url);
  return isValid;
}


const validateShortUrl = (shortUrl) => {
  const shortUrlRegex = new RegExp(/^[a-zA-Z0-9-_]{10}$/);
  const isValid = shortUrlRegex.test(shortUrl);
  return isValid;
};

// const serverlink = "https://shortlnk.onrender.com";
const serverlink = "localhost:3000";


const createShortUrl = async (url) => {
    return new Promise(async (resolve, reject) => {
      if (!validateUrl(url)) {
        resolve({
          success: false,
          error: 'Invalid URL',
        });
      }
      // const URL = "http://localhost:3000/api/shorten"
      try {
        //POST request to serverlink 
        const response = await fetch("https://shortlnk.onrender.com/api/shorten", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url }),
        });
        const data = await response.json();
        resolve(data);
      } catch (error) {
        resolve({
          success: false,
          error: error.message,
        });
      }
    });
};


const decodeURL = async (shortUrl) => {
  return new Promise(async (resolve, reject) => {
    if (!validateShortUrl(shortUrl)) {
      resolve({
        success: false,
        error: 'Invalid Short-URL',
      });
    }
    try {
      //GET request to serverlink
      const response = await fetch(`https://shortlnk.onrender.com/${shortUrl}`);
      const data = await response.json();
      resolve(data);
    } catch (error) {
      resolve({
        success: false,
        error: error.message,
      });
    }
  });
};

const test = async () => {
  return await createShortUrl('invalid-url');
};

// test().then((res) => {
//   console.log(res.success, res.error);
// });

module.exports = {
  createShortUrl,
  decodeURL,
};