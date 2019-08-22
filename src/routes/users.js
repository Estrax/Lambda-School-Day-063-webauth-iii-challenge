const router = require('express').Router();
const db = require('../database/helpers/helpers');
const { authenticated } = require('../middleware/authMiddleware');

router.route('/')
    .get(authenticated, async (req, res) => {
        await db
                .getUsersByDepartment(req.decodedJwt.department)
                .then(async users => {
                    await res
                        .status(200)
                        .json(users);
                })
                .catch(async err => {
                    await res
                        .status(404)
                        .json({ message: 'Cannot fetch users!' });
                });
    });
    
module.exports = router;