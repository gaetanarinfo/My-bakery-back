/*
 * Import Module
 ****************/


/*
 * Controller
 *************/
module.exports = {
    // Method Get
    villesFrance: async (req, res) => {

        const { limit } = req.params

        var sq = ''

        if (limit === '0') {
            sq = ''
        } else {
            sq = ' LIMIT ' + limit
        }

        var array = []

        let sql = `SELECT ville, id, postcode FROM bakerys WHERE active = 1 AND ville IS NOT NULL GROUP BY ville ORDER BY ville ASC ${sq}`;

        db.query(sql, (error, data, fields) => {

            if (error) {
                let error = true
                res.json({
                    error
                })
            }

            if (data.length >= 1) {

                data.forEach(element => {

                    const ville = element.ville

                    if (element.ville !== '') {
                        array.push({
                            ville_slug: ville.toLowerCase().replaceAll('â', 'a').replaceAll('é', 'e').replaceAll('à', 'a').replaceAll(' - ', '-').replaceAll('\'', '-').replaceAll(' ', '-').replaceAll('’', '-').replaceAll('%', '-pourcent-').replaceAll('è', 'e').replaceAll('ï', 'i').replaceAll(',', '').replaceAll('/', '').replaceAll('--', '-').replaceAll('ô', 'o').replaceAll('ê', 'e').replaceAll('ë', 'e').replaceAll('ö', 'o'),
                            ville: element.ville,
                            postcode: element.postcode,
                            id: element.id
                        })
                    }

                });

            }

            let success = true
            res.json({
                success,
                villesFrance: array
            })

        })

    }

}