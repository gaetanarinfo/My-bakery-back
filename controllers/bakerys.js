/*
 * Import Module
 ****************/


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
        LEFT JOIN bakerys_comments AS BCS ON BCS.bakery_id = B.id WHERE B.active = 1 GROUP BY B.id ORDER BY B.created_at LIMIT ${limite}`;

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
        LEFT JOIN bakerys_comments AS BCS ON BCS.bakery_id = B.id WHERE B.active = 1 GROUP BY B.id ORDER BY B.created_at LIMIT 9`;

        db.query(sql, (error, data, fields) => {

            if (error) console.log(error);

            let sql2 = `SELECT 
            B.* 
            FROM 
            bakerys AS B
            ORDER BY B.created_at DESC`;

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

        const page = req.params.page,
            search = req.params.search

        var where_search = 'WHERE B.active = 1',
            limitation = 9

        if (search !== undefined) {
            where_search += 'WHERE B.title LIKE "' + search + '%" AND B.active = 1'
            limitation = 2000000000
        }

        let reqPage = parseInt(page) - 1
        let pages = parseInt(9)
        let final = pages * reqPage

        let sql = `SELECT B.*,
        BCS.content AS content_comment, 
        BCS.author AS author_comment, 
        BCS.created_at AS created_at_comment
        FROM bakerys AS B 
        LEFT JOIN bakerys_comments AS BCS ON BCS.bakery_id = B.id ${where_search} GROUP BY B.id ORDER BY B.created_at DESC LIMIT ${limitation} OFFSET ${final}`;

        db.query(sql, (error, data, fields) => {
            if (error) console.log(error);
            res.json({
                bakerysAll: data,
            })
        })
    },
    getAllPage2: async (req, res) => {

        const page = req.params.page,
            location = req.params.location

            var where_search = 'WHERE B.active = 1',
            limitation = 9

        if (location !== undefined) {
            where_search += 'WHERE B.adresse LIKE "' + location + '%" OR B.cp LIKE "' + location + '%" OR B.ville LIKE "' + location + '%" AND B.active = 1'
            limitation = 2000000000
        }

        let reqPage = parseInt(page) - 1
        let pages = parseInt(9)
        let final = pages * reqPage

        let sql = `SELECT B.*,
        BCS.content AS content_comment, 
        BCS.author AS author_comment, 
        BCS.created_at AS created_at_comment
        FROM bakerys AS B 
        LEFT JOIN bakerys_comments AS BCS ON BCS.bakery_id = B.id ${where_search} GROUP BY B.id ORDER BY B.created_at DESC LIMIT ${limitation} OFFSET ${final}`;

        db.query(sql, (error, data, fields) => {
            if (error) console.log(error);
            res.json({
                bakerysAll: data,
            })
        })
    },
    getAllPage3: async (req, res) => {

        const page = req.params.page,
            location = req.params.location,
            search = req.params.search

            var where_search = 'WHERE B.active = 1',
            limitation = 9

        if (location !== undefined) {
            where_search += 'WHERE B.adresse LIKE "' + location + '%" AND B.active = 1'
            limitation = 2000000000
        }

        if (search !== undefined) {
            where_search += ' AND B.title LIKE "' + search + '%" AND B.active = 1'
            limitation = 2000000000
        }

        let reqPage = parseInt(page) - 1
        let pages = parseInt(9)
        let final = pages * reqPage

        let sql = `SELECT B.*,
        BCS.content AS content_comment, 
        BCS.author AS author_comment, 
        BCS.created_at AS created_at_comment
        FROM bakerys AS B 
        LEFT JOIN bakerys_comments AS BCS ON BCS.bakery_id = B.id ${where_search} GROUP BY B.id ORDER BY B.created_at DESC LIMIT ${limitation} OFFSET ${final}`;

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
        LEFT JOIN bakerys_comments AS BCS ON BCS.bakery_id = B.id WHERE B.url = "${url}" AND B.active = 1 GROUP BY B.id ORDER BY B.created_at LIMIT 1`;

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


        let verif_bakery = `SELECT url, id FROM bakerys WHERE url = "${url}"`;

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

}