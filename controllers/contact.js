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

        const email = req.body.email
        const lastname = req.body.lastname
        const firstname = req.body.firstname
        const phone = req.body.phone
        const sujet = req.body.sujet
        const message = req.body.content
        const ip = req.ip.replace('::ffff:', '')

        const content = 'Bonjour Gaëtan,<br/><br>';
        const content2 = 'Récapitulatif des informations :<br/><br>';
        const content4 = 'Prénom : ' + firstname + '<br/>';
        const content5 = 'Nom : ' + lastname + '<br/>';
        const content6 = 'Email : ' + email + '<br/>';
        const content7 = 'Téléphone : ' + phone + '<br/>';
        const content8 = 'Sujet : ' + sujet + '<br/>';
        const content9 = '<br/>Message : <br/>' + message + '<br/><br/>';

        const content10 = 'Nous vous remercions de votre confiance.<br/><br/>';

        const content11 = '<img style="width: 30px;" width="30" src="http://my-bakery.fr/logo-light.png"/><br/><br/>';
        const content12 = '<a href="https://my-bakery.fr/"></a>My-bakery.fr</a>';

        // On configure notre mail à envoyer par nodemailer
        const mailOptions = {
            from: firstname + ' ' + lastname + ' <' + 'contact@my-bakery.fr' + '>',
            to: 'My-bakery.fr <contact@my-bakery.fr>',
            subject: 'Demande de contact sur My Bakery',
            html: content + content2 + content4 + content5 + content6 + content7 + content8 + content9 + content10 + content11 + content12
        }

        transporter.sendMail(mailOptions, (err, info) => {

            if (err) {

                let error = true
                res.json({
                    error
                })

            } else {

                let sql = `INSERT INTO contacts_history 
                (firstname,lastname,email,phone,sujet,content,ip) 
                VALUES 
                ("${firstname}","${lastname}","${email}", "${phone}", "${sujet}", "${message}", "${ip}")`;


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

    },
}