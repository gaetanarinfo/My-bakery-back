/*
 * Import Module
 ****************/


/*
 * Controller
 *************/
module.exports = {
    // Method Get
    villesFrance: async (req, res) => {

        let sql = `SELECT ville_nom_reel FROM villes_france`;

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