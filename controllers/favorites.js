/*
 * Import Module
 ****************/


/*
 * Controller
 *************/
module.exports = {
    // Method Get
    get: async (req, res) => {

        var favoritesId = req.params.favorites

        favoritesId = favoritesId.replaceAll('-', ',')
        favoritesId = favoritesId.substring(1)

        let sql = `SELECT 
        B.*,
        BCS.content AS content_comment, 
        BCS.author AS author_comment, 
        BCS.created_at AS created_at_comment,
        COUNT(BV.id) AS views,
        IFNULL(COUNT(BD.id), 0) AS counter_devanture,
        IFNULL(SUM(BD.note), 0) AS sum_devanture,
        IFNULL(COUNT(BPE.id), 0) AS counter_proprete,
        IFNULL(SUM(BPE.note), 0) AS sum_proprete,
        IFNULL(COUNT(BP.id), 0) AS counter_prix,
        IFNULL(SUM(BP.note), 0) AS sum_prix,
        IFNULL(COUNT(BC.id), 0) AS counter_choix,
        IFNULL(SUM(BC.note), 0) AS sum_choix
        FROM bakerys AS B 
        LEFT JOIN bakerys_views AS BV ON BV.bakery_id = B.id 
        LEFT JOIN bakerys_comments AS BCS ON BCS.bakery_id = B.id
        LEFT JOIN bakerys_devanture AS BD ON BD.bakery_id = B.id 
        LEFT JOIN bakerys_prix AS BP ON BP.bakery_id = B.id 
        LEFT JOIN bakerys_proprete AS BPE ON BPE.bakery_id = B.id 
        LEFT JOIN bakerys_choix AS BC ON BC.bakery_id = B.id WHERE B.id IN (${favoritesId}) GROUP BY B.id ORDER BY B.created_at`;

        db.query(sql, (error, data, fields) => {
            if (error) console.log(error);
            res.json({
                favorites: data,
            })
        })

    },

}