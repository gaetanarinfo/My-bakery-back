/*
 * Import Module
 ****************/
const axios = require('axios')
const fs = require('fs'),
    request = require('request');

var download = function (uri, filename, callback) {
    request.head(uri, function (err, res, body) {
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    }).catch(error => {
        console.log(error);
    });
};

/*
 * Controller
 *************/
module.exports = {
    // Method Get
    get: async (req, res) => {

        const config = {
            method: 'get',
            url: 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + req.params.q + '&inputtype=textquery&key=' + process.env.GOOGLE_KEY,
        };

        var actus = [];

        axios(config)
            .then(function (response) {

                for (var key in response.data.predictions) {

                    var reference = response.data.predictions[key]['reference'],
                        title = response.data.predictions[key]['structured_formatting']['main_text'].charAt(0).toUpperCase() + response.data.predictions[key]['structured_formatting']['main_text'].slice(1),
                        small_content = response.data.predictions[key]['description'].charAt(0).toUpperCase() + response.data.predictions[key]['description'].slice(1),
                        url = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')

                    url = url.replaceAll('--', '-')

                    if (title !== "Boulangerie") {

                        console.log('--------------------------------------');
                        console.log('Référence : ' + reference);
                        console.log('Title : ' + title);
                        console.log('Url : ' + encodeURIComponent(title).replaceAll('%20', '-'));
                        console.log('Small Description : ' + small_content);
                        console.log('--------------------------------------\n');

                        actus.push({
                            "reference": reference,
                            "title": title,
                            "url": url,
                            "small_content": small_content
                        })

                    }

                }

                actus.forEach(element => {

                    let verif_bakery = `SELECT reference FROM bakerys WHERE reference = "${element.reference}" LIMIT 1`;

                    db.query(verif_bakery, (error, data, fields) => {

                        console.log(data.length);

                        if (data.length == 0) {

                            let sql = `INSERT INTO bakerys (reference, title, url, small_content, image, image_2, image_3, image_4) VALUES ("${element.reference}","${element.title}", "${element.url}","${element.small_content}", "", "", "", "")`;
                            db.query(sql, (err, result) => { })

                            if (error) {
                                let error = true
                                res.json({
                                    error
                                })
                            }

                        }

                    })

                })

            })
            .catch(function (error) {

            });

        res.json({
            bakerys: '',
        })

    },
    getPlace: async (req, res) => {

        let verif_bakery = `SELECT id, reference, title FROM bakerys ORDER BY id ASC`;

        db.query(verif_bakery, (error, data, fields) => {

            data.forEach(element => {

                if (element.reference !== '') {

                    const place_id = element.reference

                    const config = {
                        method: 'get',
                        url: 'https://maps.googleapis.com/maps/api/place/details/json?place_id=' + place_id + '&key=' + process.env.GOOGLE_KEY,
                    };

                    axios(config)
                        .then(function (response) {

                            if (response.status == 200) {

                                console.log(response.data)

                                var lat = response.data.result['geometry']['location']['lat'],
                                    lng = response.data.result['geometry']['location']['lng'],
                                    phone = (response.data.result['formatted_phone_number'] !== undefined) ? response.data.result['formatted_phone_number'] : '',
                                    website = (response.data.result['website'] !== undefined) ? response.data.result['website'] : '',
                                    adresse = response.data.result['formatted_address'],
                                    delivery = (response.data.result['delivery'] == false) ? 0 : 1,
                                    dine_in = (response.data.result['dine_in'] == false) ? 0 : 1,
                                    business_status = (response.data.result['business_status'] == "OPERATIONAL") ? 1 : 0,
                                    handicape = (response.data.result['wheelchair_accessible_entrance'] !== true) ? 0 : 1,
                                    content = '<p>La Boulangerie ' + element.title.replace('Boulangerie & Restaurant Sandwicherie', '') + ' est bien plus qu\'une simple boulangerie, c\'est un véritable paradis pour les amateurs de délices cuits au four. Avec son savoir-faire artisanal et son engagement envers la qualité, cette boulangerie se distingue par ses produits exceptionnels.<br><br>Dès que vous franchissez la porte de ' + element.title.replace('Boulangerie & Restaurant Sandwicherie', '') + ', l\'odeur alléchante du pain fraîchement sorti du four vous enveloppe, éveillant immédiatement vos papilles gustatives. Les boulangers talentueux et passionnés y créent chaque jour une grande variété de pains, des traditionnels aux plus originaux, tous préparés avec des ingrédients de première qualité.<br><br>Mais ce n\'est pas tout ! La boulangerie ' + element.title.replace('Boulangerie & Restaurant Sandwicherie', '') + ' est également réputée pour ses viennoiseries délicieusement croustillantes et moelleuses à la fois. Croissants dorés, pains au chocolat fondants, brioches légères... chaque bouchée est un véritable régal.<br><br>Les pâtisseries de ' + element.title.replace('Boulangerie & Restaurant Sandwicherie', '') + ' méritent également d\'être mentionnées. Leurs gâteaux et tartes, préparés avec soin et créativité, sont de véritables œuvres d\'art sucrées. Que vous soyez tenté par un éclair au café, une tarte aux fruits de saison ou une mousse au chocolat onctueuse, vous serez conquis par les saveurs et la finesse des desserts proposés.<br><br>Outre la qualité irréprochable de ses produits, ' + element.title.replace('Boulangerie & Restaurant Sandwicherie', '') + ' se démarque également par son service chaleureux et attentif. Le personnel est toujours souriant et prêt à vous conseiller, garantissant ainsi une expérience agréable à chaque visite.<br><br>En résumé, la boulangerie ' + element.title.replace('Boulangerie & Restaurant Sandwicherie', '') + ' est bien plus qu\'une simple bonne boulangerie. C\'est un lieu où la passion pour la boulangerie se traduit par des créations savoureuses, une ambiance conviviale et un service exceptionnel. Une fois que vous aurez goûté à leurs produits, vous ne voudrez plus jamais vous passer de cette adresse incontournable.</p>',
                                    small_content = 'La Boulangerie ' + element.title.replace('Boulangerie & Restaurant Sandwicherie', '') + ' est bien plus qu\'une simple boulangerie, c\'est un véritable paradis pour les amateurs de délices cuits au four.'

                                var update3 = `UPDATE bakerys SET active = "${business_status}" WHERE reference = "${element.reference}"`
                                db.query(update3, (error, data, fields) => { console.log(error); })

                            }

                        }).catch(error => {
                            console.log(error);
                        })

                }

            })

            res.json({
                bakerys: '',
            })

        })

    },
    getAllCity: async (req, res) => {

        let villes_france = `SELECT ville_id, ville_nom_simple FROM villes_france WHERE ville_id >= 4597`;

        db.query(villes_france, (error, data, fields) => {

            data.forEach(element => {

                console.log(element.ville_id)

                const config = {
                    method: 'get',
                    url: 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=boulangerie+' + element.ville_nom_simple + '&inputtype=textquery&key=' + process.env.GOOGLE_KEY,
                };

                var actus = [];

                axios(config)
                    .then(function (response) {

                        for (var key in response.data.predictions) {

                            var reference = response.data.predictions[key]['reference'],
                                title = response.data.predictions[key]['structured_formatting']['main_text'].charAt(0).toUpperCase() + response.data.predictions[key]['structured_formatting']['main_text'].slice(1),
                                small_content = response.data.predictions[key]['description'].charAt(0).toUpperCase() + response.data.predictions[key]['description'].slice(1),
                                url = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')

                            url = url.replaceAll('--', '-')

                            console.log('--------------------------------------');
                            console.log('Référence : ' + reference);
                            console.log('Title : ' + title);
                            console.log('Url : ' + encodeURIComponent(title).replaceAll('%20', '-'));
                            console.log('Small Description : ' + small_content);
                            console.log('--------------------------------------\n');

                            actus.push({
                                "reference": reference,
                                "title": title,
                                "url": url,
                                "small_content": small_content
                            })

                        }

                        actus.forEach(element => {

                            let verif_bakery = `SELECT reference FROM bakerys WHERE reference = "${element.reference}" LIMIT 1`;

                            db.query(verif_bakery, (error, data, fields) => {

                                if (data.length == 0) {

                                    let sql = `INSERT INTO bakerys (reference, title, url, small_content, image, image_2, image_3, image_4) VALUES ("${element.reference}","${element.title}", "${element.url}","${element.small_content}", "", "", "", "")`;
                                    db.query(sql, (err, result) => { })

                                    if (error) {
                                        let error = true
                                        res.json({
                                            error
                                        })
                                    }

                                }

                            })

                        })
                        actus.forEach(element => {

                            let verif_bakery = `SELECT reference FROM bakerys WHERE reference = "${element.reference}" LIMIT 1`;

                            db.query(verif_bakery, (error, data, fields) => {

                                if (data.length == 0) {

                                    let sql = `INSERT INTO bakerys (reference, title, url, small_content, image, image_2, image_3, image_4) VALUES ("${element.reference}","${element.title}", "${element.url}","${element.small_content}", "", "", "", "")`;
                                    db.query(sql, (err, result) => { })

                                    if (error) {
                                        let error = true
                                        res.json({
                                            error
                                        })
                                    }

                                }

                            })

                        })

                    })
                    .catch(function (error) {

                    });

            })

            res.json({
                'bakerys': ''
            })

        })

    },
}