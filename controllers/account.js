const { log } = require('console');

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
  moment = require('moment'),
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

var passwordGen = generator.generate({
  length: 8,
  numbers: true
});

var month = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12
],
  month2 = new Array(
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre"
  )

/*
 * Controller
 *************/
module.exports = {
  // Method Get
  login: async (req, res) => {

    const { username, password, application_id } = req.body

    let verif_email = `SELECT U.*, US.from_date, US.product_id FROM 
    users AS U
    LEFT JOIN user_subscription AS US ON US.user_id = U.id
    WHERE U.active >= 1 AND U.email = "${username}" GROUP BY U.id LIMIT 1`;

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

              var date = moment().format('YYYY-MM-DD HH:mm:ss'),
                from_date = moment(data[0].from_date).format('YYYY-MM-DD HH:mm:ss'),
                subscription = false

              if (date <= from_date && data[0].from_date !== null && data[0].product_id >= 3) {
                subscription = true
              } else {
                subscription = false
              }

              const user = {
                id: data[0].id,
                email: data[0].email,
                status_legale: data[0].status_legale,
                siret: data[0].siret,
                tva: data[0].tva,
                firstname: data[0].firstname,
                fonction: data[0].fonction,
                location: data[0].location,
                phone: data[0].phone,
                mobile: data[0].mobile,
                naissance: data[0].naissance,
                lastname: data[0].lastname,
                active: data[0].active,
                subscription: subscription,
                application_id: application_id
              };

              if (data[0].active === 1) {

                const token = jwt.sign(user, process.env.JWT_KEY);

                var update = `UPDATE users SET application_id = "${application_id}", logged_at = "${moment().format('YYYY-MM-DD HH:mm:ss')}", token = "" WHERE id = "${user.id}"`
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

    const { email, lastname, firstname, location, fonction, phone, mobile, application_id, pays, pays_code, departement, ville, postcode, department_code, status_legale, siret, tva, known, budget } = req.body,
      ip = req.ip.replace('::ffff:', ''),
      token_activate = generateToken.randomBytes(16).toString('hex')

    const mobileNull = (mobile === null) ? "NC" : mobile,
      phoneNull = (phone === null) ? "NC" : phone

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

            let sql = `INSERT INTO users (
                            email, 
                            status_legale,
                            siret,
                            tva,
                            known,
                            budget,
                            password,
                            ip,
                            firstname,
                            lastname,
                            location,
                            pays,
                            pays_code,
                            departement,
                            ville,
                            postcode, 
                            department_code,
                            fonction,
                            mobile,
                            phone,
                            token_activate,
                            application_id,
                            created_at
                            ) VALUES (
                             "${email}", 
                             "${status_legale}",
                             "${siret}",
                             "${tva}",
                             "${known}",
                             "${budget}",
                             "${hash}",
                             "${ip}",
                             "${firstname}",
                             "${lastname}",
                             "${location}",
                             "${pays}",
                             "${pays_code}",
                             "${departement}",
                            "${ville}",
                             "${postcode}",
                             "${department_code}",
                             "${fonction}",
                             "${mobileNull}",
                             "${phoneNull}",
                             "${token_activate}",
                             "${application_id}",
                             "${moment().format('YYYY-MM-DD HH:mm:ss')}"
                             )`;

            db.query(sql, (errors, data) => {

              if (errors) {

                let error = true
                res.json({
                  error,
                })

              }

              let dataWonder = qs.stringify({
                'accessToken': process.env.WONDERPUSH_KEY,
                'targetSegmentIds': '@ALL',
                'notification': '{"alert":{"title": "My Bakery 🤗🥖", "text":"Bonjour ' + firstname + ', bienvenue sur My Bakery."}}'
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

                    const content = 'Bonjour ' + firstname + ',<br/><br>';
                    const content2 = 'Récapitulatif des informations :<br/><br>';
                    const content4 = 'Prénom : ' + firstname + '<br/>';
                    const content5 = 'Nom : ' + lastname + '<br/>';
                    const content6 = 'Email : ' + email + '<br/>';
                    const content13 = 'Mot de passe : ' + passwordGen + '<br/>';
                    const content7 = 'Fonction : ' + fonction + '<br/>';
                    const content14 = 'Location : ' + location + '<br/>';
                    const content15 = 'Mobile : ' + mobileNull + '<br/>';
                    const content8 = 'Fixe : ' + phoneNull + '<br/><br/>';
                    const content9 = 'Pour activer votre compte merci de cliquer sur le lien : <a href="https://my-bakery.fr/activate-account/' + token_activate + '">activer maintenant</a>.<br/><br/>';

                    const content10 = 'Nous vous remercions de votre confiance.<br/><br/>';

                    const content11 = '<img style="width: 90px;" width="90" src="https://my-bakery.fr/logo-light.png"/><br/><br/>';
                    const content12 = '<a href="https://my-bakery.fr"></a>My-bakery</a>';

                    // On configure notre mail à envoyer par nodemailer
                    const mailOptions = {
                      from: 'My bakery <' + process.env.USER_MAILER + '>',
                      to: firstname + ' ' + lastname + ' <' + email + '>',
                      subject: 'Votre inscription sur My Bakery',
                      html: content + content2 + content4 + content5 + content6 + content13 + content7 + content14 + content15 + content8 + content9 + content10 + content11 + content12
                    }

                    transporter.sendMail(mailOptions, (err, info) => {

                      if (err) {

                        let error = true
                        res.json({
                          error
                        })

                      } else {

                        let success = true

                        res.send({
                          success,
                        })

                      }

                    })

                  }

                })

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

        var update = `UPDATE users SET activate_at = "${moment().format('YYYY-MM-DD HH:mm:ss')}", token_activate = "", active = 1 WHERE id = "${data[0].id}"`
        db.query(update, (error, data, fields) => { console.log(error) })

        let success = true
        res.json({
          success,
          activateAccount: true,
          message: 'Votre compte a bien été activer sur My Bakery !'
        })

      } else {

        let error = true
        res.json({
          error,
          activateAccount: false,
          message: 'Un problème est survenu lors de l\'actvation de votre compte sur My Bakery !'
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

    const { email } = req.body,
      token_password = generateToken.randomBytes(16).toString('hex')

    let sql = `SELECT * FROM users WHERE email = "${email}" LIMIT 1`;

    db.query(sql, (errors, user) => {

      if (errors) {
        let error = true
        res.json({
          error
        })
      }

      if (user.length >= 1) {

        const content = 'Bonjour ' + user[0].firstname + ',<br/><br>';
        const content2 = 'Récapitulatif des informations :<br/><br>';
        const content3 = 'Email : ' + email + '<br/><br/>';
        const content4 = 'Cliquer sur le lien pour modifier votre mot de passe ' + '<a href="https:///my-bakery/forgot-password/' + token_password + '">modifier maintenant</a>.' + '<br/><br/>';
        const content5 = 'Si vous n\'êtes pas à l\'origine de cette action merci de nous contacter rapidement.<br/><br/>';

        const content6 = 'Nous vous remercions de votre confiance.<br/><br/>';

        const content7 = '<img style="width: 90px;" width="90" src="https://my-bakery.fr/logo-light.png"/><br/><br/>';
        const content8 = '<a href="https://my-bakery.fr"></a>My-bakery</a>';

        // On configure notre mail à envoyer par nodemailer
        const mailOptions = {
          from: 'My bakery <' + process.env.USER_MAILER + '>',
          to: user[0].firstname + ' ' + user[0].lastname + ' <' + email + '>',
          subject: 'Réinitialisation de votre mot de passe sur My Bakery',
          html: content + content2 + content3 + content4 + content5 + content6 + content7 + content8
        }

        transporter.sendMail(mailOptions, (err, info) => {

          if (err) {

            let error = true
            res.json({
              error
            })

          } else {

            var update = `UPDATE users SET token_password = "${token_password}" WHERE email = "${user[0].email}"`
            db.query(update, (error, data, fields) => { console.log(error) })

            let success = true
            res.json({
              success,
            })

          }

        })

      }

    })

  },
  tokenForgot: async (req, res) => {

    const { token, newPassword } = req.body

    let sql = `SELECT * FROM users WHERE token_password = "${token}" LIMIT 1`;

    db.query(sql, (errors, user) => {

      if (errors) {
        let error = true
        res.json({
          error
        })
      }

      if (user.length >= 1) {

        const content = 'Bonjour ' + user[0].firstname + ',<br/><br>';
        const content2 = 'Récapitulatif des informations :<br/><br>';
        const content3 = 'Email : ' + user[0].email + '<br/>';
        const content4 = 'Mot de passe ' + newPassword + '<br/><br/>';
        const content5 = 'Si vous n\'êtes pas à l\'origine de cette action merci de nous contacter rapidement.<br/><br/>';

        const content6 = 'Nous vous remercions de votre confiance.<br/><br/>';

        const content7 = '<img style="width: 90px;" width="90" src="https://my-bakery.fr/logo-light.png"/><br/><br/>';
        const content8 = '<a href="https://my-bakery.fr"></a>My-bakery</a>';

        // On configure notre mail à envoyer par nodemailer
        const mailOptions = {
          from: 'My bakery <' + process.env.USER_MAILER + '>',
          to: user[0].firstname + ' ' + user[0].lastname + ' <' + user[0].email + '>',
          subject: 'Réinitialisation de votre mot de passe sur My Bakery',
          html: content + content2 + content3 + content4 + content5 + content6 + content7 + content8
        }

        transporter.sendMail(mailOptions, (err, info) => {

          if (err) {

            let error = true
            res.json({
              error
            })

          } else {

            bcrypt
              .hash(newPassword, saltRounds)
              .then(hash => {

                var update = `UPDATE users SET password = "${hash}", token_password = "" WHERE email = "${user[0].email}"`
                db.query(update, (error, data, fields) => { console.log(error) })

                let success = true
                res.json({
                  success,
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

      } else {
        let error = true
        res.json({
          error
        })
      }

    })

  },
  tokenVerifForgot: async (req, res) => {

    const { token } = req.params

    let sql = `SELECT * FROM users WHERE token_password = "${token}" LIMIT 1`;

    db.query(sql, (errors, user) => {

      if (errors) {

        let error = true
        res.json({
          error,
          success: false
        })

      }

      if (user.length >= 1) {

        let success = true
        res.json({
          success
        })

      } else {

        let error = true
        res.json({
          error,
          success: false
        })

      }

    })

  },
  userInfo: async (req, res) => {

    const { email } = req.params

    let sql = `SELECT * FROM users WHERE email = "${email}" LIMIT 1`;

    db.query(sql, (errors, user) => {

      let user_subscription = `SELECT * FROM user_subscription WHERE user_id = ${user[0].id} ORDER BY id DESC LIMIT 1`;

      db.query(user_subscription, (errors, data) => {

        if (data.length >= 1) {

          var date = moment().format('YYYY-MM-DD HH:mm:ss'),
            from_date = moment(data[0].from_date).format('YYYY-MM-DD HH:mm:ss'),
            subscription = false

          if (date <= from_date && data[0].product_id >= 3) {
            subscription = true
          } else {
            subscription = false
          }

          let success = true
          res.json({
            success,
            user: user[0],
            subscription,
            dateSubcription: moment(data[0].from_date).format('DD MMMM YYYY à HH:mm')
          })

        } else {

          let success = true
          res.json({
            success,
            user: user[0],
            subscription: false,
          })

        }

      })

    })

  },
  userActivity: async (req, res) => {

    const { email, id } = req.params

    let sql = `SELECT U.*, B.* FROM bakerys_history_update AS U 
        LEFT JOIN bakerys AS B ON B.id = U.bakery_id
        WHERE U.user_id = ${id} GROUP BY U.id ORDER BY U.created_at DESC`;

    db.query(sql, (errors, activity) => {
      let success = true
      res.json({
        success,
        activity: (activity.length >= 1) ? activity.length : 0,
        activityTable: activity
      })

    })

  },
  userDelete: async (req, res) => {

    const { email, id } = req.params

    let sql = `SELECT * FROM users WHERE email = "${email}" AND id = ${id} LIMIT 1`;

    db.query(sql, (errors, user) => {

      if (errors) {
        let error = true
        res.json({
          errors,
        })
      }

      if (user.length >= 1) {

        var deleteUser = `DELETE FROM users WHERE id = "${user[0].id}" AND email = "${user[0].email}"`
        db.query(deleteUser, (error, data, fields) => { })

        let success = true
        res.json({
          success,
        })

      }

    })

  },
  userActivityDelete: async (req, res) => {

    const { email, id } = req.params

    let sql = `SELECT * FROM users WHERE email = "${email}" AND id = ${id} LIMIT 1`;

    db.query(sql, (errors, user) => {

      if (errors) {
        let error = true
        res.json({
          errors,
        })
      }

      if (user.length >= 1) {

        var deleteHistory = `DELETE FROM bakerys_history_update WHERE user_id = ${user[0].id}`
        db.query(deleteHistory, (error, data, fields) => { })

        let success = true
        res.json({
          success,
        })

      }

    })

  },
  userOrders: async (req, res) => {

    const { email, id, years } = req.params

    var totalHT = 0,
      totalTTC = 0

    let sql = `SELECT O.*, P.title, P.image, OS.title AS titleStatus FROM users AS U 
        LEFT JOIN orders AS O ON O.user_id = U.id
        LEFT JOIN orders_status AS OS ON OS.id = O.status
        LEFT JOIN products AS P ON O.product_id = P.id
        WHERE O.user_id = ${id} GROUP BY O.id ORDER BY O.created_at DESC`;

    db.query(sql, (errors, orders) => {

      let sql = `SELECT IFNULL(SUM(O.total_ht), 0.0) AS totalHT, IFNULL(SUM(O.total_ttc), 0.0) AS totalTTC FROM orders AS O WHERE (O.created BETWEEN '${moment().format(years + '-01-01')}' AND '${moment().format(years + '-12-30')}') AND O.status = 2 LIMIT 1`;
      db.query(sql, (errors, data) => {

        totalHT = data[0].totalHT
        totalTTC = data[0].totalTTC

        let success = true
        res.json({
          success,
          orders: (orders.length >= 1) ? orders.length : 0,
          ordersTable: orders,
          totalHT,
          totalTTC
        })

      })

    })

  },

  orderShow: async (req, res) => {

    const { paiementId } = req.params

    let sql = `SELECT O.*, P.title, OS.title AS titleStatus, P.content, P.image FROM users AS U 
        LEFT JOIN orders AS O ON O.user_id = U.id
        LEFT JOIN orders_status AS OS ON OS.id = O.status
        LEFT JOIN products AS P ON O.product_id = P.id
        WHERE O.paypal_id = "${paiementId}" GROUP BY O.id ORDER BY O.created_at DESC LIMIT 1`;

    db.query(sql, (errors, data) => {
      let succes = true
      res.json({
        succes,
        order: data[0]
      })

    })

  },

  userBudget: async (req, res) => {

    const { year } = req.params

    moment.locale('fr')

    var total = [],
      total2 = []

    month.forEach(element => {

      if (element <= 9) element = 0 + '' + element
      element = String(element)

      let sql = `SELECT IFNULL(SUM(O.total_ttc), 0.0) AS totalTTC, IFNULL(SUM(O.total_ht), 0.0) AS totalHT FROM orders AS O WHERE (O.created BETWEEN '${moment().format(year + '-' + element + '-01')}' AND '${moment().format(year + '-' + element + '-30')}') AND O.status = 2 LIMIT 1`;

      db.query(sql, (errors, data) => {

        data.forEach(el => {
          total.push({ totalTTC: parseInt(el.totalTTC) })
        });

        let sql = `SELECT IFNULL(SUM(O.total_ttc), 0.0) AS totalTTC FROM orders AS O WHERE (O.created BETWEEN '${moment().format(year + '-' + element + '-01')}' AND '${moment().format(year + '-' + element + '-30')}') AND O.status = 4 LIMIT 1`;

        db.query(sql, (errors, data2) => {

          data2.forEach(el => {
            total2.push({ total: parseInt(el.totalTTC) })
          });

          if (element === "12") {

            let succes = true
            res.json({
              succes,
              months: month2,
              budget: total,
              refund: total2
            })
          }

        })

      })

    })

  },

  userEstablishement: async (req, res) => {

    const { year, bakeryId } = req.params

    moment.locale('fr')

    var total = [],
      total2 = []

    month.forEach(element => {

      if (element <= 9) element = 0 + '' + element
      element = String(element)

      let sql = `SELECT IFNULL(COUNT(O.id), 0) AS totalId FROM bakerys_views AS O WHERE (O.created_at BETWEEN '${moment().format(year + '-' + element + '-01')}' AND '${moment().format(year + '-' + element + '-30')}') AND O.bakery_id = ${bakeryId} LIMIT 1`;

      db.query(sql, (errors, data) => {

        data.forEach(el => {
          total.push({ totalId: parseInt(el.totalId) })
        });

        let sql = `SELECT IFNULL(COUNT(O.id), 0) AS totalId FROM bakerys_click AS O WHERE (O.created_at BETWEEN '${moment().format(year + '-' + element + '-01')}' AND '${moment().format(year + '-' + element + '-30')}') AND O.bakery_id = ${bakeryId} LIMIT 1`;

        db.query(sql, (errors, data2) => {

          data2.forEach(el => {
            total2.push({ totalId: parseInt(el.totalId) })
          });

          if (element === "12") {

            let succes = true
            res.json({
              succes,
              months: month2,
              views: total,
              click: total2,
            })
          }

        })

      })

    })

  },

  userBakery: async (req, res) => {

    const { email, id } = req.params

    let sql = `SELECT id FROM users WHERE email = "${email}" AND id = ${id} LIMIT 1`;

    db.query(sql, (errors, user) => {

      if (errors) {
        let error = true
        res.json({
          error,
        })
      }

      if (user.length >= 1) {

        let sqlEstablishement = `SELECT U.credits, B.image, IFNULL(COUNT(DISTINCT(BC.id)), 0) AS click, IFNULL(COUNT(DISTINCT(BV.id)), 0) AS viewsN, CONCAT(U.firstname, ' ', U.lastname) AS given_name, BE.*, B.title, B.url, B.small_content 
        FROM bakerys_establishment AS BE
        LEFT JOIN bakerys AS B ON B.id = BE.bakery_id
        LEFT JOIN users AS U ON U.id = BE.user_id
        LEFT JOIN bakerys_click AS BC ON BC.bakery_id = BE.bakery_id
        LEFT JOIN bakerys_views AS BV ON BV.bakery_id = BE.bakery_id
        WHERE BE.user_id = ${user[0].id} GROUP BY BE.id ORDER BY BE.created_at DESC`;

        db.query(sqlEstablishement, (errors2, verif) => {

          if (errors2) {
            let error = false
            res.json({
              error,
            })
          }

          let succes = true
          res.json({
            succes,
            bakerys: verif
          })

        })

      }

    })

  },

  userEstablishementDelete: async (req, res) => {

    const { email, user_id, bakeryId } = req.body

    let sql = `SELECT * FROM users WHERE email = "${email}" AND id = ${user_id} LIMIT 1`;

    db.query(sql, (errors, user) => {

      if (errors) {
        let error = true
        res.json({
          errors,
        })
      }

      if (user.length >= 1) {

        var deleteEstablishement = `DELETE FROM bakerys_establishment WHERE user_id = ${user_id} AND bakery_id = ${bakeryId}`
        db.query(deleteEstablishement, (error, data, fields) => {
          console.log(error);
        })

        let success = true
        res.json({
          success,
        })

      }

    })

  },

  userBanners: async (req, res) => {

    const { email, id } = req.params

    let sql = `SELECT U.*, BE.*, IFNULL(COUNT(DISTINCT(BC.id)), 0) AS clicksBanner, IFNULL(COUNT(DISTINCT(BV.id)), 0) AS viewsBanner FROM bakerys_events AS BE 
        LEFT JOIN users AS U ON U.id = BE.user_id
        LEFT JOIN banner_clicks AS BC ON BC.banner_id = BE.id
        LEFT JOIN banner_views AS BV ON BV.banner_id = BE.id
        WHERE BE.user_id = ${id} AND U.email = "${email}" GROUP BY BE.id ORDER BY U.created_at DESC`;

    db.query(sql, (errors, banners) => {

      let success = true
      res.json({
        success,
        bannerTable: banners
      })

    })

  },

  userBanner: async (req, res) => {

    const { year, bannerId } = req.params

    moment.locale('fr')

    var total = [],
      total2 = []

    month.forEach(element => {

      if (element <= 9) element = 0 + '' + element
      element = String(element)

      let sql = `SELECT IFNULL(COUNT(O.id), 0) AS totalId FROM banner_views AS O WHERE (O.created_at BETWEEN '${moment().format(year + '-' + element + '-01')}' AND '${moment().format(year + '-' + element + '-30')}') AND O.banner_id = ${bannerId} LIMIT 1`;

      db.query(sql, (errors, data) => {

        data.forEach(el => {
          total.push({ totalId: parseInt(el.totalId) })
        });

        let sql = `SELECT IFNULL(COUNT(O.id), 0) AS totalId FROM banner_clicks AS O WHERE (O.created_at BETWEEN '${moment().format(year + '-' + element + '-01')}' AND '${moment().format(year + '-' + element + '-30')}') AND O.banner_id = ${bannerId} LIMIT 1`;

        db.query(sql, (errors, data2) => {

          data2.forEach(el => {
            total2.push({ totalId: parseInt(el.totalId) })
          });

          if (element === "12") {

            let succes = true
            res.json({
              succes,
              months: month2,
              views: total,
              click: total2,
            })
          }

        })

      })

    })

  },

  userUpdatePicture: async (req, res) => {

    const image = (req.files[0] !== undefined) ? 'https://serveur.my-bakery.fr/users/images/' + req.files[0].filename : '',
      { userEmail } = req.body

    var update = `UPDATE users SET updated_at = "${moment().format('YYYY-MM-DD HH:mm:ss')}", image = "${image}" WHERE email = "${userEmail}"`
    db.query(update, (errors, data, fields) => {

      if (errors) {
        let error = true
        res.json({
          error,
        })
      }

      let succes = true
      res.send({
        succes
      })

    })

  },

  userUpdate: async (req, res) => {

    const {
      id,
      email,
      status_legale,
      siret,
      tva,
      firstname,
      lastname,
      naissance,
      fonction,
      location,
      phone,
      mobile,
      pays,
      pays_code,
      departement,
      ville,
      postcode,
      department_code,
    } = req.body

    var update = `UPDATE users SET 
      status_legale = "${status_legale}",
      siret = "${siret}",
      tva = "${tva}",
      firstname = "${firstname}",
      lastname = "${lastname}",
      naissance = "${naissance}",
      fonction = "${fonction}",
      location = "${location}",
      phone = "${phone}",
      mobile = "${mobile}",
      pays = "${pays}",
      pays_code = "${pays_code}",
      departement = "${departement}",
      ville = "${ville}",
      postcode = "${postcode}",
      department_code = "${department_code}"
    WHERE email = "${email}" AND id = ${id}`
    db.query(update, (errors, data, fields) => {

      if (errors) {
        let error = true
        res.json({
          error,
          messsage: 'Une erreur s\'est produite lors de la modification de votre profil!'
        })
      }

      let succes = true
      res.send({
        succes
      })

    })

  },

}