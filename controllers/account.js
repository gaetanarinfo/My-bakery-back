/*
 * Import Module
 ****************/
const axios = require('axios'),
    bcrypt = require("bcrypt"),
    saltRounds = 10,
    jwt = require("jsonwebtoken"),
    qs = require('qs'),
    nodemailer = require('nodemailer'),
    generator = require('generate-password'),
    fs = require('fs'),
    generateToken = require('crypto')

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

function formatDate (date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        hour = d.getUTCHours() + 2,
        minute = d.getUTCMinutes(),
        seconde = d.getUTCSeconds()

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    var formatDate = year + '-' + month + '-' + day

    return [formatDate + ' ' + hour + ':' + minute + ':' + seconde];
}

var passwordGen = generator.generate({
    length: 8,
    numbers: true
});

/*
 * Controller
 *************/
module.exports = {
    // Method Get
    login: async (req, res) => {

        const { email } = req.body

        let verif_email = `SELECT * FROM users WHERE active >= 1 AND email = "${email}" LIMIT 1`;

        db.query(verif_email, (error, data, fields) => {

            if (data[0] === undefined) {

                let error = true
                res.json({
                    error,
                    message: 'Votre compte ne semble pas exister sur My Bakery !'
                })

            } else {

                bcrypt
                    .compare(password, data[0].password)
                    .then(result => {

                        if (result !== true) {

                            let error = true
                            res.json({
                                error,
                                message: 'Votre mot de passe ne correspond pas à celui de votre compte !'
                            })

                        } else {

                            const user = {
                                id: data[0].id,
                                email: data[0].email,
                                firstname: data[0].firstname,
                                fonction: data[0].fonction,
                                location: data[0].location,
                                phone: data[0].phone,
                                mobile: data[0].mobile,
                                naissance: data[0].naissance,
                                lastname: data[0].lastname,
                                active: data[0].active,
                            };

                            if (data[0].active === 1) {

                                const token = jwt.sign(user, process.env.JWT_KEY);

                                var update = `UPDATE users SET logged_at = "${formatDate(Date())}", token = "" WHERE id = "${user.id}"`
                                db.query(update, (error, data, fields) => { })

                                let success = true

                                res.send({
                                    success,
                                    token,
                                    user,
                                })

                            } else {
                                let error = true
                                res.json({
                                    error,
                                    message: 'Votre compte ne vous permet pas d\'acceder à My Bakery !'
                                })
                            }

                        }


                    })
                    .catch(err => {

                        let error = true
                        res.json({
                            error,
                            message: err.message
                        })

                    })

            }

        })

    },
    create: async (req, res) => {

        const { email, lastname, firstname, location, fonction, phone, mobile } = req.body,
            ip = req.ip.replace('::ffff:', ''),
            token_activate = generateToken.randomBytes(16).toString('hex')

        let verif_email = `SELECT * FROM users WHERE email = "${email}" LIMIT 1`;

        db.query(verif_email, (error, data, fields) => {

            if (data.length >= 1) {

                let error = true
                res.json({
                    error,
                    message: 'Votre compte semble exister sur My Bakery !'
                })

            } else {

                bcrypt
                    .hash(passwordGen, saltRounds)
                    .then(hash => {


                        const content = 'Bonjour ' + firstname + ',<br/><br>';
                        const content2 = 'Récapitulatif des informations :<br/><br>';
                        const content4 = 'Prénom : ' + firstname + '<br/>';
                        const content5 = 'Nom : ' + lastname + '<br/>';
                        const content6 = 'Email : ' + email + '<br/>';
                        const content7 = 'Mobile : ' + mobile + '<br/>';
                        const content8 = 'Fixe : ' + phone + '<br/>';
                        const content9 = 'Pour activer votre compte merci de cliquer sur le lien : <a href="https://serveur.my-bakery.fr/' + token_activate + '">activer maintenant</a>.<br/>';

                        const content11 = 'Nous vous remercions de votre confiance.<br/><br/>';

                        const content12 = '<img style="width: 90px;" width="90" src="https://my-bakery.fr/logo-light.png"/><br/><br/>';
                        const content13 = '<a href="https://my-bakery.fr/"></a>My-bakery.fr</a>';

                        // On configure notre mail à envoyer par nodemailer
                        const mailOptions = {
                            from: 'My-bakery.fr <' + process.env.USER_MAILER + '>',
                            to: firstname + ' ' + lastname + ' <' + email + '>',
                            subject: 'Votre inscription sur My Bakery',
                            html: content + content2 + content4 + content5 + content6 + content7 + content8 + content9 + content10 + content11 + content12
                        }

                        transporter.sendMail(mailOptions, (err, info) => {

                            if (err) {

                                let error = true
                                res.json({
                                    error
                                })

                            } else {

                                let sql = `INSERT INTO users (
                        email, 
                        password,
                        ip,
                        firstname,
                        lastname,
                        location,
                        fonction,
                        mobile,
                        phone,
                        token_activate,
                        created_at
                        ) VALUES (
                         "${email}", 
                         "${hash}",
                         "${ip}",
                         "${firstname}",
                         "${lastname}",
                         "${location}",
                         "${fonction}",
                         "${mobile}",
                         "${phone}",
                         "${token_activate}",
                         "${formatDate(Date())}"
                         )`;

                                db.query(sql, (error, data) => { })

                                // let data = qs.stringify({
                                //     'accessToken': process.env.WONDERPUSH_KEY,
                                //     'targetSegmentIds': '@ALL',
                                //     'notification': '{"alert":{"text":"👌👏 Retex - Salut ' + firstname + ', bienvenue sur notre application."}}'
                                // });

                                // let config = {
                                //     method: 'post',
                                //     maxBodyLength: Infinity,
                                //     url: 'https://management-api.wonderpush.com/v1/deliveries',
                                //     headers: {
                                //         'Content-Type': 'application/x-www-form-urlencoded'
                                //     },
                                //     data: data
                                // };


                                let success = true

                                res.send({
                                    success,
                                })

                            }

                        })

                    })
                    .catch(err => {

                        let error = true
                        res.json({
                            error,
                            message: err.message
                        })

                    })

            }

        })

    },
    activate: async (req, res) => {

        const { token } = req.params

        let verif_token = `SELECT * FROM users WHERE token_activate = "${token}" LIMIT 1`;

        db.query(verif_token, (error, data, fields) => {

            if (data.length >= 1) {

                let error = true
                res.json({
                    error,
                    message: 'Un problème est survenu lors de l\'actvation de votre compte sur My Bakery !'
                })

            } else {

                var update = `UPDATE users SET activate_at = "${formatDate(Date())}", token_activate = "", active = 1 WHERE id = "${data[0].id}"`
                db.query(update, (error, data, fields) => { })

                let success = true
                res.json({
                    success,
                    message: 'Votre compte a bien été activer sur My Bakery !'
                })

            }

        })

    },
    verification: async (req, res) => {

        const token = req.params.token,
            decoded = jwt.decode(token);

        if (decoded !== null) {
            res.send({
                'user': decoded,
            })
        }

    },
    forgot: async (req, res) => {

    },
    tokenForgot: async (req, res) => {

    },
    userInfo: async (req, res) => {

        const { email } = req.params

        let sql = `SELECT * FROM users WHERE email = ${email} LIMIT 1`;

        db.query(sql, (errors, user) => {
            let success = true
            res.json({
                success,
                user: user[0]
            })
        })

    },
    userActivity: async (req, res) => {

        const { email, id } = req.params

        let sql = `SELECT U.*, COUNT(U.id) AS counterId FROM bakerys_history_update AS U 
        LEFT JOIN bakerys AS B ON B.id = U.bakery_id
        WHERE U.user_id = ${id} GROUP BY U.id LIMIT 1`;

        db.query(sql, (errors, activity) => {

            let success = true
            res.json({
                success,
                activity: activity.counterId,
                activityTable: activity
            })

        })

    },
}