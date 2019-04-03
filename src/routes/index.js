const router = require('express').Router();

const auth = require('./auth');
const users = require('./users');
router.use('/', auth);
router.use('/users', users);

router.route('/')
    .get(async (req, res) => {
        res.json({
            message: "API works"
        });
    });

module.exports = router;