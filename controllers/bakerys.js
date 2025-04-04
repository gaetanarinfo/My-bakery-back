/*
 * Import Module
 ****************/
const axios = require('axios'),
    moment = require('moment'),
    qs = require('qs'),
    fs = require('fs')

moment.locale('fr')

/*
 * Controller
 *************/
module.exports = {
    // Method Get
    get: async (req, res) => {

        var limite = req.params.limite

        let sql = `SELECT 
        B.*,
        BCS.content AS content_comment, 
        BCS.author AS author_comment, 
        BCS.created_at AS created_at_comment
        FROM bakerys AS B 
        LEFT JOIN bakerys_comments AS BCS ON BCS.bakery_id = B.id 
        WHERE B.active = 1 GROUP BY B.id ORDER BY B.highlighting_at DESC, B.id DESC LIMIT ${limite}`;

        db.query(sql, (error, data, fields) => {

            if (error) console.log(error);
            res.json({
                bakerys: data,
            })
        })
    },
    getAll: async (req, res) => {

        let sql = `SELECT 
        B.*,
        BCS.content AS content_comment, 
        BCS.author AS author_comment, 
        BCS.created_at AS created_at_comment
        FROM bakerys AS B 
        LEFT JOIN bakerys_comments AS BCS ON BCS.bakery_id = B.id WHERE B.active = 1 GROUP BY B.id ORDER BY B.highlighting_at DESC, B.id DESC LIMIT 21`;

        db.query(sql, (error, data, fields) => {

            if (error) console.log(error);

            let sql2 = `SELECT 
            B.* 
            FROM 
            bakerys AS B
            WHERE B.active = 1 
            ORDER BY B.highlighting_at DESC, B.id DESC`;

            db.query(sql2, (error2, data2, fields) => {

                if (error2) console.log(error2);

                let succes = true
                res.json({
                    succes,
                    bakerysAll: data,
                    bakerysAllCount: data2.length,
                })
            })

        })

    },
    getAllPage: async (req, res) => {

        const { page, search, location, postalCode, city, note_google, prix, devanture, choix, proprete } = req.body

        var limitation = 21

        let reqPage = parseInt(page) - 1
        let pages = parseInt(21)
        let final = pages * reqPage

        var requete = ''

        if (prix >= 1) {
            requete += 'AND BP.note <= ROUND((BP.note * ' + (prix) + ' / B.counter_prix), 1)'
        }

        if (devanture >= 1) {
            requete += 'AND BD.note <= ROUND((BD.note * ' + (devanture) + ' / B.counter_devanture), 1)'
        }

        if (choix >= 1) {
            requete += 'AND BC.note <= ROUND((BC.note * ' + (choix) + ' / B.counter_choix), 1)'
        }

        if (proprete >= 1) {
            requete += 'AND BPP.note <= ROUND((BPP.note * ' + (proprete) + ' / B.counter_proprete), 1)'
        }

        if(note_google >= 1) {
            requete += 'AND B.total_rating_google <= "' + note_google + '"'
        }

        if (search) {
            requete += 'AND B.title LIKE "%' + search + '%" '
        }

        if (location) {
            requete += 'AND B.adresse LIKE "%' + location + '%" '
        }

        if (postalCode) {
            requete += 'AND B.postcode LIKE "%' + postalCode + '%" '
        }

        if (city) {
            requete += 'AND B.ville = "' + city + '" '
        }

        let sql = `SELECT B.*,
        BCS.content AS content_comment, 
        BCS.author AS author_comment, 
        BCS.created_at AS created_at_comment,
        B.counter_prix,
        BP.note,
        BD.note,
        BC.note,
        BPP.note
        FROM bakerys AS B 
        LEFT JOIN bakerys_comments AS BCS ON BCS.bakery_id = B.id 
        LEFT JOIN bakerys_prix AS BP ON BP.bakery_id = B.id 
        LEFT JOIN bakerys_devanture AS BD ON BD.bakery_id = B.id 
        LEFT JOIN bakerys_choix AS BC ON BC.bakery_id = B.id 
        LEFT JOIN bakerys_proprete AS BPP ON BPP.bakery_id = B.id 
        WHERE B.active = 1
        ${requete}
        GROUP BY B.id 
        ORDER BY B.highlighting_at DESC, B.id DESC
        LIMIT ${limitation} OFFSET ${final}
        `;

        db.query(sql, (error, data, fields) => {

            if (error) console.log(error);

            let sql2 = `SELECT 
            B.*,
            B.counter_prix,
            BP.note,
            BD.note,
            BC.note,
            BPP.note
            FROM 
            bakerys AS B
            LEFT JOIN bakerys_comments AS BCS ON BCS.bakery_id = B.id 
            LEFT JOIN bakerys_prix AS BP ON BP.bakery_id = B.id 
            LEFT JOIN bakerys_devanture AS BD ON BD.bakery_id = B.id 
            LEFT JOIN bakerys_choix AS BC ON BC.bakery_id = B.id 
            LEFT JOIN bakerys_proprete AS BPP ON BPP.bakery_id = B.id 
            WHERE B.active = 1
            ${requete}
            GROUP BY B.id 
            ORDER BY B.highlighting_at DESC, B.id DESC
            `;

            db.query(sql2, (error2, data2, fields) => {

                if (error2) console.log(error2);

                let succes = true
                res.json({
                    succes,
                    search: data,
                    bakerysAllCount: data2.length,
                })

            })

        })
    },
    getBakery: async (req, res) => {

        var url = req.params.url

        let sql = `SELECT 
        B.*,
        BCS.content AS content_comment, 
        BCS.author AS author_comment, 
        BCS.created_at AS created_at_comment
        FROM bakerys AS B 
        LEFT JOIN bakerys_comments AS BCS ON BCS.bakery_id = B.id WHERE B.url = "${url}" AND B.active = 1 GROUP BY B.id ORDER BY B.highlighting_at DESC, B.id DESC LIMIT 1`;

        db.query(sql, (error, data, fields) => {

            if (error) console.log(error);

            var ids = (data.length >= 1) ? data[0].id : 0

            let sql = `SELECT BC.* FROM bakerys_comments AS BC WHERE BC.bakery_id = "${ids}" ORDER BY BC.created_at DESC`;

            db.query(sql, (error2, data2, fields) => {

                if (error2) console.log(error2);

                let sql = `SELECT BH.* FROM bakerys_hours AS BH WHERE BH.bakery_id = "${ids}" ORDER BY BH.id ASC`;

                db.query(sql, (error3, data3, fields) => {

                    if (error3) console.log(error3);

                    res.json({
                        bakery: data[0],
                        bakeryComments: data2,
                        bakeryHours: data3
                    })

                })

            })


        })

    },
    postComment: async (req, res) => {

        const email = req.body.email,
            ip = req.body.ip,
            url = req.body.url,
            devanture = req.body.devanture,
            prix = req.body.prix,
            choix = req.body.choix,
            proprete = req.body.proprete,
            author = req.body.author,
            comment = req.body.comment

        let verif_bakery = `SELECT url, id FROM bakerys WHERE active = 1 AND url = "${url}"`;

        db.query(verif_bakery, (error, data, fields) => {

            if (data.length >= 1) {

                let sql = `INSERT INTO bakerys_comments (bakery_id,ip,email,author,content) VALUES ("${data[0].id}", "${ip}", "${email}", "${author}", "${comment}")`;

                db.query(sql, (err2, resultComment) => {

                    if (err2) {

                        let error = true
                        res.json({
                            error
                        })
                    };

                    let sql2 = `INSERT INTO bakerys_devanture (bakery_id, comment_id,ip,note) VALUES ("${data[0].id}", "${resultComment.insertId}", "${ip}", "${devanture}")`;

                    db.query(sql2, (err3, result) => {

                        if (err3) {
                            let error = true
                            res.json({
                                error
                            })
                        };

                    })

                    let sql3 = `INSERT INTO bakerys_choix (bakery_id, comment_id,ip,note) VALUES ("${data[0].id}", "${resultComment.insertId}", "${ip}", "${choix}")`;

                    db.query(sql3, (err4, result) => {

                        if (err4) {
                            let error = true
                            res.json({
                                error
                            })
                        };

                    })

                    let sql4 = `INSERT INTO bakerys_prix (bakery_id, comment_id,ip,note) VALUES ("${data[0].id}", "${resultComment.insertId}", "${ip}", "${prix}")`;

                    db.query(sql4, (err5, result) => {

                        if (err5) {
                            let error = true
                            res.json({
                                error
                            })
                        };

                    })

                    let sql5 = `INSERT INTO bakerys_proprete (bakery_id, comment_id,ip,note) VALUES ("${data[0].id}", "${resultComment.insertId}", "${ip}", "${proprete}")`;

                    db.query(sql5, (err6, result) => {

                        if (err6) {
                            let error = true
                            res.json({
                                error
                            })
                        };

                    })

                    let succes = true

                    res.send({
                        succes
                    })

                })

            } else {

                let error = true
                res.json({
                    error,
                    message: 'La boulangerie n\'existe pas !'
                })

            }

        })

    },
    postAddBakery: async (req, res) => {

        const ip = req.body.ip,
            image = (req.files[0] !== undefined) ? req.files[0].filename : 'default.jpg',
            image2 = (req.files[1] !== undefined) ? req.files[1].filename : 'default2.jpg',
            image3 = (req.files[2] !== undefined) ? req.files[2].filename : 'default.jpg',
            image4 = (req.files[3] !== undefined) ? req.files[3].filename : 'default2.jpg',
            addName = req.body.addName,
            url = addName.toLowerCase().replaceAll('â', 'a').replaceAll('é', 'e').replaceAll('à', 'a').replaceAll(' - ', '-').replaceAll('\'', '-').replaceAll(' ', '-').replaceAll('’', '-').replaceAll('%', '-pourcent-').replaceAll('è', 'e').replaceAll('ï', 'i').replaceAll(',', '').replaceAll('/', '').replaceAll('--', '-').replaceAll('ô', 'o').replaceAll('ê', 'e').replaceAll('ë', 'e').replaceAll('ö', 'o'),
            addAdresse = req.body.addAdresse,
            addPhone = req.body.addPhone,
            addHandicap = req.body.addHandicap,
            addLivraison = req.body.addLivraison,
            addRestauration = req.body.addRestauration,
            addSmallContent = req.body.addSmallContent,
            addWebsite = req.body.addWebsite,
            addDesc = req.body.addDesc,
            addNote = req.body.addNote,
            addTotalNote = req.body.addTotalNote,
            pays = req.body.pays,
            pays_code = req.body.pays_code,
            departement = req.body.departement,
            ville = req.body.ville,
            postcode = req.body.postcode,
            department_code = req.body.department_code

        const config = {
            method: 'get',
            url: process.env.PORTFOLIO_API + 'get-coordinate/' + addAdresse,
        };

        axios(config)
            .then(function (response) {

                var lat = response.data.lat,
                    lng = response.data.lng

                let sql = `INSERT INTO bakerys 
                    (
                        title,
                        url,
                        small_content,
                        content,
                        image,
                        image_2,
                        image_3,
                        image_4,
                        phone,
                        adresse,
                        pays,
                        pays_code,
                        departement,
                        ville,
                        postcode,
                        department_code,
                        lat,
                        lng,
                        handicape,
                        website,
                        delivery,
                        dine_in,
                        ip,
                        user_rating_google,
                        total_rating_google
                    ) VALUES (
                        "${addName}",
                        "${url}",
                        "${addSmallContent}",
                        "${addDesc}",
                        "${image}",
                        "${image2}",
                        "${image3}",
                        "${image4}",
                        "${addPhone}",
                        "${addAdresse}",
                        "${pays}",
                        "${pays_code}",
                        "${departement}",
                        "${ville}",
                        "${postcode}",
                        "${department_code}",
                        "${lat}",
                        "${lng}",
                        "${addHandicap}",
                        "${addWebsite}",
                        "${addLivraison}",
                        "${addRestauration}",
                        "${ip}",
                        "${addTotalNote}",
                        "${addNote}"
                        )`;

                db.query(sql, (error, result) => {

                    if (error) {

                        let error = true
                        res.json({
                            error
                        })
                    };

                    let success = true

                    if (success === true) {

                        var id = result.insertId

                        let sql = `INSERT INTO bakerys_hours 
                            (
                                bakery_id,
                                date,
                                am
                            ) VALUES (
                                "${id}",
                                "Lundi",
                                "${req.body.addHours1}"
                                )`;

                        db.query(sql, (error2, result2) => {
                        })

                        let sql2 = `INSERT INTO bakerys_hours 
                            (
                                bakery_id,
                                date,
                                am
                            ) VALUES (
                                "${id}",
                                "Mardi",
                                "${req.body.addHours2}"
                                )`;

                        db.query(sql2, (error2, result2) => {
                        })

                        let sql3 = `INSERT INTO bakerys_hours 
                            (
                                bakery_id,
                                date,
                                am
                            ) VALUES (
                                "${id}",
                                "Mercredi",
                                "${req.body.addHours3}"
                                )`;

                        db.query(sql3, (error2, result2) => {
                        })

                        let sql4 = `INSERT INTO bakerys_hours 
                            (
                                bakery_id,
                                date,
                                am
                            ) VALUES (
                                "${id}",
                                "Jeudi",
                                "${req.body.addHours4}"
                                )`;

                        db.query(sql4, (error2, result2) => {
                        })

                        let sql5 = `INSERT INTO bakerys_hours 
                            (
                                bakery_id,
                                date,
                                am
                            ) VALUES (
                                "${id}",
                                "Vendredi",
                                "${req.body.addHours5}"
                                )`;

                        db.query(sql5, (error2, result2) => {
                        })

                        let sql6 = `INSERT INTO bakerys_hours 
                            (
                                bakery_id,
                                date,
                                am
                            ) VALUES (
                                "${id}",
                                "Samedi",
                                "${req.body.addHours6}"
                                )`;

                        db.query(sql6, (error2, result2) => {
                        })

                        let sql7 = `INSERT INTO bakerys_hours 
                            (
                                bakery_id,
                                date,
                                am
                            ) VALUES (
                                "${id}",
                                "Dimanche",
                                "${req.body.addHours7}"
                                )`;

                        db.query(sql7, (error2, result2) => {
                        })

                        let dataWonder = qs.stringify({
                            'accessToken': process.env.WONDERPUSH_KEY,
                            'targetSegmentIds': '@ALL',
                            'notification': '{"alert":{"title": "My Bakery 🤗🥖", "targetUrl": "https://my-bakery.fr/bakery/' + url + '", "text":"Bonjour, une nouvelle boulangerie a été ajoutée, venez vite la découvrir"}}'
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

                                }

                            }).catch(error => {
                                console.log(error);
                            })

                        res.send({
                            success
                        })

                    }

                })

            }).catch(function (error) {
                console.log(error);
            })

    },
    getAllPagePagination: async (req, res) => {

        const page = req.params.page

        var limitation = 21

        let reqPage = parseInt(page) - 1
        let pages = parseInt(21)
        let final = pages * reqPage

        let sql = `SELECT B.*,
        BCS.content AS content_comment, 
        BCS.author AS author_comment, 
        BCS.created_at AS created_at_comment
        FROM bakerys AS B 
        LEFT JOIN bakerys_comments AS BCS ON BCS.bakery_id = B.id WHERE B.active = 1 GROUP BY B.id ORDER BY B.highlighting_at DESC, B.id DESC LIMIT ${limitation} OFFSET ${final}`;

        db.query(sql, (error, data, fields) => {
            if (error) console.log(error);
            res.json({
                bakerysAll: data,
            })
        })
    },
    updateView: async (req, res) => {

        const { bakeryId, ip } = req.body

        let sql = `SELECT * FROM bakerys_views WHERE bakery_id = ${bakeryId} AND ip = "${ip}" AND created_at = "${moment().format('YYYY-MM-DD')}"`;

        db.query(sql, (errors, data, fields) => {

            if (data.length === 0) {

                let sql = `INSERT INTO bakerys_views 
        (
            bakery_id,
            ip,
            created_at
        ) VALUES (
            "${bakeryId}",
            "${ip}",
            "${moment().format('YYYY-MM-DD HH:mm:ss')}"
            )`;

                db.query(sql, (error, result) => { })

            }

        })

        res.json({
            succes: true
        })

    },
    updateBakery: async (req, res) => {

        const addName = req.body.addName,
            url = addName.toLowerCase().replaceAll('â', 'a').replaceAll('é', 'e').replaceAll('à', 'a').replaceAll(' - ', '-').replaceAll('\'', '-').replaceAll(' ', '-').replaceAll('’', '-').replaceAll('%', '-pourcent-').replaceAll('è', 'e').replaceAll('ï', 'i').replaceAll(',', '').replaceAll('/', '').replaceAll('--', '-').replaceAll('ô', 'o').replaceAll('ê', 'e').replaceAll('ë', 'e').replaceAll('ö', 'o'),
            addAdresse = req.body.addAdresse,
            addPhone = req.body.addPhone,
            addHandicap = req.body.addHandicap,
            addLivraison = req.body.addLivraison,
            addRestauration = req.body.addRestauration,
            addSmallContent = req.body.addSmallContent,
            addWebsite = req.body.addWebsite,
            addDesc = req.body.addDesc,
            addId = req.body.addId,
            addHours1 = req.body.addHours1,
            addHours2 = req.body.addHours2,
            addHours3 = req.body.addHours3,
            addHours4 = req.body.addHours4,
            addHours5 = req.body.addHours5,
            addHours6 = req.body.addHours6,
            addHours7 = req.body.addHours7,
            userId = req.body.userId

        const image = (req.files[0] !== undefined) ? req.files[0].filename : '',
            image2 = (req.files[1] !== undefined) ? req.files[1].filename : '',
            image3 = (req.files[2] !== undefined) ? req.files[2].filename : '',
            image4 = (req.files[3] !== undefined) ? req.files[3].filename : ''

        var update = `UPDATE bakerys SET title = "${addName}",
                    url = "${url}",
                    adresse = "${addAdresse}",
                    phone = "${addPhone}",
                    handicape = "${addHandicap}",
                    delivery = "${addLivraison}",
                    dine_in = "${addRestauration}",
                    small_content = "${addSmallContent}",
                    website = "${addWebsite}",
                    content = "${addDesc}",
                    updated_at = "${moment().format('YYYY-MM-DD HH:mm:ss')}" WHERE id = ${addId}`

        db.query(update, (error, data, fields) => {

            if (error) {
                let error = true
                res.json({
                    error
                })
            };

            let sqlImage = `SELECT * FROM bakerys WHERE id = "${addId}" AND active = 1 LIMIT 1`;

            db.query(sqlImage, (error, data, fields) => {

                if (error) {
                    let error = true
                    res.json({
                        error
                    })
                };

                var update = `UPDATE bakerys SET image = "${(image === '') ? data[0].image : image}",
                    image_2 = "${(image2 === '') ? data[0].image_2 : image2}",
                    image_3 = "${(image3 === '') ? data[0].image_3 : image3}",
                    image_4 = "${(image4 === '') ? data[0].image_4 : image4}" WHERE id = ${addId}`

                db.query(update, (error, data, fields) => { })

                let sql = `INSERT INTO bakerys_history_update 
                (
                    user_id,
                    bakery_id,
                    created_at
                ) VALUES (
                    "${userId}",
                    "${addId}",
                    "${moment().format('YYYY-MM-DD HH:mm:ss')}"
                    )`;

                db.query(sql, (error2, result2) => {
                })

                // Mise à jour des heures 1 à 7

                let sqlHours1 = `SELECT * FROM bakerys_hours WHERE bakery_id = "${addId}" AND date = "Lundi" LIMIT 1`;
                db.query(sqlHours1, (error, data, fields) => {

                    if (data.length >= 1) {

                        var update = `UPDATE bakerys_hours SET am = "${addHours1}" WHERE bakery_id = "${addId}" AND date = "Lundi"`
                        db.query(update, (error, data, fields) => { console.log(error); })

                    } else {

                        let sql = `INSERT INTO bakerys_hours 
                (
                    bakery_id,
                    date,
                    am
                ) VALUES (
                    "${addId}",
                    "Lundi",
                    "${addHours1}"
                    )`;

                        db.query(sql, (error2, result2) => {
                        })

                    }

                })

                //

                let sqlHours2 = `SELECT * FROM bakerys_hours WHERE bakery_id = "${addId}" AND date = "Mardi" LIMIT 1`;
                db.query(sqlHours2, (error, data, fields) => {

                    if (data.length >= 1) {

                        var update = `UPDATE bakerys_hours SET am = "${addHours2}" WHERE bakery_id = "${addId}" AND date = "Mardi"`
                        db.query(update, (error, data, fields) => { console.log(error); })

                    } else {

                        let sql = `INSERT INTO bakerys_hours 
                (
                    bakery_id,
                    date,
                    am
                ) VALUES (
                    "${addId}",
                    "Mardi",
                    "${addHours2}"
                    )`;

                        db.query(sql, (error2, result2) => {
                        })

                    }

                })

                //

                let sqlHours3 = `SELECT * FROM bakerys_hours WHERE bakery_id = "${addId}" AND date = "Mercredi" LIMIT 1`;
                db.query(sqlHours3, (error, data, fields) => {

                    if (data.length >= 1) {

                        var update = `UPDATE bakerys_hours SET am = "${addHours3}" WHERE bakery_id = "${addId}" AND date = "Mercredi"`
                        db.query(update, (error, data, fields) => { console.log(error); })

                    } else {

                        let sql = `INSERT INTO bakerys_hours 
                (
                    bakery_id,
                    date,
                    am
                ) VALUES (
                    "${addId}",
                    "Mercredi",
                    "${addHours3}"
                    )`;

                        db.query(sql, (error2, result2) => {
                        })

                    }

                })

                //

                let sqlHours4 = `SELECT * FROM bakerys_hours WHERE bakery_id = "${addId}" AND date = "Jeudi" LIMIT 1`;
                db.query(sqlHours4, (error, data, fields) => {

                    if (data.length >= 1) {

                        var update = `UPDATE bakerys_hours SET am = "${addHours4}" WHERE bakery_id = "${addId}" AND date = "Jeudi"`
                        db.query(update, (error, data, fields) => { console.log(error); })

                    } else {

                        let sql = `INSERT INTO bakerys_hours 
                (
                    bakery_id,
                    date,
                    am
                ) VALUES (
                    "${addId}",
                    "Jeudi",
                    "${addHours4}"
                    )`;

                        db.query(sql, (error2, result2) => {
                        })

                    }

                })

                //

                let sqlHours5 = `SELECT * FROM bakerys_hours WHERE bakery_id = "${addId}" AND date = "Vendredi" LIMIT 1`;
                db.query(sqlHours5, (error, data, fields) => {

                    if (data.length >= 1) {

                        var update = `UPDATE bakerys_hours SET am = "${addHours5}" WHERE bakery_id = "${addId}" AND date = "Vendredi"`
                        db.query(update, (error, data, fields) => { console.log(error); })

                    } else {

                        let sql = `INSERT INTO bakerys_hours 
                (
                    bakery_id,
                    date,
                    am
                ) VALUES (
                    "${addId}",
                    "Vendredi",
                    "${addHours5}"
                    )`;

                        db.query(sql, (error2, result2) => {
                        })

                    }

                })

                //

                let sqlHours6 = `SELECT * FROM bakerys_hours WHERE bakery_id = "${addId}" AND date = "Samedi" LIMIT 1`;
                db.query(sqlHours6, (error, data, fields) => {

                    if (data.length >= 1) {

                        var update = `UPDATE bakerys_hours SET am = "${addHours6}" WHERE bakery_id = "${addId}" AND date = "Samedi"`
                        db.query(update, (error, data, fields) => { console.log(error); })

                    } else {

                        let sql = `INSERT INTO bakerys_hours 
                (
                    bakery_id,
                    date,
                    am
                ) VALUES (
                    "${addId}",
                    "Samedi",
                    "${addHours6}"
                    )`;

                        db.query(sql, (error2, result2) => {
                        })

                    }

                })

                //

                let sqlHours7 = `SELECT * FROM bakerys_hours WHERE bakery_id = "${addId}" AND date = "Dimanche" LIMIT 1`;
                db.query(sqlHours7, (error, data, fields) => {

                    if (data.length >= 1) {

                        var update = `UPDATE bakerys_hours SET am = "${addHours7}" WHERE bakery_id = "${addId}" AND date = "Dimanche"`
                        db.query(update, (error, data, fields) => { console.log(error); })

                    } else {

                        let sql = `INSERT INTO bakerys_hours 
                (
                    bakery_id,
                    date,
                    am
                ) VALUES (
                    "${addId}",
                    "Dimanche",
                    "${addHours7}"
                    )`;

                        db.query(sql, (error2, result2) => {
                        })

                    }

                })

                // Insert db establishement by user_id
                let establishement = `SELECT * FROM bakerys_establishment WHERE bakery_id = ${addId} AND user_id = ${userId} LIMIT 1`;
                db.query(establishement, (error, data, fields) => {

                    if (data.length >= 1) {

                        var update = `UPDATE bakerys_establishment SET updated_at = "${moment().format('YYYY-MM-DD HH:mm:ss')}", bakery_id = "${addId}" WHERE user_id = "${userId}"`
                        db.query(update, (error, data, fields) => { console.log(error); })

                    } else {

                        let sql = `INSERT INTO bakerys_establishment 
                (
                    bakery_id,
                    user_id,
                    created_at
                ) VALUES (
                    "${addId}",
                    "${userId}",
                    "${moment().format('YYYY-MM-DD HH:mm:ss')}"
                    )`;

                        db.query(sql, (error2, result2) => { console.log(error2); })

                    }

                })


            })

        })

        let success = true

        res.send({
            success
        })

    },
    bakerysMarkers: async (req, res) => {

        const { ville, id } = req.params

        let bakerysV = `SELECT ville FROM bakerys WHERE active = 1 AND id = ${id}`;

        db.query(bakerysV, (error, data, fields) => {

            let bakerys = `SELECT lat, lng, adresse, title, postcode, ville, id, url FROM bakerys WHERE active = 1 AND ville = "${data[0].ville}"`;
            db.query(bakerys, (error2, data2, fields) => {

                if (error2) {

                    let errors = true
                    res.send({
                        errors
                    })

                }

                if (data2.length >= 1) {

                    let success = true

                    res.send({
                        success,
                        nom: data2[0].ville,
                        markers: data2
                    })

                } else {

                    let success = true

                    res.send({
                        success,
                        markers: []
                    })

                }

            })

        })

    },
    addClick: async (req, res) => {

        const { bakeryId, ip } = req.body

        let sql = `SELECT * FROM bakerys_click WHERE bakery_id = ${bakeryId} AND ip = "${ip}" AND created_at = "${moment().format('YYYY-MM-DD')}"`;

        db.query(sql, (errors, data, fields) => {

            if (data.length === 0) {

                let sql = `INSERT INTO bakerys_click 
        (
            bakery_id,
            ip,
            created_at
        ) VALUES (
            "${bakeryId}",
            "${ip}",
            "${moment().format('YYYY-MM-DD HH:mm:ss')}"
            )`;

                db.query(sql, (error, result) => { })

            }

        })

    },

    bakeryEventsBanner: async (req, res) => {

        var array = []

        let sql = `SELECT * FROM bakerys_events WHERE active = 1`;


        db.query(sql, (errors, data, fields) => {

            data.forEach(element => {

                array.push({
                    id: element.id,
                    start: moment(element.start).format('YYYY-MM-DD'),
                    end: moment(element.end).format('YYYY-MM-DD'),
                    text: element.title,
                    barColor: "#" + element.color,
                    moveVDisabled: true,
                    moveHDisabled: true,
                    visibility: "Hover",
                })

            })

            if (errors) {
                res.json({
                    errors
                })
            }

            let succes = true
            res.json({
                succes,
                events: array
            })

        })

    },

    addBannerEvent: async (req, res) => {

        const image = (req.files[0] !== undefined) ? req.files[0].filename : '',
            image2 = (req.files[1] !== undefined) ? req.files[1].filename : ''

        if (req.files[0] === undefined || req.files[0] === '' && req.files[1] === undefined || req.files[1] === '') {
            let error = true
            res.json({
                error
            })
        }

        let succes = true
        res.json({
            succes,
            banner: image,
            banner_square: image2
        })

    },

    bakerysList: async (req, res) => {

        let sql = `SELECT title, id FROM bakerys AS B WHERE active = 1 ORDER BY id DESC LIMIT 5`;

        db.query(sql, (error, data, fields) => {
            if (error) console.log(error);

            let succes = true
            res.json({
                succes,
                bakerys: data,
            })
        })

    },

    bakerysListSearch: async (req, res) => {

        const search = req.params.search

        var where_search = ''

        if (search !== undefined) {
            where_search += 'WHERE B.title LIKE "' + search + '%"'
        }

        let sql = `SELECT 
        B.* 
        FROM 
        bakerys AS B 
        ${where_search}
        ORDER BY B.highlighting_at DESC, B.id DESC LIMIT 5`;

        db.query(sql, (error, data, fields) => {
            if (error) console.log(error);
            res.json({
                searchAll: data,
            })
        })

    },

    bakerysListSearchClear: async (req, res) => {

        let sql = `SELECT 
        B.* 
        FROM 
        bakerys AS B 
        ORDER BY B.highlighting_at DESC, B.id DESC LIMIT 5`;

        db.query(sql, (error, data, fields) => {
            if (error) console.log(error);
            res.json({
                searchAll: data,
            })
        })

    },

    bakerysMarkersHome: async (req, res) => {

        const { lat, lng } = req.params,
            apiKey = process.env.GEOAPIFY_KEY

        var config = {
            method: 'get',
            url: 'https://api.geoapify.com/v1/geocode/reverse?lat=' + lat + '&lon=' + lng + '&format=json&apiKey=' + apiKey,
            headers: {}
        };

        axios(config)
            .then(function (response) {

                const city = response.data.results[0].city,
                    postcode = response.data.results[0].postcode

                let bakerys = `SELECT lat, lng, adresse, title, postcode, id, url FROM bakerys WHERE active = 1 AND adresse LIKE "%${city}%"`;
                db.query(bakerys, (error, data, fields) => {

                    if (error) {

                        let errors = true
                        res.send({
                            errors
                        })

                    }

                    if (data.length >= 1) {

                        let success = true

                        res.send({
                            success,
                            markers: data
                        })

                    } else {

                        let success = true

                        res.send({
                            postcode,
                            markers: []
                        })

                    }

                })

            })
            .catch(function (error) {
                console.log(error);
            });

    },
    searchPlace: async (req, res) => {

        const { search } = req.body,
            apiKey = process.env.GEOAPIFY_KEY

        var config = {
            method: 'get',
            url: 'https://api.geoapify.com/v1/geocode/autocomplete?text=' + search + '&lang=fr&limit=20&bias=countrycode:fr&format=json&apiKey=' + apiKey,
            headers: {}
        };

        axios(config)
            .then(function (response) {

                if (response.data.results.length >= 1) {
                    res.json({
                        succes: true,
                        search: response.data.results
                    })
                } else {
                    res.json({
                        succes: true,
                        search: []
                    })
                }

            })
            .catch(function (error) {
                res.json({
                    error: true,
                    search: []
                })
            });

    },

    getBakerysAdmin: async (req, res) => {

        const { email } = req.params

        let userVerifAdmin = `SELECT email, admin FROM users WHERE email = "${email}" LIMIT 1`;

        db.query(userVerifAdmin, (error, data, fields) => {

            if (error) {
                res.json({
                    error,
                })
            }

            if (data[0].admin >= 1) {

                let bakerys = `SELECT B.*, IFNULL(COUNT(DISTINCT(BC.id)), 0) AS clicks_bakery, IFNULL(COUNT(DISTINCT(BV.id)), 0) AS views_bakery FROM 
                bakerys AS B
                LEFT JOIN bakerys_views AS BV ON BV.bakery_id = B.id
                LEFT JOIN bakerys_click AS BC ON BC.bakery_id = B.id
                GROUP BY B.id ORDER BY B.title ASC, B.created_at DESC`;

                db.query(bakerys, (error2, data2, fields2) => {

                    if (error2) {
                        res.json({
                            error2,
                        })
                    }

                    res.json({
                        succes: true,
                        bakerysTable: data2,
                    })

                })

            } else {

                res.json({
                    succes: true,
                    bakerysTable: [],
                })

            }

        })

    },

    updateBakeryAdmin: async (req, res) => {

        const { id, status, email } = req.body

        let userVerifAdmin = `SELECT email, admin FROM users WHERE email = "${email}" LIMIT 1`;

        db.query(userVerifAdmin, (error, data, fields) => {

            if (error) {
                res.json({
                    error,
                })
            }

            if (data[0].admin >= 1) {

                var update = `UPDATE bakerys SET active = "${status}", updated_at = "${moment().format('YYYY-MM-DD HH:mm:ss')}" WHERE id = ${id}`

                db.query(update, (error, data, fields) => {

                    if (error) {
                        let errors = true
                        res.json({
                            errors,
                            error,
                            status
                        })
                    };

                    let succes = true
                    res.json({
                        succes
                    })
                })

            }

        })

    },

}