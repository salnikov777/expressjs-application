const {body} = require('express-validator')
const User = require('../models/user');

exports.registerValidators = [
    body('email')
        .isEmail().withMessage('Text a correct email')
        .custom(async (value, {req}) => {
        try{
            const user = await User.findOne({email: value})
            if(user){
                return Promise.reject('Such email is existed')
            }
        }catch (e) {
            console.log(e);
        }
    })
        .normalizeEmail(),
    body('password', 'Password must be minimum six symbols')
        .isLength({min: 6, max: 56})
        .isAlphanumeric()
        .trim(),
    body('confirm').custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new Error('Passwords must be similar')
        }
        return true;
    }).trim(),
    body('name').isLength({min: 3}).withMessage('Name must be minimum three symbols').trim()
]

exports.courseValidators = [
    body('title').isLength({min:3}).withMessage('Min length of name is three symbols').trim(),
    body('price').isNumeric().withMessage('Input a correct price'),
    body('img', 'Input image URL correctly').isURL()
]