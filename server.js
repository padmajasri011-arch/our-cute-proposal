const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Temporary interaction storage
const interactions = [];

// Allow JSON data
app.use(express.json());

// Serve our website
app.use(express.static(path.join(__dirname, "..")));


// ===============================
// HEALTH API
// ===============================

app.get("/api/health", (req, res) => {

    res.json({
        success: true,
        message: "Our Cute Proposal server is running 💗"
    });

});


// ===============================
// CUTE MESSAGE API
// ===============================

app.get("/api/message", (req, res) => {

    res.json({
        message: "You found a little secret message 💌",
        hearts: "💗💕💖💞"
    });

});


// ===============================
// INTERACTION API
// ===============================

app.post("/api/interaction", (req, res) => {

    const { action } = req.body;

    const interaction = {
        action: action,
        time: new Date().toISOString()
    };

    interactions.push(interaction);

    console.log("💗 New interaction:", interaction);

    res.json({
        success: true,
        message: "Interaction saved 💕"
    });

});


// ===============================
// PERSONALIZED MESSAGE API
// ===============================

app.post("/api/personalize", (req, res) => {

    const { name } = req.body;

    if (!name) {

        return res.status(400).json({
            success: false,
            message: "Please provide a name 💗"
        });

    }

    res.json({
        success: true,
        message: `Hey ${name}! 💗 Welcome to this little magical world. ✨`
    });

});


// ===============================
// VIEW INTERACTIONS
// ===============================

app.get("/api/interactions", (req, res) => {

    res.json({
        success: true,
        interactions: interactions
    });

});


// ===============================
// START SERVER
// ===============================

app.listen(PORT, () => {
    console.log(
        `💗 Cute Proposal is running on port ${PORT}`
    );
});