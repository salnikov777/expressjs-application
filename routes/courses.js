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

module.exports = router;