// script.js
const form = document.querySelector('#form');
const inputUrl = document.querySelector('#url');
const resultDiv = document.querySelector('#result');
const { apiEndpoint, appId, appKey } = config;

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const url = inputUrl.value;

  if (url.indexOf('shopee.vn') < 0) {
    resultDiv.innerText = 'Invalid Shopee link';
    return;
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const signature = `${apiEndpoint}|${timestamp}`;

  fetch(`${apiEndpoint}?url=${encodeURIComponent(url)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${appId}.${timestamp}.${generateSignature(signature, appKey)}`,
    },
  })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        resultDiv.innerText = data.error_description;
      } else {
        resultDiv.innerHTML = `
          <p>Short Link:</p>
          <a href="${data.data.url}" target="_blank">${data.data.url}</a>
        `;
      }
    })
    .catch(error => {
      console.error(error);
      resultDiv.innerText = 'Error getting short link';
    });
});

function generateSignature(message, key) {
  const crypto = require('crypto');
  const hmac = crypto.createHmac('sha256', key);
  hmac.update(message);
  return hmac.digest('hex');
}
