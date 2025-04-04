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
    path = require("path"),
    moment = require('moment'),
    nodemailer = require('nodemailer')

moment.locale('fr')

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
    if (res.statusCode != 304) res.redirect('https://my-bakery.fr');
    else if (res.statusCode != 301) res.redirect('https://my-bakery.fr');
    else res.redirect('https://my-bakery.fr');
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

// Déclaration de notre transporter
// C'est en quelque sorte notre connexion à notre boite mail
transporter = nodemailer.createTransport({
    host: process.env.ADRESSE_MAILER,
    port: process.env.MAILER_PORT,
    secure: true,
    tls: {
        rejectUnauthorized: false
    },
    auth: {
        user: process.env.USER_MAILER, // Env utilisateur
        pass: process.env.PASSWORD_MAILER, // Env password
    }
})

// cron.schedule('0 3 */2 * *', () => {

//     let sql = `SELECT O.*, U.firstname AS userFirstname, U.lastname AS userLastname, U.email FROM 
//         orders AS O
//         LEFT JOIN users AS U ON U.id = O.user_id
//         WHERE O.status = 1 GROUP BY O.id ORDER BY O.id DESC`;

//     db.query(sql, (error, data, fields) => {

//         if (error) console.log(error);

//         if (data.length >= 1) {

//             data.forEach(element => {

//                 if (element.status === 1 && element.payer_id != null && moment().format('YYYY-MM-DD HH:mm:ss') >= moment(element.created_at).add(1, 'hours').format('YYYY-MM-DD HH:mm:ss')) {

//                     const content = 'Bonjour ' + element.userFirstname + ',<br/><br>';

//                     const content2 = 'Attention ! Votre commande a été payée mais n\'est toujours pas confirmée.<br/><br>';

//                     const content3 = 'Il est très important de valider votre commande, sinon vous ne profiterez pas pleinement de My Bakery.<br/><br>';

//                     const content4 = 'De plus, vous ne pouvez pas demander de remboursement si vous n\'êtes pas satisfait du produit choisi.<br/><br>';

//                     const content5 = '<a href="https://my-bakery.fr/cart/paiement/succes/' + element.token_paiement + '">Je confirme ma commande maintenant</a>.<br/><br>';

//                     const content6 = 'Nous vous remercions de votre confiance.<br/><br/>';

//                     const content7 = '<img style="width: 90px;" width="90" src="https://my-bakery.fr/logo-light.png"/><br/><br/>';

//                     const content8 = '<a href="https://my-bakery.fr"></a>My-bakery</a>';

//                     // On configure notre mail à envoyer par nodemailer
//                     const mailOptions = {
//                         from: 'My bakery <' + process.env.USER_MAILER + '>',
//                         to: element.userFirstname + ' ' + element.userLastname + ' <' + element.email + '>',
//                         subject: 'Votre commande n° ' + element.paypal_id.replace('PAYID-', '') + ' n\'est toujours pas confirmée  sur My Bakery !',
//                         html: content + content2 + content3 + content4 + content5 + content6 + content7 + content8
//                     }

//                     transporter.sendMail(mailOptions, (err, info) => {
//                         if (err) {
//                             console.log(err)
//                         }
//                     })

//                 }

//             });

//         }

//     })

// }, {
//     scheduled: true,
//     timezone: "Europe/Paris"
// });

// Mise à jour des notes
cron.schedule('*/1 * * * *', () => {

    let bakerys_devanture = `SELECT COUNT(id) AS counter_devanture, SUM(note) AS sum_devanture, bakery_id FROM bakerys_devanture`;
    db.query(bakerys_devanture, (error, data, fields) => {

        if (data.length >= 1) {

            var update = `UPDATE bakerys SET counter_devanture = "${data[0].counter_devanture}", sum_devanture = ${data[0].sum_devanture} WHERE id = ${data[0].bakery_id}`
            db.query(update, (error, data, fields) => { })

        }

    })

    let bakerys_choix = `SELECT COUNT(id) AS counter_choix, SUM(note) AS sum_choix, bakery_id FROM bakerys_choix`;
    db.query(bakerys_choix, (error, data, fields) => {

        if (data.length >= 1) {

            var update = `UPDATE bakerys SET counter_choix = ${data[0].counter_choix}, sum_choix = ${data[0].sum_choix} WHERE id = ${data[0].bakery_id}`
            db.query(update, (error, data, fields) => { })

        }

    })

    let bakerys_prix = `SELECT COUNT(id) AS counter_prix, SUM(note) AS sum_prix, bakery_id FROM bakerys_prix`;
    db.query(bakerys_prix, (error, data, fields) => {

        if (data.length >= 1) {

            var update = `UPDATE bakerys SET counter_prix = ${data[0].counter_prix}, sum_prix = ${data[0].sum_prix} WHERE id = ${data[0].bakery_id}`
            db.query(update, (error, data, fields) => { })

        }

    })

    let bakerys_proprete = `SELECT COUNT(id) AS counter_proprete, SUM(note) AS sum_proprete, bakery_id FROM bakerys_proprete`;
    db.query(bakerys_proprete, (error, data, fields) => {

        if (data.length >= 1) {

            var update = `UPDATE bakerys SET counter_proprete = ${data[0].counter_proprete}, sum_proprete = ${data[0].sum_proprete} WHERE id = ${data[0].bakery_id}`
            db.query(update, (error, data, fields) => { })

        }

    })

}, {
    scheduled: true,
    timezone: "Europe/Paris"
});

cron.schedule('0 1 * * *', () => {

    exec("pm2 restart all", (error, stdout, stderr) => {

        if (error) {

            const content = 'Bonjour ' + 'Gaëtan' + ',<br/><br>';
            const content2 = 'Le serveur My Bakery a rencontré une erreur !<br/><br>';

            const content3 = 'Nous vous remercions de votre confiance.<br/><br/>';

            const content4 = '<img style="width: 90px;" width="90" src="https://my-bakery.fr/logo-light.png"/><br/><br/>';
            const content5 = '<a href="https://my-bakery.fr"></a>My-bakery</a>';

            // On configure notre mail à envoyer par nodemailer
            const mailOptions = {
                from: 'My bakery <' + process.env.USER_MAILER + '>',
                to: 'Gaëtan' + ' ' + 'Seigneur' + ' <' + 'seigneurgaetan03@gmail.com' + '>',
                subject: 'Problème de redémarrage du serveur My Bakery le ' + moment().format('DD MMMM YYYY à HH:mm:ss'),
                html: content + content2 + content3 + content4 + content5
            }

            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.log(err)
                }
            })

            return;
        }

        const content = 'Bonjour ' + 'Gaëtan' + ',<br/><br>';
        const content2 = 'Le serveur My Bakery a bien été redémarrer !<br/><br>';

        const content3 = 'Nous vous remercions de votre confiance.<br/><br/>';

        const content4 = '<img style="width: 90px;" width="90" src="https://my-bakery.fr/logo-light.png"/><br/><br/>';
        const content5 = '<a href="https://my-bakery.fr"></a>My-bakery</a>';

        // On configure notre mail à envoyer par nodemailer
        const mailOptions = {
            from: 'My bakery <' + process.env.USER_MAILER + '>',
            to: 'Gaëtan' + ' ' + 'Seigneur' + ' <' + 'seigneurgaetan03@gmail.com' + '>',
            subject: 'Redémarrage du serveur My Bakery le ' + moment().format('DD MMMM YYYY à HH:mm:ss'),
            html: content + content2 + content3 + content4 + content5
        }

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err)
            }
        })

        return;

    })

}, {
    scheduled: true,
    timezone: "Europe/Paris"
});

cron.schedule('*/1 * * * *', () => {

    let bakerys = `SELECT * FROM bakerys WHERE highlighting_at IS NOT NULL`;
    db.query(bakerys, (error, data, fields) => {

        if (data.length >= 1) {

            data.forEach(element => {

                if (moment().format('YYYY-MM-DD HH:mm:ss') >= moment(element.highlighting_at).format('YYYY-MM-DD HH:mm:ss')) {

                    var update = `UPDATE bakerys SET highlighting_at = NULL WHERE id = ${element.id}`
                    db.query(update, (error, data, fields) => { console.log(error); })

                    var updateEstablishement = `UPDATE bakerys_establishment SET highlighting = 0, highlighting_at = NULL WHERE bakery_id = ${element.id}`
                    db.query(updateEstablishement, (error, data, fields) => { console.log(error) })

                }

            })

        }

    })

}, {
    scheduled: true,
    timezone: "Europe/Paris"
});