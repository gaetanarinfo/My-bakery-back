/*
 * Import Module
 ****************/


/*
 * Controller
 *************/
module.exports = {
    // Method Get
    get: async (req, res) => {

        let sql = `SELECT 
        B.*,
        BC.name
        FROM 
        blogs AS B
        LEFT JOIN blogs_categories AS BC ON BC.id = B.categorie
        WHERE B.active >= 1
        GROUP BY B.id ORDER BY B.created_at DESC LIMIT 4`;

        db.query(sql, (error, data, fields) => {
            if (error) console.log(error);
            res.json({
                blogs: data,
            })
        })

    },
    getBlog: async (req, res) => {

        var url = req.params.url

        let sql = `SELECT B.*, BC.name, BC.id AS categorieId
        FROM 
        blogs AS B
        LEFT JOIN blogs_categories AS BC ON BC.id = B.categorie
        WHERE B.url = "${url}"
        AND B.active >= 1
        GROUP BY B.id ORDER BY B.created_at DESC LIMIT 1`;

        db.query(sql, (error, data, fields) => {

            var update = `UPDATE blogs SET views = views + 1 WHERE id = "${data[0].id}"`
            db.query(update, (error, data, fields) => { console.log(error); })

            let sql2 = `SELECT BT.* FROM blogs_tags AS BT WHERE BT.blog_id = "${data[0].id}" ORDER BY BT.id DESC`;

            db.query(sql2, (error2, data2, fields) => {

                if (data2.length >= 1) {
                    res.json({
                        tags: data2,
                        blog: data[0],
                    })
                } else {
                    res.json({
                        tags: [],
                        blog: data[0],
                    })
                }

                if (error) console.log(error);

            })

            if (error) console.log(error);


        })
    },
    getAll: async (req, res) => {

        let sql = `SELECT 
        B.*,
        BC.name 
        FROM 
        blogs AS B
        LEFT JOIN blogs_categories AS BC ON BC.id = B.categorie
        WHERE B.active >= 1
        GROUP BY B.id ORDER BY B.created_at DESC LIMIT 9`;

        db.query(sql, (error, data, fields) => {

            if (error) console.log(error);

            let sql2 = `SELECT 
            B.* 
            FROM 
            blogs AS B
            WHERE B.active >= 1
            ORDER BY B.created_at DESC`;

            db.query(sql2, (error2, data2, fields) => {

                if (error2) console.log(error2);

                let succes = true

                res.json({
                    succes,
                    blogsAll: data,
                    blogsAllCount: data2.length,
                })
            })

        })

    },
    getCategories: async (req, res) => {

        let sql = `SELECT 
        BC.*,
        COUNT(B.categorie) AS counter
        FROM 
        blogs_categories AS BC
        LEFT JOIN blogs AS B ON B.categorie = BC.id
        GROUP BY BC.id ORDER BY BC.name ASC`;

        db.query(sql, (error, data, fields) => {

            if (error) console.log(error);

            let succes = true
            res.json({
                succes,
                categories: data
            })

        })

    },
    getBlogsViews: async (req, res) => {

        let sql = `SELECT 
        *
        FROM 
        blogs
        WHERE active >= 1
        ORDER BY views ASC, created_at DESC`;

        db.query(sql, (error, data, fields) => {

            if (error) console.log(error);

            let succes = true
            res.json({
                succes,
                blogsAll: data
            })

        })

    },
    getAllPage: async (req, res) => {

        const page = req.params.page

        let reqPage = parseInt(page) - 1
        let pages = parseInt(9)
        let final = pages * reqPage

        let sql = `SELECT 
        B.* 
        FROM 
        blogs AS B 
        WHERE B.active >= 1
        ORDER BY B.created_at DESC LIMIT 9 OFFSET ${final}`;

        db.query(sql, (error, data, fields) => {
            if (error) console.log(error);
            res.json({
                blogsAll: data,
            })
        })
    },
    getSearchAll: async (req, res) => {

        const { page, search, categorieId } = req.body

        console.log(req.body)

        var limitation = 9

        let reqPage = parseInt(page) - 1
        let pages = parseInt(9)
        let final = pages * reqPage

        var requete = ''

        if (search != '') {
            requete += 'AND B.title LIKE "%' + search + '%"'
        }

        if (categorieId !== 0) {
            requete += `AND B.categorie = "${categorieId}"`
        }

        console.log(categorieId)

        console.log(requete);
        
        let sql = `SELECT B.*, BC.name
        FROM blogs AS B 
        LEFT JOIN blogs_categories AS BC ON BC.id = B.categorie
        WHERE B.active >= 1
        ${requete}
        GROUP BY B.id 
        ORDER BY B.created_at DESC
        LIMIT ${limitation} OFFSET ${final}
        `;

        db.query(sql, (error, data, fields) => {

            if (error) console.log(error);

            let sql2 = `SELECT 
            B.*
            FROM 
            blogs AS B
            WHERE B.active >= 1
            ${requete}
            GROUP BY B.id 
            ORDER BY B.created_at DESC`;

            db.query(sql2, (error2, data2, fields) => {

                if (error2) console.log(error2);

                let succes = true
                res.json({
                    succes,
                    search: data,
                    blogsAllCount: data2.length,
                })

            })

        })

    },
}