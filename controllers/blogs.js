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
        B.* 
        FROM 
        blogs AS B
        ORDER BY B.created_at DESC LIMIT 6`;

        db.query(sql, (error, data, fields) => {
            if (error) console.log(error);
            res.json({
                blogs: data,
            })
        })

    },
    getBlog: async (req, res) => {

        var url = req.params.url

        let sql = `SELECT B.* 
        FROM 
        blogs AS B
        WHERE B.url = "${url}"
        ORDER BY B.created_at DESC LIMIT 1`;

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
        B.* 
        FROM 
        blogs AS B
        ORDER BY B.created_at DESC LIMIT 9`;

        db.query(sql, (error, data, fields) => {

            if (error) console.log(error);

            let sql2 = `SELECT 
            B.* 
            FROM 
            blogs AS B
            ORDER BY B.created_at DESC`;

            db.query(sql2, (error2, data2, fields) => {

                if (error2) console.log(error2);

                res.json({
                    blogsAll: data,
                    blogsAllCount: data2.length,
                })
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
        ORDER BY B.created_at DESC LIMIT 9 OFFSET ${final}`;

        db.query(sql, (error, data, fields) => {
            if (error) console.log(error);
            res.json({
                blogsAll: data,
            })
        })
    },
    getSearchAll: async (req, res) => {

        const search = req.params.search

        var where_search = ''

        if (search !== undefined) {
            where_search += 'WHERE B.title LIKE "' + search + '%"'
        }

        let sql = `SELECT 
        B.* 
        FROM 
        blogs AS B 
        ${where_search}
        ORDER BY B.created_at DESC LIMIT 9`;

        db.query(sql, (error, data, fields) => {
            if (error) console.log(error);
            res.json({
                searchAll: data,
            })
        })
    },
}