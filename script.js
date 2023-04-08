const form = document.querySelector('form');
const input = document.querySelector('input');
const shortLinkDiv = document.querySelector('#shortLink');
const apiEndpoint = 'https://shopee.vn/api/v4/marketing/campaigns/url';

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const url = input.value;

  if (!url) {
    return;
  }

  try {
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    const data = await response.json();

    const shortLink = data.data.short_url;

    shortLinkDiv.textContent = shortLink;
    shortLinkDiv.style.display = 'block';
  } catch (error) {
    console.error(error);
  }
});
