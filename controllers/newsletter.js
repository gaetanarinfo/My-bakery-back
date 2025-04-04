/*
 * Import Module
 ****************/
const nodemailer = require('nodemailer'),
    moment = require('moment')

/*
 * Import Mailer
 ****************/
const header = require('./mailer/header'),
    body = require('./mailer/body'),
    footer = require('./mailer/footer')

moment.locale('fr')

// Déclaration de notre transporter
// C'est en quelque sorte notre connexion à notre boite mail
transporter = nodemailer.createTransport({
    host: process.env.ADRESSE_MAILER,
    port: process.env.MAILER_PORT,
    secure: false,
    tls: {
        rejectUnauthorized: false
    },
    auth: {
        user: process.env.USER_MAILER, // Env utilisateur
        pass: process.env.PASSWORD_MAILER, // Env password
    }
})

/*
 * Controller
 *************/
module.exports = {

    post: async (req, res) => {

        const email = req.body.emailNewsletter
        const ip = req.ip.replace('::ffff:', '')

        let verif_email = `SELECT email FROM newsletters WHERE email = "${email}"`;

        db.query(verif_email, (error, data, fields) => {

            if (data[0] != undefined) {

                let error = true
                res.json({
                    error,
                    message: 'Votre adresse email existe déjà !'
                })

            } else {

                const content = 'Bonjour Gaëtan,<br/><br>';

                const content3 = 'Merci pour votre inscription à notre lettre d\'actualité,<br/><br>';

                const content2 = 'Récapitulatif de vos informations :<br/><br>';

                const content6 = 'Votre adresse email : ' + email + '<br/><br/>';

                const content10 = 'Nous vous remercions de votre confiance.<br/><br/>';

                const content11 = '<img style="width: 90px;" width="90" src="https://my-bakery.fr/logo-light.png"/><br/><br/>';

                const content12 = '<a href="https://my-bakery.fr"></a>My-bakery</a>';

                // On configure notre mail à envoyer par nodemailer
                const mailOptions = {
                    from: 'My bakery <' + process.env.USER_MAILER + '>',
                    to: 'My-bakery <' + email + '>',
                    subject: 'Inscription à notre lettre d\'actualité de My Bakery',
                    html: content + content3 + content2 + content6 + content10 + content11 + content12
                }

                transporter.sendMail(mailOptions, (err, info) => {

                    if (err) {

                        let error = true
                        res.json({
                            error
                        })

                    } else {

                        let sql = `INSERT INTO newsletters (email,ip) VALUES ("${email}","${ip}")`;

                        db.query(sql, (err2, result) => {

                            if (err2) {
                                let error = true
                                res.json({
                                    error
                                })
                            };

                            let success = true

                            res.send({
                                success
                            })

                        })

                    }

                })

            }

        })

    },

    send: async (req, res) => {

        const { methode, email } = req.params,
            blogs_array = [],
            bakerys_array = []

        let blogs = `SELECT B.*, BC.name FROM 
        blogs AS B
        LEFT JOIN blogs_categories AS BC ON BC.id = B.categorie
        WHERE B.active >= 1 GROUP BY B.id ORDER BY B.id DESC LIMIT 1`;
        db.query(blogs, (error, data, fields) => {

            if (error)
                res.json({
                    error
                })

            if (data.length >= 1) {

                data.forEach(element => {

                    blogs_array.push({
                        title: element.title,
                        views: element.views,
                        url: element.url,
                        content: element.small_content,
                        image: element.image,
                        author: element.author,
                        categorie: element.name,
                        created_at: element.created_at,
                        views: element.views
                    })

                })

            }

        })

        let bakerys = `SELECT * FROM bakerys WHERE active >= 1 ORDER BY id DESC LIMIT 4`;
        db.query(bakerys, (error, data, fields) => {

            if (error)
                res.json({
                    error
                })

            if (data.length >= 1) {

                data.forEach(element => {

                    bakerys_array.push({
                        title: element.title,
                        url: element.url,
                        content: element.small_content,
                        image: element.image
                    })

                })

            }

        })

        if (methode === 'all') {
            let newsletter_emails = `SELECT email FROM newsletters WHERE active = 1`;
            db.query(newsletter_emails, (error, data, fields) => {

                if (error)
                    res.json({
                        error
                    })

                if (data.length >= 1) {

                    data.forEach(element => {

                        // On configure notre mail à envoyer par nodemailer
                        const mailOptions = {
                            from: 'My bakery <' + process.env.USER_MAILER + '>',
                            to: 'My-bakery <' + element.email + '>',
                            subject: 'Notre lettre d\'actualité du ' + moment().format('DD MMMM YYYY') + ' - My Bakery',
                            html: header.set() + body.set(blogs_array[0], bakerys_array) + footer.set(element.email)
                        }

                        transporter.sendMail(mailOptions, (err, info) => {

                            if (err) {

                                let error = true
                                res.json({
                                    error
                                })

                            }

                        })

                    });

                    var update = `UPDATE newsletters SET deliver_at = "${moment().format('YYYY-MM-DD HH:mm:ss')}" WHERE email = "${email}" AND active = 1`

                    db.query(update, (error, data, fields) => {

                        if (error)
                            res.json({
                                error,
                            })

                    })

                    let succes = true
                    res.json({
                        succes,
                    })

                } else {

                    let succes = true
                    res.json({
                        succes,
                    })

                }

            })
        }

        if (methode === 'first') {
            let newsletter_emails = `SELECT email FROM newsletters WHERE email = "${email}" AND active = 1`;
            db.query(newsletter_emails, (error, data, fields) => {

                if (error)
                    res.json({
                        error
                    })

                if (data.length >= 1) {

                    data.forEach(element => {

                        // On configure notre mail à envoyer par nodemailer
                        const mailOptions = {
                            from: 'My bakery <' + process.env.USER_MAILER + '>',
                            to: 'My-bakery <' + element.email + '>',
                            subject: 'Notre lettre d\'actualité du ' + moment().format('DD MMMM YYYY') + ' - My Bakery',
                            html: header.set() + body.set(blogs_array[0], bakerys_array) + footer.set(element.email)
                        }

                        transporter.sendMail(mailOptions, (err, info) => {

                            if (err) {

                                let error = true
                                res.json({
                                    error
                                })

                            }

                        })

                    });

                    var update = `UPDATE newsletters SET deliver_at = "${moment().format('YYYY-MM-DD HH:mm:ss')}" WHERE email = "${email}" AND active = 1`

                    db.query(update, (error, data, fields) => {

                        if (error)
                            res.json({
                                error,
                            })

                    })

                    let succes = true
                    res.json({
                        succes,
                    })


                } else {

                    let succes = true
                    res.json({
                        succes,
                    })

                }

            })
        }

    },

    get: async (req, res) => {

        const { email } = req.params

        let userVerifAdmin = `SELECT email, admin FROM users WHERE email = "${email}" LIMIT 1`;

        db.query(userVerifAdmin, (error, data, fields) => {

            if (error) {
                res.json({
                    error,
                })
            }

            if (data[0].admin >= 1) {

                let newsletter = `SELECT * FROM newsletters WHERE active = 1 ORDER BY id DESC`;

                db.query(newsletter, (error, data2, fields) => {

                    if (error)
                        res.json({
                            error,
                        })

                    if (data.length >= 1) {

                        let succes = true
                        res.json({
                            succes,
                            newsletterTable: data2
                        })

                    }

                })

            }

        })

    },

    unsubsribe: async (req, res) => {

        const { id } = req.params

        let userVerifEmail = `SELECT * FROM newsletters WHERE id = "${id}" LIMIT 1`;

        db.query(userVerifEmail, (error, data, fields) => {

            if (error) {
                res.json({
                    error,
                })
            }

            if (data[0].active >= 1) {

                var update = `UPDATE newsletters SET active = 0 WHERE id = "${id}"`

                db.query(update, (error, data, fields) => {

                    if (error)
                        res.json({
                            error,
                        })

                })

                let succes = true
                res.json({
                    succes,
                })

            } else {

                let errors = false
                res.json({
                    errors,
                })

            }

        })

    },

}