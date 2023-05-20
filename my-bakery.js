/*
 * App.js
 ******************************/

require('dotenv').config()

// Package nodemon pour le relancement des fichiers views et js avec npm start
const
    express = require('express'),
    app = express(),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    methodOverride = require('method-override'),
    mysql = require('mysql2'),
    cors = require('cors'),
    throttle = require('express-throttle-bandwidth'),
    port = process.env.SERVER_PORT,
    https = require(`https`),
    fs = require(`fs`),
    cron = require('node-cron'),
    { exec } = require("child_process"),
    path = require("path");

const options = {
    key: fs.readFileSync(`privkey.pem`),
    cert: fs.readFileSync(`fullchain.pem`)
};

// Helmet aide à sécuriser les applications Express.js en définissant divers en-têtes HTTP. Ce n'est pas un argent
const helmet = require("helmet")

// Method-Override
app.use(methodOverride('_method'))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next()
})

// Cors
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true
}))

// CORS middleware
const allowCrossDomain = (req, res, next) => {
    res.header(`Access-Control-Allow-Origin`, `*`);
    res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
    res.header(`Access-Control-Allow-Headers`, `Content-Type`);
    next();
};

app.use(allowCrossDomain);

app.use(throttle(1024 * 128)) // throttling bandwidth

// Mysql
db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT
});

db.connect((err) => {
    if (err) console.error('error connecting: ' + err.stack);
    console.log('Connecté à Mysql avec l\'id ' + db.threadId);
});

// Express Static (Permet de pointer un dossier static sur une URL)
// Exemple: le chemin /assets nous donnera accès au dossier public
app.use(express.static('public'))


// Body Parser qui nous permet de parser des data d'une req a une autre
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(path.join('./public')))

// Module App gestion des cookies
app.use(session({
    key: 'session_cookie_name',
    secret: 'labelleauboisdormanssursonarbreperché',
    name: 'my-bakery',
    saveUninitialized: false,
    resave: false,
    cookie: {
        secure: true,
        sameSite: 'none',
        path: '/',
        maxAge: 1000000
    }
}))

// cookieParser should be above session
app.use(cookieParser())

// App.use * est un middleware pour proteger la partie Administration ou bien cacher un bouton pour le visiteur
app.use('*', (req, res, next) => {
    // res.locals.users = req.session.userId
    next()
})

// Router
const ROUTER = require('./controllers/router')
app.use(ROUTER)

// Page Err 404
app.use((req, res) => {
    res.send('Vous n\'avez rien à faire ici ...')
})

// Helmet security pour les failles XSS etc...
app.use(helmet.contentSecurityPolicy());
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());
app.disable('x-powered-by');

https.createServer(options, app).listen(8080);

// On demande à notre transporter d'envoyer notre mail
app.listen(port, () => {
    console.log(`Ecoute le port ${port}, lancé le : ${new Date().toLocaleString()}`)
})

cron.schedule('0 1 * * *', () => {

    console.log('Running a job at 01:00 at Europe/Paris timezone');

    exec("pm2 restart 0", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    })

}, {
    scheduled: true,
    timezone: "Europe/Paris"
});