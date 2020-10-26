const keys = require('../keys');

module.exports =  function (email, token) {
    return {
        to: email,
        from: keys.EMAIL_FROM,
        subject: 'Recover your access',
        html: `
            <h1>Did you forget the password?</h1>
            <p>If you did not, ignore this message</p>
            <p>Or press the button below</p><br/>
            <p><a href="${keys.BASE_URL}/auth/password/${token}">Recover your access</a></p>
            <hr/>
            <a href="${keys.BASE_URL}">Courses shop</a>
        `
    }
};