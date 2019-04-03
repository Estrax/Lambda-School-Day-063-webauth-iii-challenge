const router = require('express').Router();

const auth = require('./auth');
router.use('/', auth);

router.route('/')
    .get(async (req, res) => {
        res.json({
            message: "API works"
        });
    });

module.exports = router;