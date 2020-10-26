const keys = require('../keys');

module.exports =  function (email){
    return {
        to: email,
        from: keys.EMAIL_FROM,
        subject: 'Account is created',
        html: `
            <h1>Welcome to our shop</h1>
            <p>You have created the account successfully</p>
            <hr/>
            <a href="${keys.BASE_URL}">Courses shop</a>
        `
    }
};