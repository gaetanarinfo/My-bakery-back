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
        BCS.title AS title_comment, 
        BCS.content AS content_comment, 
        BCS.author AS author_comment, 
        BCS.created_at AS created_at_comment,
        IFNULL(COUNT(BD.id), 0) AS counter_devanture,
        IFNULL(SUM(BD.note), 0) AS sum_devanture,
        IFNULL(COUNT(BPE.id), 0) AS counter_proprete,
        IFNULL(SUM(BPE.note), 0) AS sum_proprete,
        IFNULL(COUNT(BP.id), 0) AS counter_prix,
        IFNULL(SUM(BP.note), 0) AS sum_prix,
        IFNULL(COUNT(BC.id), 0) AS counter_choix,
        IFNULL(SUM(BC.note), 0) AS sum_choix
        FROM bakerys AS B 
        LEFT JOIN bakerys_comments AS BCS ON BCS.bakery_id = B.id
        LEFT JOIN bakerys_devanture AS BD ON BD.bakery_id = B.id 
        LEFT JOIN bakerys_prix AS BP ON BP.bakery_id = B.id 
        LEFT JOIN bakerys_proprete AS BPE ON BPE.bakery_id = B.id 
        LEFT JOIN bakerys_choix AS BC ON BC.bakery_id = B.id GROUP BY B.id ORDER BY B.created_at LIMIT ${limite}`;

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
        BCS.title AS title_comment, 
        BCS.content AS content_comment, 
        BCS.author AS author_comment, 
        BCS.created_at AS created_at_comment,
        IFNULL(COUNT(BD.id), 0) AS counter_devanture,
        IFNULL(SUM(BD.note), 0) AS sum_devanture,
        IFNULL(COUNT(BPE.id), 0) AS counter_proprete,
        IFNULL(SUM(BPE.note), 0) AS sum_proprete,
        IFNULL(COUNT(BP.id), 0) AS counter_prix,
        IFNULL(SUM(BP.note), 0) AS sum_prix,
        IFNULL(COUNT(BC.id), 0) AS counter_choix,
        IFNULL(SUM(BC.note), 0) AS sum_choix
        FROM bakerys AS B 
        LEFT JOIN bakerys_comments AS BCS ON BCS.bakery_id = B.id
        LEFT JOIN bakerys_devanture AS BD ON BD.bakery_id = B.id 
        LEFT JOIN bakerys_prix AS BP ON BP.bakery_id = B.id 
        LEFT JOIN bakerys_proprete AS BPE ON BPE.bakery_id = B.id 
        LEFT JOIN bakerys_choix AS BC ON BC.bakery_id = B.id GROUP BY B.id ORDER BY B.created_at LIMIT 9`;

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

        var where_search = '',
            limitation = 9

        if (search !== undefined) {
            where_search += 'WHERE B.title LIKE "' + search + '%"'
            limitation = 2000000000
        }

        let reqPage = parseInt(page) - 1
        let pages = parseInt(9)
        let final = pages * reqPage

        let sql = `SELECT B.*,
        BCS.title AS title_comment, 
        BCS.content AS content_comment, 
        BCS.author AS author_comment, 
        BCS.created_at AS created_at_comment,
        IFNULL(COUNT(BD.id), 0) AS counter_devanture,
        IFNULL(SUM(BD.note), 0) AS sum_devanture,
        IFNULL(COUNT(BPE.id), 0) AS counter_proprete,
        IFNULL(SUM(BPE.note), 0) AS sum_proprete,
        IFNULL(COUNT(BP.id), 0) AS counter_prix,
        IFNULL(SUM(BP.note), 0) AS sum_prix,
        IFNULL(COUNT(BC.id), 0) AS counter_choix,
        IFNULL(SUM(BC.note), 0) AS sum_choix
        FROM bakerys AS B 
        LEFT JOIN bakerys_comments AS BCS ON BCS.bakery_id = B.id
        LEFT JOIN bakerys_devanture AS BD ON BD.bakery_id = B.id 
        LEFT JOIN bakerys_prix AS BP ON BP.bakery_id = B.id 
        LEFT JOIN bakerys_proprete AS BPE ON BPE.bakery_id = B.id 
        LEFT JOIN bakerys_choix AS BC ON BC.bakery_id = B.id ${where_search} GROUP BY B.id ORDER BY B.created_at DESC LIMIT ${limitation} OFFSET ${final}`;

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

        var where_search = '',
            limitation = 9

        if (location !== undefined) {
            where_search += 'WHERE B.adresse LIKE "' + location + '%" OR B.cp LIKE "' + location + '%" OR B.ville LIKE "' + location + '%"'
            limitation = 2000000000
        }

        let reqPage = parseInt(page) - 1
        let pages = parseInt(9)
        let final = pages * reqPage

        let sql = `SELECT B.*,
        BCS.title AS title_comment, 
        BCS.content AS content_comment, 
        BCS.author AS author_comment, 
        BCS.created_at AS created_at_comment,
        IFNULL(COUNT(BD.id), 0) AS counter_devanture,
        IFNULL(SUM(BD.note), 0) AS sum_devanture,
        IFNULL(COUNT(BPE.id), 0) AS counter_proprete,
        IFNULL(SUM(BPE.note), 0) AS sum_proprete,
        IFNULL(COUNT(BP.id), 0) AS counter_prix,
        IFNULL(SUM(BP.note), 0) AS sum_prix,
        IFNULL(COUNT(BC.id), 0) AS counter_choix,
        IFNULL(SUM(BC.note), 0) AS sum_choix
        FROM bakerys AS B 
        LEFT JOIN bakerys_comments AS BCS ON BCS.bakery_id = B.id
        LEFT JOIN bakerys_devanture AS BD ON BD.bakery_id = B.id 
        LEFT JOIN bakerys_prix AS BP ON BP.bakery_id = B.id 
        LEFT JOIN bakerys_proprete AS BPE ON BPE.bakery_id = B.id 
        LEFT JOIN bakerys_choix AS BC ON BC.bakery_id = B.id ${where_search} GROUP BY B.id ORDER BY B.created_at DESC LIMIT ${limitation} OFFSET ${final}`;

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

        var where_search = '',
            limitation = 9

        if (location !== undefined) {
            where_search += 'WHERE B.adresse LIKE "' + location + '%"'
            limitation = 2000000000
        }

        if (search !== undefined) {
            where_search += ' AND B.title LIKE "' + search + '%"'
            limitation = 2000000000
        }

        let reqPage = parseInt(page) - 1
        let pages = parseInt(9)
        let final = pages * reqPage

        let sql = `SELECT B.*,
        BCS.title AS title_comment, 
        BCS.content AS content_comment, 
        BCS.author AS author_comment, 
        BCS.created_at AS created_at_comment,
        IFNULL(COUNT(BD.id), 0) AS counter_devanture,
        IFNULL(SUM(BD.note), 0) AS sum_devanture,
        IFNULL(COUNT(BPE.id), 0) AS counter_proprete,
        IFNULL(SUM(BPE.note), 0) AS sum_proprete,
        IFNULL(COUNT(BP.id), 0) AS counter_prix,
        IFNULL(SUM(BP.note), 0) AS sum_prix,
        IFNULL(COUNT(BC.id), 0) AS counter_choix,
        IFNULL(SUM(BC.note), 0) AS sum_choix
        FROM bakerys AS B 
        LEFT JOIN bakerys_comments AS BCS ON BCS.bakery_id = B.id
        LEFT JOIN bakerys_devanture AS BD ON BD.bakery_id = B.id 
        LEFT JOIN bakerys_prix AS BP ON BP.bakery_id = B.id 
        LEFT JOIN bakerys_proprete AS BPE ON BPE.bakery_id = B.id 
        LEFT JOIN bakerys_choix AS BC ON BC.bakery_id = B.id ${where_search} GROUP BY B.id ORDER BY B.created_at DESC LIMIT ${limitation} OFFSET ${final}`;

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
        BCS.title AS title_comment, 
        BCS.content AS content_comment, 
        BCS.author AS author_comment, 
        BCS.created_at AS created_at_comment,
        IFNULL(COUNT(BD.id), 0) AS counter_devanture,
        IFNULL(SUM(BD.note), 0) AS sum_devanture,
        IFNULL(COUNT(BPE.id), 0) AS counter_proprete,
        IFNULL(SUM(BPE.note), 0) AS sum_proprete,
        IFNULL(COUNT(BP.id), 0) AS counter_prix,
        IFNULL(SUM(BP.note), 0) AS sum_prix,
        IFNULL(COUNT(BC.id), 0) AS counter_choix,
        IFNULL(SUM(BC.note), 0) AS sum_choix
        FROM bakerys AS B 
        LEFT JOIN bakerys_comments AS BCS ON BCS.bakery_id = B.id
        LEFT JOIN bakerys_devanture AS BD ON BD.bakery_id = B.id 
        LEFT JOIN bakerys_prix AS BP ON BP.bakery_id = B.id 
        LEFT JOIN bakerys_proprete AS BPE ON BPE.bakery_id = B.id 
        LEFT JOIN bakerys_choix AS BC ON BC.bakery_id = B.id WHERE B.url = "${url}" GROUP BY B.id ORDER BY B.created_at LIMIT 1`;

        db.query(sql, (error, data, fields) => {

            if (error) console.log(error);

            res.json({
                bakery: data[0],
            })

        })

    },

}