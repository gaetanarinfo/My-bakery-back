
/*
 * Import Module
 ****************/


/*
 * Controller
 *************/
module.exports = {
    // Method Get
    get: async (req, res) => {

        var siteMap = new Array()

        let sql = `SELECT 
        url
        FROM 
        bakerys
        WHERE active = 1
        ORDER BY id ASC`;

        db.query(sql, (error, data, fields) => {

            if (error) console.log(error);

            data.forEach(element => {

                siteMap.push({
                    path: '/bakery/' + element.url
                })

            })

            let sql2 = `SELECT 
                url
                FROM 
                blogs
                ORDER BY id ASC`;

            db.query(sql2, (error2, data2, fields) => {

                if (error2) console.log(error2);

                data2.forEach(element2 => {

                    siteMap.push({
                        path: '/blogs/' + element2.url
                    })

                })

                let sql3 = `SELECT ville, id FROM bakerys WHERE active = 1 AND ville IS NOT NULL GROUP BY ville ORDER BY ville ASC`;

                db.query(sql3, (error3, data3, fields) => {

                    if (error3) console.log(error3);

                    data3.forEach(element3 => {

                        const ville = element3.ville

                        if (element3.ville !== '') {
                            siteMap.push({
                                path: '/bakerys-city/' + ville.toLowerCase().replaceAll('â', 'a').replaceAll('é', 'e').replaceAll('à', 'a').replaceAll(' - ', '-').replaceAll('\'', '-').replaceAll(' ', '-').replaceAll('’', '-').replaceAll('%', '-pourcent-').replaceAll('è', 'e').replaceAll('ï', 'i').replaceAll(',', '').replaceAll('/', '').replaceAll('--', '-').replaceAll('ô', 'o').replaceAll('ê', 'e').replaceAll('ë', 'e').replaceAll('ö', 'o') + '/' + element3.id
                            })
                        }

                    })

                    res.json({
                        siteMap,
                    })

                })


            })

        })

    },

}