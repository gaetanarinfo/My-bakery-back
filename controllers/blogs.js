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