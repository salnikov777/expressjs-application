const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const homeRoutes = require('./routes/home');
const addRoutes = require('./routes/add');
const coursesRoutes = require('./routes/courses');
const cardRoutes = require('./routes/card');
const mongoose = require('mongoose')
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const User = require('./models/user');
const orderRoutes = require('./routes/orders');
const authRoutes = require('./routes/auth');

const app = express();

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')

app.set('views', 'views')

app.use(async (req, res, next) => {

    try{
        const user = await User.findById('5f903b4680d8b018988f8ebb')
        req.user = user;
        next();
    }catch (e) {
        console.log(e);
    }
})

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}))

app.use('/', homeRoutes);
app.use('/courses', coursesRoutes);
app.use('/add', addRoutes);
app.use('/card', cardRoutes);
app.use('/orders', orderRoutes);
app.use('/auth', authRoutes);


const PORT = process.env.PORT || 3000

async function start() {
    try {
        const urlDB = `mongodb+srv://maxim:maxim777@cluster0.5no97.mongodb.net/shop`
        await mongoose.connect(urlDB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        const candidate = await User.findOne();

        if (!candidate) {
            const user = new User({
                email: 'salnikov-m@yandex.ru',
                name: 'Max',
                cart: {items: []}
            })
            await user.save();
        }


        app.listen(PORT, () => {
            console.log('Server has been started!');
        })
    } catch (e) {
        console.log(e);
    }
}

start()



