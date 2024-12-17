/*
 * Import Module
 ****************/
const moment = require('moment')

moment.locale('fr')

/*
 * Controller
 *************/
module.exports = {

    // Method Get
    firstBanner: async (req, res) => {

        let sql = `SELECT BE.*, B.url AS bakeryUrl, B.title AS bakeryTitle, IFNULL(COUNT(BE.id), 0) AS counterId FROM bakerys_events AS BE 
        LEFT JOIN bakerys AS B ON B.id = BE.bakery_id ORDER BY BE.created_at DESC LIMIT 1`;

        db.query(sql, (errors, data) => {

            if (data.length >= 1) {

                let succes = true
                res.json({
                    succes,
                    banner: data[0]
                })

            } else {

                let succes = true
                res.json({
                    succes,
                    banner: []
                })

            }

        })

    },

    addclick: async (req, res) => {

        const { bannerId, ip, page, type } = req.body

        let sql = `SELECT * FROM banner_clicks WHERE banner_id = ${bannerId} AND ip = "${ip}" AND created_at = "${moment().format('YYYY-MM-DD')}" AND page = "${page}" AND type = "${type}"`;

        db.query(sql, (errors, data, fields) => {

            if (data.length === 0) {

                let sql = `INSERT INTO banner_clicks 
        (
            banner_id,
            type,
            ip,
            page,
            created_at
        ) VALUES (
            "${bannerId}",
            "${type}",
            "${ip}",
            "${page}",
            "${moment().format('YYYY-MM-DD HH:mm:ss')}"
            )`;

                db.query(sql, (error, result) => { console.log(error) })

            }

        })

    },

    addViews: async (req, res) => {

        const { bannerId, ip, page, type } = req.body

        let sql = `SELECT * FROM banner_views WHERE banner_id = ${bannerId} AND ip = "${ip}" AND created_at = "${moment().format('YYYY-MM-DD')}" AND page = "${page}" AND type = "${type}"`;

        db.query(sql, (errors, data, fields) => {

            if (data.length === 0) {

                let sql = `INSERT INTO banner_views 
        (
            banner_id,
            type,
            ip,
            page,
            created_at
        ) VALUES (
            "${bannerId}",
            "${type}",
            "${ip}",
            "${page}",
            "${moment().format('YYYY-MM-DD HH:mm:ss')}"
            )`;

                db.query(sql, (error, result) => { console.log(error) })

            }

        })

    },

}