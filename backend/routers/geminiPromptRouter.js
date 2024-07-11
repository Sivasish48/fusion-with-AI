const {Router} = require('express');
const router = Router();
const run = require("../geminiApi");

router.post("/prompt-ai-generate", async (req, res) => {
    try {
        const {prompt} = req.body;
        const response = await run(prompt);
        res.json(response)
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            error: error.message,
        });
        return;
    }
})

module.exports = router;