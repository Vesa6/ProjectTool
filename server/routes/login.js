const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    const { username, password } = req.body;

    // TODO: Check against database
    // @Ashemeik

    res.json({ status: 'success', message: 'Login successful' });
});

module.exports = router;