/*
 * Import Module
 ****************/

const { createMollieClient } = require('@mollie/api-client'),
    generateToken = require('crypto'),
    { google, GoogleApis } = require("googleapis"),
    fs = require('fs').promises,
    qs = require('qs'),
    path = require('path'),
    process = require('process'),
    nodemailer = require('nodemailer'),
    axios = require('axios'),
    moment = require('moment'),
    { authenticate } = require('@google-cloud/local-auth')

const GOOGLE_PRIVATE_KEY = process.env.private_key,
    GOOGLE_CLIENT_EMAIL = process.env.client_email,
    GOOGLE_PROJECT_NUMBER = process.env.project_number,
    SCOPES = ["https://www.googleapis.com/auth/calendar", "https://www.googleapis.com/auth/calendar.events", "https://www.googleapis.com/auth/calendar.events.readonly"],
    jwtClient = new google.auth.JWT(
        GOOGLE_CLIENT_EMAIL,
        null,
        GOOGLE_PRIVATE_KEY,
        SCOPES
    ),
    calendar = google.calendar({
        version: "v3",
        project: GOOGLE_PROJECT_NUMBER,
        auth: jwtClient,
    }),
    auth = new google.auth.GoogleAuth({
        keyFile: "./jwt.keys.json",
        scopes: SCOPES,
    });

/*
* Import Mailer
****************/
const header = require('./mailer/header'),
    body = require('./mailer/body'),
    footer = require('./mailer/footer')

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

module.exports = {

    orderInsert: async (req, res) => {

        const mollieClient = createMollieClient({ apiKey: process.env.MOBILIE_KEY }),
            { user_id, product_id, status, qte, total_ht, total_ttc, dateStart, dateEnd, additional_information, banner_name, banner_square_name, bakery_id_event } = req.body,
            token_paiement = generateToken.randomBytes(8).toString('hex')

        let products = `SELECT * FROM products WHERE id = ${product_id} ORDER BY id ASC LIMIT 1`;

        db.query(products, (error, data, fields) => {

            if (data.length >= 1) {

                var dateS = dateStart,
                    dateE = dateEnd,
                    day_supplement = isNaN((Number(moment(dateE).add(1, 'days').diff(moment(dateS), "days")) - 7) *
                        parseFloat(0.25).toFixed(2)) ? 0 : (Number(moment(dateE).add(1, 'days').diff(moment(dateS), "days")) - 7) *
                    parseFloat(0.25).toFixed(2)

                var price = Number(data[0].price) + (day_supplement)

                day_supplement = (day_supplement + day_supplement * 20 / 100)

                var total = (price + price * 20 / 100).toFixed(2)

                var dateS = '',
                    dateE = '',
                    bIdEvent = 0

                if (dateStart === null) {
                    dateS = '1999-01-01'
                } else {
                    dateS = dateStart
                }

                if (dateEnd === null) {
                    dateE = '1999-01-01'
                } else {
                    dateE = dateEnd
                }

                if (bakery_id_event === null) {
                    bIdEvent = 0
                } else {
                    bIdEvent = bakery_id_event
                }

                let user = `SELECT * FROM users WHERE id = ${user_id} ORDER BY id ASC LIMIT 1`;

                db.query(user, (error, data2, fields) => {

                    if (data.length >= 1) {

                        mollieClient.payments.create({
                            amount: {
                                currency: 'EUR',
                                value: total, // You must send the correct number of decimals, thus we enforce the use of strings
                            },
                            billingAddress: {
                                title: 'Indéterminé',
                                phone: (data2[0].phone !== 'NC') ? data2[0].phone : '',
                                postalCode: (data2[0].postcode !== '') ? data2[0].postcode : '',
                                city: (data2[0].ville !== '') ? data2[0].ville : '',
                                country: (data2[0].pays_code !== '') ? data2[0].pays_code : '',
                                email: data2[0].email,
                                streetAndNumber: (data2[0].location !== '') ? data2[0].location : '',
                                givenName: data2[0].firstname,
                                familyName: data2[0].lastname,
                            },
                            locale: 'fr_FR',
                            description: 'My Bakery pack ' + data[0].title,
                            redirectUrl: 'https://serveur.my-bakery.fr/order-validate-mobilie/' + token_paiement,
                            cancelUrl: 'https://serveur.my-bakery.fr/order-cancel-mobilie/' + token_paiement,
                            metadata: {
                                order_id: token_paiement,
                            },
                            lines: [
                                {
                                    type: 'digital',
                                    sku: String(data[0].id),
                                    description: 'My Bakery pack ' + data[0].title,
                                    productUrl: 'https://my-bakery.fr/products',
                                    imageUrl: 'https://my-bakery.fr/listed.png',
                                    quantity: 1,
                                    unitPrice: {
                                        currency: 'EUR',
                                        value: String(total),
                                    },
                                    totalAmount: {
                                        currency: 'EUR',
                                        value: String(total),
                                    },
                                },
                            ]
                        }).then(payment => {

                            let sql = `INSERT INTO orders (
                                user_id,
                                product_id,
                                token_paiement,
                                paypal_id,
                                mobilie_id,
                                paiement,
                                qte,
                                total_ht,
                                total_ttc,
                                status,
                                dateStart,
                                dateEnd,
                                additional_information,
                                banner_name,
                                banner_square_name,
                                bakery_id_event,
                                created_at,
                                created
                                ) VALUES (
                                "${user_id}", 
                                "${product_id}",
                                "${token_paiement}",
                                "${payment.id}",
                                "${payment.id}",
                                "Mollie",
                                "${qte}",
                                "${price}",
                                "${total}",
                                "${status}",
                                "${dateS}",
                                "${dateE}",
                                "${additional_information}",
                                "${banner_name}",
                                "${banner_square_name}",
                                "${bIdEvent}",
                                "${moment().format('YYYY-MM-DD HH:mm:ss')}",
                                "${moment().format('YYYY-MM-DD')}"
                                )`;

                            db.query(sql, (errors, data) => {

                                if (errors) {

                                    let error = true
                                    res.json({
                                        error,
                                    })

                                }

                                let succes = true
                                res.json({
                                    succes,
                                    order_id: payment.id
                                })

                            })


                        }).catch(error => {
                            console.log(error)
                        });

                    }

                })

            }

        })

    },
    create: async (req, res) => {

        const { orderId } = req.params,
            mollieClient = createMollieClient({ apiKey: process.env.MOBILIE_KEY })

        const payment = mollieClient.payments.get(orderId);

        res.redirect((await payment)._links['checkout'].href);

    },
    succes: async (req, res) => {

        const mollieClient = createMollieClient({ apiKey: process.env.MOBILIE_KEY }),
            { orderId } = req.params

        let orderPay = `SELECT O.* FROM orders AS O
        WHERE O.token_paiement = "${orderId}" ORDER BY O.id DESC LIMIT 1`;

        db.query(orderPay, (error, data, fields) => {

            if (data.length >= 1) {

                const payment = mollieClient.payments.get(data[0].mobilie_id);

                payment.then(paymentResult => {

                    if (paymentResult.status === 'paid') {

                        var payer_id = paymentResult.profileId,
                            email_payer = paymentResult['billingAddress'].email,
                            firstname_payer = paymentResult['billingAddress'].givenName,
                            lastname_payer = paymentResult['billingAddress'].familyName,
                            recipient_name_payer = paymentResult['billingAddress'].streetAndNumber,
                            line_payer = paymentResult['billingAddress'].streetAndNumber,
                            city_payer = paymentResult['billingAddress'].city,
                            state_payer = '',
                            postal_code_payer = paymentResult['billingAddress'].postalCode,
                            country_code_payer = paymentResult['billingAddress'].country

                        var line_payer_c = String(line_payer).replace(/["']/g, "")

                        if (data.length >= 1) {

                            let order = `SELECT O.*, U.*, P.title AS titleProduct, P.content_paypal, P.credits FROM orders AS O
                                    LEFT JOIN users AS U ON U.id = O.user_id
                                    LEFT JOIN products AS P ON P.id = O.product_id
                                    WHERE O.token_paiement = "${orderId}" GROUP BY O.id ORDER BY O.id ASC`;

                            db.query(order, (error, data2, fields) => {

                                if (data2.length >= 1) {

                                    var application_id = data2[0].application_id

                                    if (data2[0].status === 1) {

                                        // Abonnement
                                        if (Number(data2[0].product_id) >= 3) {

                                            let sqlinsertSubscription = `INSERT INTO user_subscription (
                                                user_id,
                                                order_id,
                                                product_id,
                                                created_at,
                                                from_date
                                                ) VALUES (
                                                "${data2[0].user_id}", 
                                                "${data2[0].id}", 
                                                "${data2[0].product_id}", 
                                                "${moment().format('YYYY-MM-DD HH:mm:ss')}",
                                                "${moment().add(1, 'months').format('YYYY-MM-DD HH:mm:ss')}"
                                                )`;

                                            db.query(sqlinsertSubscription, (errors, data) => { })

                                            var randomColor = Math.floor(Math.random() * 16777215).toString(16),
                                                campaign_id = generateToken.randomBytes(5).toString('hex'),
                                                banner_name = data2[0].banner_name,
                                                banner_square_name = data2[0].banner_square_name,
                                                dateStart = moment(data2[0].dateStart).format('DD MMMM YYYY'),
                                                dateEnd = moment(data2[0].dateEnd).format('DD MMMM YYYY'),
                                                title = '<strong>Campagne publicitaire n°' + campaign_id + '</strong' + '<strong>De ' + data2[0].firstname + ' ' + data2[0].lastname + '</strong' + '<strong>Du ' + dateStart + ' au ' + dateEnd + '</strong>'

                                            let sqlinsertEvents = `INSERT INTO bakerys_events (
                                                campaign_id,
                                                user_id,
                                                bakery_id,
                                                title,
                                                color,
                                                banner_name,
                                                banner_square_name,
                                                start,
                                                end,
                                                active,
                                                created_at
                                                ) VALUES (
                                                "${campaign_id}",
                                                "${data2[0].user_id}", 
                                                "${data2[0].bakery_id_event}",
                                                "${title}", 
                                                "${randomColor}",
                                                "${banner_name}",
                                                "${banner_square_name}",
                                                "${moment(data2[0].dateStart).format('YYYY-MM-DD')}",
                                                "${moment(data2[0].dateEnd).format('YYYY-MM-DD')}",
                                                    1,
                                                "${moment().format('YYYY-MM-DD HH:mm:ss')}")`;

                                            db.query(sqlinsertEvents, (errors, data) => { })

                                        }

                                        // Google Calendar
                                        if (Number(data2[0].product_id) >= 3) {

                                            var event = {
                                                "summary": 'Campagne publicitaire n°' + campaign_id + ' De ' + data2[0].firstname + ' ' + data2[0].lastname,
                                                "description": 'Du ' + dateStart + ' au ' + dateEnd,
                                                "colorId": 10,
                                                "creator": {
                                                    "email": "seigneurgaetan03@gmail.com"
                                                },
                                                "organizer": {
                                                    "email": "seigneurgaetan03@gmail.com",
                                                    "displayName": 'My Bakery',
                                                },
                                                "start": {
                                                    "date": moment(data2[0].dateStart).format('YYYY-MM-DD'),
                                                    "timeZone": "Europe/Paris",
                                                },
                                                "end": {
                                                    "date": moment(data2[0].dateEnd).format('YYYY-MM-DD'),
                                                    "timeZone": "Europe/Paris",
                                                },
                                                "reminders": {
                                                    "useDefault": false,
                                                    "overrides": [
                                                        { "method": "email", "minutes": 24 * 60 },
                                                        { "method": "popup", "minutes": 10 },
                                                    ],
                                                },
                                            };

                                            calendar.events.insert({
                                                auth: auth,
                                                calendarId: 'dd6e5c1145f143203b6d089b62dfcc98529096ef3e658a0f70fe711772d638f4@group.calendar.google.com',
                                                resource: event,
                                            }, (err, data) => {

                                                if (err) {

                                                    res.json({
                                                        error: true,
                                                        message: err.code + ' ' + err.message
                                                    })

                                                }

                                            })

                                        }

                                        var dateS = data2[0].dateStart,
                                            dateE = data2[0].dateEnd,
                                            day_supplement = (Number(moment(dateE).add(1, 'days').diff(moment(dateS), "days")) - 7) *
                                                parseFloat(0.25).toFixed(2)

                                        day_supplement = (day_supplement + day_supplement * 20 / 100)

                                        var update = `UPDATE users SET credits = credits + ${data2[0].credits} WHERE id = ${data2[0].user_id}`
                                        db.query(update, (error, data, fields) => { })

                                        const content = 'Bonjour ' + data2[0].firstname + ',';
                                        const content2 = 'Récapitulatif de votre commande :';
                                        const content3 = 'Votre pack : <strong>' + data2[0].titleProduct + '</strong>';
                                        const content4 = 'Contenu de votre pack : <br/><strong>' + data2[0].content_paypal + '</strong>';
                                        const content5 = 'Quantité* : <strong>' + data2[0].qte + '</strong>';

                                        var content5_5 = ''
                                        var content5_5_5 = ''
                                        var content6_6 = ''
                                        var content8_8 = ''

                                        if (Number(data2[0].product_id) >= 3) {
                                            content5_5 = 'Durée d\'affichage de votre campagne de bannière : <strong>' + (Number(moment(dateE).add(1, 'days').diff(moment(dateS), "days"))) + ' jours</strong>';
                                            content5_5_5 = 'Surplus journalier pour votre campagne : <strong>' + (Number(moment(dateE).add(1, 'days').diff(moment(dateS), "days")) - 7) *
                                                parseFloat(0.25).toFixed(2) + ' € HT</strong>';
                                            content6_6 = 'Surplus total journalier pour votre campagne : <strong>' + day_supplement + ' € TTC</strong>';
                                        }

                                        const content6 = 'Prix HT : <strong>' + data2[0].total_ht + ' €</strong>';
                                        const content7 = 'Prix TTC : <strong>' + data2[0].total_ttc + ' €</strong>';
                                        const content8 = 'Total de votre commande : <strong>' + data2[0].total_ttc + ' €</strong>';

                                        if (Number(data2[0].product_id) >= 3) {
                                            content8_8 = 'Votre campagne publicitaire sera active à la date que vous avez choisie, vous n\'avez donc rien à faire.';
                                        }

                                        const content9 = 'Nous vous remercions de votre confiance.';

                                        const content10 = '<img style="width: 90px;" width="90" src="https://my-bakery.fr/logo-light.png"/>';

                                        const content11 = '<a style="text-decoration: none;color: #000;" href="https://my-bakery.fr">My-bakery</a>';

                                        const titles = 'Vore commande n°' + data2[0].mobilie_id.replace('tr_', '') + '';

                                        var mailOptions = {}

                                        if (Number(data2[0].product_id) >= 3) {

                                            // On configure notre mail à envoyer par nodemailer
                                            mailOptions = {
                                                from: 'My bakery <' + process.env.USER_MAILER + '>',
                                                to: data2[0].firstname + ' ' + data2[0].lastname + ' <' + data2[0].email + '>',
                                                subject: 'Vore commande n°' + data2[0].mobilie_id.replace('tr_', '') + ' sur My Bakery',
                                                html: header.setOther() + body.setOrderSucces(Number(data2[0].product_id), titles, content, content2, content3, content4, content5, content5_5, content5_5_5, content6, content7, content8, content8_8, content9, content10, content11) + footer.setOther()
                                            }

                                        } else {

                                            // On configure notre mail à envoyer par nodemailer
                                            mailOptions = {
                                                from: 'My bakery <' + process.env.USER_MAILER + '>',
                                                to: data2[0].firstname + ' ' + data2[0].lastname + ' <' + data2[0].email + '>',
                                                subject: 'Vore commande n°' + data2[0].mobilie_id + ' sur My Bakery',
                                                html: header.setOther() + body.setOrderSucces(Number(data2[0].product_id), titles, content, content2, content3, content4, content5, '', '', content6, content7, content8, '', content9, content10, content11) + footer.setOther()
                                            }

                                        }

                                        if (application_id !== '') {

                                            let dataWonder = qs.stringify({
                                                'accessToken': process.env.WONDERPUSH_KEY,
                                                'targetInstallationIds': `${application_id}`,
                                                'notification': '{"alert":{"title": "My Bakery 🤗🥖", "text":"Bonjour ' + data2[0].firstname + ', votre commande a bien été valider. Nous vous remercions pour votre confiance."}}'
                                            });

                                            let config = {
                                                method: 'post',
                                                maxBodyLength: Infinity,
                                                url: 'https://management-api.wonderpush.com/v1/deliveries',
                                                headers: {
                                                    'Content-Type': 'application/x-www-form-urlencoded'
                                                },
                                                data: dataWonder
                                            };

                                            axios.request(config)
                                                .then((response) => {

                                                    if (response.status === 202) {

                                                        transporter.sendMail(mailOptions, (err, info) => {

                                                            if (err) {

                                                                let error = true
                                                                res.json({
                                                                    error
                                                                })

                                                            } else {

                                                                var update = `UPDATE orders SET 
                                                                    email_payer = "${email_payer}",
                                                                    first_name_payer = "${firstname_payer}",
                                                                    last_name_payer = "${lastname_payer}",
                                                                    recipient_name_payer = "${recipient_name_payer}",
                                                                    line_payer = "${line_payer_c}",
                                                                    city_payer = "${city_payer}",
                                                                    state_payer = "${state_payer}",
                                                                    postal_code_payer = "${postal_code_payer}",
                                                                    country_code_payer = "${country_code_payer}",
                                                                    payer_id = "${payer_id}", 
                                                                    status = 2, 
                                                                    validate_at = "${moment().format('YYYY-MM-DD HH:mm:ss')}"
                                                                    WHERE token_paiement = "${orderId}"`

                                                                db.query(update, (error, data, fields) => { })

                                                            }

                                                        })


                                                    } else {

                                                        transporter.sendMail(mailOptions, (err, info) => {

                                                            if (err) {

                                                                let error = true
                                                                res.json({
                                                                    error
                                                                })

                                                            } else {

                                                                var update = `UPDATE orders SET 
                                                                        email_payer = "${email_payer}",
                                                                        first_name_payer = "${firstname_payer}",
                                                                        last_name_payer = "${lastname_payer}",
                                                                        recipient_name_payer = "${recipient_name_payer}",
                                                                        line_payer = "${line_payer_c}",
                                                                        city_payer = "${city_payer}",
                                                                        state_payer = "${state_payer}",
                                                                        postal_code_payer = "${postal_code_payer}",
                                                                        country_code_payer = "${country_code_payer}",
                                                                        payer_id = "${payer_id}", 
                                                                        status = 2, 
                                                                        validate_at = "${moment().format('YYYY-MM-DD HH:mm:ss')}"
                                                                        WHERE token_paiement = "${orderId}"`

                                                                db.query(update, (error, data, fields) => { })

                                                            }

                                                        })


                                                        let error = true
                                                        res.json({
                                                            error
                                                        })

                                                    }

                                                }).catch(error => {

                                                    let errors = true
                                                    res.json({
                                                        errors
                                                    })

                                                })

                                        } else {

                                            transporter.sendMail(mailOptions, (err, info) => {

                                                if (err) {

                                                    let error = true
                                                    res.json({
                                                        error
                                                    })

                                                } else {

                                                    var update = `UPDATE orders SET 
                                            email_payer = "${email_payer}",
                                            first_name_payer = "${firstname_payer}",
                                            last_name_payer = "${lastname_payer}",
                                            recipient_name_payer = "${recipient_name_payer}",
                                            line_payer = "${line_payer_c}",
                                            city_payer = "${city_payer}",
                                            state_payer = "${state_payer}",
                                            postal_code_payer = "${postal_code_payer}",
                                            country_code_payer = "${country_code_payer}",
                                            payer_id = "${payer_id}", 
                                            status = 2, 
                                            validate_at = "${moment().format('YYYY-MM-DD HH:mm:ss')}"
                                            WHERE token_paiement = "${orderId}"`

                                                    db.query(update, (error, data, fields) => { })

                                                }

                                            })

                                        }

                                    }

                                }

                            })

                        }

                        res.redirect('https://my-bakery.fr/cart/paiement/succes')


                    } else {

                        res.redirect('https://my-bakery.fr/cart/paiement/cancel')

                    }

                })

            }

        })

    },
    cancel: async (req, res) => {

        const mollieClient = createMollieClient({ apiKey: process.env.MOBILIE_KEY }),
            { orderId } = req.params

        let orderPay = `SELECT O.* FROM orders AS O WHERE O.token_paiement = "${orderId}" ORDER BY O.id DESC LIMIT 1`;

        db.query(orderPay, (error, dataPay, fields) => {

            if (dataPay.length >= 1) {

                const canceledPayment = mollieClient.payments.cancel(dataPay[0].mobilie_id);

                canceledPayment.then(paymentResult => {

                    if (paymentResult.status !== 'paid') {

                        let order_status = `SELECT * FROM orders_status WHERE id = 3 ORDER BY id ASC`;

                        db.query(order_status, (error, data, fields) => {

                            if (data.length >= 1) {

                                let order = `SELECT O.*, U.*, P.title AS titleProduct, P.content_paypal FROM orders AS O
                                    LEFT JOIN users AS U ON U.id = O.user_id
                                    LEFT JOIN products AS P ON P.id = O.product_id
                                    WHERE O.token_paiement = "${orderId}" GROUP BY O.id ORDER BY O.id ASC`;

                                db.query(order, (error, data2, fields) => {

                                    if (data2.length >= 1) {

                                        var update = `UPDATE orders SET status = 3 WHERE token_paiement = "${orderId}"`
                                        db.query(update, (error, data, fields) => { console.log(error); })

                                        const content = 'Bonjour ' + data2[0].firstname + ',';
                                        const content2 = 'Votre commande a bien été annulée !';
                                        const content3 = 'Vous ne serez donc pas débitée.';

                                        const content4 = 'Nous vous remercions de votre confiance.';

                                        const content5 = '<img style="width: 90px;" width="90" src="https://my-bakery.fr/logo-light.png"/>';
                                        const content6 = '<a href="https://my-bakery\.fr">My-bakery</a>';

                                        const titles = 'Annulation de votre commande n°' + data2[0].mobilie_id.replace('tr_', '') + ''

                                        // On configure notre mail à envoyer par nodemailer
                                        const mailOptions = {
                                            from: 'My bakery <' + process.env.USER_MAILER + '>',
                                            to: data2[0].firstname + ' ' + data2[0].lastname + ' <' + data2[0].email + '>',
                                            subject: 'Annulation de votre commande n°' + data2[0].mobilie_id.replace('tr_-', '') + ' sur My Bakery',
                                            html: header.setOther() + body.setOrderCancel(titles, content, content2, content3, content4, content5, content6) + footer.setOther()
                                        }

                                        transporter.sendMail(mailOptions, (err, info) => {

                                            if (err) {

                                                let error = true
                                                res.json({
                                                    error
                                                })

                                            } else {

                                                res.redirect('https://my-bakery.fr/cart/paiement/cancel')

                                            }

                                        })

                                        let succes = true
                                        res.json({
                                            succes,
                                        })

                                    } else {

                                        let error = true
                                        res.send({
                                            error
                                        })

                                    }

                                })

                            }

                        })

                    }

                })

            }

        })

    },
    refund: async (req, res) => {

        const { tokenPaiement } = req.body,
            mollieClient = createMollieClient({ apiKey: process.env.MOBILIE_KEY })

        let orderPay = `SELECT O.* FROM orders AS O
            WHERE O.paypal_id = "${tokenPaiement}" ORDER BY O.id ASC`;

        db.query(orderPay, (error, dataPay, fields) => {

            if (dataPay.length >= 1) {

                mollieClient.paymentRefunds.create({
                    paymentId: tokenPaiement,
                    amount: {
                        currency: 'EUR',
                        value: dataPay[0].total_ttc
                    },
                    metadata: {
                        order_id: tokenPaiement,
                    }
                }).then(refundRes => {

                    var status_refund = refundRes.status

                    if (status_refund === 'pending') {

                        let order = `SELECT O.*, U.*, P.title AS titleProduct, P.content_paypal FROM orders AS O
                             LEFT JOIN users AS U ON U.id = O.user_id
                             LEFT JOIN products AS P ON P.id = O.product_id
                            WHERE O.paypal_id = "${tokenPaiement}" GROUP BY O.id ORDER BY O.id ASC`;

                        db.query(order, (error, data2, fields) => {

                            if (data2.length >= 1) {

                                var application_id = data2[0].application_id

                                const content = 'Bonjour ' + data2[0].firstname + ',';
                                const content2 = 'Votre commande a bien été annulée !';
                                const content3 = 'Un remboursement sera émis d\'ici quelques jours sur votre compte bancaire, pensez à le vérifier.';

                                const content4 = 'Nous vous remercions de votre confiance.';

                                const content5 = '<img style="width: 90px;" width="90" src="https://my-bakery.fr/logo-light.png">';
                                const content6 = '<a href="https://my-bakery\.fr">My-bakery</a>';

                                const titles = 'Rembourement de votre commande n°' + data2[0].mobilie_id.replace('tr_', '') + '';

                                // On configure notre mail à envoyer par nodemailer
                                const mailOptions = {
                                    from: 'My bakery <' + process.env.USER_MAILER + '>',
                                    to: data2[0].firstname + ' ' + data2[0].lastname + ' <' + data2[0].email + '>',
                                    subject: 'Rembourement de votre commande n°' + data2[0].mobilie_id.replace('tr_', '') + ' sur My Bakery',
                                    html: header.setOther() + body.setOrderRefund(titles, content, content2, content3, content4, content5, content6) + footer.setOther()
                                }

                                if (application_id !== '') {

                                    let dataWonder = qs.stringify({
                                        'accessToken': process.env.WONDERPUSH_KEY,
                                        'targetInstallationIds': `${application_id}`,
                                        'notification': '{"alert":{"title": "My Bakery 🤗🥖", "text":"Bonjour ' + data2[0].firstname + ', votre commande a bien été rembourser. Nous vous remercions pour votre confiance."}}'
                                    });

                                    let config = {
                                        method: 'post',
                                        maxBodyLength: Infinity,
                                        url: 'https://management-api.wonderpush.com/v1/deliveries',
                                        headers: {
                                            'Content-Type': 'application/x-www-form-urlencoded'
                                        },
                                        data: dataWonder
                                    };

                                    axios.request(config)
                                        .then((response) => {

                                            if (response.status === 202) {

                                                transporter.sendMail(mailOptions, (err, info) => {

                                                    if (err) {

                                                        let error = true
                                                        res.json({
                                                            error
                                                        })

                                                    } else {

                                                        var update = `UPDATE orders SET status = 4, refund_at = "${moment().format('YYYY-MM-DD HH:mm:ss')}" WHERE paypal_id = "${tokenPaiement}"`
                                                        db.query(update, (error, data, fields) => { console.log(error); })

                                                    }

                                                })

                                            }

                                        })


                                    res.json({
                                        succes: true,
                                    })

                                } else {

                                    transporter.sendMail(mailOptions, (err, info) => {

                                        if (err) {

                                            let error = true
                                            res.json({
                                                error
                                            })

                                        } else {

                                            var update = `UPDATE orders SET status = 4, refund_at = "${moment().format('YYYY-MM-DD HH:mm:ss')}" WHERE paypal_id = "${tokenPaiement}"`
                                            db.query(update, (error, data, fields) => { console.log(error); })

                                            res.json({
                                                succes: true,
                                            })

                                        }

                                    })

                                }

                            }

                        })

                    } else {
                        res.json({
                            error: true,
                            message: 'Votre commande a déjà été remboursée !'
                        })
                    }

                });

            }

        })

    }
}