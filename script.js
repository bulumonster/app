// script.js
const form = document.querySelector('#form');
const inputUrl = document.querySelector('#url');
const resultDiv = document.querySelector('#result');

form.addEventListener('submit', (event) => {
	event.preventDefault();
	const url = inputUrl.value;

	if (url.indexOf('shopee.vn') < 0) {
		resultDiv.innerText = 'Invalid Shopee link';
		return;
	}

	fetch(`${config.apiEndpoint}?url=${encodeURIComponent(url)}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Partner ${config.partnerId}:${config.partnerKey}`,
			'Shops': config.shopId
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
