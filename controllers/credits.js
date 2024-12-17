/*
 * Import Module
 ****************/
const moment = require('moment')

/*
 * Controller
 *************/
module.exports = {
    // Method Get
    allCredits: async (req, res) => {

        const { email, id, idBakery } = req.body

        let verif_user = `SELECT U.* FROM users AS U
        LEFT JOIN bakerys_establishment AS BU ON BU.user_id = U.id
        WHERE U.email = "${email}" AND U.id = ${id} AND BU.bakery_id = ${idBakery} GROUP BY BU.user_id LIMIT 1`;

        db.query(verif_user, (error, data, fields) => {

            if (data.length >= 1) {

                let credits = `SELECT * FROM credits ORDER BY id ASC`;

                db.query(credits, (error, data, fields) => {

                    if (data.length >= 1) {

                        let succes = true

                        res.send({
                            succes,
                            credits: data
                        })

                    } else {

                        let error = true
                        res.json({
                            error
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
    debitCredits: async (req, res) => {

        const { email, id, idProduct } = req.body

        let verif_product = `SELECT * FROM credits WHERE id = ${idProduct} LIMIT 1`;

        db.query(verif_product, (error, data, fields) => {

            if (data.length >= 1) {

                let verif_user = `SELECT credits FROM users WHERE id = ${id} AND email = "${email}" LIMIT 1`;

                db.query(verif_user, (error, data2, fields) => {

                    if (data2.length >= 1 && data2[0].credits >= data[0].credits) {

                        let succes = true
                        res.json({
                            succes,
                            credits: data[0].credits
                        })

                    } else {

                        let succes = false
                        res.json({
                            succes
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
    deitCreditsValidate: async (req, res) => {

        const { email, id, idProduct, idBakery } = req.body

        let verif_product = `SELECT * FROM credits WHERE id = ${idProduct} LIMIT 1`;

        db.query(verif_product, (error, data, fields) => {

            if (data.length >= 1) {

                let verif_user = `SELECT credits FROM users WHERE id = ${id} AND email = "${email}" LIMIT 1`;

                db.query(verif_user, (error, data2, fields) => {

                    if (data2.length >= 1 && data2[0].credits >= data[0].credits) {

                        let succes = true
                        res.json({
                            succes,
                            credits: data[0].credits
                        })

                        var verif_establishement = `SELECT highlighting_at FROM bakerys_establishment WHERE bakery_id = "${idBakery}" AND user_id = ${id} LIMIT 1`;

                        db.query(verif_establishement, (error, data3, fields) => {

                            if (data3.length >= 1) {

                                var update = `UPDATE users SET credits = credits - ${Number(data[0].credits)} WHERE email = "${email}" AND id = ${id}`
                                db.query(update, (error, data, fields) => { console.log(error) })

                                if (data3[0].highlighting_at === null) {
                                    var updateEstablishement = `UPDATE bakerys_establishment SET highlighting = 1, highlighting_at = "${moment().add(data[0].giveDate, 'days').format('YYYY-MM-DD HH:mm:ss')}" WHERE bakery_id = ${idBakery} AND user_id = ${id}`
                                    db.query(updateEstablishement, (error, data, fields) => { console.log(error) })

                                    var updateBakery = `UPDATE bakerys SET highlighting_at = "${moment().add(data[0].giveDate, 'days').format('YYYY-MM-DD HH:mm:ss')}" WHERE id = ${idBakery}`
                                    db.query(updateBakery, (error, data, fields) => { console.log(error) })
                                } else {
                                    var updateEstablishement = `UPDATE bakerys_establishment SET highlighting = 1, highlighting_at = "${moment(data3[0].highlighting_at).add(data[0].giveDate, 'days').format('YYYY-MM-DD HH:mm:ss')}" WHERE bakery_id = ${idBakery} AND user_id = ${id}`
                                    db.query(updateEstablishement, (error, data, fields) => { console.log(error) })

                                    var updateBakery = `UPDATE bakerys SET highlighting_at = "${moment(data3[0].highlighting_at).add(data[0].giveDate, 'days').format('YYYY-MM-DD HH:mm:ss')}" WHERE id = ${idBakery}`
                                    db.query(updateBakery, (error, data, fields) => { console.log(error) })
                                }
                            }

                        })

                    } else {

                        let succes = false
                        res.json({
                            succes
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
}