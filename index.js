const express = require('express');
const exphbs = require('express-handlebars');
const flash = require('express-flash');
const session = require('express-session');

const Helper = require('./Helper');
const app = express();

const { Pool } = require('pg');

let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = { rejectUnauthorized: false };
}

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:201735469@localhost:5432/codexdb'


const pool = new Pool({
    connectionString: connectionString,
    ssl: useSSL
});
pool.on('connect', () => {
    console.log('connection has started')
})

const regNum = Helper(pool);
const RoutesHelper = require('./routes/RoutesHelper');
const regNumInsta = RoutesHelper(regNum)
const handlebarSetup = exphbs({
    partialsDir: "./views/partials",
    viewPath: './views',
    layoutsDir: './views/layouts'
});
app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars');

app.use(flash());

app.use(session({
    secret: "<This is the string used for my sessions>",
    resave: false,
    saveUninitialized: true
}));


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', regNumInsta.home);
app.post('/reg_numbers', regNumInsta.setRegistrations);
app.post('/reset', regNumInsta.resetRegistrations)
app.post('/filter', regNumInsta.filter);
app.post('/all', regNumInsta.all)

const PORT = process.env.PORT || 3013;
app.listen(PORT, () => {
    console.log("App starting on port", PORT)
})

