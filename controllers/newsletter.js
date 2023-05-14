/*
 * Import Module
 ****************/
const nodemailer = require('nodemailer')

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

    // Method Get
    post: (req, res) => {

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

                console.log(email);

                const content = 'Bonjour Gaëtan,<br/><br>';

                const content3 = 'Merci pour votre inscription à notre lettre d\'actualité,<br/><br>';

                const content2 = 'Récapitulatif des informations :<br/><br>';

                const content6 = 'Votre adreese email : ' + email + '<br/><br/>';

                const content10 = 'Nous vous remercions de votre confiance.<br/><br/>';

                const content11 = '<img style="width: 30px;" width="30" src="http://my-bakery.fr/logo-light.png"/><br/><br/>';

                const content12 = '<a href="https://my-bakery.fr/"></a>My-bakery.fr</a>';

                // On configure notre mail à envoyer par nodemailer
                const mailOptions = {
                    from: 'My-bakery.fr <contact@my-bakery.fr>',
                    to: 'My-bakery.fr <contact@my-bakery.fr>',
                    subject: 'Inscription à notre lettre d\'actualité de My Bakery',
                    cc: email,
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
}