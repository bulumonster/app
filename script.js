import config from './config.js';

const form = document.querySelector('#shorten-form');
const input = document.querySelector('#original-link');
const output = document.querySelector('#short-link');
const button = document.querySelector('#shorten-button');
const error = document.querySelector('#error-message');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  output.textContent = '';
  error.textContent = '';
  button.disabled = true;

  const originalLink = input.value;

  try {
    const response = await fetch(config.apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url: originalLink })
    });

    const data = await response.json();

    if (data.data.short_url) {
      output.textContent = data.data.short_url;
    } else {
      throw new Error('Unable to get short link');
    }
  } catch (e) {
    error.textContent = e.message;
  } finally {
    button.disabled = false;
  }
});
