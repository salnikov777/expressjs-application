const express = require('express');
const router = express.Router();
const Course = require('../models/course');
const auth = require('../middleware/auth');

function isOwner(course, req){
    return course.userId.toString() === req.user._id.toString()

}

router.get('/', async (req, res) => {

    try{
        const courses = await Course.find()
            .populate('userId', 'email name')
            .select('price title img');

        res.render('courses', {
            title: 'Courses',
            isCourses: true,
            userId: req.user ? req.user._id.toString(): null,
            courses: courses
        });
    }catch (e) {
        console.log(e);
    }


})

router.get('/:id/edit', auth,  async (req, res) => {

    if (!req.query.allow) {
        return res.redirect('/')
    }

    try{
        const course = await Course.findById(req.params.id)

        if(!isOwner(course, req)){
            return res.redirect('/courses')
        }

        res.render('course-edit', {
            title: `Edit the course ${course.title}`,
            course
        });
    }catch (e) {
        console.log(e);
    }


})

router.post('/edit', auth, async (req, res) => {
    try{
        const {id} = req.body
        delete req.body.id;
        const course = await Course.findById(id)
        if(!isOwner(course, req)){
            res.redirect('/courses')
        }

        Object.assign(course, req.body)

        await course.save();
        res.redirect('/courses')
    }catch (e) {
        console.log(e);
    }


});

router.get('/:id', async (req, res) => {

    try{
        res.render('course', {
            layout: 'empty',
            title: `Курс ${course.title}`,
            course
        });
    }catch (e) {
        console.log(e);
    }

    const course = await Course.findById(req.params.id)


})


router.post('/remove', auth, async (req, res) => {
    try {
        await Course.deleteOne({
            _id: req.body.id,
            userId: req.user._id
        });
        res.redirect('/courses')
    } catch (e) {
        console.log(e);
    }


})

module.exports = router;