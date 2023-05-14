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
        regions
        ORDER BY nreg ASC`;

        db.query(sql, (error, data, fields) => {
            if (error) console.log(error);
            res.json({
                regions: data,
            })
        })
    },
   
}