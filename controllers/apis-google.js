/*
 * Import Module
 ****************/
const axios = require('axios'),
    fs = require('fs'),
    request = require('request'),
    moment = require('moment'),
    generateToken = require('crypto'),
    jwt = require("jsonwebtoken")

moment.locale('fr')

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID,
    GOOGLE_MOBILE_CLIENT_ID = process.env.GOOGLE_MOBILE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI

var download = function (uri, filename, callback) {
    request.head(uri, function (err, res, body) {
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

                // actus.forEach(element => {

                //     let verif_bakery = `SELECT reference FROM bakerys WHERE reference = "${element.reference}" LIMIT 1`;

                //     db.query(verif_bakery, (error, data, fields) => {

                //         if (data.length == 0) {

                //             let sql = `INSERT INTO bakerys (reference, title, url, small_content, image, image_2, image_3, image_4) VALUES ("${element.reference}","${element.title}", "${element.url}","${element.small_content}", "", "", "", "")`;
                //             db.query(sql, (err, result) => { })

                //             if (error) {
                //                 let error = true
                //                 res.json({
                //                     error
                //                 })
                //             }

                //         }

                //     })

                // })

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

                    var region = ''

                    axios(config)
                        .then(function (response) {

                            console.log(response.data);

                            if (response.status == 200) {

                                // Les heures
                                // response.data.result['address_components'].forEach(result => {

                                //     if (result['types'].indexOf('administrative_area_level_2') !== -1) {
                                //         region = result['long_name'];
                                //     }

                                //     if (result['types'].indexOf('administrative_area_level_1') !== -1) {
                                //         region = result['long_name'];
                                //     }

                                // })
                                //

                                // Galleries
                                // var galeries = response.data.result['photos']
                                // var i = 0;

                                // galeries.forEach(elementGalerie => {

                                //     var contrainteWidth = parseInt(elementGalerie.width);

                                //     ++i;

                                //     // if (i <= 4 && contrainteWidth >= 1200) {

                                //     //     if (i != 1) {
                                //     //         var dbImage = "image_" + i
                                //     //     } else if (i == 1) {
                                //     //         var dbImage = "image"
                                //     //     }

                                //     //     const configPhoto = {
                                //     //         method: 'get',
                                //     //         responseType: "text",
                                //     //         responseEncoding: "base64",
                                //     //         url: 'https://maps.googleapis.com/maps/api/place/photo?maxheight=' + elementGalerie.height + '&maxwidth=' + elementGalerie.width + '&photo_reference=' + elementGalerie.photo_reference + '&key=' + process.env.GOOGLE_KEY,
                                //     //     };

                                //     //     axios(configPhoto)
                                //     //         .then(function (response) {

                                //     //             // console.log(response.data);

                                //     //             if (response.status == 200) {

                                //     //                 var image = "bakery_" + Number(new Date()) + "_" + element.id + ".jpg";

                                //     //                 fs.writeFileSync("./public/bakerys/images/" + image, response.data, { encoding: "base64" });

                                //     //                 if (dbImage != undefined) {
                                //     //                     var updatePhotoOther = `UPDATE bakerys SET 
                                //     //                         ${dbImage} = "${image}"
                                //     //                         WHERE reference = "${element.reference}"`
                                //     //                     db.query(updatePhotoOther, (error, data, fields) => { })
                                //     //                 }

                                //     //             }

                                //     //         }).catch(error => {
                                //     //             if (error) console.log(error);
                                //     //         })

                                //     // }

                                // });

                                // var lat = response.data.result['geometry']['location']['lat'],
                                // lng = response.data.result['geometry']['location']['lng'],
                                // phone = (response.data.result['formatted_phone_number'] !== undefined) ? response.data.result['formatted_phone_number'] : '',
                                // website = (response.data.result['website'] !== undefined) ? response.data.result['website'] : '',
                                // adresse = response.data.result['formatted_address'],
                                // delivery = (response.data.result['delivery'] == false) ? 0 : 1,
                                // dine_in = (response.data.result['dine_in'] == false) ? 0 : 1,
                                // business_status = (response.data.result['business_status'] == "OPERATIONAL") ? 1 : 0,
                                // handicape = (response.data.result['wheelchair_accessible_entrance'] !== true) ? 0 : 1,
                                // content = '<p>La Boulangerie ' + element.title.replace('Boulangerie & Restaurant Sandwicherie', '') + ' est bien plus qu\'une simple boulangerie, c\'est un véritable paradis pour les amateurs de délices cuits au four. Avec son savoir-faire artisanal et son engagement envers la qualité, cette boulangerie se distingue par ses produits exceptionnels.<br><br>Dès que vous franchissez la porte de ' + element.title.replace('Boulangerie & Restaurant Sandwicherie', '') + ', l\'odeur alléchante du pain fraîchement sorti du four vous enveloppe, éveillant immédiatement vos papilles gustatives. Les boulangers talentueux et passionnés y créent chaque jour une grande variété de pains, des traditionnels aux plus originaux, tous préparés avec des ingrédients de première qualité.<br><br>Mais ce n\'est pas tout ! La boulangerie ' + element.title.replace('Boulangerie & Restaurant Sandwicherie', '') + ' est également réputée pour ses viennoiseries délicieusement croustillantes et moelleuses à la fois. Croissants dorés, pains au chocolat fondants, brioches légères... chaque bouchée est un véritable régal.<br><br>Les pâtisseries de ' + element.title.replace('Boulangerie & Restaurant Sandwicherie', '') + ' méritent également d\'être mentionnées. Leurs gâteaux et tartes, préparés avec soin et créativité, sont de véritables œuvres d\'art sucrées. Que vous soyez tenté par un éclair au café, une tarte aux fruits de saison ou une mousse au chocolat onctueuse, vous serez conquis par les saveurs et la finesse des desserts proposés.<br><br>Outre la qualité irréprochable de ses produits, ' + element.title.replace('Boulangerie & Restaurant Sandwicherie', '') + ' se démarque également par son service chaleureux et attentif. Le personnel est toujours souriant et prêt à vous conseiller, garantissant ainsi une expérience agréable à chaque visite.<br><br>En résumé, la boulangerie ' + element.title.replace('Boulangerie & Restaurant Sandwicherie', '') + ' est bien plus qu\'une simple bonne boulangerie. C\'est un lieu où la passion pour la boulangerie se traduit par des créations savoureuses, une ambiance conviviale et un service exceptionnel. Une fois que vous aurez goûté à leurs produits, vous ne voudrez plus jamais vous passer de cette adresse incontournable.</p>',
                                // small_content = 'La Boulangerie ' + element.title.replace('Boulangerie & Restaurant Sandwicherie', '') + ' est bien plus qu\'une simple boulangerie, c\'est un véritable paradis pour les amateurs de délices cuits au four.',
                                // user_rating_google = (response.data.result['user_ratings_total'] !== undefined) ? response.data.result['user_ratings_total'] : 0,
                                // total_rating_google = (response.data.result['rating'] !== undefined) ? response.data.result['rating'] : 0.0,
                                var addHours1 = "",
                                    addHours2 = "",
                                    addHours3 = "",
                                    addHours4 = "",
                                    addHours5 = "",
                                    addHours6 = "",
                                    addHours7 = "",
                                    addId = element.id

                                var hours = (response.data.result['opening_hours'] !== undefined) ? response.data.result['opening_hours']['weekday_text'] : null;

                                if (hours !== null) {

                                    hours.forEach(element => {

                                        if (element.indexOf('Monday') !== -1) {
                                            addHours1 = element.replace('Monday: ', 'De ')
                                                .replaceAll('–', 'à')
                                                .replaceAll('AM', '')
                                                .replaceAll('PM', '')
                                                .replace(',', ' et de')
                                                .replace('De Closed', 'Fermé')
                                                .replaceAll(':', 'h')
                                                .replaceAll('  ', ' ')
                                                .replaceAll('  ', ' ')

                                                .replace('à 1', 'à 13')
                                                .replace('à 2', 'à 14')
                                                .replace('à 3', 'à 15')
                                                .replace('à 4', 'à 16')
                                                .replace('à 5', 'à 17')
                                                .replace('à 6', 'à 18')
                                                .replace('à 7', 'à 19')
                                                .replace('à 8', 'à 20')
                                                .replace('à 9', 'à 21')

                                                .replace(' et de 1', ' et de 13')
                                                .replace(' et de 2', ' et de 14')
                                                .replace(' et de 3', ' et de 15')
                                                .replace(' et de 4', ' et de 16')
                                                .replace(' et de 5', ' et de 17')
                                                .replace(' et de 6', ' et de 18')
                                                .replace(' et de 7', ' et de 19')
                                                .replace(' et de 8', ' et de 20')
                                                .replace(' et de 9', ' et de 21')

                                                .trim();
                                        }

                                        if (element.indexOf('Tuesday') !== -1) {
                                            addHours2 = element.replace('Tuesday: ', 'De ')
                                                .replaceAll('–', 'à')
                                                .replaceAll('AM', '')
                                                .replaceAll('PM', '')
                                                .replace(',', ' et de')
                                                .replace('De Closed', 'Fermé')
                                                .replaceAll(':', 'h')
                                                .replaceAll('  ', ' ')
                                                .replaceAll('  ', ' ')

                                                .replace('à 1', 'à 13')
                                                .replace('à 2', 'à 14')
                                                .replace('à 3', 'à 15')
                                                .replace('à 4', 'à 16')
                                                .replace('à 5', 'à 17')
                                                .replace('à 6', 'à 18')
                                                .replace('à 7', 'à 19')
                                                .replace('à 8', 'à 20')
                                                .replace('à 9', 'à 21')

                                                .replace(' et de 1', ' et de 13')
                                                .replace(' et de 2', ' et de 14')
                                                .replace(' et de 3', ' et de 15')
                                                .replace(' et de 4', ' et de 16')
                                                .replace(' et de 5', ' et de 17')
                                                .replace(' et de 6', ' et de 18')
                                                .replace(' et de 7', ' et de 19')
                                                .replace(' et de 8', ' et de 20')
                                                .replace(' et de 9', ' et de 21')

                                                .trim();
                                        }

                                        if (element.indexOf('Wednesday') !== -1) {
                                            addHours3 = element.replace('Wednesday: ', 'De ')
                                                .replaceAll('–', 'à')
                                                .replaceAll('AM', '')
                                                .replaceAll('PM', '')
                                                .replace(',', ' et de')
                                                .replace('De Closed', 'Fermé')
                                                .replaceAll(':', 'h')
                                                .replaceAll('  ', ' ')
                                                .replaceAll('  ', ' ')

                                                .replace('à 1', 'à 13')
                                                .replace('à 2', 'à 14')
                                                .replace('à 3', 'à 15')
                                                .replace('à 4', 'à 16')
                                                .replace('à 5', 'à 17')
                                                .replace('à 6', 'à 18')
                                                .replace('à 7', 'à 19')
                                                .replace('à 8', 'à 20')
                                                .replace('à 9', 'à 21')

                                                .replace(' et de 1', ' et de 13')
                                                .replace(' et de 2', ' et de 14')
                                                .replace(' et de 3', ' et de 15')
                                                .replace(' et de 4', ' et de 16')
                                                .replace(' et de 5', ' et de 17')
                                                .replace(' et de 6', ' et de 18')
                                                .replace(' et de 7', ' et de 19')
                                                .replace(' et de 8', ' et de 20')
                                                .replace(' et de 9', ' et de 21')

                                                .trim();
                                        }

                                        if (element.indexOf('Thursday') !== -1) {
                                            addHours4 = element.replace('Thursday: ', 'De ')
                                                .replaceAll('–', 'à')
                                                .replaceAll('AM', '')
                                                .replaceAll('PM', '')
                                                .replace(',', ' et de')
                                                .replace('De Closed', 'Fermé')
                                                .replaceAll(':', 'h')
                                                .replaceAll('  ', ' ')
                                                .replaceAll('  ', ' ')

                                                .replace('à 1', 'à 13')
                                                .replace('à 2', 'à 14')
                                                .replace('à 3', 'à 15')
                                                .replace('à 4', 'à 16')
                                                .replace('à 5', 'à 17')
                                                .replace('à 6', 'à 18')
                                                .replace('à 7', 'à 19')
                                                .replace('à 8', 'à 20')
                                                .replace('à 9', 'à 21')

                                                .replace(' et de 1', ' et de 13')
                                                .replace(' et de 2', ' et de 14')
                                                .replace(' et de 3', ' et de 15')
                                                .replace(' et de 4', ' et de 16')
                                                .replace(' et de 5', ' et de 17')
                                                .replace(' et de 6', ' et de 18')
                                                .replace(' et de 7', ' et de 19')
                                                .replace(' et de 8', ' et de 20')
                                                .replace(' et de 9', ' et de 21')

                                                .trim();
                                        }

                                        if (element.indexOf('Friday') !== -1) {
                                            addHours5 = element.replace('Friday: ', 'De ')
                                                .replaceAll('–', 'à')
                                                .replaceAll('AM', '')
                                                .replaceAll('PM', '')
                                                .replace(',', ' et de')
                                                .replace('De Closed', 'Fermé')
                                                .replaceAll(':', 'h')
                                                .replaceAll('  ', ' ')
                                                .replaceAll('  ', ' ')

                                                .replace('à 1', 'à 13')
                                                .replace('à 2', 'à 14')
                                                .replace('à 3', 'à 15')
                                                .replace('à 4', 'à 16')
                                                .replace('à 5', 'à 17')
                                                .replace('à 6', 'à 18')
                                                .replace('à 7', 'à 19')
                                                .replace('à 8', 'à 20')
                                                .replace('à 9', 'à 21')

                                                .replace(' et de 1', ' et de 13')
                                                .replace(' et de 2', ' et de 14')
                                                .replace(' et de 3', ' et de 15')
                                                .replace(' et de 4', ' et de 16')
                                                .replace(' et de 5', ' et de 17')
                                                .replace(' et de 6', ' et de 18')
                                                .replace(' et de 7', ' et de 19')
                                                .replace(' et de 8', ' et de 20')
                                                .replace(' et de 9', ' et de 21')

                                                .trim();
                                        }

                                        if (element.indexOf('Saturday') !== -1) {
                                            addHours6 = element.replace('Saturday: ', 'De ')
                                                .replaceAll('–', 'à')
                                                .replaceAll('AM', '')
                                                .replaceAll('PM', '')
                                                .replace(',', ' et de')
                                                .replace('De Closed', 'Fermé')
                                                .replaceAll(':', 'h')
                                                .replaceAll('  ', ' ')
                                                .replaceAll('  ', ' ')

                                                .replace('à 1', 'à 13')
                                                .replace('à 2', 'à 14')
                                                .replace('à 3', 'à 15')
                                                .replace('à 4', 'à 16')
                                                .replace('à 5', 'à 17')
                                                .replace('à 6', 'à 18')
                                                .replace('à 7', 'à 19')
                                                .replace('à 8', 'à 20')
                                                .replace('à 9', 'à 21')

                                                .replace(' et de 1', ' et de 13')
                                                .replace(' et de 2', ' et de 14')
                                                .replace(' et de 3', ' et de 15')
                                                .replace(' et de 4', ' et de 16')
                                                .replace(' et de 5', ' et de 17')
                                                .replace(' et de 6', ' et de 18')
                                                .replace(' et de 7', ' et de 19')
                                                .replace(' et de 8', ' et de 20')
                                                .replace(' et de 9', ' et de 21')

                                                .trim();
                                        }

                                        if (element.indexOf('Sunday') !== -1) {
                                            addHours7 = element.replace('Sunday: ', 'De ')
                                                .replaceAll('–', 'à')
                                                .replaceAll('AM', '')
                                                .replaceAll('PM', '')
                                                .replace(',', ' et de')
                                                .replace('De Closed', 'Fermé')
                                                .replaceAll(':', 'h')
                                                .replaceAll('  ', ' ')
                                                .replaceAll('  ', ' ')

                                                .replace('à 1', 'à 13')
                                                .replace('à 2', 'à 14')
                                                .replace('à 3', 'à 15')
                                                .replace('à 4', 'à 16')
                                                .replace('à 5', 'à 17')
                                                .replace('à 6', 'à 18')
                                                .replace('à 7', 'à 19')
                                                .replace('à 8', 'à 20')
                                                .replace('à 9', 'à 21')

                                                .replace(' et de 1', ' et de 13')
                                                .replace(' et de 2', ' et de 14')
                                                .replace(' et de 3', ' et de 15')
                                                .replace(' et de 4', ' et de 16')
                                                .replace(' et de 5', ' et de 17')
                                                .replace(' et de 6', ' et de 18')
                                                .replace(' et de 7', ' et de 19')
                                                .replace(' et de 8', ' et de 20')
                                                .replace(' et de 9', ' et de 21')

                                                .trim();
                                        }

                                    });

                                }

                                // var update3 = `UPDATE bakerys SET 
                                //     lat = "${lat}", 
                                //     lng = "${lng}", 
                                //     website = "${website}", 
                                //     phone = "${phone}", 
                                //     adresse = "${adresse}", 
                                //     delivery = "${delivery}", 
                                //     dine_in = "${dine_in}", 
                                //     handicape = "${handicape}", 
                                //     region = "${region}",
                                //     active = "${business_status}",
                                //     user_rating_google = ${user_rating_google},
                                //     total_rating_google = ${total_rating_google}
                                //     WHERE reference = "${element.reference}"`

                                // db.query(update3, (error, data, fields) => { })

                                // Mise à jour des heures 1 à 7

                                if (hours !== null) {

                                    let sqlHours1 = `SELECT * FROM bakerys_hours WHERE bakery_id = "${addId}" AND date = "Lundi" LIMIT 1`;
                                    db.query(sqlHours1, (error, data, fields) => {

                                        if (data.length >= 1) {

                                            var update = `UPDATE bakerys_hours SET am = "${addHours1}" WHERE bakery_id = "${addId}" AND date = "Lundi"`
                                            db.query(update, (error, data, fields) => { console.log(error); })

                                        } else {

                                            let sql = `INSERT INTO bakerys_hours 
                                        (
                                            bakery_id,
                                            date,
                                            am
                                        ) VALUES (
                                            "${addId}",
                                            "Lundi",
                                            "${addHours1}"
                                            )`;

                                            db.query(sql, (error2, result2) => {
                                            })

                                        }

                                    })

                                    //

                                    let sqlHours2 = `SELECT * FROM bakerys_hours WHERE bakery_id = "${addId}" AND date = "Mardi" LIMIT 1`;
                                    db.query(sqlHours2, (error, data, fields) => {

                                        if (data.length >= 1) {

                                            var update = `UPDATE bakerys_hours SET am = "${addHours2}" WHERE bakery_id = "${addId}" AND date = "Mardi"`
                                            db.query(update, (error, data, fields) => { console.log(error); })

                                        } else {

                                            let sql = `INSERT INTO bakerys_hours 
                                (
                                    bakery_id,
                                    date,
                                    am
                                ) VALUES (
                                    "${addId}",
                                    "Mardi",
                                    "${addHours2}"
                                    )`;

                                            db.query(sql, (error2, result2) => {
                                            })

                                        }

                                    })

                                    //

                                    let sqlHours3 = `SELECT * FROM bakerys_hours WHERE bakery_id = "${addId}" AND date = "Mercredi" LIMIT 1`;
                                    db.query(sqlHours3, (error, data, fields) => {

                                        if (data.length >= 1) {

                                            var update = `UPDATE bakerys_hours SET am = "${addHours3}" WHERE bakery_id = "${addId}" AND date = "Mercredi"`
                                            db.query(update, (error, data, fields) => { console.log(error); })

                                        } else {

                                            let sql = `INSERT INTO bakerys_hours 
                                (
                                    bakery_id,
                                    date,
                                    am
                                ) VALUES (
                                    "${addId}",
                                    "Mercredi",
                                    "${addHours3}"
                                    )`;

                                            db.query(sql, (error2, result2) => {
                                            })

                                        }

                                    })

                                    //

                                    let sqlHours4 = `SELECT * FROM bakerys_hours WHERE bakery_id = "${addId}" AND date = "Jeudi" LIMIT 1`;
                                    db.query(sqlHours4, (error, data, fields) => {

                                        if (data.length >= 1) {

                                            var update = `UPDATE bakerys_hours SET am = "${addHours4}" WHERE bakery_id = "${addId}" AND date = "Jeudi"`
                                            db.query(update, (error, data, fields) => { console.log(error); })

                                        } else {

                                            let sql = `INSERT INTO bakerys_hours 
                                (
                                    bakery_id,
                                    date,
                                    am
                                ) VALUES (
                                    "${addId}",
                                    "Jeudi",
                                    "${addHours4}"
                                    )`;

                                            db.query(sql, (error2, result2) => {
                                            })

                                        }

                                    })

                                    //

                                    let sqlHours5 = `SELECT * FROM bakerys_hours WHERE bakery_id = "${addId}" AND date = "Vendredi" LIMIT 1`;
                                    db.query(sqlHours5, (error, data, fields) => {

                                        if (data.length >= 1) {

                                            var update = `UPDATE bakerys_hours SET am = "${addHours5}" WHERE bakery_id = "${addId}" AND date = "Vendredi"`
                                            db.query(update, (error, data, fields) => { console.log(error); })

                                        } else {

                                            let sql = `INSERT INTO bakerys_hours 
                                (
                                    bakery_id,
                                    date,
                                    am
                                ) VALUES (
                                    "${addId}",
                                    "Vendredi",
                                    "${addHours5}"
                                    )`;

                                            db.query(sql, (error2, result2) => {
                                            })

                                        }

                                    })

                                    //

                                    let sqlHours6 = `SELECT * FROM bakerys_hours WHERE bakery_id = "${addId}" AND date = "Samedi" LIMIT 1`;
                                    db.query(sqlHours6, (error, data, fields) => {

                                        if (data.length >= 1) {

                                            var update = `UPDATE bakerys_hours SET am = "${addHours6}" WHERE bakery_id = "${addId}" AND date = "Samedi"`
                                            db.query(update, (error, data, fields) => { console.log(error); })

                                        } else {

                                            let sql = `INSERT INTO bakerys_hours 
                                (
                                    bakery_id,
                                    date,
                                    am
                                ) VALUES (
                                    "${addId}",
                                    "Samedi",
                                    "${addHours6}"
                                    )`;

                                            db.query(sql, (error2, result2) => {
                                            })

                                        }

                                    })

                                    //

                                    let sqlHours7 = `SELECT * FROM bakerys_hours WHERE bakery_id = "${addId}" AND date = "Dimanche" LIMIT 1`;
                                    db.query(sqlHours7, (error, data, fields) => {

                                        if (data.length >= 1) {

                                            var update = `UPDATE bakerys_hours SET am = "${addHours7}" WHERE bakery_id = "${addId}" AND date = "Dimanche"`
                                            db.query(update, (error, data, fields) => { console.log(error); })

                                        } else {

                                            let sql = `INSERT INTO bakerys_hours 
                                (
                                    bakery_id,
                                    date,
                                    am
                                ) VALUES (
                                    "${addId}",
                                    "Dimanche",
                                    "${addHours7}"
                                    )`;

                                            db.query(sql, (error2, result2) => {
                                            })

                                        }

                                    })

                                }

                                //

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

        let villes_france = `SELECT ville_id, ville_nom_simple FROM villes_france LIMIT 9500,10000`;

        db.query(villes_france, (error, data, fields) => {

            data.forEach(element => {

                var actus = [];

                axios.get('https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + element.ville_nom_simple + '&inputtype=textquery&types=bakery&language=fr&components=country:fr&key=' + process.env.GOOGLE_KEY)
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

                                    let sql = `INSERT INTO bakerys (reference, title, url, small_content, image, image_2, image_3, image_4) VALUES ("${element.reference}","${element.title}", "${element.url}","${element.small_content}", "default.png", "default2.png", "default.png", "default2.png")`;
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
                        // actus.forEach(element => {

                        //     let verif_bakery = `SELECT reference FROM bakerys WHERE reference = "${element.reference}" LIMIT 1`;

                        //     db.query(verif_bakery, (error, data, fields) => {

                        //         if (data.length == 0) {

                        //             let sql = `INSERT INTO bakerys (reference, title, url, small_content, image, image_2, image_3, image_4) VALUES ("${element.reference}","${element.title}", "${element.url}","${element.small_content}", "default.png", "default2.png", "default.png", "default2.png")`;
                        //             db.query(sql, (err, result) => { })

                        //             if (error) {
                        //                 let error = true
                        //                 res.json({
                        //                     error
                        //                 })
                        //             }

                        //         }

                        //     })

                        // })

                    })
                    .catch(function (error) {
                        console.log(error);
                    });

            })

            res.json({
                'bakerys': ''
            })

        })

    },
    updateBakery: async (req, res) => {

        const apiKey = process.env.GEOAPIFY_KEY

        let bakerys = `SELECT adresse, id FROM bakerys WHERE active = 1 AND ville IS NULL ORDER BY id ASC`;

        db.query(bakerys, (error, data, fields) => {

            data.forEach(element => {

                console.log('Adresse : ' + element.adresse);

                var config = {
                    method: 'get',
                    url: 'https://api.geoapify.com/v1/geocode/search?text=' + element.adresse + '&lang=fr&format=json&apiKey=' + apiKey,
                    headers: {}
                };

                var bakery_id = element.id

                axios(config)
                    .then(function (response) {

                        const pays = (response.data.results[0] !== undefined) ? response.data.results[0].country : '',
                            pays_code = (response.data.results[0] !== undefined) ? response.data.results[0].country_code : '',
                            region = (response.data.results[0] !== undefined) ? response.data.results[0].state : '',
                            departement = (response.data.results[0] !== undefined) ? response.data.results[0].county : '',
                            ville = (response.data.results[0] !== undefined) ? response.data.results[0].city : '',
                            postcode = (response.data.results[0] !== undefined) ? response.data.results[0].postcode : '',
                            department_code = (response.data.results[0] !== undefined) ? response.data.results[0].department_COG : ''

                        var update3 = `UPDATE bakerys SET 
                            pays = "${pays}",
                            pays_code = "${pays_code}",
                            region = "${region}",
                            departement = "${departement}",
                            ville = "${ville}",
                            postcode = "${postcode}",
                            department_code = "${department_code}"
                            WHERE id = ${bakery_id} AND ville IS NULL`

                        db.query(update3, (error, data, fields) => { console.log(error); })

                        bakery_id = null

                    })

                // const url = element.url,
                //     url2 = url.toLowerCase().replaceAll('â', 'a').replaceAll('é', 'e').replaceAll('à', 'a').replaceAll(' - ', '-').replaceAll('\'', '-').replaceAll(' ', '-').replaceAll('’', '-').replaceAll('%', '-pourcent-').replaceAll('è', 'e').replaceAll('ï', 'i').replaceAll(',', '').replaceAll('/', '').replaceAll('--', '-').replaceAll('ô', 'o').replaceAll('ê', 'e').replaceAll('ë', 'e').replaceAll('ö', 'o')

                // var update3 = `UPDATE bakerys SET 
                //     url = "${url2}"
                //     WHERE id = ${element.id}`

                // db.query(update3, (error, data, fields) => { })

            })

            res.json({
                succes: true
            })
        })

    },

    redirect: async (req, res) => {

        var { plateforme } = req.params,
            key = ''

        if (plateforme === 'desktop') {
            key = GOOGLE_CLIENT_ID
        } else {
            key = GOOGLE_CLIENT_ID
        }

        const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${key}&redirect_uri=${GOOGLE_REDIRECT_URI + '/' + plateforme}&response_type=code&scope=profile email`;
        res.redirect(url);

    },

    callback: async (req, res) => {

        const { code } = req.query;

        var { plateforme } = req.params,
            key = ''

        if (plateforme === 'desktop') {
            key = GOOGLE_CLIENT_ID
        } else {
            key = GOOGLE_CLIENT_ID
        }

        try {

            // Exchange authorization code for access token
            const { data } = await axios.post('https://oauth2.googleapis.com/token', {
                client_id: key,
                client_secret: GOOGLE_CLIENT_SECRET,
                code,
                redirect_uri: GOOGLE_REDIRECT_URI + '/' + plateforme,
                grant_type: 'authorization_code',
            });

            const { access_token, id_token } = data;

            // Use access_token or id_token to fetch user profile
            const { data: profile } = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
                headers: { Authorization: `Bearer ${access_token}` },
            });

            const firstname = profile.given_name,
                lastname = profile.family_name,
                username = profile.email,
                google_id = profile.id,
                image = profile.picture

            let verif_email = `SELECT U.*, US.from_date, US.product_id FROM 
                users AS U
                LEFT JOIN user_subscription AS US ON US.user_id = U.id
                WHERE U.active >= 1 AND U.email = "${username}" GROUP BY U.id LIMIT 1`;

            db.query(verif_email, (error, data, fields) => {

                if (data[0] === undefined) {

                    let error = true
                    res.json({
                        error,
                        message: 'Votre compte ne semble pas exister sur My Bakery !'
                    })

                } else {

                    var date = moment().format('YYYY-MM-DD HH:mm:ss'),
                        from_date = moment(data[0].from_date).format('YYYY-MM-DD HH:mm:ss'),
                        subscription = false

                    if (date <= from_date && data[0].from_date !== null && data[0].product_id >= 3) {
                        subscription = true
                    } else {
                        subscription = false
                    }

                    const user = {
                        id: data[0].id,
                        email: data[0].email,
                        firstname: data[0].firstname,
                        fonction: data[0].fonction,
                        location: data[0].location,
                        phone: data[0].phone,
                        mobile: data[0].mobile,
                        naissance: data[0].naissance,
                        lastname: data[0].lastname,
                        active: data[0].active,
                        subscription: subscription,
                    };

                    if (data[0].active === 1) {

                        const token = jwt.sign(user, process.env.JWT_KEY),
                            token_login = generateToken.randomBytes(16).toString('hex')

                        var update = `UPDATE users SET token = "${token_login}", jwt_token = "${token}", image = "${image}", google_id = "${google_id}", firstname = "${firstname}", lastname = "${lastname}", logged_at = "${moment().format('YYYY-MM-DD HH:mm:ss')}" WHERE id = "${user.id}"`
                        db.query(update, (error, data, fields) => { })

                        res.redirect('https://my-bakery.fr/my-account/' + token_login);

                    } else {
                        res.redirect('https://my-bakery.fr/my-account');
                    }

                }

            })

        } catch (error) {
            res.redirect('https://my-bakery.fr/my-account');
        }

    },

    validate: async (req, res) => {

        const { token } = req.body

        let verif_token = `SELECT U.* FROM users AS U WHERE U.active >= 1 AND U.token = "${token}" LIMIT 1`;

        db.query(verif_token, (error, data, fields) => {

            if (data[0].length === 0) {

                let error = true
                res.json({
                    error,
                    message: 'Une erreur est survenue !'
                })

            } else {

                var update = `UPDATE users SET token = "", jwt_token = "", logged_at = "${moment().format('YYYY-MM-DD HH:mm:ss')}" WHERE id = "${data[0].id}"`
                db.query(update, (error, data, fields) => { })

                let succes = true
                res.json({
                    succes,
                    token: data[0].jwt_token
                })

            }

        })

    },
}