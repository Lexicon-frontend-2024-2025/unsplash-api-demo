console.log('Unsplash?');
const ACCESS_KEY = ""; // access key från unsplash här

// DOM-referenser
const formEl = document.getElementById("search-form");
const inputEl = document.getElementById("search-input");
const imageContainerEl = document.getElementById("image-container");

// lyssna på formulärets submit-händelse
formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log('submit clicked');
    // ta med vad användaren vill söka på
    const query = inputEl.value.trim();
    console.log(query);
    fetchImages(query);
});

async function fetchImages(query) {
    const endpoint = `https://api.unsplash.com/search/collections?page=1&query=${query}&client_id=${ACCESS_KEY}&per_page=2`;
    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        displayImages(data.results);
    } catch (error) {
        console.error(error);
    }
};

function displayImages(images) {
    // rendera ut bilderna till UI:t
    console.log(images);
    // töm tidigare innehåll
    imageContainerEl.innerHTML = "";
    // fyller vi på med nya bilder
    images.forEach(image => {
        const imgDiv = document.createElement('div');
        imgDiv.classList.add('image-item');
        imgDiv.innerHTML = `
            <a href="${image.links.html}" target="_blank">
                <img src="${image.cover_photo.urls.small}" alt="${image.cover_photo.alt_description}">
            </a>
        `;
        imageContainerEl.appendChild(imgDiv);
    });
};