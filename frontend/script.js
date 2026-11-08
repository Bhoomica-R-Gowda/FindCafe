
const cafeContainer = document.getElementById("cafeContainer");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const resultsCount = document.getElementById("resultsCount");
const emptyMessage = document.getElementById("emptyMessage");
const filterButtons = document.querySelectorAll(".filter-chip");

let allCafes = [];
let activeFilter = "All";

// Get café data from our Express backend
async function loadCafes() {
    cafeContainer.innerHTML = `
        <p class="loading-message">Brewing up some lovely café finds... ☕</p>
    `;

    try {
        const response = await fetch("/api/cafes");

        if (!response.ok) {
            throw new Error("Could not load cafés");
        }

        allCafes = await response.json();
        displayCafes(allCafes);

    } catch (error) {
        console.error(error);

        cafeContainer.innerHTML = `
            <p>Oops! Our little café journal is taking a break.
            Please try again.</p>
        `;

        resultsCount.textContent = "Something went wrong";
    }
}


// Display café cards
function displayCafes(cafes) {
    cafeContainer.innerHTML = "";

    resultsCount.textContent =
        `${cafes.length} little ${cafes.length === 1 ? "discovery" : "discoveries"}`;

    if (cafes.length === 0) {
        emptyMessage.classList.remove("hidden");
        return;
    }

    emptyMessage.classList.add("hidden");

    cafes.forEach((cafe, index) => {
        const card = document.createElement("article");

        card.className = "cafe-card";
        card.style.animationDelay = `${index * 100}ms`;

        card.innerHTML = `
            <div class="cafe-image">
                <img src="${cafe.image}" alt="${cafe.name}" loading="lazy">

                <span class="cafe-tag">${cafe.category}</span>
            </div>

            <div class="cafe-info">
                <h4>${cafe.name}</h4>

                <p class="cafe-area">
                    ♧ ${cafe.area}
                </p>

                <p class="cafe-description">
                    ${cafe.description}
                </p>

                <div class="cafe-bottom">
                    <span class="rating">★ ${cafe.rating}</span>
                    <span>${cafe.price}</span>
                </div>
            </div>
        `;

        cafeContainer.appendChild(card);
    });
}


// Search cafés using the backend API
async function searchCafes() {
    const searchValue = searchInput.value.trim();

    resultsCount.textContent = "Looking for little spots...";

    try {
        const response = await fetch(
            `/api/cafes?search=${encodeURIComponent(searchValue)}`
        );

        if (!response.ok) {
            throw new Error("Search failed");
        }

        const cafes = await response.json();

        allCafes = cafes;
        applyFilter();

    } catch (error) {
        console.error(error);
        resultsCount.textContent = "Couldn't complete your search.";
    }
}


// Apply the selected mood filter
function applyFilter() {
    let filteredCafes = allCafes;

    if (activeFilter !== "All") {
        filteredCafes = allCafes.filter(cafe =>
            cafe.tags.includes(activeFilter)
        );
    }

    displayCafes(filteredCafes);
}


// Search button
searchButton.addEventListener("click", searchCafes);


// Search when Enter is pressed
searchInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        searchCafes();
    }
});


// Filter selection
filterButtons.forEach(button => {
    button.addEventListener("click", () => {

        filterButtons.forEach(item =>
            item.classList.remove("active")
        );

        button.classList.add("active");

        activeFilter = button.dataset.filter;

        applyFilter();
    });
});


// Initial page load
loadCafes();
