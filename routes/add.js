const express = require('express');
const router = express.Router();
const Course = require('../models/course');
const auth = require('../middleware/auth');
const {courseValidators} = require('../utils/validators');

const {validationResult} = require('express-validator')

router.get('/', auth, (req, res) => {
    res.render('add', {
        title: 'Add course',
        isAdd: true
    });
})

router.post('/', auth, courseValidators,  async (req, res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(422).render('add', {
            title: 'Add a course',
            isAdd: true,
            error: errors.array()[0].msg,
            data: {
                title: req.body.title,
                price: req.body.price,
                img: req.body.img || "https://cdn.kwork.ru/files/avatar/large/21/1903429-2.jpg"
            }
        });
    }


    const course = new Course({
        title: req.body.title,
        price: req.body.price,
        img: req.body.img || "https://cdn.kwork.ru/files/avatar/large/21/1903429-2.jpg",
        userId: req.user
    })

    try{
        await course.save()
        res.redirect('/courses')
    }catch (e) {
        console.log(e);
    }

})


module.exports = router;