const express = require('express');
const router = express.Router();
const Course = require('../models/course');

router.get('/', async (req, res)=>{

    const courses = await Course.getAll()

    res.render('courses', {
        title: 'Courses',
        isCourses: true,
        courses: courses
    });
})

router.get('/:id', async (req, res)=>{

    const course = await Course.getById(req.params.id)

    res.render('course', {
        layout: 'empty',
        title: `Курс ${course.title}`,
        course
    });
})

module.exports = router;