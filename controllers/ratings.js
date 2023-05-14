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
        * 
        FROM 
        website_ratings
        ORDER BY id ASC LIMIT 6`;

        db.query(sql, (error, data, fields) => {
            if (error) console.log(error);
            res.json({
                ratings: data,
            })
        })
    },
   
}