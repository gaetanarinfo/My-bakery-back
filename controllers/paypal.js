/*
 * Import Module
 ****************/
const paypal = require('paypal-rest-sdk'),
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

const {
  PAYPAL_MODE,
  PAYPAL_CLIENT_ID,
  PAYPAL_CLIENT_SECRET,
} = process.env;

paypal.configure({
  'mode': PAYPAL_MODE, //sandbox or live
  'client_id': PAYPAL_CLIENT_ID,
  'client_secret': PAYPAL_CLIENT_SECRET
});

module.exports = {

  orderInsert: async (req, res) => {

    const { user_id, product_id, status, qte, total_ht, total_ttc, dateStart, dateEnd, additional_information, banner_name, banner_square_name, bakery_id_event } = req.body,
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

        let sql = `INSERT INTO orders (
          user_id,
          product_id,
          token_paiement,
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
           "Paypal",
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
            order_id: token_paiement
          })

        })

      }

    })

  },
  create: async (req, res) => {

    const { orderId } = req.params

    let products = `SELECT O.*, P.title, P.content_paypal, P.price FROM orders AS O 
    LEFT JOIN products AS P ON P.id = O.product_id
    WHERE O.token_paiement = "${orderId}" GROUP BY O.id ORDER BY O.id ASC LIMIT 1`;

    db.query(products, (error, data, fields) => {

      if (data.length >= 1) {

        var total = data[0].total_ttc,
          title = data[0].title,
          content = data[0].content_paypal,
          qte = data[0].qte,
          token_paiement = data[0].token_paiement

        const create_payment_json = {
          "intent": "sale",
          "payer": {
            "payment_method": "paypal"
          },
          "redirect_urls": {
            "return_url": "https://serveur.my-bakery.fr/order-validate/" + token_paiement,
            "cancel_url": "https://serveur.my-bakery.fr/order-cancel/" + token_paiement
          },
          "transactions": [{
            "item_list": {
              "items": [{
                "name": `My Bakery pack ${title}`,
                "price": `${total}`,
                "currency": "EUR",
                "quantity": `${qte}`
              }]
            },
            "amount": {
              "currency": "EUR",
              "total": `${total}`
            },
            "description": `${content}`,
          }
          ]
        }

        paypal.payment.create(create_payment_json, function (error, payment) {

          for (let i = 0; i < payment.links.length; i++) {

            var paypal_id = payment.id,
              token_paypal = payment.links[1].href

            const urlParams = new URLSearchParams(token_paypal),
              token = urlParams.get('token')

            var update = `UPDATE orders SET token_paypal = "${token}", paypal_id = "${paypal_id}" WHERE token_paiement = "${orderId}"`
            db.query(update, (error, data, fields) => { console.log(error); })

            if (payment.links[i].rel === 'approval_url') {
              res.redirect(payment.links[i].href);
            }
          }

        })

      }

    })

  },
  succes: async (req, res) => {

    const { orderId } = req.params

    console.log(orderId)

    const token = await axios.post(
      process.env.PAYPAL_ADRESSE_TOKEN,
      new URLSearchParams({
        'grant_type': 'client_credentials'
      }),
      {
        auth: {
          username: PAYPAL_CLIENT_ID,
          password: PAYPAL_CLIENT_SECRET
        }
      }
    );

    const token_validate = token.data.access_token

    let orderPay = `SELECT O.* FROM orders AS O
        WHERE O.token_paiement = "${orderId}" ORDER BY O.id ASC`;

    db.query(orderPay, (error, dataPay, fields) => {

      if (dataPay.length >= 1) {

        axios.get(
          process.env.PAYPAL_ADRESSE_TOKEN4 + dataPay[0].paypal_id,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token_validate
            }
          }).then(result => {

            var payer_id = result.data['payer']['payer_info'].payer_id,
              email_payer = result.data['payer']['payer_info'].email,
              firstname_payer = result.data['payer']['payer_info'].first_name,
              lastname_payer = result.data['payer']['payer_info'].last_name,
              recipient_name_payer = result.data['payer']['payer_info']['shipping_address'].recipient_name,
              line_payer = result.data['payer']['payer_info']['shipping_address'].line1,
              city_payer = result.data['payer']['payer_info']['shipping_address'].city,
              state_payer = result.data['payer']['payer_info']['shipping_address'].state,
              postal_code_payer = result.data['payer']['payer_info']['shipping_address'].postal_code,
              country_code_payer = result.data['payer']['payer_info']['shipping_address'].country_code

            var line_payer_c = String(line_payer).replace(/["']/g, "")

            const execute_payment_json = {
              "payer_id": payer_id,
              "transactions": [{
                "amount": {
                  "currency": "EUR",
                  "total": `${dataPay[0].total_ttc}`
                }
              }]
            };

            paypal.payment.execute(dataPay[0].paypal_id, execute_payment_json, function (error, payment) {
            });

            let order_status = `SELECT * FROM orders_status WHERE id = 1 ORDER BY id ASC`;

            db.query(order_status, (error, data, fields) => {

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

                        db.query(sqlinsertSubscription, (errors, data) => {
                        })

                        var randomColor = Math.floor(Math.random() * 16777215).toString(16),
                          campaign_id = generateToken.randomBytes(5).toString('hex'),
                          banner_name = data2[0].banner_name,
                          banner_square_name = data2[0].banner_square_name,
                          dateStart = moment(data2[0].dateStart).format('DD MMMM YYYY'),
                          dateEnd = moment(data2[0].dateEnd).format('DD MMMM YYYY'),
                          title = '<strong>Campagne publicitaire n°' + campaign_id + '</strong><br/>' + '<strong>De ' + data2[0].firstname + ' ' + data2[0].lastname + '</strong><br/>' + '<strong>Du ' + dateStart + ' au ' + dateEnd + '</strong>'

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

                        db.query(sqlinsertEvents, (errors, data) => {
                          console.log(errors);
                        })

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
                              message: err.code + ' ' + err.message,
                              color
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
                      db.query(update, (error, data, fields) => { console.log(error) })

                      const content = 'Bonjour ' + data2[0].firstname + ',<br/><br>';
                      const content2 = 'Récapitulatif de votre commande :<br/><br>';
                      const content3 = 'Votre pack : <strong>' + data2[0].titleProduct + '</strong><br/>';
                      const content4 = 'Contenu de votre pack : <br/><strong>' + data2[0].content_paypal + '</strong><br/>';
                      const content5 = 'Quantité* : <strong>' + data2[0].qte + '</strong><br/>';

                      var content5_5 = ''
                      var content5_5_5 = ''
                      var content6_6 = ''
                      var content8_8 = ''

                      if (Number(data2[0].product_id) >= 3) {
                        content5_5 = 'Durée d\'affichage votre campagne de bannière : <strong>' + (Number(moment(dateE).add(1, 'days').diff(moment(dateS), "days"))) + '</strong><br/>';
                        content5_5_5 = 'Surplus  journalier pour votre campagne : <strong>' + (Number(moment(dateE).add(1, 'days').diff(moment(dateS), "days")) - 7) *
                          parseFloat(0.25).toFixed(2) + ' € HT</strong><br/>';
                        content6_6 = 'Surplus total journalier pour votre campagne : <strong>' + day_supplement + ' € TTC</strong><br/>';
                      }

                      const content6 = 'Prix HT : <strong>' + data2[0].total_ht + ' €</strong><br/>';
                      const content7 = 'Prix TTC : <strong>' + data2[0].total_ttc + ' €</strong><br/>';
                      const content8 = 'Total de votre commande : <strong>' + data2[0].total_ttc + ' €</strong><br/><br/>';

                      if (Number(data2[0].product_id) >= 3) {
                        content8_8 = 'Votre campagne publicitaire sera active à la date que vous avez choisie, vous n\'avez donc rien à faire.<br/><br/>';
                      }

                      const content9 = 'Nous vous remercions de votre confiance.<br/><br/>';

                      const content10 = '<img style="width: 90px;" width="90" src="https://my-bakery.fr/logo-light.png"/><br/><br/>';
                      const content11 = '<a href="https://my-bakery.fr"></a>My-bakery</a>';

                      var mailOptions = {}

                      if (Number(data2[0].product_id) >= 3) {

                        // On configure notre mail à envoyer par nodemailer
                        mailOptions = {
                          from: 'My bakery <' + process.env.USER_MAILER + '>',
                          to: data2[0].firstname + ' ' + data2[0].lastname + ' <' + data2[0].email + '>',
                          subject: 'Vore commande n°' + data2[0].paypal_id.replace('PAYID-', '') + ' sur My Bakery',
                          html: content + content2 + content3 + content4 + content5 + content5_5 + content5_5_5 + content6_6 + content6 + content7 + content8 + content8_8 + content9 + content10 + content11
                        }

                      } else {

                        // On configure notre mail à envoyer par nodemailer
                        mailOptions = {
                          from: 'My bakery <' + process.env.USER_MAILER + '>',
                          to: data2[0].firstname + ' ' + data2[0].lastname + ' <' + data2[0].email + '>',
                          subject: 'Vore commande n°' + data2[0].paypal_id.replace('PAYID-', '') + ' sur My Bakery',
                          html: content + content2 + content3 + content4 + content5 + content6 + content7 + content8 + content9 + content10 + content11
                        }

                      }

                      if (application_id !== '') {

                        let dataWonder = qs.stringify({
                          'accessToken': process.env.WONDERPUSH_KEY,
                          'targetInstallationIds': `${application_id}`,
                          'notification': '{"alert":{"title": "My Bakery 🤗🥖", "text":"Bonjour ' + firstname_payer + ', votre commande a bien été valider. Nous vous remercions pour votre confiance."}}'
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

                                  db.query(update, (error, data, fields) => { console.log(error); })

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

                                  db.query(update, (error, data, fields) => { console.log(error); })

                                }

                              })


                              let error = true
                              res.json({
                                error
                              })

                            }

                          }).catch(error => {

                            console.log(error);

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

                            db.query(update, (error, data, fields) => { console.log(error); })

                          }

                        })

                      }

                    }

                  }

                })

              }

              res.redirect('https://my-bakery.fr/cart/paiement/succes')

            })

          })

      }

    })

  },
  cancel: async (req, res) => {

    const { orderId } = req.params

    let order_status = `SELECT * FROM orders_status WHERE id = 3 ORDER BY id ASC`;

    db.query(order_status, (error, data, fields) => {

      if (data.length >= 1) {

        let order = `SELECT O.*, U.*, P.title AS titleProduct, P.content_paypal FROM orders AS O
        LEFT JOIN users AS U ON U.id = O.user_id
        LEFT JOIN products AS P ON P.id = O.product_id
        WHERE O.token_paiement = "${paymentId}" GROUP BY O.id ORDER BY O.id ASC`;

        db.query(order, (error, data2, fields) => {

          if (data2.length >= 1) {

            if (data2[0].status === 1) {

              const content = 'Bonjour ' + data2[0].firstname + ',<br/><br>';
              const content2 = 'Votre commande a bien été annulée !<br/><br>';
              const content3 = 'Vous ne serez donc pas débitée.<br/><br/>';

              const content4 = 'Nous vous remercions de votre confiance.<br/><br/>';

              const content5 = '<img style="width: 90px;" width="90" src="https://my-bakery.fr/logo-light.png"/><br/><br/>';
              const content6 = '<a href="https://my-bakery.fr"></a>My-bakery</a>';

              // On configure notre mail à envoyer par nodemailer
              const mailOptions = {
                from: 'My bakery <' + process.env.USER_MAILER + '>',
                to: data2[0].firstname + ' ' + data2[0].lastname + ' <' + data2[0].email + '>',
                subject: 'Annulation de votre commande n°' + data2[0].paypal_id.replace('PAYID-', '') + ' sur My Bakery',
                html: content + content2 + content3 + content4 + content5 + content6
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

            } else if (data2[0].status === 3) {
              let succes = true
              res.json({
                succes,
                title: 'Paiement déjà refusé',
                status: 3,
                firstname: data2[0].firstname
              })
            }

            if (data2[0].status === 1) {
              var update = `UPDATE orders SET status = 3 WHERE token_paiement = "${paymentId}"`
              db.query(update, (error, data, fields) => { console.log(error); })
            }

          } else {

            let error = true
            res.send({
              error
            })

          }

        })

      }

    })

  },
  refund: async (req, res) => {

    const { tokenPaiement } = req.body

    const token = await axios.post(
      process.env.PAYPAL_ADRESSE_TOKEN,
      new URLSearchParams({
        'grant_type': 'client_credentials'
      }),
      {
        auth: {
          username: PAYPAL_CLIENT_ID,
          password: PAYPAL_CLIENT_SECRET
        }
      }
    );

    const token_validate = token.data.access_token

    let orderPay = `SELECT O.* FROM orders AS O
    WHERE O.paypal_id = "${tokenPaiement}" ORDER BY O.id ASC`;

    db.query(orderPay, (error, dataPay, fields) => {

      if (dataPay.length >= 1) {

        axios.post(
          process.env.PAYPAL_ADRESSE_TOKEN2 + tokenPaiement + '/execute', {
          payer_id: dataPay[0].payer_id
        },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token_validate
            }
          }).then(result => {

            var order_id = result.data['transactions'][0]['related_resources'][0]['sale'].id

            axios.post(process.env.PAYPAL_ADRESSE_TOKEN3 + order_id + '/refund',
              {},
              {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + token_validate
                }
              }).then(result2 => {

                var status_refund = result2.data.state

                if (status_refund === 'completed') {

                  let order = `SELECT O.*, U.*, P.title AS titleProduct, P.content_paypal FROM orders AS O
            LEFT JOIN users AS U ON U.id = O.user_id
            LEFT JOIN products AS P ON P.id = O.product_id
            WHERE O.paypal_id = "${tokenPaiement}" GROUP BY O.id ORDER BY O.id ASC`;

                  db.query(order, (error, data2, fields) => {

                    if (data2.length >= 1) {

                      const content = 'Bonjour ' + data2[0].firstname + ',<br/><br>';
                      const content2 = 'Votre commande a bien été annulée !<br/><br>';
                      const content3 = 'Un remboursement sera émis d\'ici quelques jours sur votre compte bancaire, pensez à le vérifier.<br/><br/>';

                      const content4 = 'Nous vous remercions de votre confiance.<br/><br/>';

                      const content5 = '<img style="width: 90px;" width="90" src="https://my-bakery.fr/logo-light.png"/><br/><br/>';
                      const content6 = '<a href="https://my-bakery.fr"></a>My-bakery</a>';

                      // On configure notre mail à envoyer par nodemailer
                      const mailOptions = {
                        from: 'My bakery <' + process.env.USER_MAILER + '>',
                        to: data2[0].firstname + ' ' + data2[0].lastname + ' <' + data2[0].email + '>',
                        subject: 'Rembourement de votre commande n°' + data2[0].paypal_id.replace('PAYID-', '') + ' sur My Bakery',
                        html: content + content2 + content3 + content4 + content5 + content6
                      }

                      transporter.sendMail(mailOptions, (err, info) => {

                        if (err) {

                          let error = true
                          res.json({
                            error
                          })

                        } else {

                          var update = `UPDATE orders SET status = 4, refund_at = "${moment().format('YYYY-MM-DD HH:mm:ss')}" WHERE paypal_id = "${tokenPaiement}"`
                          db.query(update, (error, data, fields) => { console.log(error); })

                          res.send({
                            succes: true,
                          })

                        }

                      })

                    }

                  })

                } else {
                  res.send({
                    succes: false,
                    message: 'Votre commande a déjà été remboursée !'
                  })
                }

              }).catch(errors => {

                if (errors.response.data.name === 'TRANSACTION_ALREADY_REFUNDED') {
                  res.send({
                    succes: false,
                    message: 'Votre commande a déjà été remboursée !'
                  })
                }

              });

          });

      }

    })

  },

}