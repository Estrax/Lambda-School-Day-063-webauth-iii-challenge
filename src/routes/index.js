const router = require('express').Router();

router.route('/')
    .get(async (req, res) => {
        res.json({
            message: "API works"
        });
    });

module.exports = router;