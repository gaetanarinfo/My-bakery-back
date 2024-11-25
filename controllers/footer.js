/*
 * Import Module
 ****************/


/*
 * Controller
 *************/
module.exports = {
    // Method Get
    villesFrance: async (req, res) => {

        let sql = `SELECT * FROM region`;

        db.query(sql, (error, data, fields) => {

            if (error) {
                let error = true
                res.json({
                    error
                })
            }

            let success = true
            res.json({
                success,
                villesFrance: data
            })

        })

    }

}