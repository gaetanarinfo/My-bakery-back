/*
 * Import Module
 ****************/
const paypal = require('paypal-rest-sdk'),
  generateToken = require('crypto'),
  nodemailer = require('nodemailer'),
  axios = require('axios'),
  fetch = require('node-fetch')

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

function formatDateNoTime (date) {
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

  return [formatDate];
}

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

    const { user_id, product_id, status, qte, total_ht, total_ttc } = req.body,
      token_paiement = generateToken.randomBytes(8).toString('hex')

    let sql = `INSERT INTO orders (
      user_id,
      product_id,
      token_paiement,
      qte,
      total_ht,
      total_ttc,
      status,
      created_at,
      created
      ) VALUES (
       "${user_id}", 
       "${product_id}",
       "${token_paiement}",
       "${qte}",
       "${total_ht}",
       "${total_ttc}",
       "${status}",
       "${formatDate(Date())}",
       "${formatDateNoTime(Date())}"
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

  },
  create: async (req, res) => {

    const { orderId } = req.params

    let products = `SELECT O.*, P.title, P.content_paypal, P.price FROM orders AS O 
    LEFT JOIN products AS P ON P.id = O.product_id
    WHERE O.token_paiement = "${orderId}" GROUP BY O.id ORDER BY O.id ASC LIMIT 1`;

    db.query(products, (error, data, fields) => {

      if (data.length >= 1) {

        var total = (Number(data[0].price) + Number(data[0].price) * 20 / 100).toFixed(2),
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
            "return_url": "http://localhost:8080/#/cart/paiement/succes/" + token_paiement,
            "cancel_url": "http://localhost:8080/#/cart/paiement/cancel/" + token_paiement
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

    const { paymentId, status } = req.body

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
        WHERE O.token_paiement = "${paymentId}" ORDER BY O.id ASC`;

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

            let order_status = `SELECT * FROM orders_status WHERE id = ${status} ORDER BY id ASC`;

            db.query(order_status, (error, data, fields) => {

              if (data.length >= 1) {

                let order = `SELECT O.*, U.*, P.title AS titleProduct, P.content_paypal, P.credits FROM orders AS O
            LEFT JOIN users AS U ON U.id = O.user_id
            LEFT JOIN products AS P ON P.id = O.product_id
            WHERE O.token_paiement = "${paymentId}" GROUP BY O.id ORDER BY O.id ASC`;

                db.query(order, (error, data2, fields) => {

                  if (data2.length >= 1) {

                    if (data2[0].status === 1) {

                      let succes = true
                      res.json({
                        succes,
                        title: data[0].title,
                        status: 1,
                        firstname: data2[0].firstname
                      })

                    } else {
                      let succes = true
                      res.json({
                        succes,
                        title: 'Paiement déjà validé',
                        status: 2,
                        firstname: data2[0].firstname
                      })
                    }

                    if (data2[0].status === 1) {

                      var update = `UPDATE users SET credits = credits + ${data2[0].credits} WHERE id = ${data2[0].user_id}`
                      db.query(update, (error, data, fields) => { console.log(error) })

                      const content = 'Bonjour ' + data2[0].firstname + ',<br/><br>';
                      const content2 = 'Récapitulatif de votre commande :<br/><br>';
                      const content3 = 'Votre pack : <strong>' + data2[0].titleProduct + '</strong><br/>';
                      const content4 = '<strong>' + data2[0].content_paypal + '</strong><br/>';
                      const content5 = 'Quantité* : <strong>' + data2[0].qte + '</strong><br/>';
                      const content6 = 'Prix HT : <strong>' + data2[0].total_ht + ' €</strong><br/>';
                      const content7 = 'Prix TTC : <strong>' + data2[0].total_ttc + ' €</strong><br/>';
                      const content8 = 'Total de votre commande : <strong>' + data2[0].total_ttc + ' €</strong><br/><br/>';

                      const content9 = 'Nous vous remercions de votre confiance.<br/><br/>';

                      const content10 = '<img style="width: 90px;" width="90" src="https://my-bakery.fr/logo-light.png"/><br/><br/>';
                      const content11 = '<a href="https://my-bakery.fr"></a>My-bakery</a>';

                      // On configure notre mail à envoyer par nodemailer
                      const mailOptions = {
                        from: 'My bakery <' + process.env.USER_MAILER + '>',
                        to: data2[0].firstname + ' ' + data2[0].lastname + ' <' + data2[0].email + '>',
                        subject: 'Vore commande n°' + data2[0].paypal_id.replace('PAYID-', '') + ' sur My Bakery',
                        html: content + content2 + content3 + content4 + content5 + content6 + content7 + content8 + content9 + content10 + content11
                      }

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
                          validate_at = "${formatDate(Date())}"
                           WHERE token_paiement = "${paymentId}"`
                          db.query(update, (error, data, fields) => { console.log(error); })

                        }

                      })

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

          })

      }

    })

  },
  cancel: async (req, res) => {

    const { paymentId, status } = req.body

    let order_status = `SELECT * FROM orders_status WHERE id = ${status} ORDER BY id ASC`;

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

                  let succes = true
                  res.json({
                    succes,
                    title: data[0].title,
                    status: 1,
                    firstname: data2[0].firstname
                  })

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

                          var update = `UPDATE orders SET status = 4, refund_at = "${formatDate(Date())}" WHERE paypal_id = "${tokenPaiement}"`
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

  }

}