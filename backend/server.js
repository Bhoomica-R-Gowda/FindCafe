
const express = require("express");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(express.json());

// Serve our frontend files
app.use(express.static(path.join(__dirname, "../frontend")));

// Temporary sample café data.
// We'll move this into MongoDB in a later milestone.
const cafes = [
    {
        id: 1,
        name: "The Sunday Pour",
        area: "Indiranagar",
        category: "Coffee & Brunch",
        price: "₹₹",
        rating: 4.7,
        description: "Slow mornings, lovely coffee and little conversations.",
        image: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=900",
        tags: ["Cozy", "Brunch"]
    },
    {
        id: 2,
        name: "Fern & Fable",
        area: "Koramangala",
        category: "Garden Café",
        price: "₹₹",
        rating: 4.5,
        description: "A leafy little escape for your afternoon coffee.",
        image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=900",
        tags: ["Garden", "Quiet"]
    },
    {
        id: 3,
        name: "Little Window Café",
        area: "Jubilee Hills",
        category: "Desserts & Coffee",
        price: "₹",
        rating: 4.6,
        description: "Sweet treats and a comfortable corner to unwind.",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900",
        tags: ["Desserts", "Coffee"]
    },
    {
        id: 4,
        name: "The Moss Room",
        area: "Jayanagar",
        category: "Artisan Coffee",
        price: "₹₹₹",
        rating: 4.8,
        description: "A calm space for good coffee and creative afternoons.",
        image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=900",
        tags: ["Work-friendly", "Coffee"]
    }
];

// API: Get cafés and optionally search by name or area
app.get("/api/cafes", (req, res) => {
    const search = (req.query.search || "").toLowerCase();

    const filteredCafes = cafes.filter(cafe =>
        cafe.name.toLowerCase().includes(search) ||
        cafe.area.toLowerCase().includes(search) ||
        cafe.category.toLowerCase().includes(search)
    );

    res.json(filteredCafes);
});

// Start the server
app.listen(PORT, () => {
    console.log(`FindCafe is running at http://localhost:${PORT}`);
});
