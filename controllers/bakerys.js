/*
 * Import Module
 ****************/
const axios = require('axios')

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
        LEFT JOIN bakerys_comments AS BCS ON BCS.bakery_id = B.id WHERE B.active = 1 GROUP BY B.id ORDER BY B.id DESC LIMIT ${limite}`;

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
        LEFT JOIN bakerys_comments AS BCS ON BCS.bakery_id = B.id WHERE B.active = 1 GROUP BY B.id ORDER BY B.id DESC LIMIT 9`;

        db.query(sql, (error, data, fields) => {

            if (error) console.log(error);

            let sql2 = `SELECT 
            B.* 
            FROM 
            bakerys AS B
            WHERE B.active = 1 
            ORDER BY B.id DESC`;

            db.query(sql2, (error2, data2, fields) => {

                if (error2) console.log(error2);

                res.json({
                    bakerysAll: data,
                    bakerysAllCount: data2.length,
                })
            })

        })

    },
    getAllPage: async (req, res) => {

        const search = req.params.search

        let sql = `SELECT B.*,
        BCS.content AS content_comment, 
        BCS.author AS author_comment, 
        BCS.created_at AS created_at_comment
        FROM bakerys AS B 
        LEFT JOIN bakerys_comments AS BCS ON BCS.bakery_id = B.id WHERE B.title LIKE "%${search}%" AND B.active = 1  GROUP BY B.id ORDER BY B.id DESC`;

        db.query(sql, (error, data, fields) => {
            if (error) console.log(error);
            res.json({
                bakerysAll: data,
            })
        })
    },
    getAllPage2: async (req, res) => {

        const location = req.params.location

        let sql = `SELECT B.*,
        BCS.content AS content_comment, 
        BCS.author AS author_comment, 
        BCS.created_at AS created_at_comment
        FROM bakerys AS B 
        LEFT JOIN bakerys_comments AS BCS ON BCS.bakery_id = B.id WHERE B.adresse LIKE "%${location}%" AND B.active = 1 GROUP BY B.id ORDER BY B.id DESC`;

        db.query(sql, (error, data, fields) => {
            if (error) console.log(error);
            res.json({
                bakerysAll: data,
            })
        })
    },
    getAllPage3: async (req, res) => {

        const search = req.params.search,
            location = req.params.location

        let sql = `SELECT B.*,
        BCS.content AS content_comment, 
        BCS.author AS author_comment, 
        BCS.created_at AS created_at_comment
        FROM bakerys AS B 
        LEFT JOIN bakerys_comments AS BCS ON BCS.bakery_id = B.id WHERE B.title LIKE "%${search}%" AND B.active = 1 AND B.adresse LIKE "%${location}%" GROUP BY B.id ORDER BY B.id DESC`;

        db.query(sql, (error, data, fields) => {
            if (error) console.log(error);
            res.json({
                bakerysAll: data,
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
        LEFT JOIN bakerys_comments AS BCS ON BCS.bakery_id = B.id WHERE B.url = "${url}" AND B.active = 1 GROUP BY B.id ORDER BY B.id DESC LIMIT 1`;

        db.query(sql, (error, data, fields) => {

            if (error) console.log(error);

            let sql = `SELECT BC.* FROM bakerys_comments AS BC WHERE BC.bakery_id = "${data[0].id}" ORDER BY BC.created_at DESC`;

            db.query(sql, (error2, data2, fields) => {

                if (error2) console.log(error2);

                let sql = `SELECT BH.* FROM bakerys_hours AS BH WHERE BH.bakery_id = "${data[0].id}" ORDER BY BH.id ASC`;

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
            ip = req.ip.replace('::ffff:', ''),
            url = req.body.url,
            devanture = req.body.devanture,
            prix = req.body.prix,
            choix = req.body.choix,
            proprete = req.body.proprete,
            author = req.body.author,
            comment = req.body.comment


        let verif_bakery = `SELECT url, id FROM bakerys WHERE active = 1 AND url = "${url}"`;

        db.query(verif_bakery, (error, data, fields) => {

            if (data[0] != undefined) {

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

                    let success = true

                    res.send({
                        success
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

        const ip = req.ip.replace('::ffff:', ''),
            image = (req.files[0] !== undefined) ? req.files[0].filename : 'default.jpg',
            image2 = (req.files[1] !== undefined) ? req.files[1].filename : 'default2.jpg',
            image3 = (req.files[2] !== undefined) ? req.files[2].filename : 'default.jpg',
            image4 = (req.files[3] !== undefined) ? req.files[3].filename : 'default2.jpg',
            addName = req.body.addName,
            url = addName.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''),
            addAdresse = req.body.addAdresse,
            addPhone = req.body.addPhone,
            addHandicap = req.body.addHandicap,
            addLivraison = req.body.addLivraison,
            addRestauration = req.body.addRestauration,
            addSmallContent = req.body.addSmallContent,
            addWebsite = req.body.addWebsite,
            addDesc = req.body.addDesc

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
                        lat,
                        lng,
                        handicape,
                        website,
                        delivery,
                        dine_in,
                        ip
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
                        "${lat}",
                        "${lng}",
                        "${addHandicap}",
                        "${addWebsite}",
                        "${addLivraison}",
                        "${addRestauration}",
                        "${ip}"
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

        var limitation = 9

        let reqPage = parseInt(page) - 1
        let pages = parseInt(9)
        let final = pages * reqPage

        let sql = `SELECT B.*,
        BCS.content AS content_comment, 
        BCS.author AS author_comment, 
        BCS.created_at AS created_at_comment
        FROM bakerys AS B 
        LEFT JOIN bakerys_comments AS BCS ON BCS.bakery_id = B.id WHERE B.active = 1 GROUP BY B.id ORDER BY B.id DESC LIMIT ${limitation} OFFSET ${final}`;

        db.query(sql, (error, data, fields) => {
            if (error) console.log(error);
            res.json({
                bakerysAll: data,
            })
        })
    },
    updateView: async (req, res) => {

        var url = req.params.url

        let sql = `SELECT * FROM bakerys WHERE url = "${url}" AND active = 1 LIMIT 1`;

        db.query(sql, (error, data, fields) => {

            var update = `UPDATE bakerys SET views = views + 1 WHERE id = "${data[0].id}"`
            db.query(update, (error, data, fields) => { console.log(error); })

        })

    },
    updateBakery: async (req, res) => {

        const addName = req.body.addName,
            url = addName.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''),
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
                    updated_at = "${formatDate(Date())}" WHERE id = ${addId}`

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
                    "${formatDate(Date())}"
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

            })

        })

        let success = true

        res.send({
            success
        })

    },
    bakerysMarkers: async (req, res) => {

        const { region } = req.params

        let sql = `SELECT * FROM region WHERE nom_slug = "${region}"`;

        db.query(sql, (errors, datas, fields) => {

            let bakerys = `SELECT lat, lng, adresse, title, id, url FROM bakerys WHERE active = 1 AND region = "${datas[0].nom}"`;
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
                        nom: datas[0].nom,
                        markers: data
                    })

                } else {

                    let success = true

                    res.send({
                        success,
                        nom: datas[0].nom,
                        markers: []
                    })

                }

            })

        })

    }
}