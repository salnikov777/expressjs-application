const express = require('express');
const router = express.Router()
const User = require('../models/user');


router.get('/login', async (req, res) => {
    res.render('auth/login', {
        title: 'Authorization',
        isLogin: true
    })
})

router.get('/logout', async (req, res) => {
    // req.session.isAuthenticated = false
    req.session.destroy(() => {
        res.redirect('/auth/login#login')
    })

})

router.post('/login', async (req, res) => {
    const user = await User.findById('5f903b4680d8b018988f8ebb')
    req.session.user = user;
    req.session.isAuthenticated = true
    req.session.save(err => {
        if (err) {
            throw err
        } else {
            res.redirect('/')
        }
    });


})


module.exports = router;